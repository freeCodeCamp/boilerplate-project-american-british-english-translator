const chai = require('chai');
const assert = chai.assert;
const Ut = require('../utils/utils');

suite('Utils unit tests', ()=>{
    test('test toFixedFloat method', () => {
        assert.strictEqual(Ut.toFixedFloat(1.05235646546), 1.05, 'toFixedFloat(1.05235646546) must be equal to "1.05"')
        assert.strictEqual(Ut.toFixedFloat(1.05235646546, 3), 1.052, 'toFixedFloat(1.05235646546, 3) must be equal to "1.052"')
        assert.strictEqual(Ut.toFixedFloat(0), 0, 'toFixedFloat(0) must be equal to "0"')
        assert.strictEqual(Ut.toFixedFloat(1), 1, 'toFixedFloat(1) must be equal to "1"')
        assert.strictEqual(Ut.toFixedFloat('hello'), null, 'toFixedFloat("hello") must be equal to null')
        assert.strictEqual(Ut.toFixedFloat('hello', 2, 0), 0, 'toFixedFloat("hello", 2, 0) must be equal to "0"')
    })
    
    test('test isFunction method', () => {
        const funcTest = ()=>{return true;}
        assert.isTrue(Ut.isFunction(funcTest), 'Valid function must return true')
        assert.isFalse(Ut.isFunction({}), 'An object must return false')
        assert.isFalse(Ut.isFunction({a: 1}), 'An object must return false')
        assert.isFalse(Ut.isFunction("hello"), 'A string must return false')
        assert.isFalse(Ut.isFunction(['a']), 'An array must return false')
        assert.isFalse(Ut.isFunction(2), 'A number must return false')
    })

    test('test isObject method', () => {
        assert.isTrue(Ut.isObject({}), 'An object must return true')
        assert.isTrue(Ut.isObject({a: 1}), 'An object must return true')
        assert.isFalse(Ut.isObject("hello"), 'A string must return false')
        assert.isFalse(Ut.isObject(['a']), 'An array must return false')
        assert.isFalse(Ut.isObject(2), 'A number must return false')
    })
    
    test('test isArray method', () => {
        assert.isTrue(Ut.isArray([]), 'An empty array must return true')
        assert.isTrue(Ut.isArray(['a']), 'An array must return true')
        assert.isFalse(Ut.isArray("hello"), 'A string must return false')
        assert.isFalse(Ut.isArray({a: 1}), 'An object must return false')
        assert.isFalse(Ut.isArray(2), 'A number must return false')
    })
    
    test('test isNumber method', () => {
        assert.isTrue(Ut.isNumber(10), 'A positive integer must return true')
        assert.isTrue(Ut.isNumber(0), 'A zero value must return true')
        assert.isTrue(Ut.isNumber(0.1), 'A float number must return true')
        assert.isTrue(Ut.isNumber([0.1]), 'An array with sigle number item must return true')
        assert.isTrue(Ut.isNumber(-10), 'A negative integer must return true')
        assert.isFalse(Ut.isNumber("hello"), 'A string must return false')
        assert.isFalse(Ut.isNumber({a: 1}), 'An object must return false')
        assert.isFalse(Ut.isNumber([2, 3]), 'An array must return false')
    })
    
    
    test('test isPositiveNumber method', () => {
        assert.isTrue(Ut.isPositiveNumber(1), 'A positive integer must return true')
        assert.isTrue(Ut.isPositiveNumber(0.1), 'A positive float number must return true')
        assert.isTrue(Ut.isPositiveNumber([0.1]), 'An array with sigle positive number item must return true')
        assert.isFalse(Ut.isPositiveNumber(0), 'A zero value must return false')
        assert.isFalse(Ut.isPositiveNumber(-10), 'A negative integer must return false')
        assert.isFalse(Ut.isPositiveNumber("hello"), 'A string must return false')
        assert.isFalse(Ut.isPositiveNumber({a: 1}), 'An object must return false')
        assert.isFalse(Ut.isPositiveNumber([2, 3]), 'An array must return false')
    })
    
    test('test isStr method', () => {
        assert.isTrue(Ut.isStr("1"), 'A number string must return true')
        assert.isTrue(Ut.isStr("Hello world"), 'A not empty string must return true')
        assert.isTrue(Ut.isStr(`hello`), 'A not empty string must return true')
        assert.isTrue(Ut.isStr(``), 'An empty string must return true')
        assert.isFalse(Ut.isStr(0), 'A number must return false')
        assert.isFalse(Ut.isStr(-10), 'A number must return false')
        assert.isFalse(Ut.isStr({a: 1}), 'An object must return false')
        assert.isFalse(Ut.isStr([2, 3]), 'An array must return false')
    })
    test('test isStrNotEmpty method', () => {
        assert.isTrue(Ut.isStrNotEmpty("1"), 'A number string must return true')
        assert.isTrue(Ut.isStrNotEmpty("Hello world"), 'A not empty string must return true')
        assert.isTrue(Ut.isStrNotEmpty(`hello`), 'A not empty string must return true')
        assert.isFalse(Ut.isStrNotEmpty(``), 'An empty string must return false')
        assert.isFalse(Ut.isStrNotEmpty(0), 'A number must return false')
        assert.isFalse(Ut.isStrNotEmpty(-10), 'A number must return false')
        assert.isFalse(Ut.isStrNotEmpty({a: 1}), 'An object must return false')
        assert.isFalse(Ut.isStrNotEmpty([2, 3]), 'An array must return false')
    })
    
    test('test capitalize method', () => {
        assert.strictEqual(Ut.capitalize("1"), "1")
        assert.strictEqual(Ut.capitalize("hello world"), "Hello World")
        assert.strictEqual(Ut.capitalize(`hello`), `Hello`)
        assert.strictEqual(Ut.capitalize(``), null)
        assert.strictEqual(Ut.capitalize(0, ""), "")
        assert.isFalse(Ut.capitalize(-10, false))
    })
    
    test('test isKey method', () => {
        assert.isTrue(Ut.isKey("h1"), 'A valid string "h1" must return true')
        assert.isTrue(Ut.isKey("Hello_world"), 'A valid string "Hello_world" must return true')
        assert.isTrue(Ut.isKey(`Hello_W0r_ld`), 'A valid string "Hello_W0r_ld" must return true')
        assert.isTrue(Ut.isKey(`hello_world_a1`), 'A valid string "hello_world_a1" must return true')
        assert.isFalse(Ut.isKey(`_hello_world`), 'An invalid string "_hello_world" must return false')
        assert.isFalse(Ut.isKey(`hello_world_`), 'An invalid string "hello_world_" must return false')
        assert.isFalse(Ut.isKey(0), 'A number must return false')
        assert.isFalse(Ut.isKey(-10), 'A number must return false')
        assert.isFalse(Ut.isKey({a: 1}), 'An object must return false')
        assert.isFalse(Ut.isKey([2, 3]), 'An array must return false')
    })
    
    test('test isAttrKey method', () => {
        assert.isTrue(Ut.isAttrKey("h1"), 'A valid string "h1" must return true')
        assert.isTrue(Ut.isAttrKey("Hello-world"), 'A valid string "Hello-world" must return true')
        assert.isTrue(Ut.isAttrKey(`Hello_World`), 'A valid string "Hello_World" must return true')
        assert.isTrue(Ut.isAttrKey(`hello_world_a1`), 'A valid string "hello_world_a1" must return true')
        assert.isFalse(Ut.isAttrKey(`_hello_world`), 'An invalid string "_hello_world" must return false')
        assert.isFalse(Ut.isAttrKey(`hello_world_`), 'An invalid string "hello_world_" must return false')
        assert.isFalse(Ut.isAttrKey(0), 'A number must return false')
        assert.isFalse(Ut.isAttrKey(-10), 'A number must return false')
        assert.isFalse(Ut.isAttrKey({a: 1}), 'An object must return false')
        assert.isFalse(Ut.isAttrKey([2, 3]), 'An array must return false')
    })
    
    test('test isValidRegex method', () => {
        assert.isTrue(Ut.isValidRegex(/[0-9]/), 'A valid regex "/[0-9]/" must return true')
        assert.isTrue(Ut.isValidRegex('/[0-9]/'), 'A valid regex /[0-9]/ must return true')
        assert.isTrue(Ut.isValidRegex('hello world'), 'A valid regex "hello world" must return true')
    })
    
})