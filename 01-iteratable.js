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

/* # 제너레이터와 이터레이터 
- 제너레이터 : 이터레이터이자 이터러블을 생성하는 함수 
*/

function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100; // return 값도 생성 가능 - 순회할 때 return 값은 순회하지 않음
}
let iter = gen();
console.log(iter[Symbol.iterator]() == iter);
console.log(iter.next());

/* 어떠한 값이든 iterator 이면 순회할 수 있는 형태로 만들 수 있다. 
제너레이터가 그렇게 만들 수 있는 애 */

for (const a of gen()) console.log(a); //이렇게 순회도 가능

/* -odds 출력 실습
l 은 limit을 뜻함
*/

function* odds(l) {
  for (let i = 0; i < l; i++) {
    if (i % 2) yield i;
  }
}

let iter3 = odds(10);
console.log(iter3.next());
console.log(iter3.next());
console.log(iter3.next());
console.log(iter3.next());
console.log(iter3.next());
console.log(iter3.next());
/**
 * { value: 1, done: false }
{ value: 3, done: false }
{ value: 5, done: false }
{ value: 7, done: false }
{ value: 9, done: false }
{ value: undefined, done: true }
 */

function* infinity(i = 0) {
  while (true) yield i++;
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}

function* odds2(l) {
  for (const a of infinity(1)) {
    if (a % 2) yield a;
    if (a == l) return;
  }
}

function* odds3(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

let iter4 = odds3(10);

console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());
/**
 * 
{ value: 1, done: false }
{ value: 3, done: false }
{ value: 5, done: false }
{ value: 7, done: false }
{ value: 9, done: false }
{ value: undefined, done: true }
 */

for (const a of odds3(40)) console.log(a);
/**
 * 1
3
5
7
9
11
13
15
17
19
21
23
25
27
29
31
33
35
37
39
 */

/**
 * # for of, 전개 연산자, 구조 분해, 나머지 연산자
 */

console.log(...odds(10)); //13579
console.log(...odds(10), ...odds(20)); //1 3 5 7 9 1 3 5 7 9 11 13 15 17 19

const [head, ...tail] = odds(5);
console.log(head); //1
console.log(tail); //[3]

const [aa, bb, ...rest] = odds(10);
console.log(aa); //1
console.log(bb); //3
console.log(rest); //[5,7,9]
