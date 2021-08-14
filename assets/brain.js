const account1 = {
  owner: "Ehtisham Ul Haq",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Muhammad Faisal",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account3 = {
  owner: "Shehnaz Hussain",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account4 = {
  owner: "Faqir Hussain",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const accounts = [account1, account2, account3, account4];

//Elements

//labels
const loginLabel = document.querySelector(".login-label");
const summaryIn = document.querySelector(".summary-in");
const summaryOut = document.querySelector(".summary-out");
const summaryTax = document.querySelector(".summary-tax");
const totalBalance = document.querySelector(".current-balance");
const currentDate = document.querySelector(".current-date");
const timer = document.querySelector(".log-out-timer");

//app
const loginApp = document.querySelector(".login-input");
const app = document.querySelector(".app");

//movements
const containerMovements = document.querySelector(".container-movements");

//inputs
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTo = document.querySelector(".form__input--to");
const inputAmount = document.querySelector(".form__input--amount");
const inputLoan = document.querySelector(".form__input--loan");
const userClose = document.querySelector(".form__input--username");
const userPin = document.querySelector(".form__input--pin");

//btns
const btnLogin = document.querySelector(".btn-login");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLogout = document.querySelector(".logout");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close-account");
const btnSort = document.querySelector(".sort-btn");

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// variables
let currentAccount, inputDates;

const displayUi = function () {
  displayMovements((sort = false), currentAccount);
  displaySummary(currentAccount);
};

//display Date
const dates = function (val) {
  const dateValue = Math.floor(
    (new Date().getTime() - new Date(val).getTime()) / (1000 * 60 * 60 * 24)
  );

  console.log(dateValue);
  const curDate = new Date().getTime();
  const options = {
    hour: `numeric`,
    minute: `numeric`,
    day: `numeric`,
    month: `long`,
    year: `numeric`,
    weekday: `long`,
  };
  const locate = navigator.language;

  const dateMaker = (val) =>
    new Intl.DateTimeFormat(locate, options).format(val);
  currentDate.textContent = `as of ${dateMaker(curDate)}`;

  if (dateValue === 0) {
    return `Today`;
  }
  if (dateValue === 1) {
    return `Yesterday`;
  }
  if (dateValue <= 7) {
    return `${dateValue} day's ago`;
  }
  if (dateValue > 7) {
    return dateMaker(new Date(val).getTime());
  }

  console.log(locate);
};

const displayMovements = function (sort = false, acc) {
  console.log(sort);
  const sortedMovements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  containerMovements.innerHTML = "";
  sortedMovements.forEach((val, i) => {
    let depositCheck = val > 0 ? `deposit` : `draw`;
    const html = `<div class="movements">
            <span class="movement movement-${depositCheck}">${i} DEPOSIT</span>
            <span class="movement movement-date">${dates(
              currentAccount.movementsDates[i]
            )}</span>
            <span class="movement movement-value">${val}€</span>
          </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//handlers
//logout
btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  loginApp.style.display = "block";
  app.style.display = "none";
  loginLabel.textContent = `Log in to get started`;
  clearInterval(setIn);
  timer.textContent = ``;   
});

//Login
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  accounts.forEach((val) => {
    const username = inputLoginUsername.value;
    const pin = Number(inputLoginPin.value);

    if (val.username === username && val.pin === pin) {
      currentAccount = val;
      loginApp.style.display = "none";
      app.style.display = "block";
      btnLogout.style.display = "block";
      loginLabel.textContent = `Welcome, ${currentAccount.owner}`;
    }
  });
  clearInterval(setIn);
  logOutTimer();
  displayUi();
  dates(currentAccount);
});

//Calculate Total Balance and summary
const displaySummary = function (acc) {
  const balance = Math.abs(acc.movements.reduce((acc, val) => acc + val));
  totalBalance.textContent = `${balance}€`;
  const moneyIn = acc.movements
    .filter((val) => val > 0)
    .reduce((acc, val) => acc + val);
  summaryIn.textContent = `${moneyIn}€`;
  const moneyOut = Math.abs(
    acc.movements.filter((val) => val < 0).reduce((acc, val) => acc + val)
  );
  summaryOut.textContent = `${moneyOut}€`;
  const moneyTax = acc.movements
    .filter((val) => val > 0)
    .map((val) => (val * acc.interestRate) / 100)
    .filter((val) => (val) => 1)
    .reduce((acc, val) => acc + val);
  summaryTax.textContent = `${moneyTax}€`;
};

//accounts transfer
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const ttlBalance = Number(totalBalance.textContent.replace("€", ""));
  const to = inputTo.value;
  const amount = Number(inputAmount.value);

  console.log(ttlBalance);
  accounts.forEach((val) => {
    if (
      val.username === to &&
      amount > 0 &&
      to !== currentAccount.username &&
      amount < ttlBalance
    ) {
      currentAccount.movements.push(-amount);
      val.movements.push(amount);
      currentAccount.movementsDates.push(new Date().getTime());
      val.movementsDates.push(new Date().getTime());
      displayUi();
      inputTo.value = "";
      inputAmount.value = "";
    }
  });
   clearInterval(setIn);
   logOutTimer();
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  const ttlBalance = Number(totalBalance.textContent.replace("€", ""));
  const loan = Number(inputLoan.value);
  console.log(ttlBalance);
  const loanMinimum = ttlBalance * 0.1;
  console.log(loanMinimum);
  const loanMaximum = 10000;
  if (loan >= loanMinimum && loan <= loanMaximum) {
    currentAccount.movementsDates.push(new Date().getTime());
    currentAccount.movements.push(loan);
    displayUi();
    inputLoan.value = "";
  }
  clearInterval(setIn);
     logOutTimer();
});

//close Account
btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  const user = userClose.value;
  const pin = Number(userPin.value);
  let userInfo;
  if (currentAccount.username === user && currentAccount.pin === pin) {
    userInfo = accounts.findIndex((val) => val.username === user);
    accounts.splice(userInfo, 1);
    app.style.display = "none";
    loginApp.style.display = "block";
    userClose.value = "";
    userPin.value = "";
    console.log(userInfo);
  }
});

//sort movements
let set = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(!set, currentAccount);
  set = !set;
});

//timer
let setIn;
const logOutTimer = function () {
 
  let ls = 60;
  let lm = 4;
  setIn = setInterval(() => {
    if (lm < 0) {
      clearInterval(setIn);
      app.style.display = "none";
      loginApp.style.display = "block";
      btnLogout.style.display = "none";
    }
    ls--;
    timer.textContent = `0${lm}:${ls}`;
    if (ls === 0) {
      ls = 60;
      lm--;
    }
  }, 1000);
};

//string work
//creates username

const usernames = function (accs) {
  accs.forEach((val, i) => {
    val.username = val.owner
      .toLowerCase()
      .split(" ")
      .map((val) => val[0])
      .join("");
  });
};
usernames(accounts);
