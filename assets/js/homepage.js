var userName = document.getElementById("username").value;
const names = [];

function displayMsg() {
    const helloMsg = document.createElement('h2');
    helloMsg.textContent = "Hello, " + document.getElementById("username").value;
    document.body.appendChild(helloMsg);
  };

function init() {
  const storedNames = JSON.parse(localStorage.getItem('names'));
  if (storedNames !== null) {
    names = storedNames;
  }
}

function storeNames() {
  localStorage.setItem('names', JSON.stringify(names));
}
document.getElementById("form").addEventListener('submit', function (event) {
  event.preventDefault();

  const userName = document.getElementById("username").value.trim();
  if (userName === '') {
    alert("Please enter you name to continue");
    return;
  }
  names.push(userName);

  storeNames();
  displayMsg();
});
init();

function redirectToAnotherPage() {
  window.location.href = "WEEK 6/QuizQuesters/about.html";
}

function redirectToAnotherPage() {
  window.location.href = "WEEK 6/QuizQuesters/library.html";
}

function redirectToAnotherPage() {
  window.location.href = "WEEK 6/QuizQuesters/index.html";
}
