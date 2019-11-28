import EditDialog from "@/components/core/EditDialog.vue";
import ConfirmDialog from "@/components/core/ConfirmDialog.vue";
import { fetchData } from "../../utils/api";
import {
  headerUserList,
  defaultItem,
  pathUrl
} from "../../constant/user";
import { convertEditItem } from "./UserListController";
import User from '../../models/user';
import { timingSafeEqual } from "crypto";
export default {
  components: {
    EditDialog,
    ConfirmDialog
  },
  data() {
    return {
      page: 1,
      rowsPerPage: 5,
      searchText: "",
      dialogTitle: "",
      deleteDialogContent: "Are you sure to delete this item?",
      isShowEditDialog: false,
      isShowConfirmDialog: false,
      headers: headerUserList,
      list: [],
      selectedItem: {
        array: [],
        obj: {}
      },
      deleteSelectedItem: {},
      defaultItem: defaultItem
    };
  },
  computed: {},
  mounted() {
    fetchData(0, 5, "", pathUrl).then(response => {
      this.list = response.data.docs;
    });
  },
  methods: {
    updatePagination(pagination) {
      const { page, rowsPerPage } = pagination;
      this.page = page;
      this.rowsPerPage = rowsPerPage;
      fetchData((page - 1) * rowsPerPage, rowsPerPage, "", pathUrl).then(
        response => {
          this.list = response.data.docs;
        }
      );
    },
    onCloseDialog(value) {
      if (value === "editDialog") {
        this.isShowEditDialog = false;
      }

      if (value === "confirmDialog") {
        this.isShowConfirmDialog = false;
      }
    },
    onReloadPage() {
      fetchData(0, 5, "", pathUrl).then(response => {
        this.list = response.data.docs;
        this.isShowEditDialog = false;
      });
    },
    addNewUser(){
      let user = new User();
      this.dialogTitle = "Add new User";
      this.selectedItem = convertEditItem(user);
      this.isShowEditDialog = true;
    },
    editUser(item) {
      this.dialogTitle = "Edit User";
      this.selectedItem = convertEditItem(item);
      this.isShowEditDialog = true;
    },

    deleteItem(item) {
      const index = this.list.indexOf(item);
      this.deleteSelectedItem = this.list[index];
      this.isShowConfirmDialog = true;
    },

    searchAllContent() {
      this.searchText === "" && this.onReloadPage();
      this.searchText !== "" &&
        fetchData(
          (this.page - 1) * this.rowsPerPage,
          this.rowsPerPage,
          this.searchText,
          `${pathUrl}search`
        ).then(response => {
          this.list = response.data;
        });
    }
  }
};