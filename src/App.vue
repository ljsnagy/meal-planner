<template>
  <div class="container">
    <h1>Meal Planner</h1>
    <nav class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        <router-link to="/" custom v-slot="{ navigate, href, isActive }">
          <li class="pure-menu-item" :class="isActive && 'pure-menu-selected'">
            <a :href="href" @click="navigate" class="pure-menu-link">
              Menu
            </a>
          </li>
        </router-link>
        <router-link to="/recipies" custom v-slot="{ navigate, href, isActive }">
          <li class="pure-menu-item" :class="isActive && 'pure-menu-selected'">
            <a :href="href" @click="navigate" class="pure-menu-link">
              Recipies
            </a>
          </li>
        </router-link>
        <router-link to="/pantry" custom v-slot="{ navigate, href, isActive }">
          <li class="pure-menu-item" :class="isActive && 'pure-menu-selected'">
            <a :href="href" @click="navigate" class="pure-menu-link">
              Pantry
            </a>
          </li>
        </router-link>
        <router-link to="/shopping-list" custom v-slot="{ navigate, href, isActive }">
          <li class="pure-menu-item" :class="isActive && 'pure-menu-selected'">
            <a :href="href" @click="navigate" class="pure-menu-link">
              Shopping List
            </a>
          </li>
        </router-link>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<style>
  .container {
    max-width: 75%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
</style>
