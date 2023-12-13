import { defineStore } from "pinia";
import { api } from "boot/axios";

export const tariffListStore = defineStore("tarifflist", {
  state: () => ({
    $i18n: {},
    tariffList: [
      // {
      //   name: "Стартовый",
      //   price: 2400,
      //   currency: "₽",
      //   color: "cyan",
      // },
      // {
      //   name: "Бизнес",
      //   price: 3700,
      //   currency: "₽",
      //   color: "positive",
      // },
      // {
      //   name: "Корпоративный",
      //   price: 7100,
      //   currency: "₽",
      //   color: "accent",
      // },
    ],
    protocolList: [],
    amountList: [],
    countryList: [],
  }),
  getters: {
    // i18n() {
    //   return this.$i18n.global;
    // },
    // countryList() {
    //   return [
    //     {
    //       value: 0,
    //       label: this.i18n.t("england"),
    //     },
    //     {
    //       value: 1,
    //       label: this.i18n.t("netherlands"),
    //     },
    //     {
    //       value: 2,
    //       label: this.i18n.t("greece"),
    //     },
    //   ];
    // },
    // amountList() {
    //   return [
    //     {
    //       value: 1,
    //       label: this.i18n.tc("month", 1),
    //     },
    //     {
    //       value: 3,
    //       label: this.i18n.tc("month", 3),
    //     },
    //     {
    //       value: 6,
    //       label: this.i18n.tc("month", 6),
    //     },
    //     {
    //       value: 12,
    //       label: this.i18n.tc("month", 12),
    //     },
    //   ];
    // },
  },
  actions: {
    async fetch() {
      return api
        .get("/tariffs.php", {
          params: {
            data: "all",
          },
        })
        .then((res) => {
          const data = res.data;
          this.protocolList = JSON.parse(data["protocols"]);
          this.tariffList = JSON.parse(data["tariffs"]);
          this.countryList = JSON.parse(data["country"]);
          this.amountList = JSON.parse(data["ranges"]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    },
    // increment() {
    //   console.log(this.i18n.t("selectTariff"));
    // },
  },
});
