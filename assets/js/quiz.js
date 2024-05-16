
var categoriesUrl = `https://opentdb.com/api_category.php`;
const selectCategory=document.getElementById("select-category")
//call API thar returns categories of the trivia game
fetch(categoriesUrl)
.then((response)=>response.json())
//check what type of response we get from the API
.then((data) =>{
console.log(data);
//call a function to save the response to the local storage
saveCategoriesToLocalStorage();
function saveCategoriesToLocalStorage() {
localStorage.setItem('categories', JSON.stringify(data.trivia_categories));
return;
}
//loop through an array of categories and adds each category to the dropdown list
for (let category of data.trivia_categories) {
let categoryEl=document.createElement('option');
categoryEl.innerText=category.name;
categoryEl.setAttribute("data-id", category.id)
selectCategory.append(categoryEl);
}
//get a reference to the dropdown list
const categorySelected=document.getElementById("select-category");
console.log(categorySelected);
//add event listenet to the dropdown list
categorySelected.addEventListener('change', function () {
const selectedItem=document.getElementById("select-category").value;
const categoriesArray=JSON.parse(localStorage.getItem('categories'));
console.log(categoriesArray);

//loop through the array of categories saves in the local storage and compares them to selected category
for (let i=0; i < categoriesArray.length; i++) {
    if (selectedItem==categoriesArray[i].name) {
        //once the chosen category is found in local storage - get the id of the category object to use it later to create an API link
        console.log("true");
        let categoryId=categoriesArray[i].id;
        console.log(categoryId);
        quizUrl = `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`;
        console.log(quizUrl);
        fetch (quizUrl)
        .then((resp)=>resp.json())
        .then((quizData)=>{
        console.log(quizData);
        //loop though the array of objects received on the API call and for each array element create an li to display on the page
        for (let element of quizData.results) {
            console.log(element);
            liEl=document.createElement('li')
            question=document.createElement('h4');
            question.innerHTML=element.question;
            liEl.appendChild(question);
            dropdown=document.createElement('select')
            dropdown.setAttribute("data-status","");
            dropdown.setAttribute("class","dropdowns");
            liEl.appendChild(dropdown);
            document.querySelector('ol').appendChild(liEl);
                const answers=[];
                for (let i=0;i<3; i++) {
                    answers[i]={
                        value: element.incorrect_answers[i],
                        status: "incorrect"
                    };
                };
                var correctAnswer={
                    value: element.correct_answer,
                    status:"correct"
                };
                answers.push(correctAnswer);
                console.log(answers);
                       
                //this function shuffles the array of answers, otherwise correct answer would always appear last      
                function shuffle(array) {
                            let currentIndex = array.length;

                            // While there remain elements to shuffle...
                            while (currentIndex != 0) {
                        
                            // Pick a remaining element
                            let randomIndex = Math.floor(Math.random() * currentIndex);
                            currentIndex--;
                            // And swap it with the current element.
                            [ array[currentIndex], array[randomIndex]] = [
                                array[randomIndex], array[currentIndex]];
                            };
                        };
                        shuffle(answers);
                        console.log(answers);
                        for (let i=0; i<answers.length; i++) {
                        let option=document.createElement('option');
                        option.innerHTML=answers[i].value;
                        option.setAttribute("value", answers[i].value);
                        option.setAttribute("data-status", answers[i].status);
                        dropdown.appendChild(option);
                        }
            
            }
        //adding a sumbit btn to the form
        const submitQuizBtn=document.createElement('button');
        submitQuizBtn.innerText="SUBMIT QUIZ";
        submitQuizBtn.setAttribute("id", "submit-quiz");
        document.getElementById("quizform").appendChild(submitQuizBtn);
        document.getElementById("submit-quiz").addEventListener('click',
        //this function renders the quiz score to the page
       function showScore (event) {
        event.preventDefault();
        //hide the quiz container
        console.log( document.getElementById("quiz-container"));
        document.getElementById("quiz-container").setAttribute("style","display:none");
        //create a div inside which the score will be shown
        const scoreDiv=document.createElement('div');
        scoreDiv.setAttribute("id","score");
        document.getElementById("main").appendChild(scoreDiv);

        //loop through the ol the check if each selected answer is corect/incorrect and store correct answers count in a variable
        let ol=document.querySelector('ol');
        const lis = ol.children;
        let scoreCount = 0;
        console.log(lis);
        for (let element of lis) {
          let currentDropdown=element.children[1];
          console.log(currentDropdown);
           let selectedOption=element.children[1].value;
           const allAnswers=currentDropdown.children;
           console.log(selectedOption);
           for (let el of allAnswers) {
            if (el.dataset.status=="correct") {
                var correctOption=el.innerHTML;
            };
           };
           console.log(correctOption);
           if (selectedOption==correctOption) {
             scoreCount++;
            }
           
          };
          console.log(scoreCount);
          scoreDiv.textContent=`Your score is ${scoreCount}/10`;
        
          if (scoreCount > 8) {
            document.getElementById("score-msg").innerText="Congrats, you earned a new avatar!";
            fetchAvatar();

        } else {
            document.getElementById("score-msg").innerText="Better luck next time!";
            const newAvatar = document.createElement('img');
            newAvatar.setAttribute("src", "./assets/images/Bobby-the-Blobfish.png");
            document.getElementById("imageContainer").appendChild(newAvatar);  
            newAvatar.style.width = '200px';
        }  
    });
        })
        }
    };
    });
})

function fetchAvatar() {
    const seed = Math.floor(Math.random() * 10000);  // Generate a random seed for the avatar
    const avatarUrl = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${seed}`;

    let avatarArray = JSON.parse(localStorage.getItem('avatarCollection'));
    if (!avatarArray) {
        avatarArray = [];
    }

    avatarArray.push(avatarUrl);

    localStorage.setItem('avatarCollection', JSON.stringify(avatarArray));
    const newAvatar = document.createElement('img');
    newAvatar.setAttribute("src", avatarUrl);
    document.getElementById("imageContainer").appendChild(newAvatar);
    newAvatar.style.width = '200px';

}

function displayAvatars() {
    let collectionContainter = document.getElementById('collection-container')
    collectionContainter.innerHTML = '';

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