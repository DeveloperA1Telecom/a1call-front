<template>
  <!-- <router-link custom v-slot="{ route, navigate, isExactActive }"> -->
  <q-item
    clickable
    tag="a"
    :active="isExactActive"
    :class="{ 'q-router-link--active': isExactActive }"
    :to="route"
    active-class=""
  >
    <q-item-section avatar>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path
            d="M3 10V8a2 2 0 0 1 2-2h2m-4 4c1.333 0 4-.8 4-4m-4 4v4m18-4V8a2 2 0 0 0-2-2h-2m4 4c-1.333 0-4-.8-4-4m4 4v2M7 6h10M3 14v2a2 2 0 0 0 2 2h2m-4-4c1.333 0 4 .8 4 4m0 0h4"
          />
          <circle cx="12" cy="12" r="2" />
          <path d="M18 15v3m0 3v-3m0 0h-3m3 0h3" />
        </g>
      </svg>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ $t("balance") }}</q-item-label>
      <q-item-label caption
        ><strong>{{ profile.balance }} $</strong></q-item-label
      >
    </q-item-section>

    <q-item-section style="text-align: left">
      <q-btn @click="balanceUp" size="sm" color="primary" label="Пополнить" />
    </q-item-section>
  </q-item>
  <!-- </router-link> -->
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { profileStore } from "stores/profile.js";
import { useLoaderStore } from "stores/loader.js";
import DialogBalanceUp from "components/DialogBalanceUp.vue";

export default defineComponent({
  name: "BalanceLink",
  setup() {
    const $q = useQuasar();
    function balanceUp() {
      $q.dialog({
        component: DialogBalanceUp,
        componentProps: {},
      }).onOk((val) => {
        api
          .post("/buy.php", {
            action: "balance_up",
            amount: val[1],
            payment_system: val[0].system,
            payment_gateway: val[0].gateway,
          })
          .then((res) => {
            // console.log(res);
            if (res.data == "need balance") {
              $q.notify({
                type: "negative",
                message: "Недостаточный баланс для оплаты",
                timeout: 4000,
              });
            }

            let status = res.data?.status;
            if ("payment_system" == status) {
              dialogPaymentSystem();
              return Promise.resolve();
            }
            let resData = res.data?.res;
            if (
              typeof res.data?.res === "string" ||
              res.data?.res instanceof String
            ) {
              resData = JSON.parse(res.data?.res);
            }
            if (resData?.success == true) {
              $router.go({ path: "/", query: { notrequirepay: true } });
              return;
            }
            let url = resData?.url;
            if (url) {
              location.href = url;
            } else {
              console.log("get payment url error: ", res.data);
              return Promise.reject(
                new Error(
                  resData?.msg
                    ? "Сообщение от ситсемы оплаты: ".resData.msg
                    : "Ошибка ситсемы оплаты, попробуйте еще раз или позже. При повторном возникновении ошибки - свяжитесь с тех.поддержкой. Спасибо."
                )
              );
            }
          })
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: "Произошла ошибка",
            });
          });
      });
    }
    const loader = useLoaderStore();
    const profile = profileStore();

    loader.on();
    profile.fetch().finally(loader.off);

    return {
      profile,
      balanceUp,
    };
  },
});
</script>
