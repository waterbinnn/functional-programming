//# map - iterable protocol 을 따름, 고차함수이기도

/* 함수형 프로그래밍은 인자와 리턴값으로 소통하는 것을 권장한다.
직접적인 메서드를 다른 함수에 보내는 것이 아니라, 

const map = () => {
let names = []
for (const p of products){
    names.push(p.name)
}
console.log(names) -> 직접적인 메서드 
return names; -> 리턴으로 내보내는 메서드 
} */

const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

/* 
# 이터러블 프로토콜을 따른 map의 다형성 
*/

map((a) => a + 1);

/* 이터러블 프로토클을 따름 - 그냥 map 함수는 가지고 있지 않기 때문에 map을 쓸 수 없음 
위에서 만든 map 함수는 동작 
*/
// document.querySelectorAll("*");
// map((el) => el.nodeName, document.querySelectorAll("*"));

// const iter = document.querySelectorAll("*")[Symbol.iterator]();

//아래와 같은 제너레이터가 있다면
function* gen() {
  yield 2;
  yield 3;
  yield 4;
}

//이렇게 map 함수를 쓸 수 있다
console.log([1, 2, 3].map((a) => a * a, gen()));

let m = new Map();
m.set("a", 10);
m.set("b", 20);

map(([k, a]) => [k, a * 2], m);
//이걸 또 새 map 으로 만들 수 있음
console.log(new Map(map(([k, a]) => [k, a * 2], m)));
