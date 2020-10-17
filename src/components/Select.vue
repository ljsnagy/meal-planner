<template>
  <label v-if="label" :for="id">
    {{ label }}
  </label>
  <select :id="id" v-bind="$attrs" v-model="value">
    <option disabled value="">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'Select',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    id: {
      required: true,
      type: String,
    },
    label: String,
    options: Array,
    placeholder: {
      type: String,
      default: 'Choose an option',
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        return this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
