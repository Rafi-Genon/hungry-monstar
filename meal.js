const mealsItem = document.getElementById("meals-item")
const mealsInfo = document.getElementById("meals-info")
document.getElementById("submit-btn").addEventListener('click', function () {
    const inputMeal = document.getElementById("input-meal").value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.getElementById("search-result").innerHTML = `<h2 class="text-center text-success">You are lucky your '${inputMeal}' meal is ready</h2>`
            if (data.meals == null) {
                document.getElementById("search-result").innerHTML = `<h2 class="text-center text-danger">Sorry '${inputMeal}' is not found</h2>`
            }
            else {
                mealsItem.innerHTML = data.meals.map(meal => `
                <div class="meal-thubnail-title shadow" onclick="titleClicked(${meal.idMeal})">
                    <img src="${meal.strMealThumb}"/>
                    <h4 class="p-2">${meal.strMeal}</h4>
                </div>`
                )
                    .join('');
            }
        })
    document.getElementById("input-meal").value = ''

})

const titleClicked = id => {
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