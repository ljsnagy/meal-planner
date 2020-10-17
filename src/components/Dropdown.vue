<template>
  <input
    ref="input"
    type="text"
    v-bind="$attrs"
    :class="{ 'with-dropdown': showDropdown }"
    v-model="searchValue"
    @focus="onInputFocus"
    @blur="onInputBlur"
    @keydown.down="onNextResult"
    @keydown.up="onPreviousResult"
    @keydown.enter="onSelect"
  />
  <teleport to="body">
    <ul
      class="dropdown"
      v-if="showDropdown"
      :style="computedDropdownStyle"
    >
      <li
        class="dropdown-item"
        v-for="(result, resultIndex) in results"
        :class="{ selected: focusedResultIndex === resultIndex }"
        :key="result.value"
        @mouseover="onFocusResult(resultIndex)"
        @mousedown.prevent="onSelect"
      >
        {{ result.label }}
      </li>
      <li class="dropdown-item no-results" v-if="!results.length">
        {{ noResultsText }}
      </li>
    </ul>
  </teleport>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    data: Array,
    limit: {
      type: Number,
      default: 5,
    },
    noResultsText: {
      type: String,
      default: 'No results',
    },
  },
  data() {
    return {
      dropdownPos: {
        x: 0,
        y: 0,
      },
      dropdownWidth: 0,
      showDropdown: false,
      searchValue: '',
      focusedResultIndex: 0,
    };
  },
  computed: {
    computedDropdownStyle() {
      return {
        width: `${this.dropdownWidth}px`,
        top: `${this.dropdownPos.y}px`,
        left: `${this.dropdownPos.x}px`,
      };
    },
    results() {
      let results = this.data;

      if (this.searchValue) {
        const search = new RegExp(this.searchValue, 'i');
        results = this.data.filter((data) => search.test(data.label));
      }

      return results.slice(0, this.limit);
    },
  },
  emits: {
    select: null,
  },
  watch: {
    results() {
      this.focusedResultIndex = 0;
    },
    showDropdown() {
      this.updateDropdown();
    },
    searchValue(newValue) {
      if (newValue !== '') {
        this.showDropdown = true;
      }
    },
  },
  methods: {
    onInputFocus() {
      this.showDropdown = true;
    },
    onInputBlur() {
      this.showDropdown = false;
    },
    onFocusResult(index) {
      this.focusedResultIndex = index;
    },
    onNextResult() {
      if (!this.showDropdown) {
        this.showDropdown = true;
      } else if (this.focusedResultIndex < this.results.length - 1) {
        this.focusedResultIndex += 1;
      }
    },
    onPreviousResult() {
      if (this.focusedResultIndex > 0) {
        this.focusedResultIndex -= 1;
      }
    },
    onSelect() {
      const result = this.results[this.focusedResultIndex];

      if (result) {
        this.searchValue = '';
        this.focusedResultIndex = 0;
        this.showDropdown = false;
        this.$emit('select', result);
      }
    },
    updateDropdown() {
      const { bottom, left, width } = this.$refs.input.getBoundingClientRect();
      this.dropdownWidth = width;
      this.dropdownPos = {
        x: left,
        y: bottom,
      };
    },
  },
  mounted() {
    this.updateDropdown();
  },
};
</script>

<style scoped>
input {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
  border-radius: 2px;
  border: 1px solid #777;
}

input:focus {
  outline: none;
}

input::placeholder {
  color: #777;
}

input.with-dropdown {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.dropdown {
  box-sizing: border-box;
  position: absolute;
  margin: 0;
  margin-top: -1px;
  padding: 0;
  background: white;
  border: 1px solid #777;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  list-style-type: none;
  z-index: 999;
}

.dropdown-item {
  padding: 0.5rem;
  cursor: pointer;
}

.dropdown-item.selected {
  background: #0078e7;
  color: white;
}

.dropdown-item.no-results {
  color: #777;
  background: white;
  cursor: auto;
}
</style>
