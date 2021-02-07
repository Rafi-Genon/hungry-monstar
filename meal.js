// global variable
const mealsItem = document.getElementById("meals-item")
const mealsInfo = document.getElementById("meals-info")

// submit your meal
document.getElementById("submit-btn").addEventListener('click', function () {
    const inputMeal = document.getElementById("input-meal").value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`)
        .then(res => res.json())
        .then(data => {
            if (data.meals == null) {

                // if your inputed meal doest match with api then it will say error
                document.getElementById("search-result").innerHTML = `<h2 class="text-center bg-danger p-2 text-white">Sorry '${inputMeal}' meal is not found</h2>`
                mealsInfo.innerHTML =''
                mealsItem.innerHTML =''
            }
            else {
                mealsInfo.innerHTML =''
                document.getElementById("search-result").innerHTML = `<h2 class="text-center text-success">You are lucky your '${inputMeal}' meal is ready</h2>`
                
                // this will push available meal in api
                // in 21 line I add an event handler
                mealsItem.innerHTML = data.meals.map(meal => `
                <div class="meal-thubnail-title shadow" onclick="displayMealDetails(${meal.idMeal})">
                    <img src="${meal.strMealThumb}"/>
                    <h5 class="p-2">${meal.strMeal}</h5>
                </div>`
                )
                    .join('');
            }
        })
    document.getElementById("input-meal").value = ''

})

// if anyone clicked any meal item then this function will start
const displayMealDetails = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => renderMealDetails(data))
}

const renderMealDetails = info => {
    mealsInfo.innerHTML = info.meals.map(meal => `
<div class="meal-details shadow p-2">
    <img src="${meal.strMealThumb}"/>
    <h3 class="py-3 fw-bold">${meal.strMeal}</h3>
    <h5 class="fw-bold pb-1">Ingredients</h5>
    <p class="text-secondary"><i class="fa fa-check-circle" style="font-size:22px;color:red"></i>  ${meal.strIngredient1}</p>
    <p class="text-secondary"><i class="fa fa-check-circle" style="font-size:22px;color:red"></i>  ${meal.strIngredient2}</p>
    <p class="text-secondary"><i class="fa fa-check-circle" style="font-size:22px;color:red"></i>  ${meal.strIngredient3}</p>
    <p class="text-secondary"><i class="fa fa-check-circle" style="font-size:22px;color:red"></i>  ${meal.strIngredient4}</p>
    <p class="text-secondary"><i class="fa fa-check-circle" style="font-size:22px;color:red"></i>  ${meal.strIngredient5}</p>
    <p class="text-secondary"><i class="fa fa-check-circle" style="font-size:22px;color:red"></i>  ${meal.strIngredient6}</p>
</div>`
    )
}