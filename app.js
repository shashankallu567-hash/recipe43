// =====================
// Recipe Data
// =====================
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad"
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles"
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza"
    }
];

// =====================
// State
// =====================
let currentFilter = 'all';
let currentSort = 'none';

// =====================
// DOM Selections
// =====================
const recipeContainer = document.querySelector('#recipe-container');
const filterButtons = document.querySelectorAll('[data-filter]');
const sortButtons = document.querySelectorAll('[data-sort]');

// =====================
// Render Functions
// =====================
const createRecipeCard = (recipe) => `
    <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
            <span>⏱️ ${recipe.time} min</span>
            <span class="difficulty ${recipe.difficulty}">
                ${recipe.difficulty}
            </span>
        </div>
        <p>${recipe.description}</p>
    </div>
`;

const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender
        .map(createRecipeCard)
        .join('');
};

// =====================
// Pure Filter Functions
// =====================
const filterByDifficulty = (recipes, level) =>
    recipes.filter(r => r.difficulty === level);

const filterByTime = (recipes, maxTime) =>
    recipes.filter(r => r.time < maxTime);

const applyFilter = (recipes, filter) => {
    switch (filter) {
        case 'easy':
        case 'medium':
        case 'hard':
            return filterByDifficulty(recipes, filter);
        case 'quick':
            return filterByTime(recipes, 30);
        default:
            return recipes;
    }
};

// =====================
// Pure Sort Functions
// =====================
const sortByName = (recipes) =>
    [...recipes].sort((a, b) => a.title.localeCompare(b.title));

const sortByTime = (recipes) =>
    [...recipes].sort((a, b) => a.time - b.time);

const applySort = (recipes, sortType) => {
    switch (sortType) {
        case 'name':
            return sortByName(recipes);
        case 'time':
            return sortByTime(recipes);
        default:
            return recipes;
    }
};

// =====================
// UI Update Functions
// =====================
const updateActiveButtons = () => {
    filterButtons.forEach(btn => {
        btn.classList.toggle(
            'active',
            btn.dataset.filter === currentFilter
        );
    });

    sortButtons.forEach(btn => {
        btn.classList.toggle(
            'active',
            btn.dataset.sort === currentSort
        );
    });
};

const updateDisplay = () => {
    let result = applyFilter(recipes, currentFilter);
    result = applySort(result, currentSort);
    renderRecipes(result);
    updateActiveButtons();
};

// =====================
// Event Listeners
// =====================
const setupEventListeners = () => {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            updateDisplay();
        });
    });

    sortButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentSort = btn.dataset.sort;
            updateDisplay();
        });
    });
};

// =====================
// Initialize App
// =====================
setupEventListeners();
updateDisplay();
const RecipeApp = (function () {
    console.log("RecipeApp initializing...");

    // -----------------------------
    // Private data
    // -----------------------------
    const recipes = [
        {
            id: 1,
            title: "Pasta Primavera",
            ingredients: [
                "Pasta",
                "Olive oil",
                "Garlic",
                "Vegetables",
                "Parmesan"
            ],
            steps: [
                "Boil pasta",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Heat oil",
                        "Add garlic",
                        {
                            text: "Cook vegetables",
                            substeps: ["Add peppers", "Add zucchini", "Season"]
                        }
                    ]
                },
                "Combine pasta and sauce",
                "Serve hot"
            ]
        },
        {
            id: 2,
            title: "Grilled Cheese",
            ingredients: [
                "Bread",
                "Butter",
                "Cheese"
            ],
            steps: [
                "Butter bread",
                "Heat pan",
                "Grill sandwich",
                "Flip and finish"
            ]
        }
        // 👉 add remaining recipes the same way
    ];

    const container = document.getElementById("recipe-container");

    // -----------------------------
    // Recursive steps renderer
    // -----------------------------
    const renderSteps = (steps, level = 0) => {
        let html = "<ul>";

        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li class="step level-${level}">${step}</li>`;
            } else {
                html += `
                    <li class="step level-${level}">
                        ${step.text}
                        ${renderSteps(step.substeps, level + 1)}
                    </li>
                `;
            }
        });

        html += "</ul>";
        return html;
    };

    // -----------------------------
    // Wrapper for steps
    // -----------------------------
    const createStepsHTML = (steps) => {
        return `
            <div class="steps-container" data-container="steps">
                ${renderSteps(steps)}
            </div>
        `;
    };

    const createIngredientsHTML = (ingredients) => {
        return `
            <div class="ingredients-container" data-container="ingredients">
                <ul>
                    ${ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>
            </div>
        `;
    };

    // -----------------------------
    // Card creation
    // -----------------------------
    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card" data-recipe-id="${recipe.id}">
                <h3>${recipe.title}</h3>

                <button class="toggle-btn" data-toggle="steps">
                    Show Steps
                </button>

                <button class="toggle-btn" data-toggle="ingredients">
                    Show Ingredients
                </button>

                ${createStepsHTML(recipe.steps)}
                ${createIngredientsHTML(recipe.ingredients)}
            </div>
        `;
    };

    // -----------------------------
    // Render
    // -----------------------------
    const updateDisplay = () => {
        container.innerHTML = recipes.map(createRecipeCard).join("");
    };

    // -----------------------------
    // Event delegation
    // -----------------------------
    const handleToggleClick = (e) => {
        const button = e.target.closest(".toggle-btn");
        if (!button) return;

        const card = button.closest(".recipe-card");
        const toggleType = button.dataset.toggle;

        const target = card.querySelector(
            `.${toggleType}-container`
        );

        target.classList.toggle("visible");

        button.textContent = target.classList.contains("visible")
            ? `Hide ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`
            : `Show ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`;
    };

    const setupEventListeners = () => {
        container.addEventListener("click", handleToggleClick);
        console.log("Event listeners attached!");
    };

    // -----------------------------
    // Public API
    // -----------------------------
    const init = () => {
        updateDisplay();
        setupEventListeners();
        console.log("RecipeApp ready!");
    };

    return {
        init,
        updateDisplay
    };
})();

RecipeApp.init();

