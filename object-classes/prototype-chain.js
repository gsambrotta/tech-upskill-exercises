/* 
 Prototypes are a powerful and very flexible feature of JavaScript, 
 making it possible to reuse code and combine objects.
*/


/*
 PROTOTYPE CHAIN
 Official JS specification notation is [[Prototype]]
 [[Prototype]] !== prototype
 The [[Prototype]] is an internal linkage that an object gets by default when its created, pointing to another object.
 Prototypes are the mechanism by which JavaScript objects inherit features from one another.
 This link between the two objects is hidden. But has a huge impact on how an object behaves.
 Why Chain? because one obj is linked or chained to another, and another, and another, ...
 There is an end or top of this chain.
*/

myObj = {
    favoriteNumber: 42
};
// This create an obj which is automatically linked to an automatically built-in `Object.prototype` object.
// This Object.prototype is the one that give some out-of-the-box methods like:
myObj.toString();                     
myObj.hasOwnProperty("favoriteNumber");

// How can we access to the .toString() property? Because is in the Object.prototype which is chained to the myObj. 
// Js will search myObj for the property toString. When it does not find it, it will go up the chain and search for it
// on its linked object which in this case is Object.prototype. 
// Object.prototype has toString method so we can use it.
// This ability to look up the chain is commonly referred to as "inheritance", or more specifically, "prototypal inheritance".

// Exercise
// Which other property come out of the box with the `Object.prototype`? 
// Which other property come out of the box with the `Object` object? 


/* WARNING!! prototype vs __proto__
    The property of an object that points to its prototype is not called prototype. 
    Its name is not standard, but in practice all browsers use __proto__. 
    The standard way to access an object's prototype is the Object.getPrototypeOf() method.
    Try to do: 
*/
console.log(Object.getPrototypeOf(myObj)) // Do you see __proto__?

/* END OF THE CHAIN
    When the chain end? When we reach the last linked object. 
    Usually is Object.prototype. This has the __proto__ property and is null
    Try to console log Object.prototype
    or console.log(Object.getPrototypeOf(myObj))
    and follow the __proto__ link
*/


// BEST PRACTICE
// .hasOwnProperty() vs Object.hasOwn()
// Before ES22 - to check weather an obj as a property and it owns it.
myObj.hasOwnProperty("favoriteNumber"); // part of the prototype. hasOwnProperty is included in the [[Prototype]] chain
// With ES22
Object.hasOwn(myObj,"favoriteNumber"); // defined as a static utility of Object.prototype

// Changing [[Prototype]] of an Object
// Try this
// What is the prototype of myDate?
// And what is the prototype of myDate prototype?
const myDate = new Date();
let object = myDate;

do {
  object = Object.getPrototypeOf(object);
  console.log(object);
} while (object);

// We can also change the prototype with Object.create(..) 
// Try:
myObj2 = Object.create(myObj); 
// What are the prototype of myObj and myObj2?

// ESERCISE
// What happens if you define a property in an object, when a property with the same name is defined in the object's prototype? 
const theDate = new Date(1995, 11, 17);
console.log(theDate.getYear()); // 95
theDate.getYear = function () {
  console.log("something else!");
};

// [[Prototype]] vs prototype
/* 
    Object is the Object(..) function; 
    by default, all functions (which are themselves objects!) 
    have such a prototype property on them, pointing at an object.
    Try this:
*/
console.log(Object)
console.log(Object.prototype)
console.log(Object.__proto__)
// The `prototype` property on a function doesn't define any linkage that the function itself experiences. 
// The `prototype` property on a function refers to an object. This object should be linked TO any other object. This other object is created when calling that function with the new keyword.
// In other words, when I create myObj3 with the new keyword, this myObj3 get an internal prototype, given by Object which is a function which has the `prototype`
let myObj3 = new Object();
// the built-in object named Object.prototype is used as the internal [[Prototype]] value for the new object we create and name myObj3.
// newObj3 has a Object.prototype thanks to the "new Object()"

// SUM UP:
// "Prototpye" is a property of a function. It does not link or show link to anything else. 
// Is just used to link properties to an obj when created with the `new` keyword
// [[Prototype]] is an internal linkage that an object gets by default when its created, pointing to another object
// __proto__ is an object's property that link to its own prototype.

// Source:
// https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch2.md
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes