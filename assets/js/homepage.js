function displayMsg() {
    const helloMsg = document.createElement('h2');
    helloMsg.textContent = "Hello, " + document.getElementById("username").value;
    document.body.appendChild(helloMsg);
    const quizLink=document.createElement('a');
    quizLink.setAttribute("href", "./quiz.html");
    document.body.appendChild(quizLink);
    const playBtn=document.createElement('button');
    playBtn.textContent="START QUIZ";
    playBtn.setAttribute("style", "background: red; color: white; padding: 20px;");
    quizLink.appendChild(playBtn);
   
  };
function storeName() {
  var userName = document.getElementById("username").value;
  localStorage.setItem('name', JSON.stringify(userName));
}
document.getElementById("form").addEventListener('submit', function (event) {
  event.preventDefault();

  var userInput = document.getElementById("username").value.trim();
  if (userInput === '') {
    alert("Please enter you name to continue");
    return;
  }

  storeName();
  displayMsg();
});
//Add code: attach eventListener to the playBtn to call Trivia API when click on the button
