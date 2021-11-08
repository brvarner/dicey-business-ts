// // Grabbing Buttons and Dice from HTML Doc
var dieBtn = document.getElementById("dice-init");
var rerollBtn = document.getElementById("dice-reroll");
var diceHolder = document.getElementById("dice-container");
var allDice = document.getElementsByClassName("die");
var sumDiceBtn = document.getElementById("sum-dice");
// Creating a Counter to ID every dice just to keep track
var counter = 0;
// Empty Global Array to Hold Dice Divs
var diceArr = [];
// Global Array That Will Hold Dice Divs At All Times to refill dice array on reroll
var permDice = [];
// Empty Global Array to Hold Dice Values
var numArr = [];
// Creating Die class
var Die = /** @class */ (function () {
    function Die() {
        var _this = this;
        // Creating Dice Div
        // let newDie : HTMLElement 
        this.newDie = document.createElement("div");
        // Invoking Roll Method
        this.roll();
        // Invoking dieMaker Method
        this.dieMaker();
        // Grabbing Current Value To Be Used in Sum Dice Function Later
        this.currentValue();
        // Rerolling a Dice if Clicked, and 
        // Then adding its New Value into the numArr in its old value's place
        this.newDie.addEventListener("click", function () {
            _this.roll();
            numArr.splice(diceArr.indexOf(_this), 1, _this.currentValue());
        });
        // Removing a dice and its value from both the page and the numArr
        this.newDie.addEventListener("dblclick", function () {
            numArr.splice(diceArr.indexOf(_this), 1);
            _this.newDie.remove();
        });
    }
    // Adding Functionality to Remove a Single Die if Double Clicked
    Die.prototype.currentValue = function () {
        return this.value;
    };
    // Generating a random number between 1 and 6, then adding its value to the div
    Die.prototype.roll = function () {
        var min = 1;
        var max = 7;
        var number;
        number = Math.floor(Math.random() * (max - min) + min);
        this.value = number;
        this.newDie.innerText = this.value.toString();
    };
    // Creating method to make a new div and format it
    Die.prototype.dieMaker = function () {
        this.newDie.className = "die px-4 m-3";
        this.newDie.id = counter.toString();
        diceHolder.appendChild(this.newDie);
    };
    return Die;
}());
// Adding functionality to New Die Button
dieBtn.addEventListener("click", function () {
    counter++;
    var newDie = new Die;
    diceArr.push(newDie);
    permDice.push(newDie);
    numArr.push(newDie.value);
});
//Adding functionality to the ReRoll Button
rerollBtn.addEventListener("click", function () {
    // Emptying out current array values
    numArr.length = 0;
    // Replacing number array values with new ones
    for (var i = 0; i < diceArr.length; i++) {
        diceArr[i].roll();
        numArr.push(diceArr[i].currentValue());
    }
    // Emptying Dice Array
    diceArr.length = 0;
    // Refilling Dice Array With New Values to keep Sum of Dice Accurate
    for (var i = 0; i < permDice.length; i++) {
        diceArr.push(permDice[i]);
    }
});
// Adding functionality to button that adds all the dice values
sumDiceBtn.addEventListener("click", function () {
    // Declaring a function to combine every value
    var reducer = 0;
    numArr.forEach(function (val) {
        reducer += val;
    });
    // Adding Each Number Together with a Reduce Method
    if (diceArr.length === 1) {
        alert("The total value of these dice is " + reducer + "!");
    }
    else {
        alert("The total value of these dice is " + reducer + "!");
    }
    ;
});
