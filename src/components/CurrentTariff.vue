<template>
  <q-card class="kw-tariff--card" bordered v-if="tariff">
    <q-card-section :class="'bg-' + tariff.color" class="text-white">
      <div class="text-h6">{{ tariff.name }}</div>
      <div class="text-subtitle2" v-if="KWDEBUG">{{ orderId }}</div>
      <!-- <div class="text-subtitle2">{{ $t("thisIsYouTariff") }}</div> -->
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <!-- <span -->
      <!--   class="" -->
      <!--   :class="expired ? 'bg-negative' : 'bg-positive'" -->
      <!-- > -->
      <!--   <q-icon -->
      <!--     color="white" -->
      <!--     size="20px" -->
      <!--     :name="expired ? 'dangerous' : 'verified'" -->
      <!--   /> -->
      <!-- </span> -->
      <q-circular-progress
        show-value
        class="text-white absolute kw-float"
        :value="tariff.daysLeftPrecent"
        size="80px"
        :thickness="0.3"
        :color="progressColor"
        center-color="grey-8"
        track-color="transparent"
      >
        <q-icon name="date_range" />
      </q-circular-progress>

      <q-item>
        <q-item-section avatar>
          <q-icon color="accent" name="credit_score" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ tariff.status }}
            <span v-if="partialPay">({{ partialPay }})</span>
          </q-item-label>
          <q-item-label caption>{{ $t("orderStatus") }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon color="primary" name="date_range" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ tariff.daysLeft }} </q-item-label>
          <q-item-label caption>{{ $t("tariffDaysLeft") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon color="primary" name="calendar_month" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ tariff.days }} </q-item-label>
          <q-item-label caption>{{ $t("tariffDaysTotal") }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon color="primary" name="place" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ tariff.country.label }}</q-item-label>
          <q-item-label caption>{{ $t("country") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon color="primary" name="event_repeat" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ tariff.monthAmount.label }} </q-item-label>
          <q-item-label caption>{{ $t("tariffMonthAmount") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon color="primary" name="devices_other" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ tariff.count }}</q-item-label>
          <q-item-label caption>{{ $t("tariffConnection") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon color="secondary" name="edit_calendar" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ profile.tariffStartDate(orderId) }}</q-item-label>
          <q-item-label caption>{{ $t("tariffStartDate") }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon color="negative" name="free_cancellation" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ profile.tariffExpiredDate(orderId) }}</q-item-label>
          <q-item-label caption>{{ $t("tariffEndDate") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-expansion-item
        expand-separator
        header-class="text-info"
        icon="read_more"
        :label="$t('expandTariff')"
      >
        <q-item v-for="item in tariff.options" :key="item.title">
          <q-item-section avatar>
            <q-icon color="info" :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.value }}</q-item-label>
            <q-item-label caption>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </q-card-section>
    <q-separator inset />
    <q-card-actions vertical>
      <q-btn
        v-if="tariff.raw_status == 'PAID' && isDownload"
        class="q-px-md"
        color="accent"
        icon="download"
        :label="$t('downloadConfig')"
        @click="download"
      ></q-btn>
      <q-btn
        v-if="
          tariff.raw_status == 'PENDING_PAID' ||
          tariff.raw_status == 'PENDING_CONTINUE_PAID'
        "
        class="q-px-md"
        color="primary"
        icon="payment"
        :label="$t('payPlanBtn')"
        @click="dialogPaymentSystem"
      ></q-btn>
      <q-btn
        v-else-if="tariff.raw_status != 'PAID'"
        class="q-px-md"
        color="primary"
        icon="payment"
        :label="$t('payPlanBtn')"
        @click="dialogPaymentSystem"
      ></q-btn>
      <q-btn
        v-if="tariff.raw_status != 'PAID'"
        class="q-px-md"
        color="negative"
        icon="delete_forever"
        :label="$t('removePlayBtn')"
        @click="removePlan"
      ></q-btn>
      <q-btn
        v-if="tariff.raw_status == 'PAID'"
        class="q-px-md"
        color="deep-orange"
        icon="more_time"
        :label="$t('extendPlanBtn')"
        @click="dialogPaymentSystem"
      ></q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
import { defineComponent, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import { profileStore } from "stores/profile.js";
import { useLoaderStore } from "stores/loader.js";
import DialogPaymentSystem from "components/DialogPaymentSystem.vue";
import { Dialog, useQuasar, Notify, QSpinnerGears } from "quasar";

export default defineComponent({
  name: "CurrentTariff",
  components: {},
  props: {
    orderId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const $q = useQuasar();
    const $router = useRouter();
    const loader = useLoaderStore();
    const isLoading = computed(() => loader.isLoading);
    let paymentType = {};

    const KWDEBUG = process.env.KW_DEBUG;

    // loader.on();
    const profile = profileStore();
    const tariff = computed(() => profile.tariff(props.orderId));
    const order = computed(() => profile.orderItem(props.orderId));
    const progressColor = computed(() => {
      let status = "red";
      if (
        tariff.value.daysLeftPrecent > 50 &&
        tariff.value.raw_status == "PAID"
      ) {
        status = "positive";
      } else if (
        tariff.value.daysLeftPrecent > 30 ||
        tariff.value.raw_status == "WARNING"
      ) {
        status = "warning";
      }
      if (
        tariff.value.raw_status == "EXPIRED" ||
        tariff.value.raw_status == "NOT_PAID"
      ) {
        status = "red";
      }

      return status;
    });
    const isDownload = computed(() => {
      // const notDownloadTariffIds = [2];
      // if (notDownloadTariffIds.includes(tariff.value.id) || tariff.value?.ext_data?.static === true) {
      //   return false;
      // }
      return true;
    });

    let hideProcess = () => {};
    const showProcess = () => {
      hideProcess = $q.notify({
        spinner: QSpinnerGears,
        message: "Пожалуйста подождите..",
        timeout: 0,
      });
    };

    const notPayDialog = () => {
      $q.dialog({
        title: "Стоимость тарифа не определена.",
        message:
          "Вы оставили контактные данные — менеджер свяжется с Вами для согласования условий и выставления счета.",
      })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {});
    };
    const dialogPaymentSystem = () => {
      if (tariff.value.price.month == 0 && tariff.value.raw_status != "PAID") {
        notPayDialog();
      } else {
        if (tariff.value.price.month == 0) {
          paymentType = { gateway: "not pay", system: "not pay" };
          moretime();
        } else {
          $q.dialog({
            component: DialogPaymentSystem,
            componentProps: {},
          })
            .onOk((val) => {
              // console.log("DialogPaymentSystem ok", val);
              paymentType = val;
              moretime();
            })
            .onCancel(() => {
              paymentType = {};
              // console.log("Cancel");
            })
            .onDismiss(() => {
              // console.log("Called on OK or Cancel");
            });
        }
      }
    };

    const moretime = () => {
      showProcess();
      loader.on();
      api
        .post("/buy.php", {
          action: "moretime",
          orderId: props.orderId,
          monthAmount: tariff.value?.monthAmount,
          count: tariff.value?.count,
          payment_gateway: paymentType?.gateway || paymentType,
          payment_system: paymentType?.system || paymentType,
        })
        .then((res) => {
          // console.log("moretime then res:", res);
          if (res.data == "need balance") {
            $q.notify({
              type: "negative",
              message: "Недостаточный баланс для оплаты",
              timeout: 4000,
            });
            return;
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
          // console.log("moretime profile fetch");
          // return profile.fetch();
        })
        .catch((err) => {
          console.log(err);
          $q.notify({
            type: "negative",
            message:
              err?.response?.data ||
              err?.message ||
              "Простите произошла Ошибка! Мы уже работаем над этим.",
            timeout: 4000,
          });
        })
        .finally(() => {
          hideProcess();
          loader.off();
        });
    };

    const download = () => {
      showProcess();
      api
        .post(
          "/download.php",
          {
            action: "getconfig",
            orderId: props.orderId,
          },
          {
            responseType: "blob",
          }
        )
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `wgconfig для ${profile.name} ${tariff.value.name}-тариф от ${order.value.start} до ${order.value.expires} подключений_${tariff.value.count}.zip`
          ); //or any other extension
          // link.setAttribute(
          //   "download", `wgconfig_${profile.name}_${tariff.value.name}_${order.value.start}_${order.value.expires}_${tariff.value.count}.zip`
          // ); //or any other extension
          document.body.appendChild(link);
          link.click();
          return;
        })
        .catch((err) => {
          console.log(err.response);
          $q.notify({
            type: "negative",
            message:
              err?.response?.data || "Произошла Ошибка! Попрбуйте еще раз.",
            timeout: 4000,
          });
        })
        .finally(() => {
          hideProcess();
        });
    };
    const removePlan = () => {
      showProcess();
      loader.on();
      api
        .post("/buy.php", {
          action: "remove",
          orderId: props.orderId,
        })
        .then((res) => {
          // console.log("remove then: ", res);
          profile.removeOrderById(props.orderId);
          // return profile.fetch();
        })
        .catch((err) => {
          console.log(err);
          $q.notify({
            type: "negative",
            message:
              err?.response?.data || "Произошла Ошибка! Попробуйте еще раз.",
            timeout: 4000,
          });
        })
        .finally(() => {
          hideProcess();
          loader.off();
        });
    };

    // const testBtPay = () => {
    //   if (!KWDEBUG) {
    //     console.log("функция доступн только в режиме отладки!");
    //     return;
    //   }

    //   showProcess();
    //   loader.on();
    //   const data = {
    //     id: "16955513",
    //     paymentSystem: "Qiwi",
    //     orderId: "173", // payment_id
    //     orderAmount: "300.00000000",
    //     paidAmount: "300.00",
    //     amount: "300",
    //     currency: "RUB",
    //     commission: "150.00000000",
    //     sign: "0d6c394c076b76477cb40fa1b1abf22b",
    //     status: "success",
    //   };
    //   const params = new URLSearchParams();
    //   Object.entries(data).forEach((entry) => {
    //     const [key, value] = entry;
    //     params.append(key, value);
    //   });

    //   api
    //     .post("/pay_callback_Betatransfer.php", params)
    //     .then((res) => {
    //       $q.notify({
    //         type: "positive",
    //         message: "Betatransfer Test - Оплата прошла успешно!",
    //         timeout: 2500,
    //       });
    //       console.log("testBtPay success, profile fetch now...");
    //       return profile.fetch();
    //     })
    //     .catch((err) => {
    //       console.log(err.response);
    //       $q.notify({
    //         type: "negative",
    //         message: err?.response?.data || "Betatransfer Test - Ошибка оплаты",
    //         timeout: 4000,
    //       });
    //     })
    //     .finally(() => {
    //       hideProcess();
    //       loader.off();
    //     });
    // };
    let partialPay = "";
    const requestPay = +order.value.payment_request_amount;
    const getPay = +order.value.payment_paid_amount;
    if (getPay != requestPay) {
      if (order.value.status == "NOT_PAID") {
        partialPay = `${requestPay.toFixed(2)}`;
      } else {
        partialPay = `${getPay.toFixed(2)}/${requestPay.toFixed(2)}`;
      }
    }
    return {
      removePlan,
      dialogPaymentSystem,
      partialPay,
      KWDEBUG,
      progressColor,
      isDownload,
      isLoading,
      tariff,
      profile,
      moretime,
      download,
      showProcess,
      hideProcess,
    };
  },
});
</script>

<style lang="scss">
.kw-tariff {
  &--card {
    width: 100%;
    max-width: 400px;
  }
}
.kw-float {
  $size: 50px;
  top: 0;
  right: 12px;
  transform: translateY(-50%);
  width: $size;
  height: $size;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
