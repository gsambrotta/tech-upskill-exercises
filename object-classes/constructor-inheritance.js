// Contructor
/* 
Using object literals is fine when you only need to create one object, but if you have to create more than one,
they're seriously inadequate. 
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

const mom = new Person("Anne");
mom.name;
mom.introduceSelf(); // "Hi! I'm Frankie."

const dad = new Person("Frankie");


/* 
    OOP in Javascript mimic the behaviour of classical OOP but is not the same.
    In classic OOP there is a distinction between the feature used to define a class (the class syntax itself) 
    and the feature used to instantiate an object (a constructor). 
    In JavaScript, we can and often do create objects without any separate class definition, 
    either using a function or an object literal.

    JavaScript doesn’t really have constructors, but rather constructor calls.
*/

function OrdinaryFunction(name) {
  this.name = name
  console.log("I'm just an average function");
}

var x = new OrdinaryFunction();
// "I'm just an average function"


x; // OrdinaryFunction {}
x.constructor; // ƒ OrdinaryFunction() { console.log("I'm just an average function"); }
x.hasOwnProperty('constructor'); // ??
OrdinaryFunction.prototype.hasOwnProperty('constructor'); // ??
Object.getPrototypeOf(x) === OrdinaryFunction.prototype; // ??
/*
OrdinaryFunction is just a plain old function. It’s the use of the keyword new that “hijacks” the OrdinaryFunction 
and calls it in such a way that an object is created.
OrdinaryFunction.prototype has a constructor property on it because:
The OrdinaryFunction.prototype object by default gets a public, non-enumerable property called .constructor,
and this property is a reference back to the function [OrdinaryFunction in this case] that the object is associated with.
*/

// .constructor is ‘unsafe, unreliable’
/* 
if .prototype is set to an empty object after a function is declared (essentially removing its .constructor), 
when the new keyword later is used to create a new object, calling .constructor on the new object 
will not point to the initial function as expected. 
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

// Object.create() over new
// New Keyword => when new keyword is use to link objects, any side effects will happen at the time of the linking
// Best practice: Use Object.create()

/*
  Object.create() creates a new object linked to the object we specified, 
  which gives us all the power (delegation) of the [[Prototype]] mechanism, 
  but without any of the unnecessary complication of new functions acting as classes and constructor calls, 
  confusing .prototype and .constructor references, or any of that extra stuff 
*/
function HelloWorld () {};
var z = new HelloWorld();
Object.getPrototypeOf(z) === HelloWorld.prototype; // true

var b = Object.create(HelloWorld);
Object.getPrototypeOf(b); // ƒ HelloWorld() {}
// isPrototypeOf asks does HelloWorld appear anywhere in b's prototype chain?
HelloWorld.isPrototypeOf(b); // true

// More trasnparent way of working with delegation and prototype in JS
//LESS TRANSPARENT 
var smoothie = {
  cool: function () {
    console.log("cool!")
  }
}

var mySmoothie = Object.create(smoothie);
mySmoothie.cool(); //cool!

//MORE TRANSPARENT
var smoothie = {
  cool: function () {
    console.log("cool!")
  }
}

var mySmoothie = Object.create(smoothie);
mySmoothie.doCool = function() {
  this.cool();
}; 
mySmoothie.doCool(); //cool!

// Concept to explore: Behaviour delegation 
/*
Reference book: You don't know JS - Object and Classes
In JavaScript, the [[Prototype]] mechanism links objects to other objects. 
There are no abstract mechanisms like "classes", no matter how much you try to convince yourself otherwise. 
It's like paddling a canoe upstream: you can do it, but you're choosing to go against the natural current, 
so it's obviously going to be harder to get where you're going.
*/


// THIS in classes
// As it relates to OOP, the `this` keyword generally refers to the current instance
// that is the context of any method invocation.(the class or child class where the method is written)
class Point2d { // current class istance
  constructor(x,y) { // constructor which is also a method
      // add properties to the current instance
      this.x = x;
      this.y = y;
  }
  toString() { // class method
      // access the properties from the current instance
      console.log(`(${this.x},${this.y})`);
  }
}

var point = new Point2d(3,4);
point.x;                // 3
point.y;                // 4
point.toString();       // (3,4)

/* 
In a class we can use `this` in any method to to either add or access properties on the current instance.
While `point.toString()` is running, its `this` is the same as the `point` var.
Or better said: While the `point.toString()` method is running, its `this` reference is pointing at the same object that `point` references. 

Class definitions put their methods on the class constructor's prototype object -- that's where they belong!
There's just one of each function and it's inherited (shared) by all instances. 
That's what will happen with toString() in the above snippet. It will be always connected to the Point2d class.
If we create another class from Point2d (or anothe istance of this class), it will inherit toString
but the toString will be originally the one from Point2d and is shared among all the istances of Point2d. 
*/


// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming
// https://medium.com/@amesimmons/you-dont-know-js-my-learnings-from-this-object-prototypes-9a5f63525dde
