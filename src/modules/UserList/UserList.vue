<template>
  <v-container fill-height fluid grid-list-xl>
    <div class="create-user-container">
      <v-btn class="mx-0 font-weight-light create-user-container__button" color="success" @click="addNewUser()">+ Add new</v-btn>
    </div>
    <div class="active-pink-3 active-pink-4 mb-4 w-100 d-flex">
      <input
        class="form-control mr-2"
        type="text"
        placeholder="Search All Contents..."
        aria-label="Search"
        v-model="searchText"
        v-on:keyup.enter="searchAllContent()"
      />
      <button type="button" class="w-25 btn btn-info" @click="searchAllContent()">Search</button>
    </div>
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
          <div class="edit-row">
            <i
              aria-hidden="true"
              class="mdi mdi-pencil theme--light primary--text"
              @click="editUser(item)"
            ></i>

            <i aria-hidden="true" class="mdi mdi-account-remove" @click="deleteItem(item)"></i>
          </div>
        </td>
      </template>
    </v-data-table>
    <template v-if="isShowEditDialog">
      <EditDialog
        :title="dialogTitle"
        :selectedItem="selectedItem"
        v-on:handleCloseDialog="onCloseDialog"
        v-on:handleReloadPage="onReloadPage"
      ></EditDialog>
    </template>

    <template v-if="isShowConfirmDialog">
      <ConfirmDialog
        :content="deleteDialogContent"
        :deleteItem="deleteSelectedItem"
        v-on:handleCloseDialog="onCloseDialog"
        v-on:handleReloadPage="onReloadPage"
      ></ConfirmDialog>
    </template>
  </v-container>
</template>
<script src='./UserList'>
</script>

<style lang="scss">
.create-user-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.edit-row .mdi-pencil {
  padding-right: 2.5rem;
}
.user-table-list {
  width: 100%;
}
.container.fill-height {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
}
.mdi-account-remove {
  color: #de4141;
}
.v-toolbar__title.tertiary--text.font-weight-light {
  font-size: 2.3rem;
}
</style>