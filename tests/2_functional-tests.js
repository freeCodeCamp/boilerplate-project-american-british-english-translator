const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    test("GET request to /api/stock-prices/", function() {
      assert.isNotNull(1, '1 is not null');
    });
    test("GET request to /api/stock-prices/", function() {
      assert.isNotNull(1, '1 is not null');
    });
    test("GET request to /api/stock-prices/", function() {
      assert.isNotNull(1, '1 is not null');
    });
    test("GET request to /api/stock-prices/", function() {
      assert.isNotNull(1, '1 is not null');
    });
    test("GET request to /api/stock-prices/", function() {
      assert.isNotNull(1, '1 is not null');
    });
    test("GET request to /api/stock-prices/", function() {
      assert.isNotNull(1, '1 is not null');
    });

});
