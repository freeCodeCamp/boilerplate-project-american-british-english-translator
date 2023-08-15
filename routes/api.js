'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if (!req.body) {
		  res.json({error: "Invalid request"})
	  } else {
		  res.json(translator.translate(req.body))
	  }
    });
};
