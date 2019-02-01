const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require('lodash');
const fs = require('fs')

const { Website } = require('../models/website');
const { Page } = require('../models/page');


router.post('/:url', async (req, res) => {
  const url = req.params.url;
  if (!url || url === '') return res.status(404).send('The website with the given URL was not found.');
  
  const domain = url.split('/')[0];
  const { pagesStructure } = await Wesite.findOne({ 'domain': domain }, 'pagesStructure');

  const pagesObjects = {};
  await Promise.all(pagesStructure.map( async item => {
    pagesObjects[item.id] = await Page.findById(item.id, 'publishedVersion').publishedVersion;
  }));

  fs.readFile(path.join(__dirname+'/client/build/index.html'), "utf8", (err, data) => {
    if(err) throw err;

    data.replace('<head>', '<head><script>window.pagesStructure = JSON.parse(' + JSON.stringify(pagesStructure) + ');window.pagesObjects = JSON.parse(' + JSON.stringify(pagesObjects) + ');</script>');

    res.send(data);
  });
});

module.exports = router;