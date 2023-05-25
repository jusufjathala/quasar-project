<template>
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none">PerusahaanPage of Jusufj project</h5>
    <p>
      1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod harum
      laudantium doloribus commodi eum amet ex ea vero, distinctio deleniti
      rerum. Dolorum velit itaque quidem iure sit, obcaecati corrupti iste? 1
    </p>
    <q-btn color="primary" label="load data" @click.stop="loadData" />
    <q-btn color="primary" label="login" @click.stop="loginUser" />
    <q-btn color="primary" label="add data" @click.stop="addData" />
    <div class="q-pa-md" v-if="columns.length != 0 && rows">
      <q-table
        flat
        bordered
        title="Daftar Perusahaan"
        :rows="rows"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span> {{ col.value }}</span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const originalRows = [
  {
    id: 10,
    nama: "NIAS",
    alamat: null,
    jenis: "SWASTA",
    kode_provinsi: "12",
    provinsi: "Sumatera Utara",
    kode_kab_kota: "1204",
    kab_kota: "NIAS",
    created_at: "2023-05-23 04:20:52",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: 20,
    nama: "LANGKAT",
    alamat: null,
    jenis: "SWASTA",
    kode_provinsi: "12",
    provinsi: "Sumatera Utara",
    kode_kab_kota: "1205",
    kab_kota: "LANGKAT",
    created_at: "2023-05-23 04:20:52",
    updated_at: null,
    deleted_at: null,
  },
  {
    id: 30,
    nama: "KARO",
    alamat: null,
    jenis: "SWASTA",
    kode_provinsi: "12",
    provinsi: "Sumatera Utara",
    kode_kab_kota: "1206",
    kab_kota: "KARO",
    created_at: "2023-05-23 04:20:52",
    updated_at: null,
    deleted_at: null,
  },
];

const logincred = {
  username: "user50@mail.com",
  password: "password12345",
};

const tempauthheader = {
  email: "user50@mail.com",
  is_banned: false,
  refresh_token: "09e8212d-95e5-4c00-9c78-687554289012",
  token: "",
  user_id: 50,
  uuid: "0cbbb637-69af-42ff-bf38-d5c6d1d7c0d3",
};
// function loadData() {
//   // api
//   //   .get("/v5/perusahaan")
//   //   .then((response) => {
//   //     data.value = response.data;
//   //     console.log(data.value);
//   //   })
//   //   .catch(() => {
//   //     $q.notify({
//   //       color: "negative",
//   //       position: "top",
//   //       message: "Loading failed",
//   //       icon: "report_problem",
//   //     });
//   //   });
// }
// function login({ commit }, logincred) {
//   // return api.post("/v5/auth/login", logincred).then((response) => {
//   //   api.defaults.headers.common["Authorization"] =
//   //     "Bearer " + response.data.token;
//   //   commit("login", { token: response.data.token, user: response.data.user });
//   // });
// }
export default defineComponent({
  name: "PerusahaanPage",
  setup() {
    const $q = useQuasar();
    const data = ref(null);
    const logincredref = ref(logincred);
    const rows = ref(originalRows);
    const columns = ref([]);
    const authheader = ref(null);
    const token = ref("");
    const perusahaanparams = ref({
      keyword: "",
      kode_provinsi: "",
      kode_kab_kota: "",
      limit: "50",
      offset: "0",
    });
    const tempauthheaderref = ref(tempauthheader);
    // const paramsref = ref(perusahaanparams);
    //     for (const key of Object.keys(params)) {
    //   if (params[key] === "") {
    //     delete params[key];
    //   }
    // }
    // for (const key of Object.keys(paramsref.value)) {
    //   if (perusahaanparams.value[key] === "") {
    //     delete perusahaanparams.value[key];
    //   }
    // }
    function setColumns(row, columns) {
      if (row != null) {
        // const row = rows.value;
        for (let property in row) {
          // console.log("key:" + property, "value:" + rowex[property]);

          columns.value.push({
            name: property,
            label: property,
            field: property,
            align: "left",
          });
        }
      } else {
        console.log("empty!");
      }
    }
    function loginUser() {
      api
        .post("/v5/auth/login", {
          username: "user50@mail.com",
          password: "password12345",
        })
        .then(function (response) {
          authheader.value = response.data.data;
          token.value = authheader.value.token;
          console.log(authheader.value);
          console.log(token.value);
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    function addData() {
      // api.defaults.headers.common = {
      //   Authorization: `Bearer ${token.value}`,
      // };
      // api.defaults.headers.common["Authorization"] = token.value;
      // api
      //   .post("/v5/perusahaan/create", {
      //     nama: "Perusahaan JusufJ",
      //     kode_provinsi: "16",
      //     kode_kab_kota: "1671",
      //     jenis: "SWASTA",
      //     alamat: "Jalan Palembang Raya no. 2110",
      //   })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      api
        .post("/v5/perusahaan/create", {
          headers: { Authorization: `Bearer ${token.value}` },
          // nama: "Perusahaan JusufJ",
          // kode_provinsi: "16",
          // kode_kab_kota: "1671",
          // jenis: "SWASTA",
          // alamat: "Jalan Palembang Raya no. 2110",
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function loadData() {
      api
        .get("/v5/perusahaan", {
          params: perusahaanparams.value,
        })
        .then((response) => {
          data.value = response.data;
          rows.value = data.value.data.result;
          setColumns(rows.value[0], columns);
        })
        .catch((error) => {
          console.log(error);
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
        });
    }

    return {
      data,
      loginUser,
      loadData,
      rows,
      columns,
      perusahaanparams,
      addData,
      authheader,
      tempauthheaderref,
      token,
    };
  },
});
</script>
