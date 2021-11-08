// // Grabbing Buttons and Dice from HTML Doc
let dieBtn = document.getElementById("dice-init");
let rerollBtn = document.getElementById("dice-reroll");
let diceHolder = document.getElementById("dice-container");
let allDice = document.getElementsByClassName("die");
let sumDiceBtn = document.getElementById("sum-dice");

// Creating a Counter to ID every dice just to keep track
let counter = 0;

// Empty Global Array to Hold Dice Divs
let diceArr : Array<Die> = []


// Global Array That Will Hold Dice Divs At All Times to refill dice array on reroll
let permDice : Array<Die> = [];

// Empty Global Array to Hold Dice Values
let numArr : number[] = []
// Creating Die class
class Die {
  value: number;
  index: number;
  newDie : HTMLDivElement
  constructor() {
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
    this.newDie.addEventListener("click", () => {
      this.roll();
      numArr.splice(diceArr.indexOf(this), 1, this.currentValue());
    });
    // Removing a dice and its value from both the page and the numArr
    this.newDie.addEventListener("dblclick", () => {
      numArr.splice(diceArr.indexOf(this), 1);
      this.newDie.remove();
    });
  }
  // Adding Functionality to Remove a Single Die if Double Clicked

  currentValue() {
    return this.value;
  }
  // Generating a random number between 1 and 6, then adding its value to the div
  roll() {
    let min = 1;
    let max = 7;
    let number : number
    number = Math.floor(Math.random() * (max - min) + min);
    this.value = number;
    this.newDie.innerText = this.value.toString();
  }

  // Creating method to make a new div and format it
  dieMaker() {
    this.newDie.className = "die px-4 m-3";
    this.newDie.id = counter.toString();
    diceHolder.appendChild(this.newDie);
  }
}

// Adding functionality to New Die Button
dieBtn.addEventListener("click", function () {
  counter++;
  let newDie = new Die;
  diceArr.push(newDie);
  permDice.push(newDie);
  numArr.push(newDie.value);
});

//Adding functionality to the ReRoll Button
rerollBtn.addEventListener("click", function () {
  // Emptying out current array values
  numArr.length = 0;

  // Replacing number array values with new ones
  for (let i = 0; i < diceArr.length; i++) {
    diceArr[i].roll();
    numArr.push(diceArr[i].currentValue());
  }

  // Emptying Dice Array
  diceArr.length = 0;

  // Refilling Dice Array With New Values to keep Sum of Dice Accurate
  for (let i = 0; i < permDice.length; i++) {
    diceArr.push(permDice[i]);
  }
});

// Adding functionality to button that adds all the dice values
sumDiceBtn.addEventListener("click", function () {
  // Declaring a function to combine every value
  let reducer = 0
  numArr.forEach((val) => {
  reducer +=val
  })
  

  // Adding Each Number Together with a Reduce Method
  if(diceArr.length === 1){
    alert(`The total value of these dice is ${reducer}!`);
  } else {alert(`The total value of these dice is ${reducer}!`);};
});
