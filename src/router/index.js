import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import LogoutPage from '../components/LogoutPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import PublicPlaylist from '../components/PublicPlaylist.vue'
import PrivatePlaylist from '../components/PrivatePlaylist.vue'
import CreatePlaylist from '../components/CreatePlaylist.vue'
import PlaylistPage from '../components/PlaylistPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutPage
  },
  {
    path: '/create',
    name: 'createPlaylist',
    component: CreatePlaylist
  },
  {
    path: '/public',
    name: 'publicPlaylist',
    component: PublicPlaylist
  },
  {
    path: '/private',
    name: 'privatePlaylist',
    component: PrivatePlaylist
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: PlaylistPage
  },

]

const router = new VueRouter({
  routes
})

export default router
