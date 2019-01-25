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
  //click - wine
  if (event.target.id === "btn-wine") {
    let wineDivArea = document.querySelector('#wine-div');

    if (wineDivArea.style.display === "none") {
      wineDivArea.style.display = "block";
    } else {
      wineDivArea.style.display = "none";
    }
    wineDivArea.innerHTML = ""

    let createWineUl = document.createElement('ul');
    createWineUl.className = "wine-ul"
    wineDivArea.append(createWineUl)

    let selectedValWine = event.target.innerText.toLowerCase();
    fetch('http://localhost:3000/api/v1/alcohols')
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      // console.log(data)
      filterDrinksForValOnly(data, selectedValWine).forEach((el) => {
        renderWineFilteredList(el)
      })
    })

  } else if (event.target.id === "btn-beer") {
    //click - beer
       let beerDivArea = document.querySelector('#beer-div');
       if (beerDivArea.style.display === "none") {
         beerDivArea.style.display = "block";
       } else {
         beerDivArea.style.display = "none";
       }
       beerDivArea.innerHTML = ""

       let createBeerUl = document.createElement('ul');
       createBeerUl.className = "beer-ul";
       beerDivArea.append(createBeerUl)
       let selectedValBeer = event.target.innerText.toLowerCase();

      fetch('http://localhost:3000/api/v1/alcohols')
      .then((res) => {
        return res.json()
      })
      .then((data) => {

      filterDrinksForValOnly(data, selectedValBeer).forEach((el) => {
      renderBeerFilteredList(el)
      })
    })

  } else if (event.target.id === "btn-mixed") {
    //click - mixed drinks
    let mixedDivArea = document.querySelector('#mixed-drinks-div');

    if (mixedDivArea.style.display === "none") {
      mixedDivArea.style.display = "block";
    } else {
      mixedDivArea.style.display = "none";
    }

    mixedDivArea.innerHTML = "";
    let createMixedDrinkUl = document.createElement('ul');
    createMixedDrinkUl.className = "mixed-ul"
    //append the ul to the div
    mixedDivArea.append(createMixedDrinkUl)
    let selectedValMixed = event.target.innerText.toLowerCase();

    fetch('http://localhost:3000/api/v1/alcohols')
      .then((res) => {
        return res.json()
      })
      .then((data) => {

        filterMixedDrinksForValOnly(data).forEach((el) => {
          renderMixedFilteredList(el)
        })
      })

  } else if (event.target.id === "btn-shots") {
    //click - shots
    let shotsDivArea = document.querySelector('#shots-div');
    if (shotsDivArea.style.display === "none") {
      shotsDivArea.style.display = "block";
    } else {
      shotsDivArea.style.display = "none";
    }
    shotsDivArea.innerHTML = "";
    let createShotsUl = document.createElement('ul');
    createShotsUl.className = "shots-ul"
    //append the ul to the div
    shotsDivArea.append(createShotsUl)
    let selectedValShots = event.target.innerText.toLowerCase();

    fetch('http://localhost:3000/api/v1/alcohols')
      .then((res) => {
        return res.json()
      })
    .then((data) => {

      filterDrinksForValOnly(data, selectedValShots).forEach((el) => {
        renderShotsFilteredList(el)
      })
    })
  }


}

function filterMixedDrinksForValOnly(arr) {
  let arrOfDrinkSelected = arr.filter((el) => {
    return el.category === 'mixed';
  })
  return arrOfDrinkSelected;
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
  wineLi.style = "list-style-type: none"
  wineLi.dataset.id = obj.id
  wineLi.id = `wine-${obj.id}`
  wineUl.innerHTML += dropdown()
  $('.ui.dropdown')
  .dropdown()
  ;
  wineLi.innerText = obj.name
  //append li to the ul
  wineUl.appendChild(wineLi)
}
function renderBeerFilteredList(obj) {
  let beerUl = document.querySelector('.beer-ul');
  //create li
  let beerLi = document.createElement('li');
  beerLi.style = "list-style-type: none"
  beerLi.dataset.id = obj.id
  beerLi.id = `beer-${obj.id}`
  beerLi.innerText = obj.name
  beerUl.innerHTML += dropdown()
  $('.ui.dropdown')
  .dropdown()
  ;
  //append li to the ul
  beerUl.appendChild(beerLi)
}
function renderMixedFilteredList(obj) {
  let mixedUl = document.querySelector('.mixed-ul');
  //create li
  let mixedLi = document.createElement('li');
  mixedLi.style = "list-style-type: none"
  mixedLi.dataset.id = obj.id
  mixedLi.id = `mixed-${obj.id}`
  mixedLi.innerText = obj.name
  mixedUl.innerHTML += dropdown()
  $('.ui.dropdown')
  .dropdown()
  ;
  //append li to the ul
  mixedUl.appendChild(mixedLi)
}

function renderShotsFilteredList(obj) {
  let shotsUl = document.querySelector('.shots-ul');
  //create li
  let shotsLi = document.createElement('li');
  shotsLi.style = "list-style-type: none"
   shotsLi.dataset.id = obj.id
   shotsLi.id = `shots-${obj.id}`
   shotsLi.innerText = obj.name
   shotsUl.innerHTML += dropdown()
   $('.ui.dropdown')
   .dropdown()
   ;
  //append li to the ul
 shotsUl.appendChild(shotsLi);
}

function dropdown() {
  return `<div class="ui selection dropdown">
  <input type="hidden" name="gender">
  <i class="dropdown icon"></i>
  <div class="default text">How Many Drinks</div>
    <div class="menu">
      <div class="item" data-value="0">0</div>
      <div class="item" data-value="1">1</div>
      <div class="item" data-value="2">2</div>
      <div class="item" data-value="3">3</div>
      <div class="item" data-value="4">4</div>
      <div class="item" data-value="5">5</div>
      <div class="item" data-value="6">6</div>
      <div class="item" data-value="7">7</div>
      <div class="item" data-value="8">8</div>
      <div class="item" data-value="9">9</div>
      <div class="item" data-value="10">10???</div>
    </div>
  </div>`
}
