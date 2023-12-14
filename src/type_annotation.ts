// Variable with type annotation
let myNumber: number;
myNumber = 10; // Valid assignment
// myNumber = 'Hello'; // Error: Type 'string' is not assignable to type 'number'

// Function parameter and return type annotations
function add(a: number, b: number): number {
    return a + b;
}

let result = add(5, 3); // result will be inferred as number
// let result = add('5', 3); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

// Object type annotation
type Person = {
    name: string;
    age: number;
};

function greet(person: Person) {
    return `Hello, ${person.name}!`;
}

let newPerson = { name: 'Alice', age: 30 };
// greet({ name: 'Alice', age: '30' }); // Error: Type 'string' is not assignable to type 'number'
