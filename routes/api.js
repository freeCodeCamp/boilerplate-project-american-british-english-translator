'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      var text = req.body.text;
      var locale = req.body.locale;
      
      // VALIDATE INPUT
      // If one or more of the required fields is missing, return { error: 'Required field(s) missing' }.
      if (!text || !locale || locale.trim() === "") {
        return res.json({ error: 'Required field(s) missing' });
      }
      // If text is empty, return { error: 'No text to translate' }
      if (text.trim() === "") {
        return res.json({ error: 'No text to translate' });        
      }
      // If locale does not match one of the two specified locales, return { error: 'Invalid value for locale field' }.
      var locale_options = ["american-to-british", "british-to-american"];
      if (locale_options.indexOf(locale) === -1) {
        return res.json({ error: 'Invalid value for locale field' });
      }
      else {
        var result = (locale === locale_options[0]) ? translator.toBritish(text) : translator.toAmerican(text);
        // If text requires no translation, return "Everything looks good to me!" for the translation value.
        var output = {
          text: text,
          translation: (result === text) ? "Everything looks good to me!" : result
        }
        return res.json(output); 
      }

      
      // You can POST to /api/translate with a body containing text with the text to translate and locale with 
      // either american-to-british or british-to-american. 
      // The returned object should contain the submitted text and translation with the translated text.

      // The /api/translate route should handle the way time is written in American and British English. 
      // For example, ten thirty is written as "10.30" in British English and "10:30" in American English. 
      // The span element should wrap the entire time string, i.e. <span class="highlight">10:30</span>.

      // The /api/translate route should also handle the way titles/honorifics are abbreviated in American and British English. 
      // For example, Doctor Wright is abbreviated as "Dr Wright" in British English and "Dr. Wright" in American English. See /public/american-to-british-titles.js 
      // for the different titles your application should handle.

      // Wrap any translated spelling or terms with <span class="highlight">...</span> tags so they appear in green.

    });
};
