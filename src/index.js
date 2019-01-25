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
  } else if (event.target.className === "btn-mixed") {
    let mixedDivArea = document.querySelector('#mixed-drinks-div');
    
    mixedDivArea.innerHTML = "";
    let createMixedDrinkUl = document.createElement('ul');
    createMixedDrinkUl.className = "mixed-ul"
    //append the ul to the div
    mixedDivArea.append(createMixedDrinkUl)
    let selectedValMixed = event.target.innerText.toLowerCase();
    console.log(selectedValMixed)

    fetch('http://localhost:3000/api/v1/alcohols')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        // console.log(data)
        filterMixedDrinksForValOnly(data).forEach((el) => {
          console.log(el)
          renderMixedFilteredList(el)
          mixedDivArea.style.display = "block"
        })
      })//fetch
  } else if (event.target.className === "btn-shots") {
    let shotsDivArea = document.querySelector('#shots-div');
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
        // console.log(data)
      filterDrinksForValOnly(data, selectedValShots).forEach((el) => {
        renderShotsFilteredList(el)
        shotsDivArea.style.display = "block"

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
  beerLi.id = `beer-${obj.id}`
  beerLi.innerText = obj.name
  //append li to the ul
  beerUl.appendChild(beerLi)
}
function renderMixedFilteredList(obj) {
  let mixedUl = document.querySelector('.mixed-ul');
  //create li
  let mixedLi = document.createElement('li');
  mixedLi.dataset.id = obj.id
  mixedLi.id = `mixed-${obj.id}`
  mixedLi.innerText = obj.name
  //append li to the ul
  mixedUl.appendChild(mixedLi)
}

function renderShotsFilteredList(obj) {
  let shotsUl = document.querySelector('.shots-ul');
  //create li
  let shotsLi = document.createElement('li');
 shotsLi.dataset.id = obj.id
 shotsLi.id = `shots-${obj.id}`
 shotsLi.innerText = obj.name
  //append li to the ul
 shotsUl.appendChild(shotsLi);
}