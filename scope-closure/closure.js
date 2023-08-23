/*
Closure is one of the most important language characteristics ever invented in programming—it 
underlies major programming paradigms, including Functional Programming (FP), modules, 
and even a bit of class-oriented design. 
Getting comfortable with closure is required for mastering JS and 
effectively leveraging many important design patterns throughout your code.
*/


// Creating a closure
// GLOBAL SCOPE! Nr.1
function fairy () {
    // SCOPE Nr.2
    var numberOfFairies = 22; // encapsulate var so is not polluting the global scope
  
    function garden () { // this function now has a closure over the scope of fairy (and any other scopes it has access to)
      // SCOPE Nr.3
      console.log('There are ' + numberOfFairies + ' fairies in the garden');
    }
    
    garden(); // executing the function in the same scope where the function is defined.
  }
  
  fairy() // There are 22 fairies in the garden


  // Exercising a closure
  // GLOBAL SCOPE Nr.1
  function fairy () {
    // SCOPE Nr.2
    var numberOfFairies = 22;
  
    return function garden () { // this function now has a closure over the scope of fairy (and any other scopes it has access to)
      //SCOPE Nr.3
      console.log('There are ' + numberOfFairies + ' fairies in the garden');
    }
  }
  
  var gardenMagic = fairy()
  // now we have access to garden, outside of the scope in which it was created
  
  gardenMagic(); 
  // gardenMagic is invoked, which actually invokes garden
  // garden is executed outside of the scope in which it was created
  // garden is able to remember and access its lexical scope
  // garden successfully logs out 'There are 22 fairies in the garden'


  /*
  Closure is when a function is able to remember and access its lexical scope 
  even when that function is executing outside its lexical scope.

  For variables we need to use over time, instead of placing them in larger outer scopes, 
  we can encapsulate (more narrowly scope) them but still preserve access from inside functions, 
  for broader use. Functions remember these referenced scoped variables via closure.

  Closure happen JUST in funcion. Not in object or class. Because must be invoke.


  A callback that accesses variables outside its own scope... guess what!? That's closure.
  */

  // Other example
  function adder(num1) {
    return function addTo(num2){
        return num1 + num2;
    };
}

var add10To = adder(10);
var add42To = adder(42);

add10To(15);    // ?? what is the outcome and why?
add42To(9);     // ?? what is the outcome and why?

/*
Each instance of the inner addTo(..) function is closing over its own num1 variable 
(with values 10 and 42, respectively), so those num1's don't go away just because adder(..) finishes. 
When we later invoke one of those inner addTo(..) instances, such as the add10To(15) call, 
its closed-over num1 variable still exists and still holds the original 10 value. 
The operation is thus able to perform 10 + 15 and return the answer 25.
*/

// REAL LIFE EXAMPLE
// Imagine you have a button on a page that when clicked, should retrieve and send some data via an Ajax request
// Without using closure:

var APIendpoints = {
  studentIDs:
      "https://some.api/register-students",
  // ..
};

var data = {
  studentIDs: [ 14, 73, 112, 6 ],
  // ..
};

function makeRequest(evt) {
  var btn = evt.target;
  var recordKind = btn.dataset.kind;
  ajax(
      APIendpoints[recordKind],
      data[recordKind]
  );
}

// <button data-kind="studentIDs">
//    Register Students
// </button>
btn.addEventListener("click",makeRequest);

// This works OK, but it's unfortunate (inefficient, more confusing) that the event handler has to read a DOM attribute each time it's fired. 
// Why couldn't an event handler remember this value?

// With closure
var APIendpoints = {
  studentIDs:
      "https://some.api/register-students",
  // ..
};

var data = {
  studentIDs: [ 14, 73, 112, 6 ],
  // ..
};

function setupButtonHandler(btn) {
  var recordKind = btn.dataset.kind; //data-kind attribute is retrieved once and assigned to the recordKind variable at initial setup.
 
  btn.addEventListener(
      "click",
      function makeRequest(evt){
          ajax(
              APIendpoints[recordKind],
              data[recordKind]
          );
      }
  );
}

// <button data-kind="studentIDs">
//    Register Students
// </button>

setupButtonHandler(btn);

/* 
By placing recordKind inside setupButtonHandler(..), we limit the scope exposure of that variable 
to a more appropriate subset of the program; storing it globally would have been worse for code organization 
and readability. Closure lets the inner makeRequest() function instance remember this variable and access 
whenever it's needed.
*/
// Even better version:
function setupButtonHandler(btn) {
  var recordKind = btn.dataset.kind;
  var requestURL = APIendpoints[recordKind];
  var requestData = data[recordKind];

  btn.addEventListener(
      "click",
      function makeRequest(evt){
          ajax(requestURL,requestData);
      }
  );
}


// To know more: https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md