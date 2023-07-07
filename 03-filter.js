// # filter
//이터러블 프로토콜을 따른다

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

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}

console.log(...filter((p) => p.price < 20000, products));
console.log(...filter((p) => p.price > 20000, products));

console.log(filter((n) => n % 2, [1, 2, 3, 4]));
console.log(
  filter(
    (n) => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })()
  )
);
