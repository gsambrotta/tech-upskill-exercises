// Shallow copy
/*
    Add an array or function to a property in an object, this does not create a copy of the array or function. 
    It simply creates a reference to the array or function.
    So a shallow copy of an object would copy across any unreferenced values, e.g. {a: 22 }, 
    and copy any references to functions or arrays (but not copy the actual function or array).
*/

// Object.assign() does a shallow copy
var arr = [1,2,3,4];

var doSomething = function (arg) {
  return arg + 32
}

var obj1 = {
  a: 22,
  b: arr, // this is a reference to arr, not a copy
  c: doSomething // this is a reference to doSomething, not a copy
}

var obj2 = Object.assign({}, obj1)

console.log(obj2.a === 22) // true
console.log(obj2.b === arr) // true
console.log(obj2.c === doSomething) // true
console.log(obj1.b) // [1, 2, 3, 4]
console.log(obj1.c) // f() {}
console.log(obj1.c(6)) // 32 + 6
console.log(obj1.c(8)) // 32 + 8


// Writable, enumerable and configurable
/* 
 Object properties contain more than just their values! 
 The “property descriptor” contains other characteristics including whether or not the property 
 is writable, enumerable and configurable.

 - Writable means whether or not you can change the value
 - Enumerable means whether or not the property can be iterated over
 - Configurable means whether or not you can modify the property descriptor (so once you set configurable to false, 
you can never change any of the writable, enumerable or configurable settings again)
*/

var obj = {
    a: 2,
    secret: 'mysecret', // writable = false
    nonLoop: 'nono' // enumerable = false
}

Object.getOwnPropertyDescriptor( obj, "a") // Object 
// {value: 2, writable: true, enumerable: true, configurable: true}


/* WHAT ARE THESE METHODS? 
  Try to find info by your self and check the solution later on
*/
Object.preventExtensions() 
Object.seal()
Object.freeze()



/*
Object.preventExtensions() means no new properties can be added to your object
Object.seal() calls Object.preventExtensions(), but also sets configurable to false on every property in the object. This prevents you from adding new properties as well as reconfiguring or deleting them. You can however still modify their values.
Object.freeze() calls Object.seal(), but also sets writable to false on every property in the object. This is the highest level of immutability.
*/

// ======================
// GET and SET 
obj.a // GET
// When you call obj.a to access the property a, what is actually being performed is a get() operation on the object
// GEt will search for a property with the requested name (a in our case)
// if doesn't work keep looking for it in the prototype chain (all the object lined to the current obj)
// If cannot find it, it return undefined

obj.b = 7 // SET
// When you add a property to an object obj.b = 7 a put() operation is performed
// If the property is already present on the current object, it will check if writible is set to true. 
// If writible = true then it update the property, if is set to false, it will fail/throw error (non-stric/stric mode)

// If the property is not already present on the current object, it will start to look in the prototype chain.
// If is not found anywhere in the chain, it will be added to the current object
// If is found up in the chain, one of these three outcome can happen:

/* 1_ Writable = true 
 Be added to the current object, resulting in a “shadowed property”. This means a property with the same name 
 would exist at two or more places in the prototype chain. This scenario happens when a property with the same 
 name exists higher up the prototype chain and has writable set to true.
*/

/* 2_ Writable = false 
 No property will be added and the value won’t be set at all. 
 This scenario happens when a property with the same name is found higher up the prototype chain but 
 has writable set to false.
*/

/* 3_ Same property is found on current obj and another obj up in the chain 
   A setter will be called. No value will be added to the current object and the setter definition will not change. 
   This scenario happens when a setter is found on an object higher up the chain and has the same name as the current property.
*/

// ======================
// in vs hasOwnPropertyOf()
in // Check if a property is on the current object or up the prototype chain
hasOwnPropertyOf // Check only the current object

var obj1 = {
  a: 22
}
var obj2 = Object.create(obj1); // obj2 is now linked to obj1

console.log("a" in obj1) // ?
obj1.hasOwnProperty("a") // ?

console.log("a" in obj2) // ?
obj2.hasOwnProperty("a") // ?

// ======================
// For of Loop
// The for...of statement executes a loop that operates on a sequence of values sourced from an iterable object. 
// What is an iterable object?? 
// Tip: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of?retiredLocale=it

const array = ['a', 'b', 'c'];
for (const element of array) {
  console.log(element);
}


const iterable = "boo";
for (const value of iterable) {
  console.log(value);
}

const set = new Set([1, 1, 2, 2, 3, 3]);
for (const value of set) {
  console.log(value);
}

function foo() {
  for (const value of arguments) {
    console.log(value);
  }
}
foo(1, 2, 3);

const obj = {a: 1, b: 2, c: 3}
for (const value of obj) {
  console.log(value)
}