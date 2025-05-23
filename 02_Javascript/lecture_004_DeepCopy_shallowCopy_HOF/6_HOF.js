// let arr = [2, 3, 4, 5, 6, 7];

// //  following DRY code to square every element in the array
// for (let i = 0; i < arr.length; i++) {
//     arr[i] = arr[i] * arr[i]
// }
// console.log("arr",arr);

// code to cube every elemnt in the array
// for (let i = 0; i < arr.length; i++) {
//     arr[i] = arr[i] * arr[i] * arr[i];
// }
// console.log("arr",arr);

// // Assuming that each and every element is Integer/Decimal.
// const transformer = function (arr, cb_logic){
//     let newArr = [];
//     for(ele of arr){
//         newArr.push(cb_logic(ele));
//     }
//     return newArr;
// }

//  // Smaller functions.
// const squarer = function (ele) {
//     return ele * ele;
// }

// const cuber = function (ele) {
//     return ele * ele * ele;
// }

// // I passed my small function knows as call back function into transformer.
// const squaredArr = transformer(arr, squarer);
// const cubedArr = transformer(arr, cuber);

// console.log("squaredArr: ", squaredArr);
// console.log("cubedArr: ", cubedArr);


/***
 * HOF  -> are the function that accepts a fn as a parameter or returns a function.
 * Callbacks -> function that are passed as a paramtere to another are known as cb fns. 
 * 
 * They usually be called by Higher order functios(HOFns)
 * */

/***
 * HOF -> majorly available on arrays
 *  these fn doesn't change the source array
    * foreach -> 
    * map -> 
    * filter -> 
    * reduce -> 
    * sort -> 
 * */

/***traversal -> it is used to travsrese the arr*/
// let arr = [2, 3, 4, 5];
// const printElem = function (ele) {
//     console.log(ele * ele);
//     return ele * ele;
// }

// let rVal = arr.forEach(printElem);
// console.log("return Value: ", rVal);  // you will get undefined coz in forEach return is not allowed.


// arr.forEach((ele) => {
//     console.log(ele * ele * 10);
// });

/***************Map-> It changes every element according to the cb fn*****/
// let arr = [2, 3, 4, 5];

// function squarer(elem) {
//     return elem * elem;
// }

// function cuber(elem) {
//     return elem * elem * elem;
// }

// let squaredArr = arr.map(squarer);
// console.log("squaredArr", squaredArr);

// let cubedArr = arr.map(cuber);
// let cubedArr = arr.map((ele) => ele * ele * ele)
// console.log("cubedArr", cubedArr);

/**Polyfill of map*/
Array.prototype.myMap = function (logic) {
   let newArray = [];

   for (ele of this) {
      newArray.push(logic(ele));
   }

   return newArray;
}

// let squaredArr = arr.myMap(squarer);
// console.log("squaredArr", squaredArr);

// let cubedArr = arr.myMap(cuber);
// console.log("cubedArr", cubedArr);

/*********************filter -> it filters the elem on the basis of testLogic**/
/*traverse through every elem -> elem to cb fn if cb fn returns true
-> it will add that elem to a new Arr at the end it returns the new Arr*/

// let elems = [1, 2, 3, 11, 4, 5, 34, 12];

// function isOdd(elem) {
//     return elem % 2 == 1;
// }

// function isgtr5(elem) {
//     return elem > 5;
// }

// // odd values
// let oddvaluesArr = elems.filter(isOdd);
// console.log("oddvaluesArr: ", oddvaluesArr);

// // is greater than 5.
// let isGrtThan5 = elems.filter(isgtr5);
// console.log("isGrtThan5: ", isGrtThan5);

// let arr = [{ "name": "Rajneeesh", "lastName": "kumar" }, { "name": "Rajneeesh", "lastName": "Sign" }, { "name": "Jasbir", "lastName": "Bano" }, { "name": "Rajneeesh", "lastName": "Swain" }, { "name": "Jasbir", "lastName": "Sign" }];
// console.log(arr.filter((obj) => {
//     return obj.name === "Jasbir";
// }));


/**write polyfill of filter */

// Array.prototype.myFilter = function (logic) {
// let newArray = [];

// for (ele of this) {
//     if (logic(ele)) {
//         newArray.push(ele);
//     }
// }

// return newArray;
// }

// let oddvaluesArr = elems.myFilter(isOdd);
// console.log("oddvaluesArr", oddvaluesArr);
// console.log("elem", elems);


/*********************reduce******************/

// let elems = [1, 2, 3, 4, 5];

// // Smaller cb functions
// // two parameters: acc, nextElement
// function sum(sumSoFar, elem) {
//     return sumSoFar + elem;
// }

// function product(ProductSoFar, elem) {
//     return ProductSoFar * elem;
// }


// console.log("sum: ", elems.reduce(sum));
// console.log("Prod: ", elems.reduce(product));

/**final version-> polyfill of reduce => HW **/
// Array.prototype.myReduce = function (cb, defVal) {
//    if (!this.length && defVal === undefined) {
//       throw new TypeError("Reduce of empty array with no initial value");
//    }

//    let accumulator = defVal !== undefined ? defVal : this[0];
//    let startIndex = defVal !== undefined ? 0 : 1;

//    for (let i = startIndex; i < this.length; i++) {
//       accumulator = cb(accumulator, this[i], i, this);
//    }

//    return accumulator;
// }

// const arr = [1, 2, 3, 4];
// const sum = arr.myReduce((acc, curr) => acc + curr, 0);
// console.log(sum); // Output: 10

/** Polyfill of sort */
// Array.prototype.mySort = function (compareFn) {
//    for (let i = 0; i < this.length - 1; i++) {
//        for (let j = 0; j < this.length - i - 1; j++) {
//            if (compareFn ? compareFn(this[j], this[j + 1]) > 0 : this[j] > this[j + 1]) {
//                [this[j], this[j + 1]] = [this[j + 1], this[j]];
//            }
//        }
//    }
//    return this;
// };

// // Example usage:
// console.log([5, 2, 9, 1, 3].mySort((a, b) => a - b)); // [1, 2, 3, 5, 9]
