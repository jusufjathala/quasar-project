<template>
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none">PerusahaanPage of Jusufj project</h5>
    <p>
      1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod harum
      laudantium doloribus commodi eum amet ex ea vero, distinctio deleniti
      rerum. Dolorum velit itaque quidem iure sit, obcaecati corrupti iste? 1
    </p>
    <q-btn color="primary" label="add data" @click="createdialog = true" />

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
                    editData(editform);
                  "
                  flat
                  label="UBAH"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-if="idselected == props.row.id" v-model="detaildialog">
            <q-card>
              <q-card-section>
                <p class="text-h6">Detail Perusahaan</p>
              </q-card-section>
              <q-card-section>
                <p>{{ detailperusahaan }}</p>
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
    const detailperusahaan = ref("");

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
    //
    function setColumns(row, columns) {
      if (row != null && columns.value.length == 0) {
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
        // ("error!");
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
            // (res.data);
          })
          .catch((error) => {
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
            setColumns(rows.value[0], columns);
            createform.value = { ...rows.value[0] };
            setAllEmptyKeys(createform.value);
          })
          .catch((error) => {
            console.log(error);
          });
        loading.value = false;
      }, 500);
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
        editform.value["kode_provinsi"] = getIdbyName(
          "id_provinsi",
          "nama_provinsi",
          editform.value["provinsi"],
          provdata.value
        );
        delete editform.value["provinsi"];

        editform.value["kode_kab_kota"] = getIdbyName(
          "id_kota_kabupaten",
          "nama",
          editform.value["kab_kota"],
          kabkotadata.value
        );

        delete editform.value["kab_kota"];
        api
          .post(`/v5/perusahaan/update/${idselected.value}`, editform.value)
          .then((response) => {
            loadData();
            $q.notify("Detail Perusahaan Berhasil Diubah");
          })
          .catch((error) => {
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
          .get("/v5/bansos/pemda_list", { id_provinsi: provid, limit: "100" })
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
      detailperusahaan.value = "";
      setTimeout(() => {
        api
          .get(`/v5/perusahaan/detail/${idselected.value}`)
          .then((response) => {
            console.log(response.data);
            for (const key of Object.keys(response.data.data)) {
              detailperusahaan.value =
                String(detailperusahaan.value) +
                String(key) +
                " " +
                String(response.data.data[key]) +
                ", ";
            }
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
    // set header
    api.defaults.headers.common["Authorization"] = "Bearer " + String(token);

    loadData();
    getProvName();
    getJenis();

    // getKabKota();
    return {
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
    };
  },
});
</script>
