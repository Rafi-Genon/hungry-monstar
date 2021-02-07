// fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=sa')
// .then(res => res.json())
// .then(data => console.log(data))

document.getElementById("submit-btn").addEventListener('click', function () {
    const inputMeal = document.getElementById("input-meal").value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById("search-result").innerHTML = `<h2 class="text-center text-success">You are lucky your '${inputMeal}' meal is ready</h2>`
            if (data.meals == null) {
                document.getElementById("search-result").innerHTML = `<h2 class="text-center text-danger">Sorry '${inputMeal}' is not found</h2>`
            }
            else {
                const mealsItem = document.getElementById("meals-item").innerHTML = data.meals.map(meal => `<h3>${meal.strMeal}</h3>`)
            }
        })
    document.getElementById("input-meal").value = ''

})