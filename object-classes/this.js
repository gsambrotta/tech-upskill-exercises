/* 
JS developers seem to be perpetually frustrated by the dynamic this binding rules!!

To know where `this` points to, we have to look where the function is running (callsite rather then declarative).
That means you cannot simply look at function that use `this` (even a method in a class) 
and know for sure what this will hold.

Instead, you have to find each place the function is invoked, and look at how it's invoked (not even where matters). 
That's the only way to fully answer what `this` will point to.
In fact, a single function with `this` in it can be invoked at least four different ways, and any of those approaches will end up 
assigning a different this for that particular function invocation.

Why do we care so much about `this`??
If a function does not have `this` anywhere, then we don't care about it at all.
But if a function has even one `this`, then we cannot say for sure how the function will behave, unless 
we figured out FOR EACH INVOCATION of the function (basically in any place where the function run), what `this` point to.
This create a huge confusion is a large codebase, written by several people.
Think about chasing all the istance of a class or functions in a large codebase to figured out how 1 specific function is behaving and why.
*/

/*
Reference examples:
It's sort of like the `this` keyword is a placeholder in a template. 
That placeholder's value-replacement doesn't get determined when we write the code; it gets determined while the code is running.

`this` is very much like a parameter to a function, but it's an implicit parameter. 
Nothing show that `this` is going to be used (like a param), you have to read all the function body.
the param name is always `this` which is confusing
*/

/*
If this is an implicit parameter, what's its purpose? What's being passed in?
Lexical Scope is a static context for the function. Static because when we write a var at author time, the var and value is still the same also at run time.
A different programming language might offer dynamic scope, where the context for a function's variable references is not determined by author-time decisions 
but by runtime conditions. More flexible than static context -- though with flexibility often comes complexity.

JS scope is always and only lexical and static. BUT it offer the `this` mechanism with similar flexibility and capabilities to dynamic scope.
The this mechanism is, effectively, dynamic context (not scope); this-function can be dynamically invoked against different contexts - impossible with closure and lexical scope vars!
BEST CODE PRACTICE: Don't use this-aware code unless you really can justify it, and you've carefully weighed the costs.
*/

// Four rules that can be applied to determine `this` based on a function’s call-site.
var point = {
    x: null,
    y: null,

    init(x,y) {
        this.x = x;
        this.y = y;
    },
    rotate(angleRadians) {
        var rotatedX = this.x * Math.cos(angleRadians) -
            this.y * Math.sin(angleRadians);
        var rotatedY = this.x * Math.sin(angleRadians) +
            this.y * Math.cos(angleRadians);
        this.x = rotatedX;
        this.y = rotatedY;
    },
    toString() {
        return `(${this.x},${this.y})`;
    },
};

// 1. Implicit Context Invocation
// most common and normal way: we expect `this` to work like that.
point.init(3,4); // `point` is implicit context binding. It says to JS: invoke the init(..) function with `this` referencing point.


// 2. Default Context Invocation
const init = point.init;
init(3,4); // if run in strict-mode, would throw an exception.
// if non strict-mode, it will default to the global object. (Browser will default to window obj)

// You can try in the brwoser (so no stric-mode, this === global obj)
globalThis.x;   // 3
globalThis.y;   // 4
point.x;        // null
point.y;        // null
// Not the intended outcome. It's a global variable + is not changing the property on our point object! Bugs are guaranteed.


// 3. Explicit Context Invocation
// If a function is called with .call(), .apply() or .bind(), `this` will be the object that is passed in
const init = point.init;

init.call( point, 3, 4 ); // or: init.apply( point, [ 3, 4 ] )
point.x;        // 3
point.y;        // 4

// Basically same as n.1. But can be very handy in certain situation:
point.init(3,4);

var anotherPoint = {};
point.init.call( anotherPoint, 5, 6 );

point.x;                // 3
point.y;                // 4
anotherPoint.x;         // 5
anotherPoint.y;         // 6

// I wanted to define anotherPoint, but I didn't want to repeat the definitions of those init(..) / rotate(..) / toString() functions 
// from point. So I "borrowed" a function reference, point.init, and explicitly set the empty object anotherPoint as the this context, via call(..).
// Anotehr way to do it would have be:
var anotherPoint = {
    init: point.init,
    rotate: point.rotate,
    toString: point.toString,
};

anotherPoint.init(5,6);

anotherPoint.x;         // 5
anotherPoint.y;         // 6


// 4. New Context Invocation
// If a function is called with the new keyword, `this` will be the resulting object
var anotherPoint = new point.init(3,4);

anotherPoint.x;     // 3
anotherPoint.y;     // 4 
/*
`new` is not inherently a class operation. Is a JS keyword!
In a sense, the new keyword hijacks a function and forces its behavior into a different mode than a normal invocation. Here are the 4 special steps that JS performs when a function is invoked with new:
1. create a brand new empty object, out of thin air.

2. link the [[Prototype]] of that new empty object to the function's .prototype object (see Chapter 2).

3. invoke the function with the this context set to that new empty object.

4. if the function doesn't return its own object value explicitly (with a return .. statement), assume the function call should instead return the new object (from steps 1-3).
*/

/* 
Pro tip:
An easy way to find the call-site is to look at the call-stack in Chrome dev tools. 
The call-site, and thus the point at which this was bound, is always in the invocation immediately before the currently executing function.
*/


// https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch1.md
// https://medium.com/@amesimmons/you-dont-know-js-my-learnings-from-es6-beyond-a6ccb398e095