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
    <q-btn
      color="primary"
      label="check api getdaftar"
      @click="
        console.log('clicked');
        getKabKota(); // (createdialog);
      "
    />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "HelpPage",
  setup() {
    // const provid = "35";
    function getKabKota() {
      console.log("fired");
      // optionskabkota.value = [];
      setTimeout(() => {
        api
          .get("/v5/bansos/pemda_list", {
            id_provinsi: "91",
            limit: "11",
            offset: "0",
            keyword: "",
          })
          .then((response) => {
            console.log("getdata");
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 500);
    }
    return {
      getKabKota,
    };
  },
});
</script>
