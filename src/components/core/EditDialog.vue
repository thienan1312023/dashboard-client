<template>
  <div>
    <div class="scrollbar scrollbar-custom">
      <div class="force-overflow">
        <v-dialog max-width="500px" v-model="dialog">
          <!-- <material-card color="green" title="Edit Profile" text="Complete your profile" /> -->
          <v-card>
            <v-card-title>
              <span class="headline">{{title}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <div v-for="item in editItem.array" :key="item[0]">
                  <div clas="col-12 col-sm-6 col-md-4" v-if="item[0] !== '_id'">
                    <span class="field-title">{{item[2]}}</span>
                    <v-text-field v-show="item[0] !== 'birthDate'" class="pt-0" v-model="item[1]"></v-text-field>
                    <div>
                      <input
                        v-show="item[0] === 'birthDate'"
                        type="text"
                        v-model="item[1]"
                        placeholder="dd-mm-yyyy"
                      />
                    </div>
                  </div>
                </div>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import moment from "moment";
import { updateUser } from "../../functions/editUser";
export default {
  inheritAttrs: false,
  data: () => ({
    dialog: false,
    isLoading: false,
    fullPage: false
  }),
  components: {
    Loading
  },
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
  mounted() {
    this.indeterminate = false;
  },
  methods: {
    close() {
      this.dialog = false;
      this.$emit("handleCloseDialog", "editDialog");
    },
    save() {
      this.isLoading = true;
      let objUpdate = updateUser(this.editItem);
      axios
        .put(
          `http://localhost:3000/api/user/${objUpdate._id}/update`,
          objUpdate
        )
        .then(response => {
          this.isLoading = false;
          this.$emit("handleReloadPage");
        })
        .catch(e => {
          console.error(e);
        });
    },
    onCancel() {
      console.log("User cancelled the loader.");
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
<style scoped>
.v-card__title {
  background: linear-gradient(60deg, #66bb6a, #43a047) !important;
  border-radius: 5px;
  margin: 5px;
  padding-left: 2rem;
  color: white;
}
.v-card__actions {
  display: flex;
  justify-content: space-around;
}

.v-card__text {
  padding: 0;
}

.birthdate-input {
  padding-top: 7px;
  padding-bottom: 7px;
}

.field-title {
  font-weight: 400;
}
</style>