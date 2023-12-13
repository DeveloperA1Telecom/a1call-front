<template>
  <q-card-section>
    <div class="text-h5 q-mt-sm q-mb-xs">Импортируйте файл конфигурации</div>
    <div class="text-caption">
      <ol>
        <li>Нажмите кнопку «Добавить туннель».</li>
        <li>Нажмите Создать из QR-кода.</li>
        <li>Разрешите WireGuard доступ к вашей камере.</li>
        <li>
          Назовите ваше VPN-подключение. Возможно, вы захотите назвать его
          как-нибудь, чтобы напомнить вам, где он будет находиться.
        </li>
        <li>
          Выберите VPN-подключение, к которому вы хотите подключиться. Вы
          найдете эти файлы подключения на своем основном компьютере, на который
          вы загрузили файл .zip.
        </li>
        <li>Вот и все!</li>
      </ol>
    </div>
  </q-card-section>
  <q-card-section>
    <div class="text-h5 q-mt-sm q-mb-xs">Активация по требованию</div>
    <div class="text-caption text-grey">
      Включите эту опцию, если вы испытываете частые отключения или если вы
      хотите убедиться, что служба VPN всегда активна.
    </div>
    <div class="text-caption">
      <ol>
        <li>
          Коснитесь сервера местоположения, который вы хотите использовать.
        </li>
        <li>Коснитесь «Изменить».</li>
        <li>Прокрутите вниз до конца.</li>
        <li>Включите сотовую связь или Wi-Fi или оба.</li>
      </ol>
    </div>
  </q-card-section>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IosManual",
  setup() {},
});
</script>

<style lang="scss"></style>
