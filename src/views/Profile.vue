<template>
  <div>
    <div class="page-title">
      <h3>{{ "ProfileTitle" | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          v-model="name"
          type="text"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="description">{{ "Name" | localize }}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >{{ "Message_EnterName" | localize }}
        </small>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Russian
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Update" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  metaInfo() {
    return {
      title: this.$title("ProfileTitle"),
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  data: () => ({
    name: "",
    isRuLocale: true,
  }),
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? "ru-RU" : "en-US",
        });
      } catch (e) {}
    },
  },
  validations: {
    name: { required },
  },
  mounted() {
    this.isRuLocale = this.info.locale === "ru-RU";
    this.name = this.info.name;
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
