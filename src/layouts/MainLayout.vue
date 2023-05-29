<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> JusufJ Project Homepage </q-toolbar-title>

        <div>Jusufj version v{{ $q.version }}</div>
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Welcome to jusufj project</div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img src="~assets/cat.jpg" class="header-image absolute-top" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="600"
    >
      <q-scroll-area
        style="
          height: calc(100% - 192px);
          margin-top: 192px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item to="/" clickable v-ripple exact>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section> Home </q-item-section>
          </q-item>

          <q-item to="/help" clickable v-ripple exact>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section> Help </q-item-section>
          </q-item>

          <q-item to="/users" clickable v-ripple exact>
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section> Users </q-item-section>
          </q-item>
          <q-item to="/perusahaan" clickable v-ripple exact>
            <q-item-section avatar>
              <q-icon name="apartment" />
            </q-item-section>

            <q-item-section> Perusahaan </q-item-section>
          </q-item>

          <q-expansion-item
            expand-separator
            icon="devices_other"
            label="Sistem Rekomendasi"
            default-closed
          >
            <q-item to="/android" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="adb" />
              </q-item-section>
              <q-item-section> Android </q-item-section>
            </q-item>
            <q-item to="/ios" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="apple" />
              </q-item-section>
              <q-item-section> IOS </q-item-section>
            </q-item>
            <q-item to="/desktop" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="monitor" />
              </q-item-section>

              <q-item-section> Desktop </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-item clickable v-ripple exact @click="logoutFunction">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 192px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="~assets/cat.jpg" />
          </q-avatar>
          <div class="text-weight-bold">Jusuf J.A.</div>
          <div>@jusufja</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";
import { defineComponent, ref } from "vue";
// import EssentialLink from "components/EssentialLink.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "MainLayout",

  components: {
    // EssentialLink,
  },

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const timeStamp = Date.now();
    const todaysDate = date.formatDate(timeStamp, "dddd DD MMMM");
    const key = ref("token");

    return {
      // essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      todaysDate,
      key,
      logoutFunction() {
        localStorage.removeItem(key.value);
        $q.localStorage.clear();
        router.push({ path: "/auth" });
      },
    };
  },
});
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
</style>
