/*
1. 기존과 달라진 ES6에서의 리스트 순회 
- for i++
- form of 
*/

// 기존 ES5
const list = [1, 2, 3];
for (var i = 0; i < list.length; i++) {
  console.log(list[i]);
}

const str = "a,b,c";
for (var i = 0; i < str.length; i++) {
  console.log(str[i]);
}

//ES6
for (const a of list) {
  console.log(a);
}

for (const a of str) {
  console.log(a);
}

/* 2. Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜 
Symbol.iterator 
*/

// - Array
// 키로 조회 가능 arr[0]
const arr = [1, 2, 3];
let iter1 = arr[Symbol.iterator]();

for (const a of iter1) {
  console.log(a);
}

// - Set
//키로 조회 불가 set[0] (x)

const set = new Set([1, 2, 3]);
for (const a of set) {
  console.log(a);
}

// -Map
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

let iter2 = map[Symbol.iterator]();
iter2.next();

for (const a of iter2) {
  console.log(a);
}

for (const a of map.keys()) console.log(a);
for (const a of map.values()) console.log(a);
for (const a of map.entries()) console.log(a);

/**
 * # iterable/iterator 프로토콜
 * iterable/iterator 프로토콜 : 이터러블을 for ...of, 전개 연산자 등과 함게 동작하도록 한 규약
 */

// * iterable : iterator을 리턴하는 [Symbol.iterator]()를 가진 값
console.log(arr[Symbol.iterator]); //[Function: values]

// iterator: {value, done} 객체를 리턴하는 next()를 가진 값
let iterator = arr[Symbol.iterator]();

// 어느 시점에서 value : undefined, done: true
// 심볼 이터레이터를 실행한 이터레이터를 계속 순회하며 value로 떨어지는 값을 출력한다 .

console.log(iterator.next()); //{ value: 1, done: false }
console.log(iterator.next()); //{ value: 2, done: false }
console.log(iterator.next()); //{ value: 3, done: false }
console.log(iterator.next()); //{ value: undefined, done: true }

/* 3. 전개연산자 */
console.clear();
const a = [1, 2];
console.log([...a, ...[3, 4]]); //[1,2,3,4]
console.log([...a, ...arr, ...set, ...map.values()]); //[1, 2, 1, 2, 3, 1, 2, 3, 1, 2, 3]
