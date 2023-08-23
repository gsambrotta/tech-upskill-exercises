// What even is a module? Is it just a file?

/* 
- Modules were introduced with ES6.
- You can have one module per file.
- The two main keywords that enable ES6 modules are import and export.
- Writing var x = 22 inside a module might look like you’re creating a global variable, but its top-level scope is actually the module itself. So anything not exported from the module remains private.
- When you export something, you’re exporting a binding to that thing (function, variable, etc). So in your module, if you change the value of the thing you are exporting, even after it’s already been imported, the imported binding will reflect the changed value. The export is a binding or reference to the thing itself, not a copy of it.
- You can have one default export per module, specified with the default keyword.
- Modules are singletons. Every time you import the module into another module, you get a reference to the one central instance.
- Importing a module is the same thing as requesting it to load. In a browser, this means a blocking load over the network.
- A module loader takes care of performance, scanning the modules and loading them pre-emptively.
*/

// EXPORTING:

// 1) NAMED EXPORTS
function helloWorld() {
    //...
  }
const name = "Taylor Swift";
const age = 22;
  
export { helloWorld, name, age }

// 2) DECLARATION EXPORTS
export function helloWorld() {
//...
}
export const name = "Taylor Swift";
export const age = 22;

// 3) RENAMED NAMED EXPORTS
const name = "Taylor Swift";
export { name as person };

// 4) DEFAULT EXPORTS
// Note: ES6 prefers having a single, default export per module over multiple exports 
function helloWorld() {
//...
}

// This function can be made the default import in two different ways:
// A.
export default helloWorld;

// Note this is the same as 

export default function helloWorld() {
    //...
}

// B.
export { helloWorld as default }

// A. means you export a binding to the value at that moment, so even if it
// was changed in the module later, the imported value would remain the same
// B. means you export a binding to the identifier rather than its value, so if 
// it was changed in the module after the value was imported elsewhere, the imported
// value would still reflect the change
// 5) DEFAULT AND NAMED EXPORTS COMBINED

export default function helloWorld() {...}
export const name = "TayTay";

// or...

function helloWorld() {...}
const name = "TayTay";

export { helloWorld as default, name }


// export default vs export 
/*
 All export outside of default export are live bindings.
 So if you change the value of a variable inside a module after exporting, 
 the external imported binding will access the updated value… The values at time of export are irrelevant. 
 The values at time of import are irrelevant. 
 The bindings are live links, so all that matters is what the current value is when you access the binding.
*/


// IMPORTING 
// A) Importing named exports
import { foo, bar, baz } from 'utils';

// B) Importing and renaming a named export
import { foo as fooDelish } from 'utils';

// C) Importing the default export
import foo from 'utils';

// D) Importing and renaming the default export
import { default as fooDelish } from 'utils';

// E) Importing the default export and other named exports 
import foo, { bar, baz } from 'utils';

// F) Importing everything from a module into a single namespace  
import * as utils from 'utils';
utils.foo();
utils.bar();
utils.baz();

// G) Load, compile and evaluate the module (but don't import any members)
import 'utils';

// LOADING MODULE
/*
    How modules are loaded? And what exactly the from ‘some_string’ part of an import statement is doing? 
    Some_string gets resolved by the module loader — a mechanism provided by the hosting environment (eg the browser or Node) — 
    into an instruction for finding and loading the module itself. 
    In the browser some_string is generally interpreted as a URL and in Node has a file path.
*/



// EXTRA CONTENT
/* 
What is a singleton?
Singleton is a design pattern that tells us that we can create only one instance of a class and that instance can be accessed globally.
Ensures that it creates only one instance of the class
Provides a global access point to the state.
https://www.freecodecamp.org/news/singleton-design-pattern-with-javascript/#:~:text=Singleton%20design%20pattern%20exposes%20a,basic%20types%20of%20design%20pattern.
*/

/* 
Live Bindings
https://javascript.plainenglish.io/live-bindings-difference-between-export-default-and-export-as-default-4541c354cdaa
*/