export default {
  state: () => ({
    startDay: 1,
    // Recipes are mapped by [0 - 6][0 - 3] where:
    // 0 - 6 is Sunday to Saturday
    // 0 - 3 is breakfast, lunch, dinner, snacks.
    recipes: [0, 1, 2, 3, 4, 5, 6].map(() => ([0, 1, 2, 3].map(() => []))),
  }),
  getters: {
    getRecipiesForMeal: (state) => (day, meal) => state.recipes[day][meal],
  },
  mutations: {
    setStartDay(state, { day }) {
      state.startDay = day;
    },
    addRecipeToMenu(state, { day, meal, recipeId }) {
      state.recipes[day][meal].push(recipeId);
    },
    removeRecipeFromMenu(state, { day, meal, recipeId }) {
      state.recipes[day][meal] = state.recipes[day][meal].filter((id) => id !== recipeId);
    },
  },
};
