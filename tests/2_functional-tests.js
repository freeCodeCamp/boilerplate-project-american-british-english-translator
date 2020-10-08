/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

  suite('"POST" to /api/translate', () => {
    test('POST with text and locale fields populated', done => { 
      const text = "'Mangoes are my favorite fruit.'";
      const locale = 'american-to-british';
      const output = {
        text: "Mangoes are my favorite fruit", 
        translation: "Mangoes are my <span class='highlight'>favourite</span> fruit."
      };
      
      //done();
    });

    test('POST with text and invalid locale', done => {
      const text = "'Mangoes are my favorite fruit.'";
      const locale = 'russian-to-spanish';
      const error = { error: 'Invalid value for locale field' };
      
      //done();
    });

    test('POST with missing text field', done => {
      const locale = "american-to-british";
      const error = { error: 'Required field(s) missing' }
      
      //done();
    });
    
    test('POST with missing locale field', done => {
      const text = "freeCodeCamp rocks!";
      const error = { error: 'Required field(s) missing' }

      //done();
    });
    
    test('POST with missing text', done => {
      const text = "";
      const locale = "american-to-british";
      const error = { error: 'No text to translate' }

      //done();
    });

    test('POST with text that needs no translation', done => {
      const text = "SaintPeter and nhcarrigan say hello!";
      const locale = "british-to-american"
      const output = {
        text: "SaintPeter and nhcarrigan say hello!", 
        translation: "Everything looks good to me!"
        }

      //done();
    });

  });  

});
