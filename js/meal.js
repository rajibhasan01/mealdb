const searchMeal = () => {
    const inputField = document.getElementById('input-box');
    const inputValue = inputField.value;
    inputField.value = '';

    if(inputValue == ''){
        // need to write some code
        //
        // 
        // 
    }
    else{
        // load data from server
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => displayError(error));
    }

} 

const displayError = error => {
    // need to write some code
    // 
    // 
    // 
}

const displayMeals = items => {
    const container = document.getElementById('result-container');
    // clear innertext of div
    container.textContent = '';
    console.log(items)
    items.forEach(item => {
       const div = document.createElement('div');
       div.classList.add('col');
       div.innerHTML = `
            <div onclick = "loadItem(${item.idMeal})" class="card overflow-hidden" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <img src="${item.strMealThumb}" class="card-img-top image" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.strMeal}</h5>
                    <p class="card-text">${item.strInstructions.slice(0,200)}</p>
                </div>
            </div>
       `;
       container.appendChild(div);
    })
}

const loadItem = id =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySingleMeal(data.meals[0]))
    .catch(error => displayError(error));
}

const displaySingleMeal = item => {
    const containerForMeal = document.getElementById('container-single-item');
    // clear inner content
    containerForMeal.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <img src="${item.strMealThumb}" class="card-img-top" alt="...">
            <span class="cross-btn fs-1 text" data-bs-dismiss="modal">x</span>
            <div class="card-body">
                <h5 class="card-title">${item.strMeal}</h5>
                <p class="card-text">${item.strInstructions.slice(0,200)}</p>
                <div class="d-flex">
                    <div class="me-auto">
                        <a href="${item.strYoutube}" target="_blank" class="btn btn-primary">Youtube</a>
                        <a href="${item.strSource}" target="_blank" class="btn btn-primary">Instagram</a>
                    </div>
                    <div>
                        <a href="${item.strSource}" target="_blank" class="btn btn-warning">Order Now</a>
                    </div>
                </div>
            </div>
    `;
    containerForMeal.appendChild(div);
}