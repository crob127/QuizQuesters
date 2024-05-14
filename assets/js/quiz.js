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