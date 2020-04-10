"use strict";

var React = require('react');

var PropTypes = require('prop-types');

var serialize = require('serialize-javascript');

function Layout(props) {
  return null;
  return /*#__PURE__*/React.createElement("html", null, /*#__PURE__*/React.createElement("head", null, /*#__PURE__*/React.createElement("title", null, props.title), /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    href: "/stylesheets/style.css"
  }), /*#__PURE__*/React.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
          // This is making use of ES6 template strings, which allow for
          // multiline strings. We specified "{jsx: {harmony: true}}" when
          // creating the engine in app.js to get this feature.
          console.log("hello world");
          window.__MD__ = ${serialize(props.mD)};
        `
    }
  }), /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    type: "text/css",
    href: "https://websiter.s3.us-east-2.amazonaws.com/systemClasses.css"
  })), /*#__PURE__*/React.createElement("body", null, props.children, /*#__PURE__*/React.createElement("script", {
    src: "/index.js",
    charset: "utf-8"
  }), /*#__PURE__*/React.createElement("script", {
    src: "/vendor.js",
    charset: "utf-8"
  })));
}

Layout.propTypes = {
  title: PropTypes.string
};
module.exports = Layout;