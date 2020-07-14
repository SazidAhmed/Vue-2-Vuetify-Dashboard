import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Project from '../views/Project.vue';
import Team from '../views/Team.vue';
import Wish from '../views/Wish.vue';
import Contact from '../views/Contact.vue';
Vue.use(VueRouter);
// //Axios
window.axios = require('axios');
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/projects',
      name: 'project',
      component: Project,
    },
    {
      path: '/team',
      name: 'team',
      component: Team,
    },
    {
      path: '/wish',
      name: 'wish',
      component: Wish,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
  ],
});

export default router;
