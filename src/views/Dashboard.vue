<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" x-small color="light" @click="sortBy('title')">
              <v-icon left small>mdi-account-supervisor-circle</v-icon>
              <span class="caption text-lowercase">Project Title</span>
            </v-btn>
          </template>
          <span>Sort By Project Title</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" x-small color="light" @click="sortBy('status')">
              <v-icon left small>mdi-account-group-outline</v-icon>
              <span class="caption text-lowercase">Status</span>
            </v-btn>
          </template>
          <span>Sort By Status</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" x-small color="light" @click="sortBy('due')">
              <v-icon left small>mdi-account-group-outline</v-icon>
              <span class="caption text-lowercase">Due Date</span>
            </v-btn>
          </template>
          <span>Sort By Due Date</span>
        </v-tooltip>
      </v-row>

      <v-card flat>
        <v-row wrap class="pa-3 completed">
          <v-flex xs12 md2>
            <div class="caption grey--text">Project Title</div>
          </v-flex>
           <v-flex xs12 md2>
            <div class="caption grey--text">Overview</div>
          </v-flex>
          <v-flex xs3 sm3 md2>
            <div class="caption grey--text">Start At</div>
          </v-flex>
          <v-flex xs3 sm3 md2>
            <div class="caption grey--text">Due By</div>
          </v-flex>
          <v-flex xs3 sm3 md2>
            <div class="caption grey--text">Status</div>
            <div class="right">
            </div>
          </v-flex>
          <v-flex xs3 sm3 md2>
            <div class="caption grey--text">Actions</div>
          </v-flex>
        </v-row>
        <v-divider></v-divider>
      </v-card>

      <v-card flat v-for="project in projects" :key="project.id">
        <v-row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md2>
            <div>{{ project.title }}</div>
          </v-flex>
           <v-flex xs12 md2>
            <div>{{ project.content }}</div>
          </v-flex>
          <v-flex xs3 sm3 md2>
            <div>{{ project.start }}</div>
          </v-flex>

          <v-flex xs3 sm3 md2>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs3 sm3 md2>
            <div class="right">
              <v-chip small :color="getColor(project.status)">{{ project.status }}</v-chip>
            </div>
          </v-flex>
          <v-flex xs3 sm3 md2>
            <div>
              <span class="material-icons">delete</span>
              <span class="material-icons">edit</span>
              <span class="material-icons">done</span>
            </div>
          </v-flex>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      projects: []
    };
  },
  mounted() {
    this.created();
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    getColor(status) {
      if (status == "completed") return "green white--text caption my-2";
      else if (status == "ongoing") return "orange white--text caption my-2";
      else return "red white--text caption my-2";
    },

    created() {
      fetch('http://localhost:3000/projects')
        .then(res => res.json())
        .then(data => this.projects = data)
        .catch(err => console.log(err))
    }
  }
};
</script>
<style>
.project.completed {
  border-left: 4px solid green;
}

.project.ongoing {
  border-left: 4px solid orange;
}

.project.overdue {
  border-left: 4px solid red;
}
.completed {
  color: green;
}

.ongoing {
  color: orange;
}

.overdue {
  color: red;
}
</style>