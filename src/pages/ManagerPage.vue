<template>
  <q-page padding class="flex flex-center">
    <div class="fit">
      <q-table
        ref="tableRef"
        class="my-sticky-header-table"
        :style="!inFullscreen ? 'max-height: 100vh;' : 'max-height: 80vh;'"
        title="Treats"
        row-key="id"
        binary-state-sort
        wrap-cells
        v-model:pagination="pagination"
        :loading="loading"
        :filter="filter"
        @request="onRequest"
        :rows="rows"
        :columns="columns"
        :visible-columns="visibleColumns"
      >
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Список транзакций</div>
          <q-space />
          <q-select
            v-model="visibleColumns"
            multiple
            outlined
            dense
            options-dense
            display-value="Показать cтолбцы"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            options-cover
            style="min-width: 150px"
          />
          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="toggleFullscreen(props)"
            class="q-ml-md"
          />
        </template>
        <template v-slot:body-cell-action="scope">
          <q-td>
            <q-btn-group push>
              <q-btn
                :disable="loading || scope.row.status == 'PAID'"
                size="sm"
                push
                color="positive"
                icon="verified"
                title="Подтвердить оплату"
                @click="action_pay(scope.rowIndex, scope.row)"
              />
              <q-btn
                :disable="loading"
                size="sm"
                push
                color="negative"
                icon="delete"
                title="Удалить"
                @click="action_remove(scope.rowIndex)"
              />
            </q-btn-group>
          </q-td>
        </template>
        <template v-slot:body-cell-tariff_ext="props">
          <q-td :props="props" v-html="props.value"> </q-td>
        </template>
        <template v-slot:bottom="scope">
          <q-space />
          <span class="text-caption q-mr-sm">Записей на странице: </span>
          <q-select
            dense
            borderless
            v-model="pagination.rowsPerPage"
            @update:model-value="setPagination"
            :options="optionsRowsPerPage"
            class="q-mr-md"
          />
          <q-btn
            v-if="scope.pagesNumber > 2"
            icon="first_page"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isFirstPage"
            @click="scope.firstPage"
          />

          <q-btn
            icon="chevron_left"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isFirstPage"
            @click="scope.prevPage"
          />
          <span class="text-caption q-mr-sm"
            >{{ scope.pagination.page }}/{{ scope.pagesNumber }}</span
          >
          <q-btn
            icon="chevron_right"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isLastPage"
            @click="scope.nextPage"
          />

          <q-btn
            v-if="scope.pagesNumber > 2"
            icon="last_page"
            color="grey-8"
            round
            dense
            flat
            :disable="scope.isLastPage"
            @click="scope.lastPage"
          />
        </template>
        <template v-slot:top-right>
          <!-- <q-input -->
          <!--   borderless -->
          <!--   dense -->
          <!--   debounce="300" -->
          <!--   v-model="filter" -->
          <!--   placeholder="Search" -->
          <!-- > -->
          <!--   <template v-slot:append> -->
          <!--     <q-icon name="search" /> -->
          <!--   </template> -->
          <!-- </q-input> -->
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, computed, watch } from "vue";
import { ref, onMounted } from "vue";
import { useQuasar, Notify } from "quasar";
import { api } from "boot/axios";

import { useLoaderStore } from "stores/loader.js";
// {
const columns = [
  {
    name: "user_email",
    required: true,
    label: "Email",
    align: "left",
    field: (row) => row.user_email,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "user_fullname",
    align: "left",
    label: "Полное имя",
    field: "user_fullname",
    sortable: true,
  },
  {
    name: "order_id",
    align: "center",
    label: "ID заказа",
    field: "order_id",
    sortable: true,
  },
  {
    name: "id",
    align: "center",
    label: "ID транзакции",
    field: "id",
    sortable: true,
  },
  {
    name: "gateway_id",
    align: "center",
    label: "ID в платежном шлюзе",
    field: "gateway_id",
    sortable: true,
  },
  {
    name: "gateway_name",
    align: "center",
    label: "Платежный шлюз",
    field: "gateway_name",
    sortable: true,
  },
  {
    name: "gateway_system",
    align: "center",
    label: "Платежная система",
    field: "gateway_system",
    sortable: true,
  },
  {
    name: "tariff_name",
    label: "Тариф",
    align: "left",
    field: (row) => row.order_tariff.name,
    format: (val) => `${val}`,
    sortable: !true,
  },
  {
    name: "tariff_country",
    label: "Страна",
    align: "left",
    field: (row) => row.order_tariff.country.label,
    format: (val) => `${val}`,
    sortable: !true,
  },
  {
    name: "tariff_days",
    label: "Длительность подписки",
    align: "left",
    field: (row) => row.order_tariff.monthAmount.label,
    format: (val) => `${val}`,
    sortable: ~true,
  },
  {
    name: "order_connect_amount",
    align: "center",
    label: "Количество подключений",
    field: "order_connect_amount",
    sortable: true,
  },
  {
    name: "tariff_ext",
    label: "Доп. данные",
    align: "left",
    field: (row) => row.order_tariff_extdata,
    format: (val) => {
      let output = "";
      if (val?.contacts) {
        const object = val.contacts;
        output += '<span class="text-caption">Контакты: </span><br>';
        for (const property in object) {
          output += `${object[property]} <br>`;
        }
      }

      const isStaticIp = val?.static;
      if (typeof isStaticIp !== "undefined" && isStaticIp !== null) {
        output += '<span class="text-caption">IP-адресс: </span>';
        if (isStaticIp === true) {
          output += "статический";
        } else if (isStaticIp === false) {
          output += "динамический";
        }
      }
      return output;
    },
    sortable: !true,
  },
  {
    name: "createDate",
    align: "center",
    label: "Время создания транзакции",
    field: "createDate",
    sortable: true,
  },
  {
    name: "order_createDate",
    align: "center",
    label: "Время создания тарифа",
    field: "order_createDate",
    sortable: true,
  },
  {
    name: "order_start",
    align: "left",
    label: "Дата начала действия тарифа",
    field: "order_start",
    sortable: true,
  },
  {
    name: "order_expires",
    align: "left",
    label: "Дата окончания действия тарифа",
    field: "order_expires",
    sortable: true,
  },
  {
    name: "paid_amount",
    align: "center",
    label: "Пользователь оплатил",
    field: "paid_amount",
    sortable: true,
  },
  {
    name: "request_amount",
    align: "center",
    label: "Запрошенная сумма",
    field: "request_amount",
    sortable: true,
  },
  {
    name: "order_status",
    align: "left",
    label: "Статус заказа",
    field: "order_status",
    sortable: true,
  },
  {
    name: "status",
    align: "left",
    label: "Статус транзакции",
    field: "status",
    sortable: true,
  },
  {
    name: "action",
    align: "center",
    label: "Действие",
    field: (row) => row.id,
    sortable: !true,
  },
];
// }

export default defineComponent({
  name: "ManagerPage",
  components: {},
  setup() {
    // $router.push("/");

    const $q = useQuasar();

    // const $q = useQuasar();
    const loader = useLoaderStore();
    const isLoading = computed(() => loader.isLoading);
    const inFullscreen = ref(true);
    const tableRef = ref();
    // loader.on();

    /* ============================================
     * ========     example for table     =========
     */
    const rows = ref([]);
    const filter = ref("");
    const loading = ref(false);
    const optionsRowsPerPage = [5, 10, 25, 50, 100];

    const pagination = ref({
      sortBy: "createDate",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
    });

    function toggleFullscreen(props) {
      inFullscreen.value = props.inFullscreen;
      props.toggleFullscreen();
    }

    function onRequest(props) {
      // console.log("onRequest(props): ", props);
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      loading.value = true;

      api
        .get("/manager.php", {
          params: props.pagination,
        })
        .then((res) => {
          // console.log("manager onRequest then res: ", res);
          const resData = res?.data || null;
          if (!resData) {
            console.log(
              "[ GET manager.php ] Ошибка получения данных с сервера"
            );
            return;
          }

          // const { output, page, pages, total } = resData;
          const { total, pageCount, limit, page, sortby, descending, data } =
            resData;
            console.log('data: ', data);

          if (-1 == optionsRowsPerPage.indexOf(limit)) {
            optionsRowsPerPage.push(limit);
            optionsRowsPerPage.sort(function (a, b) {
              return a - b;
            });
          }

          // console.log({
          //   total,
          //   pageCount,
          //   limit,
          //   page,
          //   sortby,
          //   descending,
          //   data,
          // });

          pagination.value.rowsNumber = total;
          pagination.value.page = page;
          pagination.value.rowsPerPage = limit;
          pagination.value.sortBy = sortby;
          pagination.value.descending = descending;

          rows.value.splice(0, rows.value.length, ...data);
        })
        .catch((err) => {
          console.log("manager catch: ", err);
        })
        .finally(() => {
          loading.value = false;
        });
    }

    onMounted(() => {
      // get initial data from server (1st page)
      onRequest({
        pagination: pagination.value,
        filter: undefined,
      });
    });

    optionsRowsPerPage.push();

    function setPagination(v) {
      pagination.value.rowsPerPage = v;
      tableRef.value.setPagination(pagination.value, true);
    }

    const updateOrderInRows = (order) => {
      // console.log("updateOrderInRows order: ", order);
      rows.value = rows.value.map((mapItem) => {
        if (mapItem.order_id == order.id) {
          mapItem.order_expires = order.expires;
          mapItem.order_status = order.status;
        }
        return mapItem;
      });
    };

    let loadingCount = 0;
    const action_pay = (index, rowItem) => {
      // console.log("action_pay: ", index, rowItem);

      loadingCount++;
      loading.value = true;
      api
        .post("/manager.php", {
          action: "pay",
          id: rowItem.id,
        })
        .then((res) => {
          // console.log("manager pay then res: ", res);
          updateOrderInRows(res.data);
          rowItem.paid_amount = rowItem.request_amount;
          rowItem.status = "PAID";
        })
        .catch((err) => {
          console.log("manager pay catch: ", err);
        })
        .finally(() => {
          if (0 == --loadingCount) {
            loading.value = false;
          }
        });
    };
    const action_remove = (index) => {
      loading.value = true;
      const item = rows.value[index];

      // console.log("action_remove: ", index, item);
      api
        .post("/manager.php", {
          action: "remove",
          id: item.id,
        })
        .then((res) => {
          // console.log("manager remove then res: ", res);

          rows.value = [
            ...rows.value.slice(0, index),
            ...rows.value.slice(index + 1),
          ];

          updateOrderInRows(res.data);
          pagination.value.rowsNumber = rows.value.length;
        })
        .catch((err) => {
          console.log("manager remove catch: ", err);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      action_pay,
      action_remove,
      tableRef,
      optionsRowsPerPage,
      setPagination,
      toggleFullscreen,
      inFullscreen,
      isLoading,

      filter,
      loading,
      pagination,
      columns,
      rows,
      onRequest,
      visibleColumns: ref([
        "user_email",
        // "user_fullname",
        // "order_id",
        // "id",
        "gateway_id",
        "gateway_name",
        "gateway_system",
        "tariff_ext",
        "tariff_name",
        // "tariff_country",
        // "tariff_days",
        // "order_connect_amount",
        // "createDate",
        // "order_createDate",
        // "order_start",
        "order_expires",
        "paid_amount",
        "request_amount",
        "order_status",
        "status",
        "action",
      ]),
    };
  },
});
</script>

<style lang="scss">
.kw-break {
  white-space: break-spaces;
}
.my-sticky-header-table {
  min-height: 320px;
  thead {
    tr {
      th {
        position: sticky;
        z-index: 1;
      }
      &:first-child {
        th {
          top: 0;
        }
      }
    }
  }
  &.q-table--loading {
    thead {
      tr {
        &:last-child {
          th {
            top: 48px;
          }
        }
      }
    }
  }
}

.my-sticky-header-table {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: $cyan-2;
  }
  &.q-dark {
    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th {
      background-color: $cyan;
    }
  }
}
</style>
