
var categoriesUrl = `https://opentdb.com/api_category.php`;
var userToken = JSON.parse(localStorage.getItem("name"))
var tokenUrl = `https://opentdb.com/api.php?amount=10&token=${userToken}`;

var selectCategory=document.getElementById("select-category")
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
var categoryEl=document.createElement('option');
categoryEl.innerText=category.name;
categoryEl.setAttribute("data-id", category.id)
selectCategory.append(categoryEl);
}
//get a reference to the dropdown list
var categorySelected=document.getElementById("select-category");
console.log(categorySelected);
//add event listenet to the dropdown list
categorySelected.addEventListener('change', function () {
    var selectedItem=document.getElementById("select-category").value;
const categoriesArray=JSON.parse(localStorage.getItem('categories'));
console.log(categoriesArray);

//loop through the array of categories saves in the local storage and compares them to selected category
for (let i=0; i < categoriesArray.length; i++) {
    if (selectedItem==categoriesArray[i].name) {
        //once the chosen category is found in local storage - get the id of the category object to use it later to create an API link
        console.log("true");
        var categoryId=categoriesArray[i].id;
        console.log(categoryId);
        quizUrl = `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`;
        console.log(quizUrl);
        fetch (quizUrl)
        .then((resp)=>resp.json())
        .then((quizData)=>{
        console.log(quizData);
        for (let element of quizData.results) {
            console.log(element);
            liEl=document.createElement('li')
            question=document.createElement('h4');
            question.innerText=element.question;
            liEl.appendChild(question);
            dropdown=document.createElement('select')
            dropdown.setAttribute("data-status","");
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
                        var option=document.createElement('option');
                        option.textContent=answers[i].value;
                        option.setAttribute("value", answers[i].value);
                        option.setAttribute("data-status", answers[i].status);
                        dropdown.appendChild(option);
                        }
            
            }
        //adding a sumbit btn to the form
        var submitQuizBtn=document.createElement('button');
        submitQuizBtn.innerText="SUBMIT QUIZ";
        submitQuizBtn.setAttribute("id", "submit-quiz");
        document.getElementById("quizform").appendChild(submitQuizBtn);
    document.getElementById("submit-quiz").addEventListener('click',

       function showScore (event) {
        event.preventDefault();
        document.getElementById("quiz-container").setAttribute("style","display:none");
        //create a div inside which the score will be shown
        var scoreDiv=document.createElement('div');
        scoreDiv.setAttribute("id","score");
        document.getElementById("main").appendChild(scoreDiv);

        //event.preventDefault();
        let ol=document.querySelector('ol');
        const lis = ol.children;
        console.log(lis);
        let scoreCount=0;
        for (let element of lis) {
          var currentDropdown=element.children[1];
          console.log(currentDropdown);
           var selectedOption=element.children[1].value;
           var allAnswers=currentDropdown.children;
           console.log(selectedOption);
           for (let el of allAnswers) {
            if (el.dataset.status=="correct") {
                var correctOption=el.innerText;
            };
           };
           console.log(correctOption);
           if (selectedOption==correctOption) {
             scoreCount++;
            }
           
          };
          console.log(scoreCount);
          scoreDiv.textContent=`Your score is ${scoreCount}/10`;
        
    });
        
        })
        }
    };
    });
})