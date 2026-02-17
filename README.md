1. What is the difference between null and undefined?
   Ans:
   Undefined:
   If a programmar create a variable and can't give the value of the variable. This variable called undefined. Like, int x; here x is undefined.
   Null:
   If the programmer didn't want give value, programmaer wilingly give null value to give messege that this value have no value. Like, int x = null;

2. What is the use of the map() function in JavaScript? How is it different from forEach()?
   Ans:
   Map():
   Map is a fuction that return array. Map fuction go each element and give new array.

   ForEach():
   ForEach work each item only. And can't give array. its retrun undefined.

3. What is the difference between == and ===?
   ===:
   It checks whether both the value and the data type are equal. It does not perform any automatic type conversion.

   ==:
   This only checks whether the values ​​on both sides are equal. If the types are different (such as numbers and strings), it automatically converts the types and tries to match.

4. What is the significance of async/await in fetching API data?
   It takes some time for data to arrive from the internet. Using async/await makes the code look like normal synchronous code, which is easier to read and understand.This ensures that the next line of code will not run until data arrives from your API.
   Basically, this reduces the hassle of .then() chaining and keeps the code much cleaner.
   Error Handling: Using this, we can easily handle errors with try-catch blocks.

5. Explain the concept of Scope in JavaScript (Global, Function, Block).

   Global Scope:
   If a variable is declared outside a function or block, it is called Global Scope. This variable can be accessed from anywhere in the code.

   Function Scope:
   A variable declared inside a function only works inside that function. It cannot be seen or accessed from outside. If it is declared with var, it follows the function scope.

   Block Scope:
   In ES6, variables declared with let and const follow the Block Scope. This means that if a variable is inside a second bracket { } (such as if-else or for loop), it cannot be found outside.
