const searchMeal = () => {
    const inputField = document.getElementById('input-box');
    const inputValue = inputField.value;
    inputField.value = '';

    if(inputValue == ''){
         displayMassage('Invalid input, please give a valid food name!');
    }
    else{
        // load data from server
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
        .catch(error => displayMassage("Sorry! Something went wrong. Try again later."));
    }

} 

const displayMassage = errorMsg =>{
        const msg = document.getElementById('error-msg');
        msg.innerText = errorMsg;

        let myAlert = document.querySelector('.toast');
        let bsAlert = new bootstrap.Toast(myAlert);
        bsAlert.show();
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
                <div class="overflow-hidden">
                    <img src="${item.strMealThumb}" class="card-img-top image" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${item.strMeal}</h5>
                    <p class="card-text text-muted">${item.strInstructions.slice(0,200)}</p>
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
    .catch(error => displayMassage("Sorry! Something went wrong. Try again later."));
}

const displaySingleMeal = item => {
    const containerForMeal = document.getElementById('container-single-item');
    // clear inner content
    containerForMeal.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <img src="${item.strMealThumb}" class="card-img-top" alt="...">
            <button class="btn-close me-2 m-auto cross-btn p-2" data-bs-dismiss="modal"></button>
            <div class="card-body">
                <h5 class="card-title">${item.strMeal}</h5>
                <p class="card-text text-muted">${item.strInstructions.slice(0,200)}</p>
                <p class="card-text"><span class="fw-bold text text-secondary">$</span><span class="text-secondary fw-bold text">${item.idMeal.slice(0,1)}.00 </span></p>
                <div class="d-flex">
                    <div class="me-auto">
                        <a href="${item.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                        <a href="${item.strSource}" target="_blank" class="btn btn-success">Instagram</a>
                    </div>
                    <div>
                        <a href="${item.strSource}" target="_blank" class="btn btn-warning">Order Now</a>
                    </div>
                </div>
            </div>
    `;
    containerForMeal.appendChild(div);
}