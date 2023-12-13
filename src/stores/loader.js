import { defineStore } from "pinia";

export const useLoaderStore = defineStore("loader", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    isLoading: (state) => state.counter > 0,
  },
  actions: {
    on() {
      this.counter++;
      // console.log('on', this.counter);
    },
    off() {
      if (this.counter > 0) this.counter--;
      // console.log('off', this.counter);
    },
  },
});
