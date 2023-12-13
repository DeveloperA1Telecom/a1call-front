import { defineStore } from "pinia";
import { Quasar } from "quasar";
import { api } from "boot/axios";
import { watch, ref } from "vue";
let mutex = ref(false);

export const profileStore = defineStore("profile", {
  state: () => ({
    name: "anonymous",
    email: "",
    avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    orders: [],
    balance: 0.0,
    status: {
      NEW: "Новый",
      NOT_PAID: "Не оплачен",
      PAID: "Оплачен",
      WARNING: "Срок действия подходит к концу",
      EXPIRED: "Истек срок действия",
      PENDING_PAID: "Ожидает оплаты",
      PENDING_CONTINUE_PAID: "Ожидает оплаты для продления тарифа",
      PARTIAL_PAID: "Часитчно оплачен",
    },
  }),
  getters: {
    tariffDays: (state) => {
      return (orderId) => {
        const orderItem = state.orders.find((order) => order.id === orderId);
        if (!orderItem?.start || !orderItem?.expires) {
          return 0;
        }
        const end = new Date(orderItem.expires);
        const start = new Date(orderItem.start);
        const diff = end - start;
        return Math.round(diff / (1000 * 60 * 60 * 24));
      };
    },
    tariffExpired(state) {
      return false;
    },
    tariffStartDate: (state) => {
      return (orderId) => {
        const orderItem = state.orders.find((order) => order.id === orderId);
        try {
          return (
            new Intl.DateTimeFormat(Quasar.lang.getLocale(), {
              dateStyle: "medium",
            }).format(new Date(orderItem.start)) || orderItem.start
          );
        } catch (err) {
          console.log("tariffStartDate format err: ", orderItem.start);
          return orderItem.start;
        }
      };
    },
    tariffExpiredDate: (state) => {
      return (orderId) => {
        const orderItem = state.orders.find((order) => order.id === orderId);
        try {
          return (
            new Intl.DateTimeFormat(Quasar.lang.getLocale(), {
              dateStyle: "medium",
            }).format(new Date(orderItem.expires)) || orderItem.expires
          );
        } catch (err) {
          console.log("tariffExpiredDate format err: ", orderItem.expires);
          return orderItem.expires;
        }
      };
    },
    tariffDayLeft: (state) => {
      return (orderId) => {
        const orderItem = state.orders.find((order) => order.id === orderId);
        if (!orderItem?.expires || !orderItem?.start) {
          return 0;
        }
        const end = new Date(orderItem.expires);
        const start = new Date(orderItem.start);
        const diff = end - start;
        return Math.round(diff / (1000 * 60 * 60 * 24));
      };
    },
    tariffDayLeftPrecent: function (state) {
      return (orderId) => {
        return (this.tariffDayLeft(orderId) * 100) / this.tariffDays(orderId);
      };
    },
    tariff(state) {
      return (orderId) => {
        const orderItem = state.orders.find((order) => order.id === orderId);
        let tariff = null;
        try {
          const tariffJson = orderItem?.tariff || null;
          tariff = JSON.parse(tariffJson);
        } catch (err) {
          return null;
        }
        if (tariff == null) return null;
        const output = { ...tariff };
        output["daysLeftPrecent"] = this.tariffDayLeftPrecent(orderId);
        output["daysLeft"] = this.tariffDayLeft(orderId);
        output["days"] = this.tariffDays(orderId);
        output["count"] = orderItem.connect_amount;
        output["raw_status"] = orderItem.status;
        output["status"] = state.status[orderItem.status];
        output["ext_data"] = orderItem.tariff_extdata
          ? JSON.parse(orderItem.tariff_extdata)
          : {};

        const isStaticIp = output["ext_data"]?.static;
        if (typeof isStaticIp !== "undefined" && isStaticIp !== null) {
          const optionItemIp = output["options"].find((val) => {
            if (val.title == "IP-адрес") {
              return true;
            }
          });
          if (isStaticIp === true) {
            optionItemIp.value = "статический";
          } else if (isStaticIp === false) {
            optionItemIp.value = "динамический";
          }
        }
        return output;
      };
    },
    orderItem: (state) => {
      return (orderId) => {
        return state.orders.find((order) => order.id === orderId);
      };
    },
  },
  actions: {
    async fetch() {
      if (!mutex.value) {
        mutex.value = true;
        api
          .get("/profile.php")
          .then((res) => {
            const data = res?.data || null;
            if (!data) return;
            this.name = data?.fullname || data?.username || "";
            this.avatar = data?.photo || "/assets/photouser/default.jpg";
            this.email = data.email || "";
            this.logout = data.logout || "/authentication/?service=logout";
            this.edit = data.edit || "/profile";
            this.balance = data.balance || "0";
            if (Array.isArray(data.orders) && data.orders.length > 0) {
              this.orders = data.orders;
            } else {
              this.orders = [];
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            mutex.value = false;
          });
      }
      return new Promise((resolve) => {
        const unwatch = watch(
          () => mutex.value == true,
          () => {
            if (!mutex.value) {
              unwatch();
              // console.log("mutex is release!");
              resolve();
            } else {
              // console.log("mutex is block!");
            }
          },
          {
            immediate: true,
          }
        );
      });
    },
    removeOrderById(orderId) {
      const i = this.orders.findIndex((order) => order.id === orderId);
      this.orders.splice(i, 1);
    },
    update({
      country,
      monthAmount,
      tariff,
      options,
      count,
      payment_gateway,
      payment_system,
      balance,
    }) {
      const data = {
        action: "new",
        country,
        monthAmount,
        tariff,
        tariff_extdata: options,
        count,
        payment_gateway,
        payment_system,
        balance,
      };
      // console.log("store profile update data:", data);
      return api
        .post("/buy.php", data)
        .then((res) => {
          // console.log("profile update then res: ", res);
          return res;
        })
        .catch((err) => {
          console.log("profile update err: ", err);
          return Promise.reject(err);
        });
    },
  },
});
