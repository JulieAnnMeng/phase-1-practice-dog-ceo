console.log('%c HI', 'color: firebrick');

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

const listBreeds = document.querySelector("#dog-breeds");
const dropDown = document.querySelector("#breed-dropdown");
const optionSelect = document.getElementsByTagName('option');

let breeds;
let dogBreeds = [];
let dogImages;
let dogFilter = [];


//should have DOMContentLoaded as event listener. it is best practice.

fetch(imgUrl)
.then(response => response.json())
.then(dogData => {
    dogImages = dogData['message'];
    addImages(dogImages);
    console.log(dogImages);
})
.catch(error => console.log('error', error))


 function addImages(dogs){
    dogs.forEach(dogURL => {
        const newImg = document.createElement('img');
        newImg.src = dogURL;
        const div = document.querySelector("#dog-image-container");
        div.append(newImg);
    })
}
 
fetch(breedUrl)
    .then(response => response.json())
    .then(dogBreeds => {
        breeds = dogBreeds['message'];
        addList(breeds);
    })

function addList(dogs){
    for(const breed in dogs){
        const li = document.createElement('li');
        li.textContent = breed;
        listBreeds.appendChild(li);
        li.addEventListener('click', (e) => {
            li.style.color = 'blue';
            }
        )
        dropDown.addEventListener('change', (e) => {
            //grab all li, find all that do not match first letter to select and hide them.
            let liElements = document.querySelectorAll('li');
            liElements.forEach(function(li){
                if(li.textContent.slice(0,1) !== e.target.value){
                    li.style.display = 'none'
                } else {li.style.removeProperty('display')}
            })            
          
        })
    }
}
   