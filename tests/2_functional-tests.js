const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');
const {LocaleLang} = require('../utils/enums');
chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite('POST request to /api/translate, test with valid fields', ()=>{
        test('Translation with text and locale fields: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    locale: LocaleLang.AMERICAN_TO_BRITISH.description,
                    text: "Mangoes are my favorite fruit."
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'response should be an object');
                    assert.property(res.body, 'text', 'response should return a original text');
                    assert.property(res.body, 'translation', 'response should return a translation');
                    assert.strictEqual(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
                    done();
                });
        });

        test('Translation with text that needs no translation: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    locale: LocaleLang.AMERICAN_TO_BRITISH.description,
                    text: "Paracetamol takes up to an hour to work.",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'response should be an object');
                    assert.property(res.body, 'text', 'response should return a original text');
                    assert.property(res.body, 'translation', 'response should return a translation');
                    assert.strictEqual(res.body.translation, 'Everything looks good to me!')
                    done();
                });
        });
    });
    suite('POST request to /api/translate, test with invalid fields', ()=>{
        test('Translation with text and invalid locale field: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    locale: 'bad',
                    text: "Mangoes are my favorite fruit."
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'response should be an object');
                    assert.property(res.body, 'error', 'response should return an error');
                    assert.strictEqual(res.body.error, 'Invalid value for locale field')
                    done();
                });
        });

        test('Translation with missing text field: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    locale: LocaleLang.AMERICAN_TO_BRITISH.description,
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'response should be an object');
                    assert.property(res.body, 'error', 'response should return an error');
                    assert.strictEqual(res.body.error, 'Required field(s) missing')
                    done();
                });
        });

        test('Translation with missing locale field: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    text: "bad",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'response should be an object');
                    assert.property(res.body, 'error', 'response should return an error');
                    assert.strictEqual(res.body.error, 'Required field(s) missing')
                    done();
                });
        });

        test('Translation with empty text: POST request to /api/translate', function (done) {
            chai.request(server)
                .post('/api/translate')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({
                    locale: LocaleLang.AMERICAN_TO_BRITISH.description,
                    text: "",
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'response should be an object');
                    assert.property(res.body, 'error', 'response should return an error');
                    assert.strictEqual(res.body.error, 'No text to translate')
                    done();
                });
        });

        
    })
});

teardown(function() {
    chai.request(server)
      .get('/')
  });
