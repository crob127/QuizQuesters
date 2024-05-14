function redirectToAnotherPage() {
    window.location.href = "WEEK 6/QuizQuesters/about.html";
  }
  
  function redirectToAnotherPage() {
    window.location.href = "WEEK 6/QuizQuesters/library.html";
  }

  function redirectToAnotherPage() {
    window.location.href = "WEEK 6/QuizQuesters/index.html";
  }

// to call api when score is 10/10
// will need to change the playScore value based on what text content is generated from completing the quiz
const playerScore = document.querySelector('#score').textContent

console.log(playerScore)

if (playerScore == "Your Score: 10/10") {
    fetchAvatar()
} else {
    console.log('better luck next time!')
}

// tester button:
// document.getElementById('taskButton').addEventListener('click', function() {
//     fetchAvatar();
// });

function fetchAvatar() {
    const seed = Math.floor(Math.random() * 10000);  // Generate a random seed for the avatar
    const avatarUrl = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${seed}`;

    let avatarArray = JSON.parse(localStorage.getItem('avatarCollection'));
    if (!avatarArray) {
        avatarArray = [];
    }

    avatarArray.push(avatarUrl);

    localStorage.setItem('avatarCollection', JSON.stringify(avatarArray));

    document.getElementById('avatarImage').src = avatarUrl;

}

function displayAvatars() {
    let collectionContainter = document.getElementById('collection-container')
    collectionContainter.innerHTML = ''

    let avatarArray = JSON.parse(localStorage.getItem('avatarCollection'));
        if (avatarArray && avatarArray.length > 0) {
            avatarArray.forEach(avatarUrl => {
            let img = document.createElement('img');
            img.src = avatarUrl;
            img.style.width = '100px'
            img.style.margin = '5px'
            collectionContainter.appendChild(img);
        });
        } else {
            collectionContainter.innerText = 'No Quiz Questers Collected. Win challenges to add to your library!'
        }
    
}

document.addEventListener('DOMContentLoaded', function() {
    displayAvatars(); // display all avatars stored in local storage when the page loads
});