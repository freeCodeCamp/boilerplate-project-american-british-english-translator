const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
	
	swap(json){
	var ret = {};
	for(var key in json){
		ret[json[key]] = key;
	}
		return ret;
	}
	
	getArrayOfWordsToChange(inputArr, mode) {
		
		let workingDictionary = {}
		
		if (mode == 1) {
			//dict if american to british
			workingDictionary = {...americanToBritishSpelling, ...americanToBritishTitles}
		} else {
			//dict if brit to american
			workingDictionary = this.swap({...americanToBritishSpelling, ...americanToBritishTitles})
		}
		
		let resultArr = []
		
		for (let i = 0; i < inputArr.length; i++) {
			
			if (inputArr[i][2] == ":") {
				inputArr[i] = '<span class="highlight">' + inputArr[i][0] + inputArr[i][1] + "." + inputArr[i][3] + inputArr[i][4] + '</span>'
			} else if (inputArr[i][2] == "." && /^\d+$/.test(inputArr[i][1])) {
				inputArr[i] = '<span class="highlight">' + inputArr[i][0] + inputArr[i][1] + ":" + inputArr[i][3] + inputArr[i][4] + '</span>'
			}
			
			if (inputArr[i].toLowerCase() in workingDictionary) {
				if (inputArr[i] == inputArr[i].toLowerCase()) {
					resultArr.push('<span class="highlight">' + workingDictionary[inputArr[i].toLowerCase()] + '</span>')
				} else {
					console.log("provided un UpperCase")
					resultArr.push('<span class="highlight">' + workingDictionary[inputArr[i].toLowerCase()].charAt(0).toUpperCase() + workingDictionary[inputArr[i].toLowerCase()].slice(1) + '</span>')
				}
			} else {
				resultArr.push(inputArr[i])
			}
		}
	
		
		return resultArr.join(' ')
	}
	
	translate(inputBody) {
		
		if (!inputBody.hasOwnProperty('locale') || !inputBody.hasOwnProperty('text')) {
			return {error: 'Required field(s) missing'}
		} 
		
		if (inputBody.text.length == 0) {
			return {error: 'No text to translate'}
		}
		
		if(!(inputBody.locale == "american-to-british" || inputBody.locale == "british-to-american")) {
			return {error: 'Invalid value for locale field'}
		}
		
		let sourceText = inputBody.text.split(" ");
		
		let translateMode = 1;
		if (inputBody.locale == "british-to-american") {
			translateMode = 2;
		}
		
		let res = this.getArrayOfWordsToChange(sourceText, translateMode);
		console.log(res);
		
		if (res == inputBody.text) {
			return {
				text: inputBody.text,
				translation: 'Everything looks good to me!'
			}
		}
		
		return {
			text: inputBody.text,
			translation: res
		}
	}
}

module.exports = Translator;