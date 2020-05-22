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

const nodemailer = require('nodemailer');

const https = require('https');

const path = require('path');

const fs = require('fs');

const pemFile = path.resolve(__dirname, 'ssl/dkim-private.pem'); // var sendmailTransport = require('nodemailer-sendmail-transport')
// var client = sendmailTransport()
// let transporter = nodemailer.createTransport({
//     sendmail: true,
//     // host: 'websiter.dev',
//     // secure: true,
//     // dkim: {
//     //     domainName: 'websiter.dev',
//     //     keySelector: 'dkim',
//     //     privateKey:
//     //         '-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEAq8B7yA+vAYVhQC5sj/UX4KeZFZDFKRkFYDru4yCjCHxsBFTY+CuVhnbyf88NY7YPRGKUffnp5yCeqOlIQWsSxSuRRkReyTAjxw0NNRUTWuWsCb5DH3CE2b1XIYUQP7lclweJqw0CQk5eKiM3/QpVrAeuPIWYAWO5SXP6FeuOrHK4txiaaOhOXyJL7kyGB7RQz909BgohXWQaBM2ev99hNYUlsiBfZQDQyb/r6oLoirT0uywkSHKmu7ZjSxzI3DsBaFeBqnQbm5ed1mHmQczdNt2uoyIM2bj7PcdZ6BBhcqZ5WTtYXv0JC9pW9gWpS/i3jmWtsGiD3cqCz/FfTJs/vQIDAQABAoIBAHh9GFlJZ2SRxZ/Y8aAsOQwJh4NxhF9IhlT0AxKjmrwhTUXcoDm5mbQzTfwLrUD+P8ehwLp/0G+smqG0xlPeYdSgs9GvtS8+7lp99X3/wwxJg19ycnRj4089XRrO1o9d4m6xgwrUnXkWsUiuXGDQFzoQSVN8BR80bo/xJMir7/NZgTxkHNILR6YA3RB3eFKZi7oYDOTB/t99Y4g71EbvMFSTDs90xap9z/GBKxH/MHhIZwjE6YJR2xiVFHRAEUB7Z37u7QFq9eW1SDldQrXKQzMMTjAMUQ4cZVKa4jyczFXLTLtwUIZhftb8XFu/AcUwsolHqUu9Wei+Gbf9uxbZoqECgYEA3gRYqLwj/WhNxQ+2yfzg1NkBhuJlYBy3DslrI/WAmfUvk42xzr+Nxfh3/2Zc/wCjBoo3Ngy0/v45Zh/OstUmRajnGPyk65No8KuWw8xTo/HcmzirYLmKLREyjnVfht/0Ej/027FIeqiywkEjh7n7t2I2vgrEvZCD6qdv1ytf5YsCgYEAxgqEpd6ctNOubH3O1jkkefCDBy8v2UENmb6eJRIRfzN8h2SZ7F5WEw/nrmcjAMt1C/w88ngrba87nQiftNPUDeAwPgDAlKfE8Cub+7t4df/UH4IDj97k4tk8hi7xe7jrI5NYU9aKswuPtVuB4h1mfBXxcx/3wUdlURM3b7GTaNcCgYEApm+Hr2brbAsHUhWHqECko6vS0zVhXf3o1XL1mM1wjPobonf0tdMwCxtLifFJAfmOPVbcMO6xuP8INKDfqXzU5h/Krxam49tsLg/URBAnG54zDUIcZ7Rv+30K83TWGhxFsnCztQZgGWPiLnH6msM4Cq/b7ffQqXNvEThYRWvExiUCgYEAnnI34sWStxJNkTuuyrJ5Pp5xFsRoEff8O6/Is3wbR5wX2/NfOz/WufWVtXGLDc26XdZ3pL8EcAMtPNxzeqeoF1nw/wp3CfiYllctu2AoZrBCNNs+olMA6YZI6EqSphwy9QmkN5+E5O8xETafWhuPrWOZBDTlclv+8bjgN5rph40CgYBz7PdvwAcuynzy7Pr6fjeaF/1qcTtAaANXOVeVVyBIyaYFPJ098tPXPQpKrU7mlY5rmkjxIqlQrObnEXPL1wP/OqUF6MQnVDbQW/D7rOBm+VPwgSUnkK5948YmXu5VTSulzE6wD/R9AY81qG8YRA3AMdYAkrpmKAv9f2A5YwhXPA==-----END RSA PRIVATE KEY-----',
//     // },
// })
// var transport = nodemailer.createTransport(client)
// const sendmail = require('sendmail')({
//     silent: true,
//     dkim: {
//         privateKey: fs.readFileSync(pemFile, 'utf8'),
//         keySelector: 'dkim',
//     },
// })

router.post('/api/sendmail', async (req, res, next) => {// console.log('we are posting')
  // let info = await transport.sendMail({
  //     // envelope: {
  //     //     from: 'bounce@websiter.dev',
  //     //     to: req.body.to,
  //     // },
  //     from: 'no-reply@websiter.dev',
  //     to: req.body.to,
  //     replyTo: 'no-reply@websiter.dev',
  //     subject: 'New message from a contact form on Websiter.dev.',
  //     html: req.body.html,
  // })
  // console.log(info)
  // client.send({
  //     data: {
  //         envelope: {
  //             from: 'bounce@websiter.dev',
  //             to: req.body.to,
  //         },
  //     },
  //     message: {
  //         from: 'no-reply@websiter.dev',
  //         to: req.body.to,
  //         replyTo: 'no-reply@websiter.dev',
  //         subject: 'New message from a contact form on Websiter.dev.',
  //         html: req.body.html,
  //     },
  // })
  // sendmail(
  //     {
  //         envelope: {
  //             from: 'bounce@websiter.dev',
  //             to: req.body.to,
  //         },
  //         from: 'no-reply@websiter.dev',
  //         to: req.body.to,
  //         replyTo: 'no-reply@websiter.dev',
  //         subject: 'New message from a contact form on Websiter.dev.',
  //         html: req.body.html,
  //     },
  //     function(err, reply) {
  //         if (err) {
  //             res.send({ success: false })
  //         } else {
  //             res.send({ success: true })
  //         }
  //     }
  // )
});
router.get('/', async (req, res, next) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
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
    const mD = await resources(page, website);
    let reactComp = (0, _server.renderToStaticMarkup)( /*#__PURE__*/_react.default.createElement(_index.default, {
      mD: { ...mD,
        structure: mD.resourcesObjects[mD.template].structure
      }
    }));
    const bodyComp = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_index.default, {
      mD: { ...mD,
        structure: mD.resourcesObjects[mD.template].structure
      },
      renderBody: true,
      isLocal: isLocal
    }));
    reactComp = '<!DOCTYPE html>' + reactComp.slice(0, reactComp.length - 7) + bodyComp + '</html>';
    res.status(200).send(reactComp);
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