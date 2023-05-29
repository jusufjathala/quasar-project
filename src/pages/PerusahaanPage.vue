<template>
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none">PerusahaanPage of Jusufj project</h5>
    <p>
      1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod harum
      laudantium doloribus commodi eum amet ex ea vero, distinctio deleniti
      rerum. Dolorum velit itaque quidem iure sit, obcaecati corrupti iste? 1
    </p>
    <q-btn color="primary" label="add data" @click.stop="addData" />
    <div class="q-pa-md" v-if="columns.length != 0 && rows">
      <q-table
        flat
        bordered
        title="Daftar Perusahaan"
        :rows="rows"
        :columns="columns"
        :loading="loading"
        row-key="id"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span v-if="col.name != 'aksi'"> {{ col.value }}</span>
              <span v-if="col.name == 'aksi'">
                <div v-if="col.name == 'aksi'">
                  <q-btn
                    @click="
                      editdialog = true;
                      idselected = props.row.id;
                      editform.value = { ...props.row };
                      // getKabKota(editform.value.kode_provinsi);
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
                    icon="done"
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
                    icon="close"
                  />
                </div>
              </span>
            </q-td>
          </q-tr>
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
                  :options="optionsprovinsi"
                />
                <!-- @change="getKabKota(editform.value.provinsi)" -->
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
                    editData(editform);
                  "
                  flat
                  label="UBAH"
                  v-close-popup
                />
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
                  @click.stop="props.row.isactive = !props.row.isactive"
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
                  @click.stop="props.row.isactive = !props.row.isactive"
                  flat
                  label="BLOCK"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
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

export default defineComponent({
  name: "PerusahaanPage",
  setup() {
    const $q = useQuasar();
    const data = ref(null);
    const idselected = ref(0);
    const rows = ref(originalRows);
    const columns = ref([]);
    const token = $q.localStorage.getItem("token");
    const activedialog = ref(false);
    const blockdialog = ref(false);
    const editdialog = ref(false);
    const loading = ref(false);
    const editform = ref({});
    const optionsjenis = ref([]);
    const optionsprovinsi = ref([]);
    const optionskabkota = ref([]);
    const provdata = ref([]);

    const perusahaanparams = ref({
      keyword: "",
      kode_provinsi: "",
      kode_kab_kota: "",
      limit: "50",
      offset: "0",
    });
    // const paramsref = ref(perusahaanparams);
    function clearEmptyKeys(params) {
      for (const key of Object.keys(params)) {
        if (params[key] === "") {
          delete params[key];
        }
      }
    }
    //
    function setColumns(row, columns) {
      if (row != null) {
        for (let property in row) {
          columns.value.push({
            name: property,
            label: property,
            field: property,
            align: "left",
            sortable: true,
          });
        }
        columns.value.push({ name: "aksi", label: "Aksi", align: "center" });
      } else {
        console.log("empty!");
      }
    }
    function addData() {
      api
        .post(
          "/v5/perusahaan/create",
          {
            nama: "Perusahaan DuaPuluhSembilan",
            kode_provinsi: "16",
            kode_kab_kota: "1671",
            jenis: "SWASTA",
            alamat: "Jalan Palembang Raya no. 2110",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
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
            setColumns(rows.value[0], columns);
          })
          .catch((error) => {
            console.log(error);
          });
        loading.value = false;
      }, 500);
    }

    function editData(editform) {
      loading.value = true;
      setTimeout(() => {
        const indexrow = rows.value.findIndex(
          (item) => item.id == idselected.value
        );
        rows.value[indexrow] = editform.value;
        loading.value = false;
      }, 500);
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
    function getProvId(nama) {
      provdata.value.forEach((prov) => {
        if (prov.nama_provinsi == nama) {
          return prov.id;
        }
      });
      return null;
    }

    function getKabKota(provid) {
      setTimeout(() => {
        api
          .get("/v5/bansos/pemda_list", { id_provinsi: provid, limit: "50" })
          .then((response) => {
            const listkabkota = ref(response.data.data.result);
            // listkabkota.value.forEach((kabkota) => {
            //   optionskabkota.value.push(kabkota.nama_kab_kota);
            // });
            // console.log(listkabkota.value);
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

    loadData();
    getProvName();
    getJenis();
    // getKabKota();
    return {
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
    };
  },
});
</script>
