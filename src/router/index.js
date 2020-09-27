import { createRouter, createWebHistory } from 'vue-router';
import Menu from '../views/Menu.vue';

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu,
    alias: '/menu',
  },
  {
    path: '/recipies',
    name: 'Recipies',
    component: Menu,
  },
  {
    path: '/pantry',
    name: 'Pantry',
    component: Menu,
  },
  {
    path: '/shopping-list',
    name: 'ShoppingList',
    component: Menu,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
