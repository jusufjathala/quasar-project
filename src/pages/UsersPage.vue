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
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="console.log(props.row.pictureurl)">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span v-if="col.name != 'pictureurl'"> {{ col.value }}</span>
              <q-avatar
                v-if="col.name == 'pictureurl'"
                size="56px"
                class="q-mb-sm"
              >
                <!-- <img :src="require('assets/${props.row.pictureurl}')" />  broken? why?-->
                <img :src="require(`assets/${props.row.pictureurl}`)" />
              </q-avatar>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UsersPage",
  data() {
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
        field: "aksi",
      },
    ];

    const rows = [
      {
        id: 1,
        pictureurl: "pp1.png",
        username: "usernameOne1",
        nama: "Sir One",
        email: "usernameOne1@gmail.com",
        roles: "X",
        aksi: "X",
      },
      {
        id: 2,
        pictureurl: "pp2.png",
        username: "usernameTwo2",
        nama: "Sir Two",
        email: "usernameTwo2@gmail.com",
        roles: "X",
        aksi: "X",
      },
      {
        id: 3,
        pictureurl: "pp3.png",
        username: "usernameThree3",
        nama: "Sir Three",
        email: "usernameThree3@gmail.com",
        roles: "X",
        aksi: "X",
      },
      {
        id: 4,
        pictureurl: "pp4.png",
        username: "usernameFour4",
        nama: "Sir Four",
        email: "usernameFour4@gmail.com",
        roles: "X",
        aksi: "X",
      },
      {
        id: 5,
        pictureurl: "pp5.png",
        username: "usernameFive5",
        nama: "Sir Five",
        email: "usernameFive5@gmail.com",
        roles: "X",
        aksi: "X",
      },
      {
        id: 6,
        pictureurl: "pp6.png",
        username: "usernameSix6",
        nama: "Sir Six",
        email: "usernameSix6@gmail.com",
        roles: "X",
        aksi: "X",
      },
      {
        id: 7,
        pictureurl: "pp7.png",
        username: "usernameSeven7",
        nama: "Sir Seven",
        email: "usernameSeven7@gmail.com",
        roles: "X",
        aksi: "X",
      },
    ];
    return {
      onRowClick: (row) => alert(`${row.name} clicked`),
      rows,
      columns,
      initialPagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 5,
        // rowsNumber: xx if getting data from a server
      },
      active: true,
    };
  },
});
</script>
