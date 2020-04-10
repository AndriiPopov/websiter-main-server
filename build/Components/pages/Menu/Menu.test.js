"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _renderWithRedux = _interopRequireDefault(require("../../../utils/renderWithRedux"));

var _Section = _interopRequireDefault(require("./Section"));

var _builder = require("../../../store/reducers/BuilderReducer/builder");

var actions = _interopRequireWildcard(require("../../../store/actions/index"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const builderAdditionalState = {
  sectionsOnPage: ['element_0'],
  currentId: 2,
  element_0: {
    type: 'section',
    height: 200,
    space: 50,
    background: 'rgba(200, 100, 30)',
    header: false,
    footer: false,
    allPages: false,
    children: ['element_1', 'element_2'],
    styles: []
  },
  element_1: {
    type: 'box',
    height: 100,
    width: 100,
    left: 200,
    top: 100,
    background: 'rgba(100, 0, 80)',
    zIndex: 0,
    children: [],
    parent: 'element_0',
    styles: [],
    borderOn: true,
    borderSize: 5,
    borderHOffset: 6,
    borderVOffset: 7,
    borderBlur: 8,
    borderInset: false,
    mapOn: true,
    mapAddress: 'Test address',
    mapZoom: 4,
    mapSatellite: true,
    mapOuter: true
  },
  element_2: {
    type: 'box',
    height: 100,
    width: 100,
    left: 200,
    top: 100,
    background: 'rgba(100, 0, 80)',
    zIndex: 0,
    children: [],
    parent: 'element_0',
    styles: [],
    borderOn: true,
    borderSize: 5,
    borderHOffset: 6,
    borderVOffset: 7,
    borderBlur: 8,
    borderInset: false,
    mapOn: true,
    mapAddress: 'Test address',
    mapZoom: 4,
    mapSatellite: true,
    mapOuter: true
  }
};
afterEach(_reactTestingLibrary.cleanup);
test("can render", async () => {
  //const drawerClicked = jest.fn();
  let container = (0, _renderWithRedux.default)( /*#__PURE__*/_react.default.createElement(_Section.default, {
    id: "element_0"
  }), {
    initialState: {
      builder: { ..._builder.initialState,
        ...builderAdditionalState
      }
    }
  });
  expect(container.getByTestId('sectionMain')).toBeDefined();
  expect(container.getByTestId('box_element_1_out')).toBeDefined();
  expect(container.getByTestId('box_element_1_in')).toBeDefined();
  expect(container.getByTestId('boxCoverDiv')).toBeDefined();
  const style = container.getByTestId('box_element_1_out');
});