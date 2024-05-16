function displayAvatars() {
    let collectionContainter = document.getElementById('collection-container')
    collectionContainter.innerHTML = ''

    let avatarArray = JSON.parse(localStorage.getItem('avatarCollection'));
        if (avatarArray && avatarArray.length > 0) {
            avatarArray.forEach(avatarUrl => {
            let img = document.createElement('img');
            img.src = avatarUrl;
            img.style.width = '150px'
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