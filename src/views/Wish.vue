<template>
  <v-data-table :headers="headers" :items="desserts" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Contact List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <!--Add button -->
            <v-btn color="deep-purple" dark class="mb-2" v-bind="attrs" v-on="on">Add</v-btn>
          </template>
          <v-card>
            <!-- form section -->
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="4">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
                    <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple" text @click="close">Cancel</v-btn>
              <v-btn color="deep-purple" text type="submit" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="deep-purple" text @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "id",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Name", value: "name", sortable: false },
      { text: "Phone", value: "phone", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      phone: "",
      email: ""
    },

    defaultItem: {
      id: "",
      name: "",
      phone: "",
      email: ""
    }
  }),
  //Mounted Function
  // mounted() {
  //   console.log("Contact Loaded");
  //   this.fetchContactList();
  // },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Create Data" : "Edit Here";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    //Fetch Method
    fetchContactList() {
      console.log("fetching Contacts");
      this.axios.get("http://eroutine.saz/api/contacts").then(response => {
        console.log(response.data);
        this.desserts = response.data;
      });
    },
    initialize() {
      this.fetchContactList();
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log(item);
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
      console.log("Deleted Data");
      this.axios
        .delete("http://eroutine.saz/api/contacts/" + item.id)
        .then(response => {
          console.log(response);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    //create Method
    save() {
      if (this.editedIndex > -1) {
        console.log("edited Data");
        console.log(this.editedItem);
        this.axios
          .put("http://eroutine.saz/api/contacts/" + this.editedItem.id, {
            name: this.editedItem.name,
            phone: this.editedItem.phone,
            email: this.editedItem.email
          })
          .then(response => {
            console.log(response);
          });
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        console.log("Created Data");
        console.log(this.editedItem);
        this.axios
          .post("http://eroutine.saz/api/contacts", {
            name: this.editedItem.name,
            phone: this.editedItem.phone,
            email: this.editedItem.email
          })
          .then(response => {
            console.log(response);
            // this.desserts.push(this.editedItem);
            this.fetchContactList();
          });
      }
      this.close();
    }
  }
};
</script>