<template>
  <v-app>
    <v-navigation-drawer v-model='sideNav' temporary fixed>
      <v-toolbar flat>
        <v-list class='pa-0'>
          <v-list-tile avatar class='user-info'>
            <v-list-tile-avatar>
              <img src='https://randomuser.me/api/portraits/men/85.jpg' >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title> Hola</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class='pt-0' dense>
        <v-list-tile v-for='item in menuItems'
                     :key='item.title'
                     :to='item.link'>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar class='color-principal nav-principal' fixed>
      <v-toolbar-side-icon @click='sideNav =! sideNav'></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link class="eslogan-logo" to='/home' tag='span'>
          <img src="./assets/logo.png" class="menu-logo">
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class='hidden-sm-and-down' v-for='item in menuItems' :key='item.title'>
        <v-btn flat :to='item.link'>
          <v-icon left>{{ item.icon }}</v-icon>
          <span class="title-navbar">{{item.title}}</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view>

      </router-view>
    </v-content>
    <v-footer height="auto" class="grey darken-3">
        <v-layout row wrap justify-center>
          <v-flex xs12 py-3 text-xs-center white--text>
            &copy;2018 — <strong>Francisco Javier Martínez Talavera</strong>
          </v-flex>
        </v-layout>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      sideNav: false,
      menuLoggedIn: false,
      userEmail: '',
      menuItems: [
        {
          icon: 'home',
          title: 'Inicio',
          link: '/home'
        },
        {
          icon: 'account_circle',
          title: 'Perfil',
          link: '/user'
        },
        {
          icon: 'library_books',
          title: 'Mis tareas',
          link: '/tasks'
        },
        {
          icon: 'group_add',
          title: 'Registrarse',
          link: '/signUp'
        },
        {
          icon: 'lock_open',
          title: 'Iniciar Sesion',
          link: '/signIn'
        }
      ],
      menuLogIn: [
        {
          icon: 'home',
          title: 'Inicio',
          link: '/home'
        },
        {
          icon: 'account_circle',
          title: 'Perfil',
          link: '/user'
        },
        {
          icon: 'library_books',
          title: 'Mis tareas',
          link: '/tasks'
        },
        {
          icon: 'exit_to_app',
          title: 'Salir'
        }
      ]
    }
  },
  name: 'App'
}
</script>

<style lang='scss' scoped>

@import '~styles/index.scss';

.menu-logo {
  width: 10%;
  padding-top: 5px;
}

.color-principal {
  background-color: $navbar-color;
}

.eslogan-logo{
  cursor: pointer;
}

.title-navbar{
  text-transform: capitalize;
}

#app{
  background-color: $color-principal;
}

</style>