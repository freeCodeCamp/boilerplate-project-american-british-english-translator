const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    constructor(){
        this.getLocaleObjs =this.getLocaleObjs.bind(this)
        this.spliter = this.spliter.bind(this)  
        this.colorizer  = this.colorizer.bind(this)
        this.wordChecker = this.wordChecker.bind(this)
        this.translate = this.translate.bind(this)
    }

    getLocaleObjs(locale) {
        console.log('locale')
        if(locale === 'american-to-british'){
        return americanOnly
        // americanOnly + american to british spelling and titles
        }
        else{
            return britishOnly
            // britishOnly + british to american spelling and titles
        }
    }
    spliter(inputText){
        let result = inputText.split(' ')
        return result
    }
    wordChecker(splitText, arr){
        
        let dic = Object.keys(arr)
        // console.log('dic', dic)

        let newText ;

        newText = splitText.map((v,i)=>{
            if(dic.includes(v)){
                console.log('it includes ! index:', i , 'translated word', this.colorizer(arr[v]))
                //keep the index and change the aray
                return this.colorizer(arr[v])      
            }
            else return v 
        })
        console.log(newText, 'suposed to be correctly translated and colorized ')
        //todo : check for split text in arr
        return newText.reduce((prev,curr)=>{
            return prev + " " + curr
        })
        //return splitText modified with colors and new words
       


    }

    colorizer(text){
        let result = `<span style="color:green">${text}</span>`
        return result
    }

    translate(inputText, locale){
        let split = this.spliter(inputText)
        let objs = this.getLocaleObjs(locale)

        let a = this.wordChecker(split,objs)
        console.log(a,'log of wordchecker')
        return a
        // this function handles all the other functions
    }
    
}

module.exports = Translator;