<template>
  <v-container fill-height fluid grid-list-xl>
    <v-data-table
      :headers="headers"
      :items="list"
      sort-by="userName"
      class="elevation-1 user-table-list"
      @update:pagination="updatePagination"
    >
      <template slot="headerCell" slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"
        />
      </template>
      <template slot="items" slot-scope="{ item }">
        <td>{{ item.userName }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.note }}</td>
        <td>
          <div class="edit-row d-flex justify-content-start">
            <i
              aria-hidden="true"
              class="mdi mdi-pencil theme--light primary--text"
              @click="editItem(item)"
            ></i>
          </div>
        </td>
      </template>
    </v-data-table>
    <template v-if="isShowdialog">
      <EditDialog
        :title="dialogTitle"
        :editItem="editedItem"
        v-on:handleCloseDialog="onCloseDialog"
      ></EditDialog>
    </template>
  </v-container>
</template>
<script>
import EditDialog from "@/components/core/EditDialog.vue";
import { convertObjectToArray } from "../utils/compute";
import { fetchData } from "../utils/api";
import {
  headerUserList,
  userFields,
  defaultItem,
  pathUrl
} from "../constant/user";
export default {
  components: {
    EditDialog
  },
  data() {
    return {
      dialogTitle: "Edit User",
      isShowdialog: false,
      fieldsMapping: userFields,
      headers: headerUserList,
      list: [],
      editedIndex: -1,
      editedItem: {
        array: [],
        obj: ""
      },
      defaultItem: defaultItem
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  mounted() {
    fetchData(0, 5, pathUrl).then(response => {
      this.list = response.data.docs;
    });
  },
  methods: {
    updatePagination(pagination) {
      const { page, rowsPerPage } = pagination;
      fetchData((page - 1) * rowsPerPage, rowsPerPage, pathUrl).then(
        response => {
          this.list = response.data.docs;
        }
      );
    },
    onCloseDialog(value) {
      if (value === false) {
        this.isShowdialog = false;
      }
    },
    editItem(item) {
      this.editedIndex = this.list.indexOf(item);
      let cloneItem = Object.assign({}, item);
      let array = Object.keys(cloneItem)
        .map(function(key) {
          return (
            key !== "createdAt" &&
            key !== "__v" &&
            key !== "profileImagePath" && [key, cloneItem[key]]
          );
        })
        .filter(function(item) {
          return item !== false;
        });
      let headers = [...this.headers];
      let arrField = headers.splice(0, headers.length - 1);
      const fieldsMapping = this.fieldsMapping;
      this.editedItem.array = array.map(function(item, index) {
        return (
          item.value !== "" && {
            0: array[index][0],
            1: array[index][1],
            2: fieldsMapping[array[index][0]]
          }
        );
      });
      this.editedItem.obj = cloneItem;
      this.isShowdialog = true;
    },

    deleteItem(item) {
      const index = this.list.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.list.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
.user-table-list {
  width: 100%;
}
</style>