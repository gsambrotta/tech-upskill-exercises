
/*
Explanation:
Hoisting move variable declaration on top of their scope. Just the delcaration tho.
It does not initialize the variable, which means they have no value assigned to it.

var number;
console.log(number) 
var number = 10
console.log(number) // 10

The difference between var and let/const is that var is hoisted with default initialize value
of "undefined" and let/const are not.
Porgram knows they exist but don't let us access them.

var number = undefined;
console.log(number) 
var number = 10
console.log(number) // 10

let number; (not accessible to developer)
console.log(number) 
number = 10
console.log(number) // 10

if we change initial example with var:
function saySomething() {
    var greeting = "Hello";
    {
        greeting = "Howdy"; 
        var greeting = "Hi";
        console.log(greeting);
    }
}

saySomething();
we print: 'Hi'

With let greeting it give error.
Because there is a greeting variable in that scope,but is not accessible.
If we didn't have,it will take the outer scope

This is why JS programs are parsed before any execution begins.
*/

/* 
Scope Bubble: https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md
*/

/*
CONCLUSION and LEXICAL SCOPE:
JS's scope is determined at compile time; This is call LEXICAL SCOPE
Lexical scope is scope that is defined by the JavaScript author at the time of writing the code. 
RUNIME: moment when the code get executed by JS engine (browser)
COMPILED TIME: when code get parsed

If you place a variable declaration inside a function, the compiler handles this declaration 
as it's parsing the function, and associates that declaration with the function's scope. 
If a variable is block-scope declared (let / const), then it's associated with the 
nearest enclosing { .. } block, rather than its enclosing function (as with var).
*/

/* 
Further reading: https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md
*/

/*
Reflection time:

Why is let and const better then var? What the lexical scope has to do with it?
What is a variable Lookup?
Why is let and const better then var with shadowing?
what is the difference between function declaration and function expression while talking about hoisting?
*/

// EXERCISE:
// Which variable is function-scoped and which one is block-scoped?
// Where yu will have ReferenceError and why? And where you will see the console log as expected?

// var

var happyDays = function(day){
  if(day === 'sunny') {
    var a = 'apples'; 
  }
  
  console.log(a); 

happyDays('sunny')

//let

var happyDays = function(day){
  if(day === 'sunny') {
    let b = 'bananas'; 
  }
  
  console.log(b); 
}

happyDays('sunny')

//const

var happyDays = function(day){
  if(day === 'sunny') {
    const c = 'cherries'; 
  }
  
  console.log(c); 
}

happyDays('sunny')

//catch

try {
  var d = 'doggies'; 
  throw 'my exception';
}
catch (err) {
  console.log('error:', err); 
}

console.log(d); 
console.log(err);


