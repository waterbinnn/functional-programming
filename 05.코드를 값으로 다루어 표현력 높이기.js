const products = [
  {
    name: 'tshirt',
    price: 15000,
  },
  {
    name: 'phone case',
    price: 15000,
  },
  {
    name: 'one piece',
    price: 20000,
  },
  {
    name: 'pants',
    price: 30000,
  },
  {
    name: 'hat',
    price: 35000,
  },
];

const add = (a, b) => a + b;

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

// # 코드를 값으로 다루어 표현력 높이기

/* 
 go : 즉시 함수들과 인자를 전달해서 즉시 어떤 값을 평가하는데 사용 
 pipe : 함수를 리턴하는 함수, 함수들이 나열되어 있는 합성된 함수를 만드는 함수 */

/* 리듀스를 사용하여 표현
args를 어떤 특정 함수로 축약해서 하나의 값으로 만들어 갈 수 있음 */
const go = (...args) => reduce((a, f) => f(a), args);
const pipe =
  (...fs) =>
  (a) =>
    go(a, ...fs);

const _pipe =
  (f, ...fs) =>
  (...as) =>
    //인자를 펼쳐서 전달, 다음 함수들이 실행이 됨
    //첫번쨰 함수만 꺼내고 나머지 함수들을 뒤에 넣을 수 있음
    go(f(...as), ...fs);

go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100
);

/* f라는 함수를 파이프 함수를 통해 만드는데
 이 코드들을 전달해서 이 3개의 함수를 연속적으로 실행,
  추격하는 하나의 함수를 만들어 리턴
  - 결국 내부에서 go를 사용하는 함수라고 볼 수 있음 
  */
const f = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);

// 예시

go(
  products,
  (products) => products.filter((p) => p.price < 2000, products),
  (products) => products.map((p) => p.price, products),
  (prices) => prices.reduce(add, prices)
);
//코드양이 많아보이고 간결하지는 않지만 읽기에 편해짐

/**
 * curry
 * : 함수를 값으로 다루면서 받아둔 함수를 원하는 시점에 평가시키는 함수
 */

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

/* 함수를 받아서 함수를 리턴 , 함수를 부분적으로 실행
 *  -> 함수에서 사용할 인자를 받음
 *  -> 인자가 원하는 개수만큼의 인자가 들어왔을 때 평가
 *
 * length 가 있다면 ? 받아둔 함수 즉시 실행 : 함수 리턴
 */

const multi = curry((a, b) => a * b);
console.log(multi(3)); //함수가 출력됨
console.log(multi(3)(2)); //받은 함수에 인자를 전달

const multi3 = multi(3);
//함수를 만들어 놓고 이렇게 사용할 수 있는 패턴
console.log(multi3(10));
console.log(multi3(5));

//아래 코드를 간결하게 만들 수 있음
go(
  products,
  curry(products.filter((p) => p.price < 2000)(products)),
  curry(products.map((p) => p.price)(products)),
  curry(prices.reduce(add)(prices))
);

//# 함수 조합으로 함수 만들기

const total_price = pipe(
  products.map((p) => p.price),
  reduce(add)
);

const base_total_price = (pred) => pipe(filter(pred), total_price);

go(
  products,
  base_total_price((p) => p.price < 20000)
);

go(
  products,
  base_total_price((p) => p.price >= 20000)
);
