<template>
    <table class="menu">
      <tr>
        <th class="day-height-align"></th>
        <td class="menu-days-wrapper" rowspan="5" colspan="7">
          <table class="menu-days">
            <tr>
              <th class="day" scope="col" v-for="day in days" :key="day">{{ day.label }}</th>
            </tr>
            <tr v-for="meal in meals" :key="meal.id" :id="`meal-row-${meal.id}`">
              <td v-for="day in days" :key="day.id">
                <ul class="recipe-list">
                  <li
                    v-for="recipeId in getRecipiesForMeal(day.id, meal.id)"
                    :key="recipeId"
                    class="recipe"
                  >
                    <button
                      class="pure-button delete-recipe-button"
                      @click="() => onRecipeRemove(recipeId, day.id, meal.id)"
                    >
                      &times;
                    </button>
                    {{ getRecipeById(recipeId).name }}
                  </li>
                </ul>
                <Dropdown
                  placeholder="[Add Recipe]"
                  noResultsText="No recipes"
                  class="recipe-search"
                  :data="getRecipeOptions(day.id, meal.id)"
                  @select="(result) => onRecipeSelect(result.value, day.id, meal.id)"
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr v-for="meal in meals" :key="meal.id">
        <th class="meal" scope="row" :style="{ height: `${getMealRowHeight(meal.id)}px` }">
          {{ meal.label }}
        </th>
      </tr>
    </table>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Dropdown from '@/components/Dropdown.vue';

export default {
  name: 'Menu',
  components: {
    Dropdown,
  },
  props: {
    startDay: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      meals: [
        { id: 0, label: 'Breakfast' },
        { id: 1, label: 'Lunch' },
        { id: 2, label: 'Dinner' },
        { id: 3, label: 'Snacks' },
      ],
      mealRowHeights: [0, 0, 0, 0],
    };
  },
  computed: {
    days() {
      const days = [
        { id: 0, label: 'Sunday' },
        { id: 1, label: 'Monday' },
        { id: 2, label: 'Tuesday' },
        { id: 3, label: 'Wednesday' },
        { id: 4, label: 'Thursday' },
        { id: 5, label: 'Friday' },
        { id: 6, label: 'Saturday' },
      ];

      return [...days.slice(this.startDay), ...days.slice(0, this.startDay)];
    },
    recipeOptions() {
      return this.recipes.map((recipe) => ({
        value: recipe.id,
        label: recipe.name,
      }));
    },
    ...mapState({
      recipes: (state) => state.recipes,
    }),
    ...mapGetters([
      'getRecipeById',
      'getRecipiesForMeal',
    ]),
  },
  methods: {
    getRecipeOptions(day, meal) {
      const alreadyChosen = this.getRecipiesForMeal(day, meal);

      return this.recipes
        .filter((recipe) => !alreadyChosen.includes(recipe.id))
        .map((recipe) => ({
          value: recipe.id,
          label: recipe.name,
        }));
    },
    getMealRowHeight(meal) {
      return this.mealRowHeights[meal];
    },
    updateMealRowHeight(meal) {
      this.mealRowHeights[meal] = this.mealRows[meal].offsetHeight;
    },
    onRecipeSelect(recipeId, day, meal) {
      this.$store.commit('addRecipeToMenu', { recipeId, day, meal });
      this.$nextTick(() => this.updateMealRowHeight(meal));
    },
    onRecipeRemove(recipeId, day, meal) {
      this.$store.commit('removeRecipeFromMenu', { recipeId, day, meal });
      this.$nextTick(() => this.updateMealRowHeight(meal));
    },
  },
  mounted() {
    this.mealRows = this.meals.map((meal) => document.getElementById(`meal-row-${meal.id}`));
    this.meals.forEach((meal) => this.updateMealRowHeight(meal.id));
  },
};
</script>

<style scoped>
table {
  border-spacing: 0;
  table-layout: fixed;
  box-sizing: border-box;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem;
  box-sizing: border-box;
}

.menu {
  width: 100%;
}

.menu > tr > th {
  width: 8rem;
  border-right: 2px solid #cbcbcb;
  text-align: left;
}

.meal {
  vertical-align: top;
  border-top: 2px solid #cbcbcb;
}

.day, .day-height-align {
  height: 3rem;
}

.day:not(:first-child) {
  border-left: 2px solid #cbcbcb;
}

.menu-days {
  width: auto;
  min-width: 100%;
}

.menu-days th {
  min-width: 12rem;
  border-bottom: 2px solid #cbcbcb;
}

.menu-days td {
  vertical-align: bottom;
}

.menu-days-wrapper {
  padding: 0;
  overflow-x: auto;
}

.recipe-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-align: left;
}

.recipe {
  min-height: calc(3rem + 2px);
  line-height: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #777777;
  border-radius: 2px;
  cursor: pointer;
}

.recipe:hover {
  box-shadow: 0 0 0 1px #777777;
}

.delete-recipe-button {
  width: 1.5rem;
  line-height: 1.5rem;
  margin: -0.5rem -0.5rem 0 0.5rem;
  padding: 0;
  float: right;
  background-color: #ca3c3c;
  color: white;
  border-radius: 0 1px 0 0;
}

::v-deep .recipe-search::placeholder {
  text-align: center;
}
</style>
