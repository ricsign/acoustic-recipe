// Use this sample to create your own voice commands
intent('hello world', p => {
    p.play('(hello|hi there)');
});

// intent('Try a test', (p) => {
//     p.play({command: 'test'});
// })



const API_KEY = process.env.REACT_APP_RECIPE_API_KEY;
const API_HOST = process.env.REACT_APP_RECIPE_API_HOST;

let RECIPE_API_URL = `https://edamam-recipe-search.p.rapidapi.com/search`;
const offset = 9;
const ingredientsList = ["chicken", "beef", "egg", "pork", "beef", "cheese", "milk", "bacon", "shrimp", "lobster", "scallop", "lamb", "crab", "oyster", "seafood", "ham",
                       "corn", "mushrooms", "beets", "pumpkin", "asparagus", "bean", "broccoli", "cabbage", "carrot", "cauliflower", "celery", "cucumber", "eggplant", "lettuce", "onion", "pea", "potato", "zucchini", "arugala", "almonds", "nuts", "tofu",
                       "rice", "noodles", "pasta", "salad", "pizza", "pancake", "lasagna", "jambalaya", "stew", "soup", "dumplings", "curry", "buritto",
                       "coconut", "orange", "apple", "strawberry", "blueberry", "cherry", "avocado", "kiwi",
                       "cake", "bread", "coffee", "bubble tea", "juice", "waffle", "donut", "toast", "dessert"
                      ];
let fromIndexes = new Map(); // each pair is (ingredient name, its "from" index)
let ingredient;


// Search recipe with ingredients given by the user
intent('(Give me|Try|Show me|) (the|some|more|) (recipe_) (about|of|with|related to|for|) $(ingredient* (.*))', '(Give me|Try|Show me|) (the|some|more|) $(ingredient* (.*)) (recipe_)',
async (p) => {
    ingredient = p.ingredient.value;
    if(!ingredient) return;
    ingredient = ingredient.toLowerCase();
    if(ingredient === 'random') {
        ingredient = ingredientsList[Math.floor(Math.random()*ingredientsList.length)];
    }
    
    let toIndex;
    if(!fromIndexes.get(ingredient)){
        toIndex = offset;
    } else {
        toIndex = fromIndexes.get(ingredient) + offset;
    }
     

    const res = await api.axios({
        url: RECIPE_API_URL,
        method: 'GET',
        params: {
            q: ingredient,
            from: toIndex - offset,
            to: toIndex,
        },
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST,
        },
    })
    .then((res) => {
//         console.log(res.data);
        fromIndexes.set(ingredient, toIndex);
        p.play(`(Okay,|) here are (the|some) ${ingredient} recipes.`);
        p.play({command: 'newRecipes', recipes: res.data});
        
        p.play(`Would you like more ${ingredient} recipes?`);
        p.then(moreRecipes);
    })
    .catch(err => console.log(err));
        
});


const moreRecipes = context(() => {
    intent('(yes|sure|ok|fine|yep)', async (p) => {
        let toIndex;
        if(!fromIndexes.get(ingredient)){
            toIndex = offset;
        } else {
            toIndex = fromIndexes.get(ingredient) + offset;
        }


        const res = await api.axios({
            url: RECIPE_API_URL,
            method: 'GET',
            params: {
                q: ingredient,
                from: toIndex - offset,
                to: toIndex,
            },
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST,
            },
        })
        .then((res) => {
            fromIndexes.set(ingredient, toIndex);
            p.play(`(Okay,|) here are more ${ingredient} recipes.`);
            p.play({command: 'newRecipes', recipes: res.data});

            p.play(`Would you like some more?`);
            p.then(moreRecipes);
        })
        .catch(err => console.log(err));
    })
    
    intent("(no|nope|nah)", (p) => {
        p.play("(Okay,|Sure,|) sounds good (to me|). (Let me know if you need anything else.|)")
    })
})
