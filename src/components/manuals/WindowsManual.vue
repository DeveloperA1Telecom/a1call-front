<template>
  <q-card-section>
    <div class="text-h5 q-mt-sm q-mb-xs">Установка приложения WireGuard</div>
    <div class="text-caption">
      <ol>
        <li>Скачайте приложение WireGuard для Windows</li>
        <li>Запустите скаченый файл (установщик)</li>
        <li>
          После установки, нажмите на кнопку "Импортировать тунель из файла"
        </li>
        <li>
          Перейдите в папку, куда вы сохранили конфигурационный файл и выберите
          его </li>
        <li>Нажмите "Открыть"</li>
        <li>
          Нажмите «Активировать», чтобы подключиться к выбранному
          VPN-соединению.
        </li>
        <li>Нажмите «Деактивировать», чтобы отключиться от VPN-подключения.</li>
      </ol>
    </div>
  </q-card-section>
  <q-card-section>
    <div class="text-h5 q-mt-sm q-mb-xs">Изменить соединение</div>
    <div class="text-caption">
      <ol>
        <li>Нажмите на значок WireGuard, расположенный на вашем компьютере.</li>
        <li>
          Нажмите на туннель (подключение VPN), который вы хотите изменить.
        </li>
        <li>Нажмите кнопку редактирования.</li>
        <li>Внесите изменения в название туннеля.</li>
        <li>
          Вы можете включить блокировку нетуннелированного трафика
          (kill-switch).
        </li>
      </ol>
    </div>
  </q-card-section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "WindowsManual",
  setup() {},
});
</script>

<style lang="scss"></style>
