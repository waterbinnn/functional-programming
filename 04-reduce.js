/**
 * reduce
 */

const nums = [1, 2, 3, 4, 5];

let total = 0;

for (const n of nums) {
  total += n;
}

//위 코드를 reduce 를 사용할 수 있음
//연속적이고 재귀적으로 하나의 값을 누적해준다

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    //acc : 누적값
    acc = f(acc, a);
  }
  return acc;
};

const add = (a, b) => a + b;

console.log(reduce(add, 0, [1, 2, 3, 4, 5])); //15

console.log(total);

/*복잡한 객체에도 사용이 가능 */
const products = [
  {
    name: "tshirt",
    price: 15000,
  },
  {
    name: "phone case",
    price: 15000,
  },
  {
    name: "one piece",
    price: 20000,
  },
  {
    name: "pants",
    price: 30000,
  },
  {
    name: "hat",
    price: 35000,
  },
];

console.log(
  reduce((total_price, product) => total_price + product.price, 0, products)
);
