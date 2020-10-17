export default {
  state: () => ([
    {
      id: '1',
      name: 'Placeholder Recipe',
    },
  ]),
  getters: {
    getRecipeById: (state) => (id) => state.find((recipe) => recipe.id === id),
  },
  mutations: {
    setStartDay(state, { day }) {
      state.startDay = day;
    },
  },
};
