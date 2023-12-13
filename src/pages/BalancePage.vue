<template>
  <select-payment-system v-model="paymentType" />
</template>
<!-- <template>
  <q-page padding class="flex flex-center">
    <q-card class="kw-tariff--card" v-if="isLoading">
      <q-card-section>
        <q-skeleton type="text" square width="30%" animation="fade" />
        <q-skeleton type="text" square height="12px" animation="fade" />
        <q-skeleton
          type="text"
          square
          height="12px"
          width="75%"
          animation="fade"
        />
      </q-card-section>
      <q-card-section>
        <q-item v-for="index in 5" :key="index">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-actions align="right" class="q-gutter-md">
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </q-card-actions>
    </q-card>
    <q-card
      class="kw-tariff--card"
      bordered
      v-else-if="!isLoading && !isOrders"
    >
      <q-card-section class="bg-negative text-white">
        <div class="text-h4">{{ $t("tariffNotSelect") }}</div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions vertical>
        <q-btn
          class="q-px-md"
          color="primary"
          icon="more_time"
          :label="$t('selectPlanBtn')"
          @click="$router.push('/new-tariff')"
        ></q-btn>
      </q-card-actions>
    </q-card>
    <current-tariff
      v-else
      v-for="tariff in orders"
      :key="tariff.id"
      :orderId="tariff.id"
    />
  </q-page>
</template>

<script>
import { defineComponent, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, Notify } from "quasar";

import { profileStore } from "stores/profile.js";
import { useLoaderStore } from "stores/loader.js";
import CurrentTariff from "components/CurrentTariff.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    CurrentTariff,
  },
  setup() {
    const $q = useQuasar();

    const route = useRoute();
    const router = useRouter();
    // const $q = useQuasar();
    const loader = useLoaderStore();
    const isLoading = computed(() => loader.isLoading);
    loader.on();
    const profile = profileStore();
    profile.fetch().finally(loader.off);
    const orders = computed(() => profile.orders);
    const isOrders = computed(
      () => Array.isArray(orders.value) && orders.value.length > 0
    );
    if (route.query.payfail) {
      $q.notify({
        type: "negative",
        progress: true,
        message: "Произошла ошибка во время оплаты!",
        timeout: 5000,
      });
      router.replace({ query: {} });
    } else if (route.query.notrequirepay) {
      $q.notify({
        type: "warning",
        progress: true,
        message: "Счет на оплату будет выставлен после согласования условий.",
        timeout: 10000,
      });
      router.replace({ query: {} });
    }
    return {
      isOrders,
      isLoading,
      orders,
    };
  },
});
</script>

<style lang="scss"></style> -->
