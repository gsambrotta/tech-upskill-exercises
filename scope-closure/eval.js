/*
It should be clear by now that scope is determined as the program is compiled, 
and should not generally be affected by runtime conditions.
In non-strict-mode, there are still two ways to cheat this rule, 
modifying a program's scopes during runtime.
*/

// EVAL
// compile and execute code at runtime (when program run,not when is compiled).
// can modify the current scope
function badIdea() {
    eval("var oops = 'Ugh!';");
    console.log(oops); // without eval, this should be a ReferenceError
}
badIdea();   // Ugh!

// WITH
// turns an object into a local scope at runtime.
//badIdea was turned into a scope at runtime rather than compile time, and its property oops becomes a variable in that scope. 
// Again, this is a terrible idea, for performance and readability reasons.
var badIdea = { oops: "Ugh!" };

with (badIdea) {
    console.log(oops);   // Ugh!
}

//EVAL and With are not allow in strict mode. Avoid them.JS's scope is determined at compile time;

