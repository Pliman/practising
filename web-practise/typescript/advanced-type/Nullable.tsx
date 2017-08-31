type Nullable<T> = {
    [P in keyof T]: T[P] | null
};

interface Person {
    name: string;
    age: number;
}

type NullableP = Nullable<Person>;

let personBNIU: NullableP = {
    name: "TOM",
    age: null
};

let personBNIUBIUB: Person = {
    name: null,
    age: null
};
