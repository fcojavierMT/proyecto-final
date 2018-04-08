<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="animated fadeIn">
          <v-layout justify-center>
            <v-flex xs8 sm8 class="text-xs-center">
              <v-form>
                <v-text-field label="E-mail" 
                              prepend-icon="email" 
                              v-model="email" 
                              required>
                </v-text-field>
                <v-text-field label="Contraseña" 
                              prepend-icon="lock_open" 
                              type="password" 
                              v-model="password" 
                              required>
                </v-text-field>
                <v-text-field label="Confirma la contraseña" 
                              prepend-icon="phonelink_lock" 
                              type="password" 
                              v-model="confirmPass" 
                              :rules="[comparePasswordsOnInput]">
                </v-text-field>
                <v-btn v-on:click="signUp">
                  Registrarse
                </v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="animated fadeIn">
      <v-flex xs12 sm6 offset-sm3>
        <v-alert type="success" v-model="alertSuccess">
          Te has registrado con exito, redirigiendo...
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout class="animated fadeIn">
      <v-flex xs12 sm6 offset-sm3 >
        <v-alert type="error" v-model="alertError">
          Error, debe introducir el email y la contraseña
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPass: '',
        alertSuccess: false,
        alertError: false
      }
    },
    computed: {
      comparePasswordsOnInput () {
        return this.password !== this.confirmPass ? 'Las contraseñas no coinciden' : ''
      }
    },
    methods: {
      signUp: function () {
        if (this.email.length === 0 || this.password === 0 || this.comparePasswordsOnSignUp()) {
          this.alertError = true
        } else {
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
            function (user) {
            },
            function (error) {
              alert(error.message)
            },
            this.goToHomePage(),
            this.alertError = false,
            this.alertSuccess = true
          )
        }
      },
      goToHomePage () {
        setTimeout(() => {
          this.$router.replace('home')
        }, 3000)
      },
      comparePasswordsOnSignUp () {
        return this.password !== this.confirmPass
      }
    }
  }
</script>

<style lang="scss">
  @import '~styles/index.scss';

</style>
