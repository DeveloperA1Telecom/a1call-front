<template>
  <div>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>
        {{ $t("paymentSelect") }}
      </q-toolbar-title>
    </q-toolbar>
  </div>
  <q-list bordered>
    <q-item>
      <q-item-section>
        <q-item-label header>
          {{ $t("paymentDisclaymer") }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <div class="q-pa-md" v-if="paymentSystems.list.length <= 0">
      <q-item style="max-width: 300px">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="65%" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item style="max-width: 300px">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="90%" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item style="max-width: 300px">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" width="35%" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
    <q-item
      clickable
      v-ripple
      v-for="item in paymentSystems.list"
      :key="item.name"
      :class="{ 'bg-accent text-white': paymentType.system === item.name }"
      @click="paymentType = { system: item.name, gateway: 'Betatransfer' }"
    >
      <q-item-section avatar>
        <q-avatar
          :class="
            paymentType.system === item.name
              ? 'bg-accent'
              : isDark
              ? 'bg-dark'
              : 'bg-white'
          "
        >
          <q-img :src="item.logoUrl" no-spinner>
            <template v-slot:error>
              <div
                class="fit flex flex-center text-info"
                :class="
                  paymentType.system === item.name
                    ? 'bg-accent'
                    : isDark
                    ? 'bg-dark'
                    : 'bg-white'
                "
              >
                <!-- {{ item.title }} -->
              </div>
            </template>
          </q-img>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <div class="text-subtitle1">
          {{ item.title }}
          <q-badge align="middle">{{ item.currency }}</q-badge>
        </div>
      </q-item-section>
    </q-item>

    <q-item
      v-if="balance"
      clickable
      v-ripple
      @click="paymentType = { system: 'Balance', gateway: 'Balance' }"
      :class="{ 'bg-accent text-white': paymentType.system === 'Balance' }"
    >
      <q-item-section avatar>
        <q-avatar
          :class="
            paymentType.system === 'Balance'
              ? 'bg-accent'
              : isDark
              ? 'bg-dark'
              : 'bg-white'
          "
        >
          <q-icon size="40px" name="wallet" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <div class="text-subtitle1">
          {{ $t("balance") }}
          <q-badge align="middle">USD</q-badge>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { paymentStore } from "stores/payments.js";

export default defineComponent({
  name: "SelectPaymentSystem",
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {
          system: "",
          gateway: "",
        };
      },
    },
    balance: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const paymentSystems = paymentStore();
    paymentSystems.fetch().then(() => {});

    const paymentType = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    return {
      paymentType,
      paymentSystems,
    };
  },
});
</script>

<style lang="scss"></style>
