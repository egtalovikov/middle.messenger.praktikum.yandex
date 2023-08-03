// eslint-disable-next-line import/no-extraneous-dependencies
const { JSDOM } = require('jsdom');

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:5173',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

// eslint-disable-next-line func-names
require.extensions['.scss'] = function () {
  module.exports = () => ({});
};
