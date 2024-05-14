
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
        quizUrl = `https://opentdb.com/api.php?amount=10&category=${categoryId}`;
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
            liEl.appendChild(dropdown);
            document.querySelector('ol').appendChild(liEl);
           
            if (element.type=="boolean") {
                console.log(element.type);
                var optionTrue=document.createElement('option');
                optionTrue.setAttribute("value", true);
                optionTrue.innerText="true";
                dropdown.appendChild(optionTrue);
                var optionFalse=document.createElement('option');
                optionFalse.innerText="false";
                optionFalse.setAttribute("value", false);
                dropdown.appendChild(optionFalse);
            } else if (element.type=="multiple") {
                const answers=[];
                for (let i=0;i<3; i++) {
                    answers[i]=element.incorrect_answers[i];
                }
                answers.push(element.correct_answer);
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
                            }
                        }
                        shuffle(answers);
                        console.log(answers);
                        for (let i=0; i<answers.length; i++) {
                        var option=document.createElement('option');
                        option.textContent=answers[i];
                        option.setAttribute("value", answers[i]);
                        dropdown.appendChild(option);
                        }
                        
                        
                


            }
            }
        //adding a sumbit btn to the form
        submitQuizBtn=document.createElement('button');
        submitQuizBtn.innerText="SUBMIT QUIZ";
        submitQuizBtn.setAttribute("id", "submit-quiz");
        document.getElementById("quizform").appendChild(submitQuizBtn);
        })
    }
    }
})
});
/* document.getElementById(submitQuizBtn).addEventListener('click', function() {
    var results=document.createElement('div')
})*/
=======
/*https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple film 10 questions medium */


const apiurl1 = "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple"

fetch(apiUrl1)
  .then(response => {
    if (!response.ok) {
      throw new Error('It no Worky');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


/*https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple general knowledge 10 questions medium */

  


const apiurl2 = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"

fetch(apiUrl2)
  .then(response => {
    if (!response.ok) {
      throw new Error('It no Worky');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

