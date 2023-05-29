<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5">JusufJ project</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg">
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="submitLogin">
              <q-input
                square
                filled
                clearable
                v-model="email"
                type="email"
                label="email"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="password"
              />
              <q-btn label="Login" type="submit" color="primary" push />
            </q-form>
          </q-card-section>
          <q-card-section v-if="showError">
            <p>Email atau password salah</p>
          </q-card-section>
          <q-card-actions class="q-px-md"> </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const $q = useQuasar();
    const key = ref("token");
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const token = ref("");
    const showError = ref(false);
    const credentials = {
      username: "user50@mail.com",
      password: "password12345",
    };

    function submitLogin() {
      api
        .post("/v5/auth/login", {
          username: email.value,
          password: password.value,
        })
        .then(function (response) {
          if (response.data.success) {
            token.value = response.data.data.token;
            $q.localStorage.set(key.value, token.value);
            router.push({ path: "/" });
          } else {
            console.log(response);
            error.value = "Email atau password salah";
            showError.value = true;
          }
        })
        .catch(function (error) {
          console.log(error);
          error.value = "Email atau password salah";
          showError.value = true;
        });
    }
    return {
      email,
      password,
      submitLogin,
      error,
      showError,
      token,
    };
  },
});
</script>
