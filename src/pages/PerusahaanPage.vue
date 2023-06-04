<template>
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none">PerusahaanPage of Jusufj project</h5>
    <p>
      1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod harum
      laudantium doloribus commodi eum amet ex ea vero, distinctio deleniti
      rerum. Dolorum velit itaque quidem iure sit, obcaecati corrupti iste? 1
    </p>

    <div class="q-pa-md">
      <q-btn color="primary" label="add data" @click="createdialog = true" />
      <q-table
        flat
        bordered
        title="Daftar Perusahaan"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :loading="loading"
        :filter="filter"
        no-data-label="Error data"
        no-results-label="Search result empty"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span v-if="col.name != 'aksi'"> {{ col.value }}</span>
              <span v-if="col.name == 'aksi'">
                <div v-if="col.name == 'aksi'">
                  <q-btn
                    @click="
                      idselected = props.row.id;
                      getDetail();
                      detaildialog = true;
                    "
                    flat
                    dense
                    round
                    color="positive"
                    icon="info"
                  />
                  <q-btn
                    @click="
                      editdialog = true;
                      idselected = props.row.id;
                      editform.value = {};
                      editform.value = { ...props.row };
                      getKabKota(editform.value.kode_provinsi);
                    "
                    flat
                    dense
                    round
                    color="primary"
                    icon="edit"
                  />
                  <q-btn
                    v-if="props.row.deleted_at != null"
                    @click="
                      activedialog = true;
                      idselected = props.row.id;
                    "
                    flat
                    dense
                    round
                    color="positive"
                    icon="restore"
                  />
                  <q-btn
                    v-else
                    @click="
                      blockdialog = true;
                      idselected = props.row.id;
                    "
                    flat
                    dense
                    round
                    color="negative"
                    icon="delete"
                  />
                </div>
              </span>
            </q-td>
          </q-tr>
          <q-dialog v-model="createdialog">
            <q-card>
              <q-card-section>
                <p class="text-h6">Create Perusahaan</p>
              </q-card-section>
              <q-card-section>
                <div><q-icon name="contacts" />Nama Perusahaan</div>
                <q-input
                  dense
                  v-model="createform.nama"
                  placeholder="Perusahaan"
                />
              </q-card-section>
              <q-card-section>
                <div><q-icon name="map" />Provinsi</div>
                <q-select
                  dense
                  v-model="createform.provinsi"
                  @update:model-value="
                    getKabKota(
                      getIdbyName(
                        'id_provinsi',
                        'nama_provinsi',
                        createform.provinsi,
                        provdata
                      )
                    )
                  "
                  :options="optionsprovinsi"
                />
              </q-card-section>

              <q-card-section>
                <div><q-icon name="location_city" />Kabupaten / Kota</div>
                <q-select
                  dense
                  v-model="createform.kab_kota"
                  :options="optionskabkota"
                />
              </q-card-section>
              <q-card-section>
                <div><q-icon name="location_city" />Jenis</div>
                <q-select
                  dense
                  v-model="createform.jenis"
                  :options="optionsjenis"
                />
              </q-card-section>
              <q-card-section>
                <div><q-icon name="home" />Alamat</div>
                <q-input
                  dense
                  v-model="createform.alamat"
                  placeholder="Alamat"
                />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="BATAL" v-close-popup />
                <q-btn
                  @click.stop="addData(createform)"
                  flat
                  label="CREATE"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-if="idselected == props.row.id" v-model="editdialog">
            <q-card>
              <q-card-section>
                <p class="text-h6">Update Perusahaan</p>
              </q-card-section>
              <q-card-section>
                <div><q-icon name="contacts" />Nama Perusahaan</div>
                <q-input
                  dense
                  v-model="editform.value.nama"
                  placeholder="Perusahaan"
                />
              </q-card-section>
              <q-card-section>
                <div><q-icon name="map" />Provinsi</div>
                <q-select
                  dense
                  v-model="editform.value.provinsi"
                  @update:model-value="
                    editform.value.kode_provinsi = getIdbyName(
                      'id_provinsi',
                      'nama_provinsi',
                      editform.value.provinsi,
                      provdata
                    );
                    getKabKota(editform.value.kode_provinsi);
                  "
                  :options="optionsprovinsi"
                />
              </q-card-section>

              <q-card-section>
                <div><q-icon name="location_city" />Kabupaten / Kota</div>
                <q-select
                  dense
                  v-model="editform.value.kab_kota"
                  :options="optionskabkota"
                />
              </q-card-section>
              <q-card-section>
                <div><q-icon name="location_city" />Jenis</div>
                <q-select
                  dense
                  v-model="editform.value.jenis"
                  :options="optionsjenis"
                />
              </q-card-section>
              <q-card-section>
                <div><q-icon name="home" />Alamat</div>
                <q-input
                  dense
                  v-model="editform.value.alamat"
                  placeholder="Alamat"
                />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="BATAL" v-close-popup />
                <q-btn
                  @click.stop="
                    idselected = props.row.id;
                    if (!compareKeys(props.row, editform.value)) {
                      editData(editform);
                    }
                  "
                  :disabled="compareKeys(props.row, editform.value)"
                  flat
                  label="UBAH"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-if="idselected == props.row.id" v-model="detaildialog">
            <q-card style="width: 400px; height: 500px">
              <q-card-section>
                <p class="text-h6">Detail Perusahaan</p>
                <q-table
                  flat
                  grid
                  card-class="fit"
                  :rows="detailperusahaan"
                  row-key="nama"
                  hide-header
                  hide-bottom
                  card-container-class="full-width"
                >
                </q-table>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="TUTUP" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-if="idselected == props.row.id" v-model="activedialog">
            <q-card>
              <q-card-section>
                <p class="text-h6">Konfirmasi</p>
              </q-card-section>
              <q-card-section>
                <p class="">Perusahaan akan di-restore. Apakah Anda yakin?</p>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="BATAL" color="primary" v-close-popup />
                <q-btn
                  @click.stop="setStatusPerusahaan"
                  flat
                  label="AKTIVASI"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-if="idselected == props.row.id" v-model="blockdialog">
            <q-card>
              <q-card-section>
                <p class="text-h6">Konfirmasi</p>
              </q-card-section>
              <q-card-section>
                <p class="">Perusahaan akan dihapus. Apakah Anda yakin?</p>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="BATAL" color="primary" v-close-popup />
                <q-btn
                  @click.stop="setStatusPerusahaan()"
                  flat
                  label="BLOCK"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
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
        <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>
              {{ message }}
            </span>
            <q-btn
              v-if="rows.length == 0"
              color="primary"
              label="Retry"
              :disabled="!errormsg"
              @click="
                errormsg = !errormsg;
                loadData();
              "
            />
          </div>
        </template>
      </q-table>
    </div>
    <!-- <div class="q-pa-md" v-if="errormsg" :loading="loading">
      Terjadi error! Silahkan coba lagi
    </div>
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template> -->
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const originalRows = [
  // {
  //   id: 10,
  //   nama: "NIAS",
  //   alamat: null,
  //   jenis: "SWASTA",
  //   kode_provinsi: "12",
  //   provinsi: "Sumatera Utara",
  //   kode_kab_kota: "1204",
  //   kab_kota: "NIAS",
  //   created_at: "2023-05-23 04:20:52",
  //   updated_at: null,
  //   deleted_at: null,
  // },
  // {
  //   id: 20,
  //   nama: "LANGKAT",
  //   alamat: null,
  //   jenis: "SWASTA",
  //   kode_provinsi: "12",
  //   provinsi: "Sumatera Utara",
  //   kode_kab_kota: "1205",
  //   kab_kota: "LANGKAT",
  //   created_at: "2023-05-23 04:20:52",
  //   updated_at: null,
  //   deleted_at: null,
  // },
  // {
  //   id: 30,
  //   nama: "KARO",
  //   alamat: null,
  //   jenis: "SWASTA",
  //   kode_provinsi: "12",
  //   provinsi: "Sumatera Utara",
  //   kode_kab_kota: "1206",
  //   kab_kota: "KARO",
  //   created_at: "2023-05-23 04:20:52",
  //   updated_at: null,
  //   deleted_at: null,
  // },
];

const logincred = {
  username: "user50@mail.com",
  password: "password12345",
};

const origCols = [
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
  name: "PerusahaanPage",
  setup() {
    const $q = useQuasar();
    const data = ref(null);
    const idselected = ref(0);
    const rows = ref(originalRows);
    const columns = ref(origCols);
    const token = $q.localStorage.getItem("token");
    const activedialog = ref(false);
    const blockdialog = ref(false);
    const editdialog = ref(false);
    const createdialog = ref(false);
    const detaildialog = ref(false);
    const loading = ref(false);
    const editform = ref({});
    const createform = ref({});
    const optionsjenis = ref([]);
    const optionsprovinsi = ref([]);
    const optionskabkota = ref([]);
    const provdata = ref({});
    const kabkotadata = ref({});
    const detailperusahaan = ref([]);
    const tableRef = ref();
    const filter = ref("");
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10,
    });
    const rowsNumber = ref(0);
    const errormsg = ref(false);

    const perusahaanparams = ref({
      keyword: "",
      kode_provinsi: "",
      kode_kab_kota: "",
      limit: "100",
      offset: "0",
    });
    function clearEmptyKeys(params) {
      for (const key of Object.keys(params)) {
        if (params[key] === "") {
          delete params[key];
        }
      }
    }
    function setAllEmptyKeys(params) {
      for (const key of Object.keys(params)) {
        params[key] = "";
      }
    }
    function addData() {
      loading.value = true;
      clearEmptyKeys(createform.value);

      createform.value["kode_provinsi"] = getIdbyName(
        "id_provinsi",
        "nama_provinsi",
        createform.value["provinsi"],
        provdata.value
      );
      delete createform.value["provinsi"];

      createform.value["kode_kab_kota"] = getIdbyName(
        "id_kota_kabupaten",
        "nama",
        createform.value["kab_kota"],
        kabkotadata.value
      );

      delete editform.value["kab_kota"];

      setTimeout(() => {
        api
          .post(
            "/v5/perusahaan/create",
            createform.value
            //,{
            //  headers: { Authorization: `Bearer ${token}` },
            //}
          )
          .then((res) => {
            loadData();
            $q.notify("Data Berhasil Dibuat");
            errormsg.value = false;
            // (res.data);
          })
          .catch((error) => {
            errormsg.value = true;
            console.log(error);
          });
        loading.value = false;
      }, 500);
    }

    function loadData() {
      clearEmptyKeys(perusahaanparams.value);
      loading.value = true;
      setTimeout(() => {
        api
          .get("/v5/perusahaan", {
            params: perusahaanparams.value,
          })
          .then((response) => {
            data.value = response.data;
            rows.value = data.value.data.result;
            // setColumns(rows.value[0], columns);
            createform.value = { ...rows.value[0] };
            setAllEmptyKeys(createform.value);
            rowsNumber.value = response.data.total_record;
            errormsg.value = false;
          })
          .catch((error) => {
            errormsg.value = true;
            console.log(error);
          });
        loading.value = false;
      }, 500);
    }

    function onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;

      loading.value = true;

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        perusahaanparams.value.keyword = filter;
        loadData();
        pagination.value.rowsNumber = rowsNumber.value;

        // get all rows if "All" (0) is selected
        const fetchCount =
          rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

        // calculate starting row of data
        const startRow = (page - 1) * rowsPerPage;

        perusahaanparams.value.keyword = filter;
        // fetch data from "server"
        // const returnedData = fetchFromServer(
        //   startRow,
        //   fetchCount,
        //   filter,
        //   sortBy,
        //   descending
        // );

        // clear out existing data and add new
        rows.value.splice(0, rows.value.length, ...returnedData);

        // don't forget to update local pagination object
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;

        // ...and turn of loading indicator
        loading.value = false;
      }, 1000);
    }
    function setStatusPerusahaan() {
      setTimeout(() => {
        loading.value = true;
        const action = ref("");

        const indexrow = rows.value.findIndex(
          (item) => item.id == idselected.value
        );
        const isDeleted = rows.value[indexrow].deleted_at != null;
        if (isDeleted == true) {
          action.value = "restore";
        } else {
          action.value = "delete";
        }
        api
          .post(`/v5/perusahaan/${action.value}/${idselected.value}`, {})
          .then((response) => {
            loadData();
            $q.notify("Status Perusahaan Berhasil Diubah");
            errormsg.value = false;
          })
          .catch((error) => {
            errormsg.value = true;
            console.log(error);
          });
        loading.value = false;
      }, 500);
    }

    function editData(editform) {
      loading.value = true;
      setTimeout(() => {
        if (
          editform.value["kode_provinsi"] == null ||
          editform.value["kode_provinsi"] == "" ||
          editform.value["kode_provinsi"] == "0"
        ) {
          editform.value["kode_provinsi"] = getIdbyName(
            "id_provinsi",
            "nama_provinsi",
            editform.value["provinsi"],
            provdata.value
          );
        }
        // delete editform.value["provinsi"];

        if (
          editform.value["kode_kab_kota"] == null ||
          editform.value["kode_kab_kota"] == "" ||
          editform.value["kode_kab_kota"] == "0"
        ) {
          editform.value["kode_kab_kota"] = getIdbyName(
            "id_kota_kabupaten",
            "nama",
            editform.value["kab_kota"],
            kabkotadata.value
          );
        }

        console.log(editform.value);
        // delete editform.value["kab_kota"];
        api
          .post(`/v5/perusahaan/update/${idselected.value}`, editform.value)
          .then((response) => {
            loadData();
            $q.notify("Detail Perusahaan Berhasil Diubah");
            errormsg.value = false;
          })
          .catch((error) => {
            errormsg.value = true;
            console.log(error);
          });
        loading.value = false;
      }, 500);
      setTimeout(() => {}, 500);
    }

    function getProvName() {
      setTimeout(() => {
        api
          .get("/v5/bansos/provinsi_list", {})
          .then((response) => {
            provdata.value = response.data.data.result;
            provdata.value.forEach((prov) => {
              optionsprovinsi.value.push(prov.nama_provinsi);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }, 500);
    }
    function getIdbyName(keyid, keyname, val, data) {
      const id = ref(0);
      data.forEach((row) => {
        if (row[keyname] == val) {
          id.value = row[keyid];
        }
      });
      return id.value;
    }

    function getKabKota(provid) {
      optionskabkota.value = [];
      setTimeout(() => {
        api
          .get("/v5/bansos/pemda_list", {
            params: { id_provinsi: provid, limit: "50" },
          })
          .then((response) => {
            kabkotadata.value = response.data.data.result;
            kabkotadata.value.forEach((kabkota) => {
              if (kabkota.id_kota_kabupaten != null) {
                optionskabkota.value.push(kabkota.nama);
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }, 500);
    }

    function getDetail() {
      detailperusahaan.value = [];
      setTimeout(() => {
        api
          .get(`/v5/perusahaan/detail/${idselected.value}`)
          .then((response) => {
            const flattenObj = (ob) => {
              // The object which contains the
              // final result
              let result = {};

              // loop through the object "ob"
              for (const i in ob) {
                if (ob[i] === null) {
                  result[i] = "No Data";
                }
                // We check the type of the i using
                // typeof() function and recursively
                // call the function again
                if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
                  const temp = flattenObj(ob[i]);
                  for (const j in temp) {
                    result[i + "." + j] = temp[j];
                  }
                }

                // Else store ob[i] in result directly
                else {
                  result[i] = ob[i];
                }
              }

              return result;
            };
            detailperusahaan.value.push(flattenObj(response.data.data));
          })
          .catch((error) => {
            console.log(error);
          });
      }, 500);
    }

    function getJenis() {
      setTimeout(() => {
        api
          .get("/v5/perusahaan/jenis")
          .then((response) => {
            optionsjenis.value = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }, 500);
    }

    function compareKeys(obj1, obj2) {
      return (
        Object.keys(obj1).length === Object.keys(obj2).length &&
        Object.keys(obj1).every((p) => obj1[p] === obj2[p])
      );
    }

    // set header
    api.defaults.headers.common["Authorization"] = "Bearer " + String(token);

    loadData();
    if (!errormsg.value) {
      getProvName();
      getJenis();
    }

    return {
      errormsg,
      getDetail,
      detailperusahaan,
      detaildialog,
      kabkotadata,
      createdialog,
      setStatusPerusahaan,
      provdata,
      optionsjenis,
      optionskabkota,
      optionsprovinsi,
      data,
      loadData,
      rows,
      columns,
      perusahaanparams,
      addData,
      token,
      clearEmptyKeys,
      idselected,
      activedialog,
      blockdialog,
      editData,
      editdialog,
      loading,
      editform,
      createform,
      getKabKota,
      getIdbyName,
      compareKeys,
      tableRef,
      filter,
      pagination,
      rowsNumber,
    };
  },
});
</script>
