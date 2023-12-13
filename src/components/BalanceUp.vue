<template>
  <q-input
    v-model="amount"
    placeholder="Введите сумму"
    type="number"
    :rules="[(val) => !!val || 'Введите сумму']"
  >
    <template v-slot:prepend>
      <q-icon name="paid" />
    </template>
  </q-input>
  <!-- SelectPaymentSystem -->
  <select-payment-system v-model="paymentType" :balance="false" />
</template>
<script>
import { defineComponent, ref, watchEffect } from "vue";
import SelectPaymentSystem from "components/SelectPaymentSystem.vue";

export default defineComponent({
  name: "BalanceUp",
  components: { SelectPaymentSystem },
  props: {
    modelValue: Array,
  },
  setup(props, { emit }) {
    const amount = ref("");
    const paymentType = ref();
    watchEffect(() =>
      emit("update:modelValue", [paymentType.value, amount.value])
    );

    return {
      paymentType,
      amount,
    };
  },
});
</script>

<style lang="scss"></style>
