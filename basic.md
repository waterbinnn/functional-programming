# 함수형 프로그래밍 기본기

## 평가와 일급

### 평가

- 코드가 계산 (Evaluation) 되어 값을 만드는 것

```js
console.log(1 + 2); //3

console.log([1, 2 + 3]); //[1 , 5]

const a = 10;
const add10 = (a) => a + 10;
const r = add10(a);
console.log(r);
```

### 일급 함수

- 함수를 값으로 다룰 수 있다.
  조합성과 추상화의 도구

```js
const add5 = (a) => a + 5;
console.log(add5); // () => a + 5
console.log(add5(5)); //10

const f1 = () => () => 1;
console.log(f1()); // () => 1

const f2 = f1();
console.log(f2); // () => 1
console.log(f2()); //1
```

함수의 결과값으로 함수를 사용할 수가 있다.

### 고차 함수

- 함수를 값으로 다루는 함수

#### - 함수를 인자로 받아서 실행하는 함수

- apply1

```js
const apply1 = (f) => f(1);
const add2 = (a) => a + 2;

apply1(add2); //함수 add2를 인자로 받음
```

- times

```js
const times = (f,n) => {
    let i = -1;
    while (++i < n>) f(1);
};

times(a => console.log(a+10),3) //10 11 12
```

#### 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴)

- addMaker

```js
const addMaker = (a) => (b) => a + b; //함수이자 a를 기억하는  클로저
const add10 = addMaker(10); // (b)=> a+b
console.log(add10(5)); //15
console.log(add10(10)); //20
```
