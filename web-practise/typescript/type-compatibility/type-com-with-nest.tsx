interface a {
    address: {
        name: string,
        mailCode: string
    };
}

let x: a;

// let y = {
//     house: {
//         name: 'yy',
//         code: 3524
//     }
// };

// x = y; // 这个不行

// let y = {
//     address: {
//         name: 'yy',
//         code: '3524'
//     }
// };

// x = y; // Property 'mailCode' is missing in type '{ name: string; code: string; }'

let y = {
    address: {
        name: 'yy',
        mailCode: '3524'
    },
    name: 'sdfsdf'
};

x = y;
