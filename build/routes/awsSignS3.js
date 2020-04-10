"use strict";

const express = require('express');

const auth = require('../middleware/auth');

const aws = require('aws-sdk');

const {
  getUserRights
} = require('../utils/getUserRights');

const {
  Website
} = require('../models/website');

const S3_BUCKET = process.env.S3_BUCKET;
const AWS_S3_KEY = process.env.AWSAccessKeyId;
const AWS_S3_SECRET = process.env.AWSSecretKey;
const AWS_S3_MAX_STORAGE = process.env.AWSMaxStorage;

const Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);
const router = express.Router();
const signFileSchema = Joi.object({
  websiteId: Joi.objectId().required(),
  fileName: Joi.string().required(),
  fileType: Joi.string(),
  fileSize: Joi.number().required(),
  thumbnailName: Joi.string(),
  thumbnailType: Joi.string(),
  thumbnailSize: Joi.number()
});
router.post('/', auth, async (req, res) => {
  try {
    const {
      error
    } = signFileSchema.validate(req.body);
    if (error) return res.status(400).send('Image upload failed. Wrong data.');
    const website = await Website.findById(req.body.websiteId);
    if (!website) return res.status(400).send('Image upload failed. Wrong data.');
    if (!(await getUserRights(req.user._id, website, ['content', 'developer'], res))) return;
    const s3 = new aws.S3({
      accessKeyId: AWS_S3_KEY,
      secretAccessKey: AWS_S3_SECRET
    });
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    const fileSize = req.body.fileSize;
    const thumbnailName = req.body.thumbnailName;
    const thumbnailType = req.body.thumbnailType;
    const thumbnailSize = req.body.thumbnailSize || 0;
    const oldFile = website.filesStructure.find(file => file.serverName === fileName);
    let newStorage = 0;

    if (oldFile) {
      newStorage = website.storage + parseFloat(fileSize) + parseFloat(thumbnailSize) - oldFile.size;
    } else {
      newStorage = website.storage + parseFloat(fileSize) + parseFloat(thumbnailSize);
    }

    if (newStorage > parseFloat(AWS_S3_MAX_STORAGE)) return res.status(400).send('Not enough storage. Please upgrade.');
    const s3ParamsFile = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
    const s3ParamsThumbnail = thumbnailName ? {
      Bucket: S3_BUCKET,
      Key: thumbnailName,
      Expires: 60,
      ContentType: thumbnailType,
      ACL: 'public-read'
    } : {};
    s3.getSignedUrl('putObject', s3ParamsFile, (err, data) => {
      if (err) {
        return res.end();
      }

      const returnDataFile = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
        newStorage
      };

      const sendSignedUrls = returnDataThumbnail => {
        res.write(JSON.stringify({ ...returnDataFile,
          ...returnDataThumbnail
        }));
        res.end();
      };

      if (thumbnailName) {
        s3.getSignedUrl('putObject', s3ParamsThumbnail, (err, dataT) => {
          if (err) {
            return res.end();
          }

          const returnDataThumbnail = {
            signedRequestThumbnail: dataT
          };
          sendSignedUrls(returnDataThumbnail);
        });
      } else {
        sendSignedUrls({});
      }
    });
  } catch {
    res.status(412).send('Failed');
  }
});
module.exports = router;