const userInfo = {};

document.addEventListener("DOMContentLoaded", () => {
  let yesNoButtonDiv = document.querySelector(".ui.large.buttons")
  let weightDiv = document.querySelector('#ui-input')
  let typeDrinkDiv = document.querySelector('#drink-type')
  // console.log(typeDrinkDiv)

  yesNoButtonDiv.addEventListener("click", (e)=>{
      if (e.target.className === 'ui button') {
        let selectedFMButton = e.target.innerText;
        userInfo['sex'] = selectedFMButton.toLowerCase(); 
      }
  })

  weightDiv.addEventListener('change', inputWeightHandler)
  typeDrinkDiv.addEventListener('click', handleTypesOfDrinks);
})

function inputWeightHandler (event) {
  console.log(event.target.value)
   let userWeightVal = event.target.value;
   userInfo['weight'] = userWeightVal
}

function handleTypesOfDrinks (event) {
  // console.log(event.target)
  if (event.target.className === "btn-wine") {
    let wineDivArea = document.querySelector('#wine-div');
    wineDivArea.innerHTML = ""
    let createWineUl = document.createElement('ul');
    createWineUl.className = "wine-ul"
    //append the ul to the div
    wineDivArea.append(createWineUl)
    let selectedValWine = event.target.innerText.toLowerCase();
    // fetch alcohols of type of wine
    fetch('http://localhost:3000/api/v1/alcohols')
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      // console.log(data)
      filterDrinksForValOnly(data, selectedValWine).forEach((el) => {
        renderWineFilteredList(el)
        wineDivArea.style.display = "block"

      })
    })
  } else if (event.target.className === "btn-beer") {
       let beerDivArea = document.querySelector('#beer-div');
       console.log(beerDivArea)

       beerDivArea.innerHTML = ""
       let createBeerUl = document.createElement('ul');
       createBeerUl.className = "beer-ul";
      // append the ul to the div
       beerDivArea.append(createBeerUl)
       let selectedValBeer = event.target.innerText.toLowerCase();

      fetch('http://localhost:3000/api/v1/alcohols')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
      // console.log(data)
      filterDrinksForValOnly(data, selectedValBeer).forEach((el) => {
      renderBeerFilteredList(el)
      beerDivArea.style.display = "block"
      })
    }) //end of fetch
  }


}

function filterDrinksForValOnly(arr, val) {
  let arrOfDrinkSelected = arr.filter((el) => {
    return el.category === val;
  })
  return arrOfDrinkSelected;
}

function renderWineFilteredList(obj) {
  let wineUl = document.querySelector('.wine-ul');
  //create li
  let wineLi = document.createElement('li');
  wineLi.dataset.id = obj.id
  wineLi.id = `wine-${obj.id}`
  wineLi.innerText = obj.name
  //append li to the ul
  wineUl.appendChild(wineLi)
}
function renderBeerFilteredList(obj) {
  let beerUl = document.querySelector('.beer-ul');
  //create li
  let beerLi = document.createElement('li');
  beerLi.dataset.id = obj.id
  beerLi.id = `wine-${obj.id}`
  beerLi.innerText = obj.name
  //append li to the ul
  beerUl.appendChild(beerLi)
}