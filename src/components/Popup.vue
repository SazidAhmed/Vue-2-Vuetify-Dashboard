<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green lighten-2" dark v-bind="attrs" v-on="on">Create</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline green lighten-2 white--text" primary-title>Add New Project</v-card-title>
        <!-- Input form here -->
        <v-card-text>
          <v-form ref="form" class="px-3 py-5">
            <v-text-field
              label="Title"
              :rules="inputRules"
              prepend-icon="mdi-brush"
              v-model="title"
            ></v-text-field>
          </v-form>
          <v-textarea
            class="px-3 py-2"
            label="Short Description"
            :rules="inputRules"
            prepend-icon="mdi-pencil"
            v-model="content"
          ></v-textarea>
          <!-- StartDate -->
          <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :rules="inputRules"
                class="px-3 py-2"
                prepend-icon=" mdi-calendar"
                :value=" startDateFormattedMomentjs"
                clearable
                label="Select Beginning Date"
                readonly
                v-bind="attrs"
                v-on="on"
                @click:clear="start = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="start" @change="menu1 = false"></v-date-picker>
          </v-menu>
          <!--End StartDate -->
          <!-- Due Date -->
          <v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :rules="inputRules"
                class="px-3 py-2"
                prepend-icon=" mdi-calendar"
                :value="dueDateFormattedMomentjs"
                clearable
                label="Select Due Date"
                readonly
                v-bind="attrs"
                v-on="on"
                @click:clear="due = null"
              ></v-text-field>
            </template>
            <v-date-picker v-model="due" @change="menu2 = false"></v-date-picker>
          </v-menu>
          <!--End Due date -->
          <v-select
            class="px-3 py-2"
            label="Status"
            :rules="inputRules"
            prepend-icon="mdi-brush"
            v-model="status"
            :items="items"
          ></v-select>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success mx=0 mt-3" @click="submit" :loading="loading">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import db from "@/fb";
export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      title: " ",
      content: " ",
      start: null,
      due: null,
      status: "",
      inputRules: [v => v.length >= 3 || "Minimum length is 3 characters"],
      loading: false,
      dialog: false,
      items: ["ongoing", "overdue", "completed"]
    };
  },
  methods: {
    submit() {
      //form validation
      if (this.$refs.form.validate()) {
        this.loading = true;

        const project = {
          title: this.title,
          content: this.content,
          due: this.due,
          start: this.start,
          status: this.status
        };
        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("projectAdded");
          });
      }
    }
  },
  computed: {
    dueDateFormattedMomentjs() {
      return this.due ? moment(this.due).format("dddd, Do MMMM YYYY") : "";
    },
    startDateFormattedMomentjs() {
      return this.start ? moment(this.start).format("dddd, Do MMMM YYYY") : "";
    }
  }
};
</script>