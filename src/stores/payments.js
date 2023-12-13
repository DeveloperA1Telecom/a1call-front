import { defineStore } from "pinia"
import { api } from "boot/axios"

export const paymentStore = defineStore("paymentStore", {
  state: () => ({
    list: []
  }),
  getters: {
    selectList: (state) => {
      return []
    }
  },
  actions: {
    // Нет выбора платежного шлюза!
    // Если будут добавляться платежные системы - потребуется рефакторинг
    async fetch() {
      // console.log('paymentStore fetch')
      return api
        .get("/buy.php")
        .then((res) => {
          const data = res.data
          console.log("fetch ", data)
          this.list = data
          // this.tariffList = JSON.parse(data["tariffs"]);
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => { })
    },
    // increment() {
    //   console.log(this.i18n.t("selectTariff"));
    // },
  },
})
