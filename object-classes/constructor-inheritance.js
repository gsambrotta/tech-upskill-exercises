// Contructor
/* 
Using object literals is fine when you only need to create one object, but if you have to create more than one,
as in the previous section, they're seriously inadequate. 
We have to write out the same code for every object we create, and if we want to change some properties 
of the object - like adding a height property - then we have to remember to update every object.

We would like a way to define the "shape" of an object — the set of methods and the properties it can have 
— and then create as many objects as we like, just updating the values for the properties that are different.

Constructors, by convention, start with a capital letter and are named for the type of object they create. 
*/

function Person(name) {
    this.name = name;
    this.introduceSelf = function () {
      console.log(`Hi! I'm ${this.name}.`);
    };
}

const frankie = new Person("Frankie");
frankie.name;
frankie.introduceSelf(); // "Hi! I'm Frankie."

/* 
    OOP in Javascript mimic the behaviour of classical OOP but is not the same.
    In classic OOP there is a distinction between the feature used to define a class (the class syntax itself) 
    and the feature used to instantiate an object (a constructor). 
    In JavaScript, we can and often do create objects without any separate class definition, 
    either using a function or an object literal.

    JavaScript doesn’t really have constructors, but rather constructor calls.
*/

function OrdinaryFunction() {
    console.log("I'm just an average function");
  }
  
var x = new OrdinaryFunction();
// "I'm just an average function"

x; // OrdinaryFunction {}
x.constructor; // ƒ OrdinaryFunction() { console.log("I'm just an average function"); }
x.hasOwnProperty('constructor'); // false
OrdinaryFunction.prototype.hasOwnProperty('constructor'); // true
Object.getPrototypeOf(x) === OrdinaryFunction.prototype; // true

/*
OrdinaryFunction is just a plain old function. It’s the use of the keyword new that “hijacks” the OrdinaryFunction and calls it in such a way that an object is created.
OrdinaryFunction.prototype has a constructor property on it because:

The [OrdinaryFunction.prototype] object by default gets a public, non-enumerable property called .constructor,
and this property is a reference back to the function [OrdinaryFunction in this case] that the object is associated with.
*/

// .constructor is ‘unsafe, unreliable’
/* 
if .prototype is set to an empty object after a function is declared (essentially removing its .constructor), 
when the new keyword later is used to create a new object, calling .constructor on the new object will not point to the initial function as expected. 
It will point to the object at the top of the prototype chain, which does have a .constructor on it.
*/

function Unsafe () {};
Unsafe.prototype = {};
Unsafe.prototype.constructor; // function Object() { [native code] }
var x = new Unsafe();
x.constructor; // function Object() { [native code] }


// Inheritance and Delegation
/* 
The prototype chain seems like a natural way to implement inheritance but is different then classical OOP.
In OOP when a subclass is instantiated, a single object is created which combines properties defined in the subclass with properties defined further up the hierarchy. 
With prototyping, each level of the hierarchy is represented by a separate object, and they are linked together via the __proto__ property. 
The prototype chain's behavior is less like inheritance and more like delegation. 
Delegation is a programming pattern where an object, when asked to perform a task, can perform the task itself or ask another object (its delegate) to perform the task on its behalf.
*/

/* 
Reference book: You don't know JS - Object and Classes
In JavaScript, the [[Prototype]] mechanism links objects to other objects. 
There are no abstract mechanisms like "classes", no matter how much you try to convince yourself otherwise. 
It's like paddling a canoe upstream: you can do it, but you're choosing to go against the natural current, 
so it's obviously going to be harder to get where you're going.
*/


// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming
// https://medium.com/@amesimmons/you-dont-know-js-my-learnings-from-this-object-prototypes-9a5f63525dde
