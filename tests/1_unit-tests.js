const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {
  suite('Translate to British English', function(){

//     test('Translate Mangoes are my favorite fruit. to British English', function(done){
//       var input = "Mangoes are my favorite fruit.";
//       var expected = "Mangoes are my <span class='highlight'>favourite</span> fruit.";
//       assert.equal(translator.toBritish(input), expected, "British English should read: " + expected);
//       done();
//     });

//     test('Translate I ate yogurt for breakfast. to British English', function(done){
//       var input = " I ate yogurt for breakfast.";
//       var expected = "I ate <span class='highlight'>yoghurt</span> for breakfast.";
//       assert.equal(translator.toBritish(input), expected, "British English should read: " + expected);
//       done();
//     });

//     test("Translate We had a party at my friend's condo. to British English", function(done){
//       var input = "We had a party at my friend's condo.";
//       var expected = "We had a party at my friend's <span class='highlight'>flat</span>.";
//       assert.equal(translator.toBritish(input), expected, "British English should read: " + expected);
//       done();
//     });

//     test('Translate Can you toss this in the trashcan for me? to British English', function(done){
//       var input = "Can you toss this in the trashcan for me?";
//       var expected = "Can you toss this in the <span class='highlight'>bin</span> for me?"
//       assert.equal(translator.toBritish(input), expected, "British English should read: " + expected);
//       done();
//     });

//     test('Translate The parking lot was full. to British English', function(done){
//       var input = "The parking lot was full.";
//       var expected = "The <span class='highlight'>car park</span> was full."
//       assert.equal(translator.toBritish(input), expected, "British English should read: " + expected);
//       done();
//     });
    
//     test('Translate Like a high tech Rube Goldberg machine. to British English', function(done){
//       var input = "Like a high tech Rube Goldberg machine.";
//       var expected = "Like a high tech <span class='highlight'>Heath Robinson device</span>.";
//       assert.equal(translator.toBritish(input), expected, "British English should read: " + expected);
//       done();
//     });

//     test('Translate To play hooky means to skip class or work. to British English', function(done){
//       var input = "To play hooky means to skip class or work.";
//       var expected = "To <span class='highlight'>bunk off</span> means to skip class or work.";
//       assert.equal(translator.toBritish(input), expected, "British English should read: " + expected);
//       done();
//     });

//     test('Translate No Mr. Bond, I expect you to die. to British English', function(done){
//       var input = "No Mr. Bond, I expect you to die.";
//       var expected = "No <span class='highlight'>Mr</span> Bond, I expect you to die.";
//       assert.equal(translator.toBritish(input), expected, "British English should read: " + expected);
//       done();
//     });

//     test('Translate Dr. Grosh will see you now. to British English', function(done){
//       var input = "Dr. Grosh will see you now.";
//       var expected = "<span class='highlight'>Dr</span> Grosh will see you now.";
//       assert.equal(translator.toBritish(input), expected, "British English should read: " + expected);
//       done();
//     });

//     test('Translate Lunch is at 12:15 today. to British English', function(done){
//       var input = "Lunch is at 12:15 today.";
//       var expected = "Lunch is at <span class='highlight'>12.15</span> today.";
//       assert.equal(translator.toBritish(input), expected, "British English should read: " + expected);
//       done();
//     });
  });
  
  suite('Translate to American English', function(){
//     // Translate We watched the footie match for a while. to American English
//     test('Translate We watched the footie match for a while.', function(done){
//       var input = "We watched the footie match for a while.";
//       var expected = "We watched the <span class='highlight'>soccer</span> match for a while.";
//       assert.equal(translator.toAmerican(input), expected, "American English should read: " + expected);
//       done();
//     });
    
//     // Translate Paracetamol takes up to an hour to work. to American English
//     test('Translate Paracetamol takes up to an hour to work.', function(done){
//       var input = "Paracetamol takes up to an hour to work.";
//       var expected = "<span class='highlight'>Tylenol</span> takes up to an hour to work.";
//       assert.equal(translator.toAmerican(input), expected, "American English should read: " + expected);
//       done();
//     });
//     // Translate First, caramelise the onions. to American English
//     test('Translate First, caramelise the onions.', function(done){
//       var input = "First, caramelise the onions.";
//       var expected = "First, <span class='highlight'>caramelize</span> the onions.";
//       assert.equal(translator.toAmerican(input), expected, "American English should read: " + expected);
//       done();
//     });
//     // Translate I spent the bank holiday at the funfair. to American English
//     test('Translate I spent the bank holiday at the funfair.', function(done){
//       var input = "I spent the bank holiday at the funfair.";
//       var expected = "I spent the <span class='highlight'>public holiday</span> at the <span class='highlight'>carnival</span>.";
//       assert.equal(translator.toAmerican(input), expected, "American English should read: " + expected);
//       done();
//     });
    
    
//     // Translate I had a bicky then went to the chippy. to American English
//     test('Translate I had a bicky then went to the chippy.', function(done){
//       var input = "I had a bicky then went to the chippy.";
//       var expected = "I had a <span class='highlight'>cookie</span> then went to the <span class='highlight'>fish-and-chip shop</span>.";
//       assert.equal(translator.toAmerican(input), expected, "American English should read: " + expected);
//       done();
//     });
//     // Translate I've just got bits and bobs in my bum bag. to American English
//     test("Translate I've just got bits and bobs in my bum bag.", function(done){
//       var input = "I've just got bits and bobs in my bum bag.";
//       var expected = "I've just got <span class='highlight'>odds and ends</span> in my <span class='highlight'>fanny pack</span>.";
//       assert.equal(translator.toAmerican(input), expected, "American English should read: " + expected);
//       done();
//     });
    
    // Translate The car boot sale at Boxted Airfield was called off. to American English
    // test("Translate The car boot sale at Boxted Airfield was called off.", function(done){
    //   var input = "The car boot sale at Boxted Airfield was called off.";
    //   var expected = "The <span class='highlight'>swap meet</span> at Boxted Airfield was called off.";
    //   assert.equal(translator.toAmerican(input), expected, "American English should read: " + expected);
    //   done();
    // });
    
    // Translate Have you met Mrs Kalyani? to American English
    // test("Translate Have you met Mrs Kalyani?", function(done){
    //   var input = "Have you met Mrs Kalyani?";
    //   var expected = "Have you met <span class='highlight'>Mrs.</span> Kalyani?";
    //   assert.equal(translator.toAmerican(input), expected, "American English should read: " + expected);
    //   done();
    // });
    // Translate Prof Joyner of King's College, London. to American English
    test("Translate Prof Joyner of King's College, London.", function(done){
      var input = "Prof Joyner of King's College, London.";
      var expected = "<span class='highlight'>Prof.</span> Joyner of King's College, London.";
      assert.equal(translator.toAmerican(input), expected, "American English should read: " + expected);
      done();
    });
    
    // Translate Tea time is usually around 4 or 4.30. to American English
    // test("Translate Tea time is usually around 4 or 4.30. to American English", function(done){
    //   var input = "Tea time is usually around 4 or 4.30.";
    //   var expected = "Tea time is usually around 4 or <span class='highlight'>4:30</span>.";
    //   assert.equal(translator.toAmerican(input), expected, "American English should read: " + expected);
    //   done();
    // });
        

  });
  
  suite('Check for highlight', function(){
    
  });
  
  

// Highlight translation in Mangoes are my favorite fruit.
// Highlight translation in I ate yogurt for breakfast.
// Highlight translation in We watched the footie match for a while.
// Highlight translation in Paracetamol takes up to an hour to work.
});
