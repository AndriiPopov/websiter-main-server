"use strict";

var _server = require("react-dom/server");

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../Components/pages/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require('express');

const router = express.Router();

const {
  getWebsiteAndPage
} = require('../utils/getWebsiteAndPage');

const resources = require('../utils/resources');

const https = require('https');

const path = require('path');

router.post('/', async (req, res, next) => {
  const fullUrl = req.body.url;
  const websiteAndPageData = await getWebsiteAndPage(fullUrl, res);
  if (!websiteAndPageData) return;
  const {
    website,
    page,
    pathname,
    is120,
    isLocal
  } = websiteAndPageData;

  if (page) {
    const mD = await resources(page, website); // let reactComp = renderToStaticMarkup(
    //     <Index
    //         mD={{
    //             ...mD,
    //             structure: mD.resourcesObjects[mD.template].structure,
    //         }}
    //     />
    // )

    let bodyComp = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_index.default, {
      mD: { ...mD,
        structure: mD.resourcesObjects[mD.template].structure
      },
      renderBody: true,
      isLocal: isLocal
    }));

    if (bodyComp.indexOf('<div id="MainDIV" class="wrapp">') > -1) {
      bodyComp = '<div id="MainDIV" class="wrapp">' + bodyComp.split('<div id="MainDIV" class="wrapp">')[1];
      bodyComp = bodyComp.split('<section')[0];
    } else if (bodyComp.indexOf('<div style="margin-top:100px" class="cont">') > -1) {
      bodyComp = '<div style="margin-top:100px" class="cont">' + bodyComp.split('<div style="margin-top:100px" class="cont">')[1];
      bodyComp = bodyComp.split('<section')[0];
    } else {
      bodyComp = 'Not found';
    } // reactComp =
    //     '<!DOCTYPE html>' +
    //     reactComp.slice(0, reactComp.length - 7) +
    //     bodyComp +
    //     '</html>'


    res.status(200).send({
      bodyComp
    });
  } else {
    if (website && !page) {
      const file = website.filesStructure.find(file => {
        return file.relUrl === pathname || '/' + file.relUrl === pathname;
      } // {
      //     const url =
      //         file.path.reduce((totalPath, fileId) => {
      //             const fileItem = website.filesStructure.find(
      //                 fileInn => fileInn.id === fileId
      //             )
      //             return totalPath + fileItem.name + '/'
      //         }, '') + file.name
      //     if (url === pathname) return true
      // }
      );

      if (file) {
        if (req.get('If-None-Match') && (typeof file.v === 'string' || typeof file.v === 'number')) {
          if (req.get('If-None-Match').toString() === file.v.toString()) {
            res.status(304).send();
            return;
          }
        }

        if (file.url) {
          // req.setNoDelay(true)
          res.set('etag', file.v);
          res.set('Cache-Control', 'max-age=20');
          https.get(file.url + (is120 ? '/120' : ''), function (proxyRes) {
            proxyRes.pipe(res);
          });
        }
      } else return res.status(404).send('Resource is not found');
    }
  }
});
module.exports = router;