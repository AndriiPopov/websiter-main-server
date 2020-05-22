"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFinalForm = require("react-final-form");

var _axios = _interopRequireDefault(require("axios"));

var _hydrateUtils = require("../utils/hydrateUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

if (process.env.NODE_ENV === 'development') {
  _axios.default.defaults.baseURL = 'http://api.websiter.test:5000';
} else {
  _axios.default.defaults.baseURL = 'https://api.websiter.dev';
}

const BasicForm = props => {
  const [state, setState] = (0, _react.useState)(); // const innerElements = []
  // useEffect(() => {
  //     returnInnerElements(innerElements, props)
  // })
  // migrateInnerChildren(innerElements, props)

  const onSubmit = (values, form) => {
    let html = `
        <html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <title></title>
        </head>
        <body>
            <h1>Hello!</h1>
            </br>
            <div  style='background: #151515;color: #FFF;'>You have recieved a message from a contact form on your website on Websiter.dev:</div>
            </br>
            <table><tbody>
            </body>
        </html>`;

    for (let field in values) {
      const original = props.refinedProperties.fields.find(item => item.name === field);
      html += `<tr><td>${original.label}:</td><td>${values[field]}</td></tr>`;
    }

    html += '</tbody></table>';

    if (html.length < 5000) {
      _axios.default.post('/api/sendmail', {
        html,
        to: props.refinedProperties.sendTo
      }).then(response => {
        if (response.data.success) setState('Your message has been sent.');else setState('Your message has not been sent. Please try again.');
      }).catch(err => {
        setState('Your message has not been sent. Please try again.');
      });
    }
  };

  const required = value => value ? undefined : 'Required';

  const mustBeNumber = value => isNaN(value) ? 'Must be a number' : undefined;

  const minValue = min => value => isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

  const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined);

  return /*#__PURE__*/_react.default.createElement(_reactFinalForm.Form, {
    onSubmit: onSubmit,
    render: ({
      handleSubmit,
      form,
      submitting,
      pristine,
      values
    }) => /*#__PURE__*/_react.default.createElement("form", {
      onSubmit: handleSubmit,
      className: props.refinedProperties.formClass
    }, props.refinedProperties.fields && props.refinedProperties.fields.map((field, index) => /*#__PURE__*/_react.default.createElement(_reactFinalForm.Field, {
      key: index,
      name: field.name,
      validate: field.required ? required : null
    }, ({
      input,
      meta
    }) => /*#__PURE__*/_react.default.createElement("div", {
      className: field.containerClass
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: field.labelClass
    }, field.label), field.type === 'input' ? /*#__PURE__*/_react.default.createElement("input", _extends({}, input, field.inputAttrs, {
      className: field.inputClass
    })) : field.type === 'textarea' ? /*#__PURE__*/_react.default.createElement("textarea", _extends({}, input, field.inputAttrs)) : null, meta.error && meta.touched && /*#__PURE__*/_react.default.createElement("span", {
      className: field.validationClass
    }, meta.error)))), /*#__PURE__*/_react.default.createElement("div", {
      className: props.refinedProperties.submitButtonContainerClass
    }, /*#__PURE__*/_react.default.createElement("button", {
      type: "submit",
      disabled: submitting,
      className: props.refinedProperties.submitButtonClass
    }, "Submit")), /*#__PURE__*/_react.default.createElement("div", {
      className: props.refinedProperties.resultClass
    }, state))
  });
};

var _default = BasicForm;
exports.default = _default;