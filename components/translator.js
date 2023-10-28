const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')
const Ut = require('../utils/utils');
const {LocaleLang} = require('../utils/enums');
/**
 * 
 */
class Translator {
    constructor(){
        this.translations = null;
    }    

    /**
     * Translate text from selected locale
     * @param {string} text The input text to translate
     * @param {[string]} words 
     * @param {LocaleLang} translateTo The current locale selected
     * @returns {string | null}
     */
    runTranslator(text, words, translateTo){
        if(Ut.isArray(words) && words.length > 0){
            const translationChecker = Translator.getTranslatorChecker(translateTo)
            const hoursTranslator = Translator.getHoursTranslator(translateTo)
            let result = text
            this.translations = words.map((val, index)=>{
                let translatedWord = hoursTranslator(val);
                if(translatedWord !== null){
                    result = Translator.setCurrentTranslation(translatedWord, result)
                    return translatedWord
                }

                translatedWord = translationChecker(val);
                if(translatedWord !== null){
                    result = Translator.setCurrentTranslation(translatedWord, result)
                    return translatedWord
                }
                else{
                    translatedWord = Translator.combineWordsToTranslate(
                        words,
                        index,
                        val,
                        translateTo
                    )
                    if(translatedWord !== null){
                        result = Translator.setCurrentTranslation(translatedWord, result)
                        return translatedWord
                    }
                    
                }
                return val
            }).filter(val=>{
                if(Ut.isObject(val)){
                    return true
                }
            })
            return result;
        }
        return null;
    }

    /**
     * Translate text from locale selected
     * @param {string} text The input text to translate
     * @param {LocaleLang} translateTo The current locale selected
     * @returns {string | null} Returns the translated text or null if invalid string
     */
    translate(text, translateTo){
        this.translations = null;
        const words = Translator.getArrayWords(text);
        if(Ut.isArray(words) && words.length > 0){
            return this.runTranslator(text, words, translateTo)
        }
        return null;
    }

    /**
     * 
     * @param {string} text The input text to translate
     * @returns 
     */
    highlightTranslations(text){
        if(Ut.isArray(this.translations)){
            return this.translations.reduce((res, obj) => {
                if(Ut.isStrNotEmpty(res)){
                    res = res.replace(obj.translated, `<span class="highlight">${obj.translated}</span>`)
                }
                return res;
            }, text)
        }
        return text
    }
    
    /**
     * HighLight translations wrapping translated words in span with "highlight" css class  
     * @param {string} text The input text to translate
     * @param {LocaleLang} translateTo The current locale selected
     * @returns {string | null} Returns the highlighted translated text or null if invalid string
     */
    translateAndHighlights(text, translateTo){
        return this.highlightTranslations(
            this.translate(text, translateTo)
        )
    }

    /**
     * Translate input text from American to British
     * @param {string} text The input text to translate
     * @returns {string | null} Returns the translated text or null if invalid string
     */
    translateToBritish(text){
        return this.translate(text, LocaleLang.AMERICAN_TO_BRITISH);
    }

    /**
     * Translate input text from British to American
     * @param {string} text The input text to translate
     * @returns {string | null} Returns the translated text or null if invalid string
     */
    translateToAmerican(text){
        return this.translate(text, LocaleLang.BRITISH_TO_AMERICAN);
    }

    // Start static Methods

    /**
     * Remove all accents from input text
     * @param {string} text The input text to translate
     * @returns {string} Return the input text without accents
     */
    static removeAccents(text){
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }

    /**
     * Remove ponctuation and special chars from input text
     * @param {string} text The input text to translate
     * @returns {string} Return the input text without ponctuation and special chars
     */
    static removePonctuation(text){
        return text.replace(/[,\/#?§%¤£^¨!$%\^&\*;{}|\\<>=_`~\[\]()]/g,"")
    }

    /**
     * Clean the input text to translate.
     * Remove ponctuation and special chars and accents
     * @param {string} text The input text to translate
     * @returns {string} Return the cleaned input text
     */
    static cleanInput(text){
        if(Ut.isStrNotEmpty(text)){
            let result = text.toLowerCase();
            result = Translator.removeAccents(result)
            result = Translator.removePonctuation(result)
            return result
        }
        return text;
    }

    /**
     * Get cleaned array words from input text
     * @param {string} text The input text to translate
     * @returns {[{string}] | null} Return an array with all cleaned words to translate 
     *  or null if empty input text
     */
    static getArrayWords(text){
        const cleaned = Translator.cleanInput(text);
        if(Ut.isStrNotEmpty(cleaned)){
            return cleaned.split(' ');
        }
        return null;
    }

    /**
     * Remove points (".") from input text
     * @param {string} text The input text to translate
     * @returns {string} Return the input text without points (".")
     */
    static removePoints(text){
        return text.replace(/[.]/g,"")
    }

    /**
     * Test if text contains American hours format
     * @param {string} word The text to test
     * @returns {boolean} Returns true if text contains American hours format
     */
    static isAmericanHours(text){
        return /^[0-9]{2}:[0-9]{2}$/.test(text)
    }

    /**
     * Test if text contains British hours format
     * @param {string} word The text to test
     * @returns {boolean} Returns true if text contains British hours format
     */
    static isBritishHours(text){
        return /^[0-9]{1,2}[.][0-9]{1,2}[.]?$/.test(text)
    }

    /**
     * Translate hours from American format to British format
     * @param {string} text The input text to translate
     * @returns {{original: {string}, translated:{string}}} Returns An object with original and translated values,
     *  or null if no translation found
     */
    static translateHoursToBritish(text){
        if(Translator.isAmericanHours(text)){
            return {original: text, translated: text.replace(':', '.')};
        }
        return null;
    }

    /**
     * Translate hours from British format to American format
     * @param {string} text The input text to translate
     * @returns {{original: {string}, translated:{string}}} Returns An object with original and translated values,
     *  or null if no translation found
     */
    static translateHoursToAmerican(text){
        if(Translator.isBritishHours(text)){
            return {original: text,translated: text.replace('.', ':')};
        }
        return null;
    }

    /**
     * Get British to American translation if exist in dictionaries.
     * @param {string} text The text to translate
     * @returns {{original: {string}, translated:{string}}} Returns An object with original and translated values,
     *  or null if no translation found
     */
    static checkAmericanTranslation(text){
        const wordWithoutPoint = Translator.removePoints(text)
        const titlesKey = Ut.getDictionaryKeyByValue(americanToBritishTitles, text)
        const spellingKey = Ut.getDictionaryKeyByValue(americanToBritishSpelling, wordWithoutPoint)
        if(titlesKey !== undefined){
            return {original: text,translated: Ut.capitalize(titlesKey)}
        }
        else if(britishOnly.hasOwnProperty(wordWithoutPoint)){
            return {original: wordWithoutPoint,translated: britishOnly[wordWithoutPoint]}
        }
        else if(spellingKey !== undefined){
            return {original: wordWithoutPoint ,translated: spellingKey}
        }
        return null;
    }

    /**
     * Get American to British translation if exist in dictionaries.
     * @param {string} text The text to translate
     * @returns {{original: {string}, translated:{string}}} Returns An object with original and translated values,
     *  or null if no translation found
     */
    static checkBritishTranslation(text){
        const wordWithoutPoint = Translator.removePoints(text)
        if(americanToBritishTitles.hasOwnProperty(text)){
            return {original: text,translated: Ut.capitalize(americanToBritishTitles[text])}
        }
        else if(americanOnly.hasOwnProperty(wordWithoutPoint)){
            return {original: wordWithoutPoint,translated: americanOnly[wordWithoutPoint]}
        }
        else if(americanToBritishSpelling.hasOwnProperty(wordWithoutPoint)){
            return {original: wordWithoutPoint ,translated: americanToBritishSpelling[wordWithoutPoint]}
        }
        return null;
    }

    /**
     * Get translator function from locale
     * @param {LocaleLang} translateTo The current locale 
     * @returns {Function} Return localized translator function
     * @throws {Error} if invalid locale is set
     */
    static getTranslatorChecker(translateTo){
        switch(translateTo){
            case LocaleLang.BRITISH_TO_AMERICAN:
                return Translator.checkAmericanTranslation
            case LocaleLang.AMERICAN_TO_BRITISH:
                return Translator.checkBritishTranslation
            default:
                throw new Error('Fatal Error: The selected lang is unavailable, only british and american can be translated.')
        }
    }

     /**
     * Get hours translator function from locale
     * @param {LocaleLang} translateTo The current locale 
     * @returns {Function} Return localized hours translator function
     * @throws {Error} if invalid locale is set
     */
     static getHoursTranslator(translateTo){
        switch(translateTo){
            case LocaleLang.BRITISH_TO_AMERICAN:
                return Translator.translateHoursToAmerican
            case LocaleLang.AMERICAN_TO_BRITISH:
                return Translator.translateHoursToBritish
            default:
                throw new Error('Fatal Error: The selected lang is unavailable, only british and american can be translated.')
        }
    }

    static getLocale(locale){
        if(locale !== undefined){
            switch(locale){
                case LocaleLang.BRITISH_TO_AMERICAN.description:
                    return LocaleLang.BRITISH_TO_AMERICAN
                case LocaleLang.AMERICAN_TO_BRITISH.description:
                    return LocaleLang.AMERICAN_TO_BRITISH
                default:
                    return null;
            }
        }
        return;
    }

    static combineWordsToTranslate(words, currentIndex, currentWord, translateTo, maxCombiationWords=3){
        const nbWords = words.length;
        const startLoop = currentIndex+1;
        let endLoop = maxCombiationWords + currentIndex;
        endLoop = (endLoop > nbWords) ? nbWords : endLoop
        let currentCombination = currentWord;
        let translatedWords = null;
        const translationChecker = Translator.getTranslatorChecker(translateTo)
        for(let i=startLoop; i<endLoop; i++){
            currentCombination += ` ${words[i]}`;
            const currentTranslation = translationChecker(currentCombination);
            if(currentTranslation !== null){
                translatedWords = currentTranslation
            }
            
        }
        return translatedWords;
    }

    static setCurrentTranslation(translatedWord, currentTranslation){
        return currentTranslation.replace(new RegExp(translatedWord.original, 'i'), translatedWord.translated);
    }

}

module.exports = Translator;