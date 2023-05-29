<template>
  <q-page class="q-pa-lg">
    <h5 class="q-mt-none">Detail Page Perusahaan</h5>
    <p>{{ nama }}</p>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DetailPage",
  setup() {
    const nama_perusahaan = ref("");
    return {};
  },
});
</script>
