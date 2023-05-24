<template>
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none">USERS PAGE</h5>
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
    <div class="q-pa-md" v-if="rows">
      <q-table
        flat
        bordered
        title="Users Management"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :pagination="initialPagination"
        :filter="filter"
        :loading="loading"
      >
        <template v-slot:top>
          <q-btn
            color="primary"
            :disable="loading"
            label="Add row"
            @click.stop="addRow()"
          />
          <q-btn
            :disable="loading"
            class="q-ml-sm"
            color="primary"
            label="Remove row"
            @click.stop="delRow()"
          />
          <q-input
            borderless
            dense
            debounce="300"
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span v-if="col.name != 'pictureurl' && col.name != 'roles'">
                {{ col.value }}</span
              >

              <q-avatar
                v-if="col.name == 'pictureurl'"
                size="56px"
                class="q-mb-sm"
              >
                <!-- <img :src="require('assets/${props.row.pictureurl}')" />  broken? why?-->
                <img :src="require(`assets/${props.row.pictureurl}`)" />
              </q-avatar>
              <span v-if="col.name == 'roles'">
                <template v-for="role in props.row.roles" :key="role">
                  <q-badge v-if="role == 'admin'" color="red">
                    {{ role }}
                  </q-badge>
                  <q-badge v-if="role == 'pengguna'" color="yellow">
                    {{ role }}
                  </q-badge>
                  <q-badge v-if="role == 'vip'" color="green">
                    {{ role }}
                  </q-badge>
                </template>
              </span>
              <div v-if="col.name == 'aksi'">
                <q-btn
                  @click="
                    editdialog = true;
                    idselected = props.row.id;
                  "
                  flat
                  dense
                  round
                  color="primary"
                  icon="edit"
                />
                <q-btn
                  v-if="props.row.isactive == false"
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
                  v-if="props.row.isactive == true"
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
                <q-dialog
                  v-if="idselected == props.row.id"
                  v-model="editdialog"
                >
                  <q-card style="min-width: 350px">
                    <div>
                      <q-card-section>
                        <div><q-icon name="contacts" />Username</div>
                        <q-input
                          dense
                          v-model="props.row.username"
                          :placeholder="props.row.username"
                        />
                      </q-card-section>
                    </div>
                    <div>
                      <q-card-section>
                        <div><q-icon name="face" />Nama</div>
                        <q-input
                          dense
                          v-model="props.row.nama"
                          :placeholder="props.row.nama"
                        />
                      </q-card-section>
                    </div>
                    <div>
                      <q-card-section>
                        <div><q-icon name="mail" />Email</div>
                        <q-input
                          dense
                          v-model="props.row.email"
                          :placeholder="props.row.email"
                        />
                      </q-card-section>
                    </div>
                    <div>
                      <q-card-section>
                        <div><q-icon name="apartment" />Instansi</div>
                        <q-input v-model="instansi" dense value="nice" />
                      </q-card-section>
                    </div>
                    <div>
                      <q-card-section>
                        <div><q-icon name="cases" />Roles</div>
                        <q-input
                          v-model="props.row.roles"
                          dense
                          :placeholder="props.row.roles"
                        />
                      </q-card-section>
                    </div>

                    <q-card-actions align="right" class="text-primary">
                      <q-btn flat label="BATAL" v-close-popup />
                      <q-btn
                        @click.stop="
                          idselected = props.row.id;
                          editRow(idselected);
                        "
                        flat
                        label="UBAH"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
                <q-dialog
                  v-if="idselected == props.row.id"
                  v-model="activedialog"
                >
                  <q-card>
                    <q-card-section>
                      <p class="text-h6">Konfirmasi</p>
                    </q-card-section>
                    <q-card-section>
                      <p class="">User akan diaktivasi. Apakah Anda yakin?</p>
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
                <q-dialog
                  v-if="idselected == props.row.id"
                  v-model="blockdialog"
                >
                  <q-card>
                    <q-card-section>
                      <p class="text-h6">Konfirmasi</p>
                    </q-card-section>
                    <q-card-section>
                      <p class="">User akan diblok. Apakah Anda yakin?</p>
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
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
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
    name: "pictureurl",
    align: "center",
    label: "Picture",
    field: "pictureurl",
  },
  {
    name: "username",
    label: "Username",
    align: "left",
    field: "username",
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
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "roles",
    align: "center",
    label: "Roles",
    field: "roles",
  },
  {
    name: "aksi",
    align: "center",
    label: "Aksi",
  },
];

const originalRows = [
  {
    id: 1,
    pictureurl: "pp1.png",
    username: "usernameOne1",
    nama: "Sir One",
    email: "usernameOne1@gmail.com",
    roles: ["admin"],
    isactive: false,
  },
  {
    id: 2,
    pictureurl: "pp2.png",
    username: "usernameTwo2",
    nama: "Sir Two",
    email: "usernameTwo2@gmail.com",
    roles: ["pengguna", "vip"],
    isactive: false,
  },
  {
    id: 3,
    pictureurl: "pp3.png",
    username: "usernameThree3",
    nama: "Sir Three",
    email: "usernameThree3@gmail.com",
    roles: ["pengguna", "vip"],
    isactive: true,
  },
  {
    id: 4,
    pictureurl: "pp4.png",
    username: "usernameFour4",
    nama: "Sir Four",
    email: "usernameFour4@gmail.com",
    roles: ["pengguna"],
    isactive: true,
  },
  {
    id: 5,
    pictureurl: "pp5.png",
    username: "usernameFive5",
    nama: "Sir Five",
    email: "usernameFive5@gmail.com",
    roles: ["pengguna"],
    isactive: true,
  },
  {
    id: 6,
    pictureurl: "pp6.png",
    username: "usernameSix6",
    nama: "Sir Six",
    email: "usernameSix6@gmail.com",
    roles: ["pengguna"],
    isactive: true,
  },
  {
    id: 7,
    pictureurl: "pp7.png",
    username: "usernameSeven7",
    nama: "Sir Seven",
    email: "usernameSeven7@gmail.com",
    roles: ["pengguna"],
    isactive: true,
  },
];
const editform = {
  username: "",
  nama: "",
  email: "",
  roles: [],
};
export default defineComponent({
  name: "UsersPage",
  setup() {
    const editdialog = ref(false);
    const activedialog = ref(false);
    const blockdialog = ref(false);
    const idselected = ref(0);
    const loading = ref(false);
    const filter = ref("");
    const rows = ref([...originalRows]);
    const rowCount = ref(rows.value.length);
    // expose to template and other options API hooks
    return {
      editdialog,
      activedialog,
      blockdialog,
      idselected,
      loading,
      filter,
      editform,
      rowCount,
      rows,
      columns,
      initialPagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      // delRow() {
      //   const index = 0;
      //   this.rows.splice(index, 1);
      // },
      delRow() {
        loading.value = true;
        setTimeout(() => {
          const index = Math.floor(Math.random() * rows.value.length);
          rows.value = [
            ...rows.value.slice(0, index),
            ...rows.value.slice(index + 1),
          ];
          loading.value = false;
        }, 500);
      },
      addRow() {
        loading.value = true;
        setTimeout(() => {
          const index = Math.floor(Math.random() * (rows.value.length + 1));
          const row =
            originalRows[Math.floor(Math.random() * originalRows.length)];
          if (rows.value.length === 0) {
            rowCount.value = 0;
          }

          const newRow = { ...row }; // extend({}, row, { name: `${row.name} (${row.__count})` })
          newRow.id = rowCount.value + 1;
          rows.value = [...rows.value, newRow];
          rowCount.value = rows.value.length;
          // console.log(newRow.value);
          loading.value = false;
        }, 500);
      },
      // addRow2() {
      //   const index = 1; //Math.floor(Math.random() * rowCount),
      //   let newRow = this.rows[index];
      //   console.log(newRow);
      //   let newRow2 = [];

      //   let newRow3 = newRow2.concat(newRow);
      //   console.log(newRow3);
      //   this.rows.concat(newRow3);
      // },
      editRow(idselected) {
        // let rowselected = this.rows[idselected - 1];
        // rowselected.username = editform.username;
        // rowselected.email = editform.email;
        // rowselected.nama = editform.nama;
        // rowselected.roles = editform.roles;
        // this.rows.value[idselected].email = editform.email;
      },
    };
  },
  // data() {
  //   return {

  //     initialPagination: {
  //       sortBy: "id",
  //       descending: false,
  //       page: 1,
  //       rowsPerPage: 10,
  //       // rowsNumber: xx if getting data from a server
  //     },
  //   };
  // },
  // methods: {},
});
</script>

<style>
.q-dialog__backdrop {
  background: opacity(20%);
}
</style>
