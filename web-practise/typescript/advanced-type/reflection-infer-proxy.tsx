type Proxy<T> = {
    get(): T;
    set(value: T): void;
}

// o {
// a: Proxy<a>,
// b: Proxy<b>
// }
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>; // value: Proxy<T[keyof T]>
}


function proxify<T>(o: T): Proxify<T> {
    let result = {} as Proxify<T>;

    for (const p in o) {
        let v = o[p];
        // 1. 如何在不确定类型的情况下，对值进行修改 - 使用typeof推断？
        // 2. 如何实例化Proxy<Person[keyof Person]>
        let pPxy: Proxy<T[keyof T]> = {
            get: function (): T[keyof T]{
                if (typeof v === 'string') {
                    return (v + 'aaa') as typeof v;
                }

                // throw new Error(`Expected string or number, got '${v}'.`);
                return v;
            },
            set: function (value: T[keyof T]): void {
                return;
            }
        };

        result[p] = pPxy;
    }

    return result;
}

interface Person {
    name: string;
    age: number;
}

let pPerson: Person = {
    name: "aaa",
    age: 123
};

let proxyProps = proxify(pPerson);

console.log(proxyProps);
console.log('------------');
console.log(proxyProps.name.get());

function unproxify<T>(t: Proxify<T>): T {
    let result = {} as T;
    for (const k in t) {
        result[k] = t[k].get();
    }
    return result;
}

let originalProps = unproxify(proxyProps);
console.log('------------');
console.log(originalProps);
