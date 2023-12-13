<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 400px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">{{ $t("balanceUp") }}</div>
      </q-card-section>
      <q-card-section>
        <balance-up v-model="paymentType" />
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          class="q-px-md"
          color="deep-orange"
          icon="credit_score"
          :disable="paymentType"
          :label="$t('pay')"
          @click="onOKClick(paymentType)"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useQuasar, useDialogPluginComponent } from "quasar";
import BalanceUp from "components/BalanceUp.vue";

export default defineComponent({
  name: "DialogBalanceUp",
  components: { BalanceUp },
  props: {},
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],
  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const paymentType = ref();
    const $q = useQuasar();
    return {
      paymentType,
      dialogRef,
      onDialogHide,
      onOKClick(val) {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        // val[1] = сумма , val[0] - система оплаты
        if (val[1] > 0) {
          onDialogOK(val);
        } else {
          $q.notify({
            type: "negative",
            message: "Введите сумму",
          });
        }

        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },
      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
    };
  },
});
</script>

<style lang="scss"></style>
