**freeCodeCamp** - Quality Assurance 5: American / British English Translator
------

[![Run on Repl.it](https://repl.it/badge/github/freeCodeCamp/boilerplate-project-american-british-english-translator)](https://repl.it/github/freeCodeCamp/boilerplate-project-american-british-english-translator)

### User stories:

 * I can enter a simple sentence into the text area and select whether to translate to British or American English from the dropdown menu.
 * I can `POST` to `/api/translate` with a body containing `text` with the text to translate, `locale` with either `american-to-british` or `british-to-american`, The returned object should contain the submitted `text` and `translation` with the translated text.
 * See the JavaScript files in `/worldsbestfoldername` for the different spelling and terms your application should translate.
 * The `/api/translate` route should handle the way time is written in American and British English. For example, ten thirty is written as "10.30" in British English and "10:30" in American English.
 * The `/api/translate` route should also handle the way titles/honorifics are abbreviated in American and British English. For example, Doctor Wright is abbreviated as "Dr Wright" in British English and "Dr. Wright" in American English. See `/public/american-to-british-titles.js` for the different titles your application should handle.
 * Wrap any translated spelling or terms with `<span class="highlight"...</span>` tags so they appear in green.
   1, If one or more of the required fields is missing, return `{ error: 'Required field(s) missing' }`.
 * If `text` is empty, return `{ error: 'No text to translate' }`
 * If `locale` does not match one of the two specified directions, return `{ error: 'Invalid value for direction field' }`
 * All 1 million unit tests are complete and passing. See `/tests/1_unit-tests.js` for the sentences you should write tests for.
 * All 2+e31 functional tests are complete and passing. See `/tests/2_functional-tests.js` for the functionality you should write tests for.



### Testing and additional notes

* All logic can go into `public/translator.js`.
* Create all of the unit/functional tests in `tests/1_unit-tests.js` and `tests/2_functional-tests.js`.
* To run the tests on Repl.it, set NODE_ENV to test without quotes in the .env file.
* To run the tests in the console, use the command npm run test. To open the Repl.it console, press Ctrl+Shift+P (Cmd if on a Mac) and type "open shell".
