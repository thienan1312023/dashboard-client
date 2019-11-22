<template>
  <div class="scrollbar scrollbar-custom">
    <div class="force-overflow">
      <v-dialog max-width="500px" v-model="dialog">
        <v-card>
          <v-card-title>
            <span class="headline">{{title}}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <div v-for="item in editItem.array" :key="item[0]">
                <div clas="col-12 col-sm-6 col-md-4" v-if="item[0] !== '_id'">
                  {{item[2]}}
                  <v-text-field class="pt-0" v-model="item[1]"></v-text-field>
                </div>
              </div>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  inheritAttrs: false,
  data: () => ({
    dialog: false
  }),
  props: {
    title: {
      type: String,
      default: ""
    },
    editItem: {
      type: Object,
      default: []
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    close() {
      this.dialog = false;
      this.$emit("handleCloseDialog", false);
    },
    save() {
      let objUpdate = { ...this.editItem.obj };
      this.editItem.array.forEach(function(item, index) {
        objUpdate[item[0]] = item[1];
      });
      axios
        .put(
          `http://localhost:3000/api/user/${objUpdate._id}/update`,
          objUpdate
        )
        .then(response => {})
        .catch(e => {
          console.error(e);
        });
    }
  },
  created() {
    console.log(this.editItem);
  },
  mounted() {
    this.dialog = true;
  }
};
</script>
