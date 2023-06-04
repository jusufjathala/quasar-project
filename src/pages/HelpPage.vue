<template>
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none">HelpPage of Jusufj project</h5>
    <p>
      1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod harum
      laudantium doloribus commodi eum amet ex ea vero, distinctio deleniti
      rerum. Dolorum velit itaque quidem iure sit, obcaecati corrupti iste? 1
    </p>
    <p>
      2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
      repudiandae ipsum eius similique mollitia? Et unde minima quisquam,
      obcaecati beatae amet, nemo, ipsam alias assumenda tempore eius
      repudiandae vero accusamus! 2
    </p>
    <!-- <q-btn
      color="primary"
      label="check api getdaftar"
      @click="
        console.log('clicked');
        getKabKota(); // (createdialog);
      "
    /> -->
    <q-btn
      color="primary"
      label="check api getdaftar"
      @click="
        console.log('clicked');
        getDaftar(); // (createdialog);
      "
    />
    <div class="q-pa-md">
      <!-- <q-table
        flat
        bordered
        ref="tableRef"
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :loading="loading"
        :filter="filter"
        binary-state-sort
        @request="onRequest"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table> -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nama",
    align: "left",
    label: "Nama",
    field: "nama",
    sortable: true,
  },
  {
    name: "jenis",
    align: "left",
    label: "Jenis",
    field: "jenis",
    sortable: true,
  },
  {
    name: "provinsi",
    align: "left",
    label: "Provinsi",
    field: "provinsi",
  },
  {
    name: "kab_kota",
    align: "left",
    label: "Kabupaten / Kota",
    field: "kab_kota",
  },
  {
    name: "aksi",
    align: "center",
    label: "Aksi",
  },
];

export default defineComponent({
  name: "HelpPage",
  setup() {
    const paramsCities = ref({
      id_provinsi: null,
      keyword: "",
      limit: null,
      offset: 5,
    });
    // const provid = "35";
    function getKabKota() {
      console.log("fired");
      paramsCities.value.id_provinsi = 92;
      // optionskabkota.value = [];

      // keyword: "",
      //       limit: null,
      //       offset: null,
      setTimeout(() => {
        api
          .get("/v5/bansos/pemda_list", { params: paramsCities.value })
          .then((response) => {
            console.log("getdata");
            console.log(response.config);
            console.log(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 500);
    }
    function getDaftar() {
      console.log("fired");
      const params = {
        keyword: "",
        kode_provinsi: "",
        kode_kab_kota: "",
        limit: 0,
        offset: 0,
      };
      setTimeout(() => {
        api
          .get("/v5/perusahaan", { params: params })
          .then((response) => {
            console.log("getdata");
            console.log(response.config);
            console.log(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 500);
    }

    const tableRef = ref();
    const rows = ref([]);
    const filter = ref("");
    const loading = ref(false);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10,
    });

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    function fetchFromServer(startRow, count, filter) {
      const data = filter
        ? originalRows.filter((row) => row.name.includes(filter))
        : originalRows.slice();

      return data.slice(startRow, startRow + count);
    }

    // emulate 'SELECT count(*) FROM ...WHERE...'
    function getRowsNumberCount(filter) {
      let count = 0;

      api
        .get("/v5/perusahaan", { params: { keyword: filter } })
        .then((response) => {
          console.log("getdata");
          count = response.data.data.total_record;
        })
        .catch((error) => {
          console.log(error);
        });
      return count;
    }

    function onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      loading.value = true;

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        pagination.value.rowsNumber = getRowsNumberCount(filter);

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

        // fetch data from "server"
        const returnedData = fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending
        );

        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData);

        // don't forget to update local pagination object
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;

        // ...and turn of loading indicator
        loading.value = false;
      }, 1500);
    }
    onMounted(() => {
      // get initial data from server (1st page)
      // tableRef.value.requestServerInteraction();
    });

    return {
      getKabKota,
      paramsCities,
      getDaftar,
      tableRef,
      filter,
      loading,
      pagination,
      columns,
      rows,

      onRequest,
    };
  },
});
</script>
