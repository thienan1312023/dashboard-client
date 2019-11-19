<template>
  <v-container fill-height fluid grid-list-xl>
    <v-data-table
      :headers="headers"
      :items="list"
      sort-by="userName"
      class="elevation-1 user-table-list"
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
        <td>{{item.phone}}</td>
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
    <template v-if="dialog">
      <EditDialog :title="dialogTitle" :editItem="editedItem"></EditDialog>
    </template>
  </v-container>
</template>
<script>
import axios from "axios";
import EditDialog from "@/components/core/EditDialog.vue";
import { convertObjectToArray } from "../utils/compute";
export default {
  components: {
    EditDialog
  },
  data() {
    return {
      dialogTitle: "Edit User",
      dialog: false,
      headers: [
        {
          sortable: true,
          text: "Họ tên",
          value: "userName"
        },
        {
          sortable: false,
          text: "Địa chỉ",
          value: "address"
        },
        {
          sortable: false,
          text: "Số điện thoại",
          value: "phone"
        },
        {
          sortable: false,
          text: "Ghi chú",
          value: "note"
        },
        {
          sortable: false,
          text: "Chỉnh sửa",
          value: ""
        }
      ],
      list: [],
      editedIndex: -1,
      editedItem: [],
      defaultItem: {
        userName: "",
        address: "",
        phone: "",
        note: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get("http://localhost:3000/api/user/").then(response => {
        this.list = response.data;
      });
    },
    editItem(item) {
      this.editedIndex = this.list.indexOf(item);
      let cloneItem = Object.assign({}, item);
      this.editedItem = Object.keys(cloneItem)
        .map(key => {
          return (
            key !== "createdAt" &&
            key !== "__v" &&
            key !== "profileImagePath" && { [key]: cloneItem[key] }
          );
        })
        .filter(function(item) {
          return item !== false;
        });
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.list.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.list.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      console.log("save ne");
      if (this.editedIndex > -1) {
        Object.assign(this.list[this.editedIndex], this.editedItem);
      } else {
        this.list.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style lang="scss">
.user-table-list {
  width: 100%;
}
</style>