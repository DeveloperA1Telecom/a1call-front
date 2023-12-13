<template>
  <q-card-section>
    <div class="text-h5 q-mt-sm q-mb-xs">
      Команды установки Linux, на примере Ubuntu
    </div>
    <!-- <div class="text-caption text-grey"> -->
    <!--   Включите эту опцию, если вы испытываете частые отключения или если вы -->
    <!--   хотите убедиться, что служба VPN всегда активна. -->
    <!-- </div> -->
    <div class="text-caption">
      <p>
        Все эти команды выполняются в окне терминала, когда вы вошли в систему
        на нашем компьютере с Linux. Помните, что если вы запустите эти команды
        удаленно, вы будете отключены после включения VPN-подключения.
      </p>
      <h6>
        Добавьте репозиторий WireGuard в список источников. Затем apt
        автоматически обновит кэш пакетов.
      </h6>
      <q-banner class="bg-grey-3">
        sudo add-apt-repository ppa:wireguard/wireguard
      </q-banner>
      <h6>Обновите все свои пакеты</h6>
      <q-banner class="bg-grey-3"> $ sudo apt-получить обновление </q-banner>
      <h6>
        Установите WireGuard. Пакет wireGuard установит все необходимые
        зависимости.
      </h6>
      <q-banner class="bg-grey-3"> sudo apt установить wireguard </q-banner>
    </div>
  </q-card-section>
  <q-card-section>
    <div class="text-h5 q-mt-sm q-mb-xs">Запустить службу WireGuard</div>
    <div class="text-caption text-grey">
      <p>
        Команды установки ниже показывают в качестве примера wg0. Каждое
        отдельное VPN-подключение должно быть установлено с другим номером wg.
      </p>
    </div>
    <div class="text-caption">
      <p>
        Вы должны запустить приведенную ниже команду из каталога, содержащего
        файлы .conf. Вы можете установить несколько файлов .conf один за другим,
        если хотите.
      </p>
      <q-banner class="bg-grey-3">
        sudo install -o root -g root -m 600 .conf /etc/wireguard/wg0.conf
      </q-banner>
      <p>
        Запустите WireGuard. Эту команду необходимо использовать каждый раз,
        когда вы хотите запустить VPN-соединение после загрузки компьютера. Вам
        нужно будет выбрать правильный номер wg, чтобы установить правильное
        VPN-подключение.
      </p>
      <q-banner class="bg-grey-3"> wg-quick up wg0 </q-banner>
      <h6>Остановить WireGuard</h6>
      <q-banner class="bg-grey-3"> wg-quick down wg0 </q-banner>
      <h6>Проверьте, правильно ли запущено VPN-соединение</h6>
      <q-banner class="bg-grey-3">
        sudo systemctl status wg-quick@wg0
      </q-banner>
      <h6>Проверьте подключение</h6>
      <q-banner class="bg-grey-3"> sudo wg show </q-banner>
      <h6>
        При необходимости настройте VPN-соединение, чтобы оно запускалось во
        время загрузки.
      </h6>
      <q-banner class="bg-grey-3">
        sudo systemctl enable wg-quick@wg0
      </q-banner>
    </div>
  </q-card-section>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LinuxManual",
  setup() {},
});
</script>

<style lang="scss"></style>
