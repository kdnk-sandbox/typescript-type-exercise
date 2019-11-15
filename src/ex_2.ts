export {};

//  2-1
// -----------------------------------------------

function myFilter<T>(arr: T[], predicate: (arg: T) => boolean) {
  const result: T[] = [];
  for (const elm of arr) {
    if (predicate(elm)) {
      result.push(elm);
    }
  }
  return result;
}

const res = myFilter([1, 2, 3, 4, 5], num => num % 2 === 0);
const res2 = myFilter(["foo", "hoge", "bar"], str => str.length >= 4);

// myFilter([1, 2, 3, 4, 5], str => str.length >= 4);

//  2-2
// -----------------------------------------------

type Speed = "slow" | "medium" | "fast";

function getSpeed(speed: Speed): number {
  switch (speed) {
    case "slow":
      return 10;
    case "medium":
      return 50;
    case "fast":
      return 200;
  }
}

const slowSpeed = getSpeed("slow");
const mediumSpeed = getSpeed("medium");
const fastSpeed = getSpeed("fast");

// getSpeed("veryfast");

//  2-3
// -----------------------------------------------

declare function addEventListener(
  event: string,
  callback: () => void,
  obj?: { capture?: boolean; once?: boolean; passive?: boolean } | boolean
): void;

// 使用例
addEventListener("foobar", () => {});
addEventListener("event", () => {}, true);
addEventListener("event2", () => {}, {});
addEventListener("event3", () => {}, {
  capture: true,
  once: false,
});

// エラー例
// addEventListener("foobar", () => {}, "string");
// addEventListener("hoge", () => {}, {
//   capture: true,
//   once: false,
//   excess: true,
// });

//  2-4
// -----------------------------------------------

function giveId<T>(obj: T): T & { id: string } {
  const id = "本当はランダムがいいけどここではただの文字列";
  return {
    ...obj,
    id,
  };
}

// 使用例
const obj1: {
  id: string;
  foo: number;
} = giveId({ foo: 123 });
const obj2: {
  id: string;
  num: number;
  hoge: boolean;
} = giveId({
  num: 0,
  hoge: true,
});

// エラー例
// const obj3: {
//   id: string;
//   piyo: string;
// } = giveId({
//   foo: "bar",
// });

//  2-5
// -----------------------------------------------
import React, { useState } from "react";

declare function useState<S>(
  initialState: S
): [S, (state: S | ((arg: S) => S)) => S];

const [numState, setNumState] = useState(0);
setNumState(3);
setNumState(state => state + 10);
const [anotherState, setAnotherState] = useState<number | null>(null);
setAnotherState(100);

// setNumState("foobar");
