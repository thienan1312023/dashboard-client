<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm Dialog</v-card-title>

        <v-card-text>{{content}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="dialog = false">OK</v-btn>

          <v-btn color="red darken-1" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    close() {
      this.dialog = false;
      this.$emit("handleCloseDialog", false);
    }
  },
  mounted() {
    this.dialog = true;
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  props: {
    content: {
      type: String,
      default: ""
    },
    deleteItem: {
      type: Object,
      default: {}
    }
  }
};
</script>