<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="2000" top color="success">
      <span>Data Added Successfully</span>
    </v-snackbar>
    <v-toolbar flat>
      <v-app-bar-nav-icon class="grey--text" @click="drawer =!drawer"></v-app-bar-nav-icon>
      <v-app-bar flat>
        <v-toolbar-title class="text-uppercase grey--text">
          <span class="font-weight-light">Todo</span>
          <span>Ninja</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- dropdown menu -->
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on,attrs }">
              <v-btn text color="grey" v-bind="attrs" v-on="on">
                <v-icon>mdi-menu-down</v-icon>
                <span>Menu</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-item-title>{{ link.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <!--end dropdown -->
        <v-btn text color="grey">
          <span>Sign Out</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>
    </v-toolbar>
    <!-- drawer -->
    <v-navigation-drawer app v-model="drawer" color="deep-purple">
      <!-- avater -->
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" src="/avatar-2.png" />
          </v-avatar>
          <p class="white--text subheading mt-1">Ryu Street Fighter</p>
        </v-flex>
        <!-- Popup Button -->
        <v-flex class="mt-4" mb-3>
          <Popup @projectAdded="snackbar = true" />
        </v-flex>
      </v-layout>
      <!-- list -->
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup.vue";
export default {
  components: { Popup },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        {
          icon: "mdi-account-supervisor-circle",
          text: "My project",
          route: "/projects"
        },
        { icon: "mdi-clock-start", text: "Team", route: "/team" },

        { icon: "mdi-account-group-outline", text: "Wish", route: "/wish" },
        {
          icon: "mdi-amazon",
          text: "Contact",
          route: "/contact"
        }
      ],
      snackbar: false
    };
  }
};
</script>