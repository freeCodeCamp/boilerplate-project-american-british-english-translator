const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  constructor() {
    // Array of American Words
    this.britishKeys = Object.keys(britishOnly);
    this.britishValues = [...Object.values(americanToBritishSpelling), ...Object.values(americanToBritishSpelling), ...Object.values(americanToBritishTitles)];
    
    // Matches all and only numbers
    this.num = /^\d+$/;
    // Tests for strict punctuation match (word ONLY contains punctuation).  Example:
    // var test1 = "He's"; var test 2 = "''";
    // punctuation.test(test1) = false, test2 = true;
    this.punctuation = /^[^\s\w]+$/g;
  }
  
  // HELPER FUNCTIONS
  
  // Converts input text to an array of words and punctuations
  wordsToArr(text) {
    // Splits all words, apostrophes, and hyphens together, then punctuations separately. Example:
    // Text = He's provided Dr. Bond pre-authorized payment at 12:10, what should we do?
    // text.match(regex) = ["He's", "provided", "Dr", ".", "Bond", "pre-authorized", "payment", "at", "12", ":", "10", ",", "what", "should", "we", "do", "?"]
    var regex =  /([\w'-]+)|[^\s\w]/g; 
    return text.match(regex);
  }
  
  // Gets the American version of the word given a British term
  getKeyByValue(value, obj) {
    for (var key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }    
  };

  // Loop through output to combine punctuation with prior word to avoid space in between
  formatOutput(arr) {
    arr.forEach((e, i) => {
      console.log("e is " + e + " at index " + i);
      console.log("is e a punctuation? " + this.punctuation.test(e));
      if (this.punctuation.test(e)) {
        console.log("arr[i - 1] is " + arr[i - 1]);
        console.log("arr[i - 1] + e is " + e);
        arr.splice(i - 1, 2, arr[i - 1] + e);
      }
      console.log("Array is now: " + JSON.stringify(arr));
    });
    console.log('Resulting text is: ' + arr.join(' '));
    return arr.join(' ');
  }
  
  // TRANSLATION FUNCTIONS
  toBritish(text) {
    // console.log("toBritish: Text to be translated from American to British is: " + text);
    var arr = this.wordsToArr(text);
    var output = [];
    var output_length = 0;
    
    arr.forEach((word, index) => {
      // console.log("We are currently at word: " + word);
      var lastWordIndex = output_length - 1;
      
      if (this.punctuation.test(word)) {
        
        // If it's a period and combined with the preceding word you can find it in the "american-to-british-titles.js", translate and replace previous word with new combined word
        if (word === ".") {
          var temp = arr[index - 1].toLowerCase() + word;  // Combine the period with previous word to check against titles
          
          if (temp in americanToBritishTitles) {
            var translated = americanToBritishTitles[temp];
            translated = translated[0].toUpperCase() + translated.substring(1); // Convert first character to uppercase
            output.splice(lastWordIndex, 1, "<span class='highlight'>" + translated + "</span>"); //Replace previous word with the new combined translated word
          }
          //Otherwise, add as is
          else {
            output.push(word);
            output_length++;
          }
        }
        // If it's a colon, and is preceded and followed by a number, convert colon to period, add to preceding and subsequent number, and replace previous word with new combined word
        else if (word === ":" && this.num.test(arr[index - 1]) && this.num.test(arr[index + 1])) {
          output.splice(lastWordIndex, 1, "<span class='highlight'>" + arr[index - 1] + "." + arr[index + 1]+"</span>");
        }           
        //For all other punctuation, add as is
        else { 
            output.push(word);
            output_length++;
        }
      }
      
      // NOT A PUNCTUATION - includes RIP'd, off-the-rack, and normal words
      // Translate the words

      else if (arr[index - 1] !== ":") { // This condition skips numbers from times which are already handled above
        
        var translated = word; // Default is that the word needs no translation
        // console.log("Currently checking word " + word);
          
        if (word.toLowerCase() in americanToBritishSpelling) {
          translated = americanToBritishSpelling[word.toLowerCase()];
          output.push("<span class='highlight'>" + translated + "</span>");
          output_length++;
        }
        else if (word.toLowerCase() in americanOnly) {
            translated = americanOnly[word.toLowerCase()];
            output.push("<span class='highlight'>" + translated + "</span>");
            output_length++;
        }             
        else { //The word was not found in either dictionary with any combination of other words
          output.push(word);
          output_length++;
        }
      }
    }); // End of forEach loop
    
    // console.log("toBritish: After going through every word - output is currently: " + output); 
    
    // Go through the output again and check combination for 2 words and 3 words
    for (var a = 2; a >= 1; a--){
      for (var x = 0; x < output.length - a; x++) {
        var temp = output.slice(x, x + a + 1).join(" ");
        var translated;
        // console.log("Currently checking word: " + temp);

        if (temp.toLowerCase() in americanToBritishSpelling) {
          translated = americanToBritishSpelling[temp.toLowerCase()];
          output.splice(x, a + 1, "<span class='highlight'>" + translated + "</span>"); //Replace those two words with 
        }
        else if (temp.toLowerCase() in americanOnly) {
            translated = americanOnly[temp.toLowerCase()];
            output.splice(x, a + 1, "<span class='highlight'>" + translated + "</span>");
        }                   
      }
      // console.log("toBritish: After going through every " + a + " words - output is currently: " + output); 
    }
    
    return this.formatOutput(output);
  }
  
  
  toAmerican(text) {
    // console.log("toAmerican: Text to be translated from British to American is: " + text);
    var arr = this.wordsToArr(text);
    var output = [];
    var output_length = 0;
    
    arr.forEach((word, index) => {
      // console.log("We are currently at word: " + word);
      var lastWordIndex = output_length - 1;
      
      if (this.punctuation.test(word)) {  
        // If it's a period, and is preceded and followed by a number, convert period to colon, add to preceding and subsequent number, and replace previous word with new combined word
        if (word === "." && this.num.test(arr[index - 1]) && this.num.test(arr[index + 1])) {  
            output.splice(lastWordIndex, 1, "<span class='highlight'>" + arr[index - 1] + ":" + arr[index + 1]+"</span>");
        }        
        //For all other punctuation, add as is
        else { 
            output.push(word);
            output_length++;
        }
      }
      
      // NOT A PUNCTUATION - includes RIP'd, off-the-rack, and normal words
      // Translate the words
      
      else if (arr[index - 1] !== ".") { // This condition skips numbers from times (clock) which are already handled above
        var translated; // Default is that the word needs no translation
        var temp = word.toLowerCase();
        // console.log("Currently checking word " + temp);
        
        // Check for titles - UPDATE THIS
        // If it's a period and combined with the preceding word you can find it in the "american-to-british-titles.js", translate and replace previous word with new combined word
        if(Object.values(americanToBritishTitles).indexOf(temp) > -1) {
          translated = this.getKeyByValue(temp, americanToBritishTitles);
          translated = translated[0].toUpperCase() + translated.slice(1);
          output.push("<span class='highlight'>" + translated + "</span>");
          output_length++;
        }
        else if (Object.values(americanToBritishSpelling).indexOf(temp) > -1) {
          translated = this.getKeyByValue(temp, americanToBritishSpelling);
          output.push("<span class='highlight'>" + translated + "</span>");
          output_length++;
        }
        else if (temp in britishOnly) {
            translated = britishOnly[temp];
            output.push("<span class='highlight'>" + translated + "</span>");
            output_length++;
        }             
        else { //The word was not found in either dictionary with any combination of other words
          output.push(word);
          output_length++;
        }
      }
    }); // End of forEach loop
    
    // console.log("toAmerican: After going through every word - output is currently: " + output); 
    
    // Go through the output again and check combination for 3 words then 2 words
    for (var a = 2; a >= 1; a--){
      for (var x = 0; x < output.length - a; x++) {
        var temp = output.slice(x, x + a + 1).join(" ");
        var translated;

        if (Object.values(americanToBritishSpelling).indexOf(temp.toLowerCase()) > -1) {
          translated = this.getKeyByValue(temp.toLowerCase(), americanToBritishSpelling);
          output.splice(x, a + 1, "<span class='highlight'>" + translated + "</span>"); //Replace those two words with 
        }
        else if (temp.toLowerCase() in britishOnly) {
            translated = britishOnly[temp.toLowerCase()];
            output.splice(x, a + 1, "<span class='highlight'>" + translated + "</span>");
        }                   
      }
      console.log("toAmerican: After going through every " + a + " words - output is currently: \n");
      console.log(output); 
    }
    
    return this.formatOutput(output);
  }
}

module.exports = Translator;