interface Person {
    name: string;
    age: number;
}

// 遍历并修改？
type Readonly1<T> = {
    readonly [P in keyof T]: T[P];
}

type Partial1<T> = {
    [P in keyof T]?: T[P];
}

type PersonPartial = Partial1<Person>;
type ReadonlyPerson = Readonly1<Person>;

let pp123: PersonPartial = {
    name: 'Tom'
};

console.log(pp123);
