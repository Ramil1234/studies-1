"use strict";

const account1 = {
  owner: "Dmitrii Fokeev",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
};

const account2 = {
  owner: "Anna Filimonova",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
};

const account3 = {
  owner: "Polina Filimonova",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,
};

const account4 = {
  owner: "Stanislav Ivanchenko",
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

function displayMovements(movements) {
  containerMovements.textContent = "";
  movements.forEach(function (value, index) {
    const classHTML =
      value >= 0 ? ["deposit", "зачисление"] : ["withdrawal", "Снятие"];
    const inHTML = `        <div class="movements__row">
            <div class="movements__type movements__type--${classHTML[0]}">
            ${index + 1} ${classHTML[1]}
            </div>
            <div class="movements__date">3 дня назад</div>
            <div class="movements__value">${value}</div>
          </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", inHTML);
  });
}
displayMovements(account2.movements);
function addLogIn(accs) {
  accs.forEach(function(acc) {
    acc.logIn = acc.owner.toLowerCase().split(' ').map(function(val) {
      return val[0]
    }).join('')
  })
}
addLogIn(accounts)
let sumNum = 0
function sum(acc) {
  sumNum = acc.movements.reduce(function(sum, val) {
    return sum + val
  })
  labelBalance.textContent = sumNum
  labelSumInterest.textContent = sumNum
  console.log(account4)
  labelSumOut.textContent = acc.movements.filter((num) => num < 0).reduce((sum, val) => sum + val,0)
  labelSumIn.textContent = acc.movements.filter((num) => num > 0).reduce((sum, val) => sum + val,0)
}
let userCheckGl = 0;
btnLogin.addEventListener('click', (e) => {
  e.preventDefault()
  const userName = inputLoginUsername.value
  console.log(userName)
  userCheckGl = accounts.find((user) => user.logIn == userName)
  if (userCheckGl && userCheckGl.pin == inputLoginPin.value) {
    containerApp.style.opacity = 1
    displayMovements(userCheckGl.movements)
    sum(userCheckGl)
  };
})
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault()
  const transferTo = inputTransferTo.value
  console.log(transferTo)
  const userCheck = accounts.find((user) => user.logIn == transferTo)
  const transferAmount = inputTransferAmount.value
  console.log(sumNum) 
  if (userCheck && transferAmount <= sumNum) {
    userCheck.movements.push(Number(transferAmount)) 
    userCheckGl.movements.push(Number(-transferAmount))
    sum(userCheck) 
    sum(userCheckGl)
    displayMovements(userCheckGl.movements)
  }

})

btnLoan.addEventListener('click', (e) => {
  e.preventDefault(userCheckGl)
  userCheckGl.movements.push(Number(inputLoanAmount.value))
  sum(userCheckGl)
  displayMovements(userCheckGl.movements)
})

btnClose.addEventListener('click', (e) => { 
  e.preventDefault()
  if ((inputCloseUsername.value == userCheckGl.logIn) && (inputClosePin.value == userCheckGl.pin)) {
    accounts.splice(accounts.findIndex(function(acc) {
      return userCheckGl.logIn
    } ), 1)
    containerApp.style.opacity = 0
  }
})