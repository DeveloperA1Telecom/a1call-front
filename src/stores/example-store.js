import { defineStore } from "pinia";

export const useLoaderStore = defineStore("loader", {
  state: () => ({
    loader: false,
    counter: 0,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    on() {
      this.counter++;
      this.loader = true;
    },
    off() {
      if (this.counter > 0) this.counter--;
      if (this.counter === 0) this.loader = false;
    },
  },
});
