"use strict";

const Url = require('url-parse');

const {
  Website
} = require('../models/website');

const getWebsiteAndPage = async (urlString, res) => {
  if (!urlString) return res.status(400).send(error.details[0].message);
  const url = new Url(urlString, true);
  const is120 = url.query.thumbnail === '1';
  const hostParts = url.hostname.split('.');
  let website, pathname;

  if (url.hostname === 'live.websiter.dev') {
    const pathArray = url.pathname.split('/');

    if (pathArray.length < 2) {
      res.status(400).send('Wrong page');
      return;
    }

    website = await Website.findOne({
      domain: pathArray[1]
    });
    if (website) if (website.domainHidden) {
      res.status(400).send('The website is not found');
      return;
    }
    pathArray.shift();
    pathArray.shift();
    pathname = pathArray.join('/').trim();
  } else {
    website = await Website.findOne({
      customDomain: url.hostname,
      customDomainVerified: true
    });

    if (!website) {
      website = await Website.findOne({
        customDomain: url.hostname
      });
    }

    if (website) if (website.customDomainHidden) {
      res.status(400).send('The website is not found');
      return;
    }
    pathname = url.pathname.trim();
  }

  if (!website) {
    res.status(400).send('No website');
    return;
  }

  let page;

  if (pathname === '' || pathname === '/') {
    page = website.pagesStructure.find(page => page.homepage === true && !page.generalSettings && !page.hidden);
  }

  if (!page) {
    page = website.pagesStructure.find(page => (page.url === pathname || '/' + page.url === pathname) && !page.generalSettings && !page.hidden);
  }

  return {
    website,
    page,
    url,
    pathname,
    is120
  };
};

module.exports.getWebsiteAndPage = getWebsiteAndPage;