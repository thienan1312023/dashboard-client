<template >
  <v-dialog max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{title}}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <!-- <div>
            <div clas="col-12 col-sm-6 col-md-4">
              <v-text-field v-model="editedItem.userName" label="Họ Tên"></v-text-field>
              <span v-show="isEmptyUserName"></span>
            </div>

            <div clas="col-12 col-sm-6 col-md-4">
              <v-text-field v-model="editedItem.address" label="Địa chỉ"></v-text-field>
            </div>

            <div clas="col-12 col-sm-6 col-md-4">
              <v-text-field v-model="editedItem.phone" label="Số điện thoại"></v-text-field>
            </div>

            <div clas="col-12 col-sm-6 col-md-4">
              <v-text-field v-model="editedItem.note" label="Ghi chú"></v-text-field>
            </div>
          </div> -->
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

export default {
  inheritAttrs: false,

  props: {
    title: {
      type: String,
      default: ""
    },
    editItem: {
      type: Array,
      default: []
    }
  },
  created(){
      console.log(this.editItem);
  },
  mounted(){
      console.log(this.editItem);
  },
  computed: {
  }
};
</script>
