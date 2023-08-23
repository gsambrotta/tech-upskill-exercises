
// FUNCTION Declaration are hoisted and funcion expresson are not
// -----------------------------------------

makeMagic();
// fairies everywhere 

makeCake();
// TypeError: makeCake is not a function 
// The variable exists, but is undefined because no assignment has happened yet

makeNature(); 
// TypeError: makeNature is not a function 
// The variable exists, but is undefined because no assignment has happened yet

nature(); 
// ReferenceError: nature is not defined 
// This named function does not even exist yet

makeMagic()
// this is a function delcaration, so it is hoisted 
function makeMagic () { 
  console.log('fairies everywhere');
}


// the variable declaration makeCake is hoisted, but the function is not assigned to it
var makeCake = function () { 
  console.log('cupcakes coming right up');
}

// the variable declaration makeNature is hoisted, but the function is not assigned to it
var makeNature = function nature () { 
  console.log('beaches and rainforests');
}

// ========================================================



// Functions are hoisted before variables
// -----------------------------------------

console.log(x) // function x () {...}
x(); // gday world

var x = 'hello world'

function x () {
  console.log('gday world');
}

console.log(x) // hello world
x(); // TypeError: x is not a function

/*
  The compiler will hoist the function declaration first
  It will then try to hoist the variable declartion, but ignore it, as x has already been declared 
  It will then begin executing our code, at which point the x that gets logged to the console is our function 
  It will execute our function, causing 'gday world' to log to the console
  It will assign hello world to the value of x
  It will skip over our function declaration, which was already hoisted and dealt with, there's nothing to assign or execute here
  It will then console log x and the value will be hello world
  It will try to execute x, but get a TypeError
*/



// BEST PRACTICES
// 1_ Define all the var at the top of their scope.
// 2_ Cosistency in the code style: function declaration vs func expression

// Just showing how javascript hoisting works
// lala()
// const test;

lala() //lalala
test() //no function err

function lala() {
  console.log('lalala')
}

const test = lala()
