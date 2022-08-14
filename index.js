// ReadableStream => faire appel à la methode json pour être lisible en js : res.json
// on se ballade dans un objet avec un point : data.meals or data.meals[0]

// constantes
const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
// variable évolutive
let meals = []; //fetchMeals s'occupe d'incrémenter la data

// fetch logic // function pour fetché
async function fetchMeals(search) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));

  console.log(meals);
}

// fonction asynchrone pour affiché
async function mealsDisplay() {
  // se prémunir
  if (meals === null) {
    result.innerHTML = "<h2>Aucun résultats</h2>";
  } else {
    meals.length <= 12; // traiter le nbre de plats

    // se lancer l'affichage, innerHTML => injecter dans les UL, le résultat de meals.map, chaque repas individuel, je l'appelle meal, puis ``, quand je dis meal je suis à l'entrée de l'objet
    // ce map se déclanche que quand le formulaire est soumit
    // à chaque tour de map, tu m'exécutes la boucle for, pour chacune des recettes, il va aller chercher strIngredient1, ...2. Ensuite ce creer des sous-variables
    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];

        for (i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            // console.log(true);
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            ingredients.push(`<li>${ingredient} - ${measure}</li>`);
          }
        }

        console.log(ingredients);

        return `
            <li class="card">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strArea}</p>
            <img src="${meal.strMealThumb}" alt="photo ${meal.strMeal}">
            <ul>${ingredients.join("")}</ul>
            </li>
            `;
      })
      .join("");
  }
}

// EventListeners, ce qui déclenche l'application

// se récupérer ce qu'il y a de taper dans l'input
input.addEventListener("input", (e) => {
  // fetchMeals(e.target.value);
  fetchMeals(e.target.value).then(() => mealsDisplay());
});

// la soumission du formulaire déclenche, d'aller chercher les repas, puis l'affichage du repas
// c'est uniquement que le user valide qu'on affiche les repas
form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
