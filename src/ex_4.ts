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
// 使用例
type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> &
  Pick<T, Exclude<keyof T, K>>;

// 元のデータ
interface Data {
  foo: number;
  bar: string;
  baz: string;
}
/*
 * T1は { foo?: number; bar?: string; baz: string } 型
 */
type T1 = PartiallyPartial<Data, "foo" | "bar">;

//  4-5
// -----------------------------------------------

// PartiallyPartial<"foo" | "bar"> | PartiallyPartial<"bar" | "baz"> | PartiallyPartial<"bar" | "foo">

type Speread<T, K extends keyof T> = K extends keyof T
  ? PartiallyPartial<T, Exclude<keyof T, K>>
  : never;

type AtLeastOne<T> = Speread<T, keyof T>;

// 使用例
interface Options {
  foo: number;
  bar: string;
  baz: boolean;
}

function test(options: AtLeastOne<Options>) {
  const { foo, bar, baz } = options;
  // 省略
}
test({
  foo: 123,
  bar: "bar",
});
test({
  baz: true,
});

// エラー例
// test({});

//  4-6
// -----------------------------------------------

type Page =
  | {
      page: "top";
    }
  | {
      page: "mypage";
      userName: string;
    }
  | {
      page: "ranking";
      articles: string[];
    };

type _PageGenerators = {
  top: (arg: Pick<Page["page"], Exclude<keyof Page["page"], "page">>) => string;
  mypage: (arg: { userName: string }) => string;
  ranking: (arg: { articles: string[] }) => string;
};

type PageGenerators = {
  [P in Page["page"]]: (page: Extract<Page, { page: P }>) => string;
};

const pageGenerators: PageGenerators = {
  top: () => "<p>top page</p>",
  mypage: ({ userName }) => `<p>Hello, ${userName}!</p>`,
  ranking: ({ articles }) =>
    `<h1>ranking</h1>
        <ul>
          ${articles.map(name => `<li>${name}</li>`).join("")}
        </ul>`,
};
const renderPage = (page: Page) => pageGenerators[page.page](page as any);
