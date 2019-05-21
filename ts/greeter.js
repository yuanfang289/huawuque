var Student = /** @class */ (function () {
    function Student(firstName, middleName, lastName, fouter) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.fouter = fouter;
        this.fullName = firstName + " " + middleName + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello,   第一个名字：" + person.firstName + " 第二个名字：" + person.lastName;
}
var user = { firstName: "123", lastName: "刘" };
var user2 = new Student("Jane", "M.", "User", 'fouer');
var isDone = false;
isDone = true;
var decLiteral = 6;
decLiteral = 0;
var nameStr = "Gene" + decLiteral;
var age = 37;
var sentence = "Hello, my name is " + nameStr + ".\n\nI'll be " + (age + 1) + " years old next month.";
console.log(user);
console.log(user2);
console.log(isDone);
console.log(decLiteral);
console.log(sentence);
document.getElementsByTagName('div')[0].innerHTML = greeter(user);
{
    var list_1 = [1, 2, 3, "123"];
    var list1 = [1, 2, "3"];
    console.log(list1);
    console.log(list_1);
}
var x = ['hello', 10, "12"];
console.log(typeof (x[0]));
console.log(x[2] = 123);
var num = 5;
if (num > 0) {
    console.log("数字是正数");
}
var num = 5;
var i;
var factorial = 1;
for (i = num; i >= 1; i--) {
    factorial *= i;
    console.log(factorial);
}
console.log(factorial);
var someArray = [1, "string", false];
for (var _i = 0, someArray_1 = someArray; _i < someArray_1.length; _i++) {
    var entry = someArray_1[_i];
    console.log(entry); // 1, "string", false
}
var list = [4, 5, 6];
list.forEach(function (a, b, c) {
    console.log("当前值：" + a + "当前index：" + b + "array：" + c);
});
list.every(function (val, idx, array) {
    // val: 当前值
    // idx：当前index
    // array: Array
    console.log("当前值：" + val + "当前index：" + idx + "array：" + array);
    return false; // Continues
    // Return false will quit the iteration
});
var num = 5;
var factorial = 1;
while (num >= 1) {
    factorial = factorial * num;
    num--;
}
console.log("5 的阶乘为：" + factorial);
