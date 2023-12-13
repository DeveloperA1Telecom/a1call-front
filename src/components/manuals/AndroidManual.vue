<template>
  <q-card-section>
    <div class="text-h5 q-mt-sm q-mb-xs">Импортировать файл конфигурации</div>
    <div class="text-caption">
      <ol>
        <li>Откройте приложение Wireguard.</li>
        <li>Нажмите «Добавить: плюс: кнопка</li>
        <li>Нажмите на сканирование из QR -кода.</li>
        <li>Выберите разрешить, когда спросите, доступ к вашей камере.</li>
        <li>Укажите камеру на изображение открытого файла .png.</li>
        <li>Назовите свое соединение VPN.</li>
      </ol>
    </div>
  </q-card-section>
  <q-card-section>
    <div class="text-h5 q-mt-sm q-mb-xs">Подключите и отключите</div>
    <div class="text-caption">
      <ol>
        <li>
          В приложении Wireguard нажмите кнопку переключения рядом с сервером
          местоположения, который вы хотите использовать.
        </li>
        <li>Вы либо подключите, либо отключите.</li>
        <li>Вот и все!</li>
      </ol>
    </div>
  </q-card-section>
  <q-card-section>
    <div class="text-h5 q-mt-sm q-mb-xs">Отредактировать соединение</div>
    <div class="text-caption">
      <ol>
        <li>
          Нажмите на значок Wireguard, расположенный в вашем рабочем столе.
        </li>
        <li>
          Нажмите на туннель (VPN Connection), который вы хотели бы
          отредактировать.
        </li>
        <li>Нажмите кнопку «Редактировать» (карандаш).</li>
        <li>Внесите изменения в название туннеля.</li>
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
        <li>Нажмите «Настройки» >> Сеть и Интернет >> VPN</li>
        <li>Нажмите кнопку передачи справа от проволочной платы</li>
        <li>Включить всегда на VPN</li>
        <li>
          Вы также можете включить блочные соединения без VPN, если хотите.
        </li>
      </ol>
    </div>
  </q-card-section>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AndroidManual",
  setup() {},
});
</script>

<style lang="scss"></style>
