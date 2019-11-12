export {};

//  1-1
// -----------------------------------------------

function isPositive(num: number) {
  return num >= 0;
}

isPositive(3);
// isPositive("123");
// const numVar: number = isPositive(-5);

//  1-2
// -----------------------------------------------

interface User {
  name: string;
  age: number;
  private: boolean;
}

function showUserInfo(user: User) {}

showUserInfo({
  name: "John Smith",
  age: 16,
  private: false,
});

// showUserInfo({
//   name: "Mary Sue",
//   private: false,
// });

// const user: User = {
//   name: "Gombe Nanashino",
//   age: 100,
// };

//  1-3
// -----------------------------------------------

type IsPositiveFunc = (num: number) => boolean;

const isPositive2: IsPositiveFunc = num => num >= 0;

isPositive2(5);

// isPositive2("foo");
// const res: number = isPositive2(123);

//  1-4
// -----------------------------------------------

function sumOfPos(arr: number[]) {
  return arr.filter(num => num >= 0).reduce((acc, num) => acc + num, 0);
}

const sum: number = sumOfPos([1, 3, -2, 0]);
// sumOfPos(123, 456);
// sumOfPos([123, "foobar"]);
