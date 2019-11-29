<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card-title>
      <span class="headline">Confirm Dialog</span>
    </v-card-title>
    <v-card-text>{{content}}</v-card-text>
    <v-card-actions>
      <v-btn color="orange darken-1" text @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">OK</v-btn>
    </v-card-actions>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    content: {
      type: String,
      default: ""
    },
    deleteItem: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.$emit("handleCloseDialog", "confirmDialog");
    },

    save() {
      this.isLoading = true;
      axios
        .delete(`http://localhost:3000/api/user/${this.deleteItem._id}/delete`)
        .then(response => {
          this.isLoading = false;
          this.$emit("handleReloadPage");
        })
        .catch(e => {
          console.error(e);
        });
    }
  },
  mounted() {
    this.dialog = true;
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>

<style scoped>
.v-dialog--active {
  overflow-y: unset;
}
button.v-btn.theme--light.blue.darken-1 {
  width: 50%;
}
button.v-btn.theme--light.orange.darken-1 {
  flex: 1;
}
.v-card__title {
  background: linear-gradient(60deg, #ef5350, #e53935) !important;
  border-radius: 5px;
  margin: 5px;
  padding-left: 2rem;
  color: white;
}
</style>