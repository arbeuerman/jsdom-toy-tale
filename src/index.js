let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//make a get request
const toyUrl =  'http://localhost:3000/toys';
let toys = [];
const toyCollection = document.getElementById('toy-collection');
document.addEventListener('DOMContentLoaded', loadAllToys);

function loadAllToys()
{
  fetch(toyUrl)
  .then(response => response.json())
  .then((data) => {
    toys = data;
    displayToys();
  });
}

function displayToys()
{
  toyCollection.innerHTML = '';
  toys.forEach(displayToy);
}

function displayToy(toy)
{
  const toyDiv = document.createElement('div');
  toyDiv.className = 'card';

  const toyHeader = document.createElement('h2');
  toyDiv.appendChild(toyHeader);
  toyHeader.innerText = toy.name; 

  const toyImage = document.createElement('img');
  toyImage.src = toy.image;
  toyImage.className = 'toy-avatar';
  toyDiv.appendChild(toyImage);

  const toyParagraph = document.createElement('p');
  toyParagraph.innerText = toy.likes;
  toyDiv.appendChild(toyParagraph);

  const toyButton = document.createElement('button');
  toyButton.className = 'like-btn';
  toyButton.innerText = 'Like <3';
  toyButton.addEventListener('click', () => updateToyLikes(toy))
  toyDiv.appendChild(toyButton);

  toyCollection.appendChild(toyDiv);
}

//create a new toy
//add an event listener to the form
const toyForm = document.querySelector('form.add-toy-form');
toyForm.addEventListener('submit', submitNewToy);

function submitNewToy(event)
{
  event.preventDefault();
  const name = event.target.name.value;
  const image = event.target.image.value;
  const likes = 0;

  const toyData = {name, image, likes}

  fetch(toyUrl, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify(toyData)
  })
  .then(response => response.json())
  .then(loadAllToys);
}

// get toy button and add event listener
function updateToyLikes(toy)
{
  const singleToyUrl = `${toyUrl}/${toy.id}`;
  toy.likes ++; //don't forget to do that part that you are changing haha
  fetch(singleToyUrl, {
    method: 'PATCH',
    headers : {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(response => response.json())
  .then(() => loadAllToys())
}