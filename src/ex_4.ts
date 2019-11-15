//  4-1
// -----------------------------------------------

// function getFoo<T extends Record<any, any>>(
//   obj: T
// ): "foo" extends keyof T ? T["foo"] : unknown {
//   return obj.foo;
// }
function getFoo<T extends object>(
  obj: T
): T extends { foo: infer E } ? E : unknown {
  return (obj as any).foo;
}

// 使用例
// numはnumber型
const num = getFoo({
  foo: 123,
});
// strはstring型
const str = getFoo({
  foo: "hoge",
  bar: 0,
});
// unkはunknown型
const unk = getFoo({
  hoge: true,
});

// エラー例
// getFoo(123);
// getFoo(null);

//  4-2
// -----------------------------------------------

function giveId<T>(obj: T): Pick<T, Exclude<keyof T, "id">> & { id: string } {
  const id = "本当はランダムがいいけどここではただの文字列";
  return {
    ...obj,
    id,
  };
}

// 使用例
/*
 * obj1の型は { foo: number; id: string } 型
 */
const obj1 = giveId({ foo: 123 });
/*
 * obj2の型は { num : number; id: string } 型
 */
const obj2 = giveId({
  num: 0,
  id: 100,
});

// obj2のidはstring型なので別の文字列を代入できる
obj2.id = "";

//  4-3
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

type Payload<Ev, EvOrig, E> = Ev extends keyof E
  ? EvOrig[] extends Ev[]
    ? E[Ev]
    : never
  : never;

class EventDischarger<E> {
  emit<Ev extends keyof E>(eventName: Ev, payload: Payload<Ev, Ev, E>) {}
}

// 使用例
const ed = new EventDischarger<EventPayloads>();
ed.emit("start", {
  user: "user1",
});
ed.emit("stop", {
  user: "user1",
  after: 3,
});
ed.emit("end", {});

// エラー例
// ed.emit<"start" | "stop">("stop", {
//   user: "user1",
// });

//  4-4
// -----------------------------------------------

interface Data {
  foo: number;
  bar: string;
  baz: string;
}
