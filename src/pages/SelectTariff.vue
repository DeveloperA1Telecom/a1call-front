<template>
  <q-page padding class="flex flex-center">
    <q-stepper
      v-model="step"
      ref="stepper"
      alternative-labels
      color="primary"
      animated
      class="full-width"
    >
      <q-step
        :name="1"
        :title="$t('selectProtocol')"
        icon="place"
        :done="tariffList.length"
      >
        <div class="q-pa-md row q-gutter-md justify-center">
          <q-btn
            :label="protocol.label"
            :color="protocol.color"
            :key="protocol.name"
            size="lg"
            class="col-12 col-md-3 col-lg-3"
            v-for="protocol in tariffStore.protocolList"
            @click="setTarrifs(protocol.name)"
          />
        </div>
      </q-step>


      <q-step
        :name="2"
        :title="$t('selectTariff')"
        icon="library_add_check"
        :done="step > 2"
      >
        <div class="q-pa-md q-gutter-md">
          <div v-if="isLoaded" class="row q-col-gutter-md justify-center">
            <div
              class="col-12 col-md-6 col-lg-4"
              v-for="(tariff, index) in tariffList"
              :key="index"
            >
              <q-btn
                class="fit"
                flat
                outline
                @click="
                  tariffSelect = index;
                  nextStep();
                "
              >
                <tariff-item v-bind="tariff" />
              </q-btn>
            </div>
          </div>
          <!-- <q-btn-group outline v-if="isLoaded"> -->
          <!-- </q-btn-group> -->
        </div>
      </q-step>

      <q-step
        :name="3"
        :title="$t('selectCountry')"
        icon="place"
        :done="step > 3"
      >
        <q-select
          filled
          bottom-slots
          v-model="country"
          :options="tariffStore.countryList"
          :label="$t('selectCountry')"
        >
          <template v-slot:prepend>
            <q-icon name="place" @click.stop />
          </template>
        </q-select>
      </q-step>


      <q-step :name="4" :title="$t('selectDuration')" icon="schedule">
        <q-select
          filled
          v-model="monthAmount"
          :options="tariffStore.amountList"
          :label="$t('selectDuration')"
        >
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </q-step>
      <q-step :name="5" :title="$t('peersCount')" icon="account_tree">
        <q-input
          v-model.number="peersCount"
          type="number"
          filled
          :label="$t('peersCount')"
        >
          <template v-slot:prepend>
            <q-icon name="group_add" />
          </template>
        </q-input>
      </q-step>
      <q-step :name="6" :title="$t('paymentSelect')" icon="payments">
        <select-payment-system v-model="paymentType" />
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step !== 2"
            @click="
              step === 4
                ? isRequirePay()
                : step === 6
                ? submit()
                : $refs.stepper.next()
            "
            :disable="
              disable ||
              (step === 1 && tariffList.length) ||
              (step === 2 && !tariffSelect) ||
              (step === 3 && !country) ||
              (step === 4 && !monthAmount) ||
              (step === 6 && !paymentType)
            "
            color="primary"
            :label="step === 6 ? $t('finish') : $t('next')"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            :label="$t('back')"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { filter } from "lodash";
import TariffItem from "components/TariffItem.vue";
import SelectPaymentSystem from "components/SelectPaymentSystem.vue";
import TariffExtDataContacts from "components/TariffExtDataContacts.vue";

import { profileStore } from "stores/profile.js";
import { tariffListStore } from "stores/tariffs.js";

import { useQuasar, Notify, QSpinnerGears } from "quasar";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "SelectTariff",
  components: { TariffItem, SelectPaymentSystem },
  setup() {
    const $q = useQuasar();
    const $i18n = useI18n();

    const isDark = computed(() => $q.dark.isActive);

    const disable = ref(false);
    const isLoaded = ref(false);
    const $router = useRouter();
    const tariffStore = tariffListStore();

    tariffStore.fetch().then(() => {
      isLoaded.value = true;
    });
    const country = ref(null);
    const monthAmount = ref(null);
    const paymentType = ref();
    const peersCount = ref(1);
    const tariffSelect = ref(0);
    const protocol = ref(null);

    let hideProcess = () => {};
    const showProcess = () => {
      hideProcess = $q.notify({
        spinner: QSpinnerGears,
        message: "Пожалуйста подождите..",
        timeout: 0,
      });
    };

    const profile = profileStore();
    let tariffOptions = {};

    const submit = () => {
      showProcess();
      disable.value = true;
      profile
        .update({
          country: country.value,
          monthAmount: monthAmount.value,
          tariff: tariffSelect.value,
          tariff_full: tariffList.value[tariffSelect.value],
          options: tariffOptions,
          count: peersCount.value,
          payment_gateway: paymentType.value?.gateway || paymentType.value,
          payment_system: paymentType.value?.system || paymentType.value,
        })
        .then((res) => {
          // console.log("update then res: ", res);
          let resData = res.data?.res;
          if (typeof resData === "string" || resData instanceof String) {
            resData = JSON.parse(resData);
          }
          if (resData?.buyDone) {
            $router.push({ path: "/", query: { done: true } });
          } else if (resData?.success) {
            $router.push({ path: "/", query: { notrequirepay: true } });
          } else {
            let url = resData?.url;
            if (url) {
              location.href = url;
            } else {
              console.log("get payment url error: ", res.data, resData);
              if ("need balance" == res.data) {
                return Promise.reject(
                  new Error("Недостаточно средств на балансе!")
                );
              } else {
                return Promise.reject(
                  new Error(
                    "Ошибка платежного шлюза, повторите попытку позже или попробуйте другой способ оплаты."
                  )
                );
              }
            }
          }
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
          disable.value = false;
        });
    };

    const stepper = ref();

    const setTarrifs = (type) => {
      protocol.value = type;
      stepper.value.next();
    };
    const tariffList = computed(() => {
      return protocol.value ? filter(tariffStore.tariffList, ['protocol', protocol.value]) : [] ;
    });
    const isRequirePay = () => {
      const currentTariff = tariffList.value[tariffSelect.value];
      // console.log("isRequirePay currentTariff:", currentTariff);
      if (currentTariff.price.month == 0) {
        paymentType = { gateway: "not pay", system: "not pay" };
        submit();
      } else {
        stepper.value.next();
      }
    };
    const nextStep = () => {
      console.log('nextStep', tariffSelect, tariffList, tariffList[tariffSelect.value]);
      if (
        tariffSelect.value >= 0 &&
        tariffList.value[tariffSelect.value]
      ) {
        const currentTariff = tariffList.value[tariffSelect.value];
        if (currentTariff.static === true) {
          $q.dialog({
            title: $i18n.t("selectIpType"),
            message: $i18n.t("ipStaticMsg"),
            options: {
              type: "radio",
              model: false,
              // inline: true
              items: [
                { label: $i18n.t("ipTypeDynamic"), value: false },
                {
                  label: $i18n.t("ipTypeStatic"),
                  value: true,
                  color: "secondary",
                },
              ],
            },
            cancel: true,
            persistent: true,
          })
            .onOk((data) => {
              // console.log(">>>> Ok", data);
              tariffOptions = { ...tariffOptions, static: data };
              // stepper.value.next();
              currentTariff.static = false;
              nextStep();
            })
            .onCancel(() => {
              // console.log(">>>> Cancel");
            })
            .onDismiss(() => {
              // console.log("I am triggered on both OK and Cancel");
            });
        } else if (currentTariff.contacts === true) {
          $q.dialog({
            component: TariffExtDataContacts,
            componentProps: {},
          })
            .onOk((contacts) => {
              // console.log("tariffExtDataContacts onOk: ", contacts);
              tariffOptions = { ...tariffOptions, contacts };
              stepper.value.next();
            })
            .onCancel(() => {
              // console.log("tariffExtDataContacts onCancel");
            })
            .onDismiss(() => {
              // console.log("tariffExtDataContacts onDismiss");
            });
        } else {
          stepper.value.next();
        }
      } else {
        console.log(
          `nextStep error, not have tariff for select id ${tariffSelect.value}`,
          tariffList
        );
      }
    };

    return {
      setTarrifs,
      tariffList,
      stepper,
      isRequirePay,
      nextStep,
      disable,
      tariffStore,
      paymentType,
      isLoaded,
      country,
      monthAmount,
      peersCount,
      tariffSelect,
      step: ref(1),
      submit,
      isDark,
      // countryList,
    };
  },
  // mounted() {},
});
</script>

<style lang="scss">
.kw-active {
  background-color: red;
}
</style>
