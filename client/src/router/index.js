import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Registration from '../views/Registration.vue'
import profile_index from '../views/profile/profile_index.vue'
import Template from '../views/Administration/Users/Template.vue'
import AdvertistmentTemplate from '../views/Advertistment/Template.vue'
import Loin from '../views/LogIn.vue'
import Advertistment_index from '../views/Advertistment/index.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Registration', name: 'Registration', component: Registration },
  { path: '/Login', name: 'Registration', component: Loin },
  { path: '/profile/profile_index', name: 'profile_index', component: profile_index },
 
  { path: '/Administration/User/', name: 'Template', component: Template },
  { path: '/Administration/Advertistment/', name: 'AdvertistmentTemplate', component: AdvertistmentTemplate },

  { path: '/Advertistment/', name: 'Advertistment_index', component: Advertistment_index },


]

const router = new VueRouter({
  routes 
})

export default router
