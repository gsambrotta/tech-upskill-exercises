// 6 primitive - not just objects in JS
typeof "hello"; // string

typeof 123; // number

typeof true; // boolean

typeof null; 
// object 
// null is not actually an object
// this is a bug in the language that causes typeof null to return "object"

typeof undefined;  // undefined 

typeof {}; // object 

// 9 Subtypes (complex primitives)
// These are all built-in JavaScript functions which can be used as a constructor, i.e. with the new keyword.
String
Number
Boolean
Object
Function
Array
Date
RegExp
Error

// Consturctor
// A function call with the new operator, e.g. new String(), which results in a newly constructed object of the specified subtype.


// var x = “hello” vs new String(“hello”)
// The types of these values differ depending on whether the primitve or constructed form is used

// String
var str = "hello" // string primitive
typeof str // "string"
str instanceof String // false
str instanceof Object // false

var objStr = new String("hello") // newly constructed String object
typeof objStr // "object"
objStr instanceof String // true
objStr instanceof Object // true


// Number
var num = 123 //number primitive
typeof num // "number"
num instanceof Number // false
num instanceof Object // false

var objNum = new Number(123) //newly constructed Number object
typeof objNum // "object"
objNum instanceof Number // true
objNum instanceof Object // true

// Boolean
var boo = true; // boolean primitive
typeof boo // "boolean"
boo instanceof Boolean // false
boo instanceof Object // false

var objBoo = new Boolean(true) // newly constructed Boolean object
typeof objBoo // "object"
objBoo instanceof Boolean // true
objBoo instanceof Object // true

// These are all of the same type, regardless of whether the primitive or constructed form is used.
// Object
var obj = {}//object primitive
typeof obj // "object"
obj instanceof Object // true 

var newObj = new Object() // newly constructed Object
typeof newObj // "object"
newObj instanceof Object // true

// Function
var fun = function () {} // function primitive
typeof fun // "function"
fun instanceof Function // true
fun instanceof Object // true

var newFun = new Function() // newly constructed Function object
typeof newFun // "function"
newFun instanceof Function // true
fun instanceof Object // true

// Array
var arr = [1,2,3] // array primitive
typeof arr // "object"
arr instanceof Array // true
arr instanceof Object // true

var newArr = new Array(1,2,3) // newly constructed Array object
typeof newArr // "object"
newArr instanceof Array // true
newArr instanceof Object // true

// Rexexp
var reg = /abc/; // regexp primitive
typeof reg // "object"
reg instanceof Object // true
reg instanceof RegExp // true

var regObj = new RegExp("abc"); // newly constructed RegExp object
typeof regObj // "object"
regObj instanceof Object // true
regObj instanceof RegExp // true

// Array are objects
var arr = [22, 23, 24];

arr.foo = "baz";

console.log(arr.length) // 3
console.log(arr.foo) // "baz"