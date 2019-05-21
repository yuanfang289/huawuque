class Student {
    fullName: string;
    constructor(public firstName, public middleName, public lastName, public fouter) {
        this.fullName = firstName + " " + middleName + " " + lastName;
    }
}
interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person: Person) {
    return "Hello,   第一个名字：" + person.firstName + " 第二个名字：" + person.lastName;
}
let user = { firstName: "123", lastName: "刘" };
let user2 = new Student("Jane", "M.", "User", 'fouer');
let isDone: boolean = false;
isDone = true;
let decLiteral: number = 6;
decLiteral = 0;
let nameStr: string = `Gene${decLiteral}`;
let age: number = 37;
let sentence: string = `Hello, my name is ${nameStr}.\n\nI'll be ${age + 1} years old next month.`;
console.log(user);
console.log(user2);
console.log(isDone);
console.log(decLiteral);
console.log(sentence);
document.getElementsByTagName('div')[0].innerHTML = greeter(user);
{
    let list: Array<number | string> = [1, 2, 3, "123"];
    let list1: (string | number)[] = [1, 2, "3"];
    console.log(list1);
    console.log(list);
}
let x: [string, number, (string | number)] = ['hello', 10, "12"];
console.log(typeof (x[0]));
console.log(x[2] = 123);
var num: number = 5
if (num > 0) {
    console.log("数字是正数")
}
var num: number = 5;
var i: number;
var factorial = 1;
for (i = num; i >= 1; i--) {
    factorial *= i;
    console.log(factorial)
}
console.log(factorial)
let someArray = [1, "string", false];

for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}
let list = [4, 5, 6];
list.forEach((a, b, c) => {
    console.log("当前值：" + a + "当前index：" + b + "array：" + c)
});
list.every((val, idx, array) => {
    // val: 当前值
    // idx：当前index
    // array: Array
    console.log("当前值：" + val + "当前index：" + idx + "array：" + array)
    return false; // Continues
    // Return false will quit the iteration
});
var num: number = 5;
var factorial: number = 1;

while (num >= 1) {
    factorial = factorial * num;
    num--;
}
console.log("5 的阶乘为：" + factorial);
