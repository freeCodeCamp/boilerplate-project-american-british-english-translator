'use strict';

const Translator = require('../components/translator.js');
const Ut = require('../utils/utils');
module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const locale = Translator.getLocale(req.body.locale)
      const text = req.body.text
      if(locale === null){
        res.json({ error: 'Invalid value for locale field' })
      }
      else if(locale === undefined || text === undefined){
        res.json({ error: 'Required field(s) missing' })
      }
      else if(!Ut.isStrNotEmpty(text)){
        res.json({ error: 'No text to translate' })
      }
      else{
        const translation = translator.translate(text, locale);
        if(text === translation){
          res.json({text: text, translation: "Everything looks good to me!"})
        }else{
          const highlight = translator.highlightTranslations(translation)
          res.json({text: text, translation: highlight})
        }
      }
    });
};
