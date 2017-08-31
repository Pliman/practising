function changeValue<T extends string|number> (input: T): T {
    return input + 'aaa' as T;
}

console.log(changeValue('a'));


type SnI98213he489HO = {
    s: string,
    n: number
};

let snsoidjf: SnI98213he489HO = {
    s: "TOM",
    n: 222
};

function changeObjValue<T> (input: T): T {
    for (const p in input){
        let v = input[p];

        if (typeof v === 'string') {
            input[p] = v + 'aaa' as typeof v;
        }
    }

    return input;
}

console.log('---------------------');
console.log(changeObjValue(snsoidjf));
