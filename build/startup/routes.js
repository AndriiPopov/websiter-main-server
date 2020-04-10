"use strict";

const express = require('express');

const path = require('path');

const users = require('../routes/users');

const auth = require('../routes/auth');

const live = require('../routes/live');

const tryWebsiter = require('../routes/tryWebsiter');

const awsSignS3 = require('../routes/awsSignS3');

const error = require('../middleware/error');

const vhost = require('vhost');

const {
  getWebsiteAndPage
} = require('../utils/getWebsiteAndPage');

const https = require('https');

module.exports = function (app, myApp, liveApp, apiApp) {
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
    res.header('X-Frame-Options', 'deny');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE'); //res.header("Access-Control-Expose-Headers", "x-auth-token");
    //app.use(express.json())
    // console.log('here')

    next();
  });
  app.use(vhost('my.websiter.dev', myApp));
  app.use(vhost('my.websiter.dev:5000', myApp));
  app.use(vhost('api.websiter.dev', apiApp));
  app.use(vhost('api.websiter.dev:5000', apiApp));
  app.use(vhost('api.localwebsiter.dev', apiApp));
  app.use(liveApp);
  myApp.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
    res.header('X-Frame-Options', 'deny');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE'); //res.header("Access-Control-Expose-Headers", "x-auth-token");
    //app.use(cors({ origin: 'https://my.websiter.dev' }))
    // app.use(express.json())

    next();
  });
  apiApp.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
    res.header('X-Frame-Options', 'deny');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE'); //res.header("Access-Control-Expose-Headers", "x-auth-token");
    //app.use(cors({ origin: 'https://api.websiter.dev' }))
    // app.use(express.json())

    next();
  });
  liveApp.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('X-Frame-Options', 'deny');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE'); //res.header("Access-Control-Expose-Headers", "x-auth-token");
    //app.use(cors({ origin: 'https://live.websiter.dev' }))
    // app.use(express.json())

    next();
  });
  myApp.use(express.json());
  myApp.use(express.static(path.join(__dirname, '/../../client')));
  myApp.use('/api/auth', auth);
  myApp.use('/try', tryWebsiter);
  myApp.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../../client/index.html'));
  });
  apiApp.use(express.json());
  apiApp.use('/api/users', users);
  apiApp.use('/api/sign-s3', awsSignS3);
  apiApp.use('/api/auth', auth); // apiApp.use('/api/resources', resources)
  // app.use(express.static(path.join(__dirname, '/../client')))
  // apiApp.get('/tinymce.zip', (req, res) => {
  //     res.sendFile(path.join(__dirname + '/../client/tinymce.zip'))
  // })

  liveApp.use(express.json()); // liveApp.use(
  //     express.static(path.join(__dirname, '/../client/build_client_live'))
  // )

  liveApp.use(express.static('./public'));
  liveApp.set('etag', 'strong');
  liveApp.use('*', live); // liveApp.get('*', async (req, res, next) => {
  //     const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  //     const websiteAndPageData = await getWebsiteAndPage(fullUrl, res)
  //     if (!websiteAndPageData) return
  //     const { website, page, pathname, is120 } = websiteAndPageData
  //     console.log(websiteAndPageData)
  //     if (page) {
  //         res.sendFile(
  //             path.join(__dirname + '/../client/build_client_live/index.html')
  //         )
  //     } else {
  //         if (website && !page) {
  //             const file = website.filesStructure.find(file => {
  //                 const url =
  //                     file.path.reduce((totalPath, fileId) => {
  //                         fileItem = website.filesStructure.find(
  //                             fileInn => fileInn.id === fileId
  //                         )
  //                         return totalPath + '/' + fileItem.name
  //                     }, '') +
  //                     '/' +
  //                     file.name
  //                 if (url === '/' + pathname) return true
  //             })
  //             if (file) {
  //                 if (
  //                     req.get('If-None-Match') &&
  //                     (typeof file.v === 'string' ||
  //                         typeof file.v === 'number')
  //                 ) {
  //                     if (
  //                         req.get('If-None-Match').toString() ===
  //                         file.v.toString()
  //                     ) {
  //                         res.status(304).send()
  //                         return
  //                     }
  //                 }
  //                 if (file.url) {
  //                     res.set('etag', file.v)
  //                     res.set('Cache-Control', 'max-age=20')
  //                     https.get(file.url + (is120 ? '/120' : ''), function(
  //                         proxyRes
  //                     ) {
  //                         proxyRes.pipe(res)
  //                     })
  //                 }
  //             }
  //         }
  //     }
  // })

  app.use(error);
};