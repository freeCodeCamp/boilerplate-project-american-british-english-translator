/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  let translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      
    });
};