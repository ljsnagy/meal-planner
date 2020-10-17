<template>
  <div class="pure-g section">
    <div class="pure-u-1">
      <Select id="shopping-day" label="My shopping day is " :options="days" v-model="startDay" />
    </div>
  </div>
  <div class="pure-g section">
    <div class="pure-u-1">
      <Menu :startDay="startDay" />
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select.vue';
import Menu from '@/components/Menu.vue';

export default {
  name: 'MenuPage',
  components: { Select, Menu },
  data() {
    return {
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ].map((day, index) => ({
        label: day,
        value: index,
      })),
    };
  },
  computed: {
    startDay: {
      get() {
        return this.$store.state.menu.startDay;
      },
      set(day) {
        this.$store.commit('setStartDay', { day });
      },
    },
  },
};
</script>
