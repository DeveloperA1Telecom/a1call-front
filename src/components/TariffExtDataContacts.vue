<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 400px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">{{ $t("tariffContactTitle") }}</div>
  <div class="text-caption"> {{ $t("tariffContactMsg")  }}
          </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="onOKClick" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Имя"
            hint="Имя"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Пожалуйста введите имя',
            ]"
          />
          <q-select
            outlined
            v-model="loginType"
            :options="loginTypeOptions"
            label="Формат связи"
          />
          <q-input
            filled
            v-model="login"
            label="Логин"
            hint="Логин или email"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Пожалуйста введите логин или email',
            ]"
          />
          <q-input v-model="comment" filled type="textarea" />
          <q-checkbox
            v-model="accept"
            label="Принимаю правила обработки персональных данных"
          />
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          :disable="!name || !login || !loginType || !accept"
          class="q-px-md"
          label="Отправить"
          color="primary"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useDialogPluginComponent } from "quasar";

export default defineComponent({
  name: "TariffExtDataContacts",
  components: {},
  props: {},
  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],
  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const loginType = ref("E-mail");
    const login = ref("");
    const comment = ref("");
    const accept = ref(false);
    const name = ref("");
    return {
      loginTypeOptions: ["E-mail", "Skype", "Telegram"],
      loginType,
      login,
      comment,
      name,
      accept,
      dialogRef,
      onDialogHide,
      onOKClick() {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK({
          name: name.value,
          loginType: loginType.value,
          login: login.value,
          comment: comment.value,
        });
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
