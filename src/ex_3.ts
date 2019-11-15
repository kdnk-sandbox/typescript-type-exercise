export {};

//  3-1
// -----------------------------------------------

function mapFromArray<T, K extends keyof T>(arr: T[], key: K): Map<K, T> {
  const result = new Map();
  for (const obj of arr) {
    result.set(obj[key], obj);
  }
  return result;
}

const data = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Mary Sue" },
  { id: 100, name: "Taro Yamada" },
];

const dataMap = mapFromArray(data, "id");
// mapFromArray(data, "age");

//  3-2
// -----------------------------------------------

type MyPartial<T> = { [P in keyof T]?: T[P] };

type T1 = MyPartial<{
  foo: number;
  bar: string;
}>;

type T2 = MyPartial<{
  hoge: {
    piyo: number;
  };
}>;

//  3-3
// -----------------------------------------------

interface EventPayloads {
  start: {
    user: string;
  };
  stop: {
    user: string;
    after: number;
  };
  end: {};
}

class EventDischarger<E> {
  emit<Ev extends keyof E>(eventName: Ev, payload: E[Ev]) {}
}

const ed = new EventDischarger<EventPayloads>();
ed.emit("start", {
  user: "user1",
});
ed.emit("stop", {
  user: "user1",
  after: 3,
});
ed.emit("end", {});

// error
// ed.emit("start", {
//   user: "user2",
//   after: 0,
// });
// ed.emit("stop", {
//   user: "user2",
// });
// ed.emit("foobar", {
//   foo: 123,
// });

//  3-4
// -----------------------------------------------

type Action =
  | {
      type: "increment";
      amount: number;
    }
  | {
      type: "decrement";
      amount: number;
    }
  | {
      type: "reset";
      value: number;
    };

const reducer = (state: number, action: Action): number => {
  switch (action.type) {
    case "increment":
      return state + action.amount;
    case "decrement":
      return state - action.amount;
    case "reset":
      return action.value;
  }
};

// 使用例
reducer(100, {
  type: "increment",
  amount: 10,
}) === 110;
reducer(100, {
  type: "decrement",
  amount: 55,
}) === 45;
reducer(500, {
  type: "reset",
  value: 0,
}) === 0;

// エラー例
// reducer(0, {
//   type: "increment",
//   value: 100,
// });

//  3-5
// -----------------------------------------------

type Func<A, R> = A extends undefined ? (arg?: A) => R : (arg: A) => R;

const f1: Func<number, number> = num => num + 10;
const v1: number = f1(10);
const f2: Func<undefined, number> = () => 0;
const v2: number = f2();
const v3: number = f2(undefined);

// エラー例
// const v4: number = f1();
