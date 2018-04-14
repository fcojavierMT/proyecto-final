<template>
   <v-container class="signIn-container__card">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="animated fadeIn">
         <v-card-media src="/static/card-images/login.png" height="200px"></v-card-media>
          <v-layout justify-center>
            <v-flex xs8 sm8 class="text-xs-center">
              <v-form>
                <v-text-field label="E-mail" prepend-icon="email" v-model="email" required>
                </v-text-field>
                <v-text-field label="Contraseña" prepend-icon="lock_open" type="password" v-model="password" required>
                </v-text-field>
                <v-btn v-on:click="signIn" :disabled="alertSuccess">
                  Iniciar Sesión
                </v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="alertSuccess">
      <v-flex xs12 sm6 offset-sm3>
        <v-alert color="success" :value="true" icon="done" class="animated fadeIn">
          Te has registrado correctamente
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout v-if="alertError">
      <v-flex xs12 sm6 offset-sm3>
        <v-alert color="error" icon="warning" :value="true" class="animated fadeIn">
          {{errorMessage}}
        </v-alert>
      </v-flex>
    </v-layout>
   <v-layout v-if="alertSuccess">
      <v-flex xs12 sm6 offset-sm3>
        <loading-component></loading-component>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signIn',
    data () {
      return {
        email: '',
        password: '',
        confirmPass: '',
        errorMessage: '',
        alertSuccess: false,
        alertError: false,
        loadingState: false,
        buttonAction: true
      }
    },
    methods: {
      signIn: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
            (user) => {
              this.alertSuccess = true
              this.alertError = false
              setTimeout((user) => {
                this.$router.replace('home')
              }, 3000)
            },
            (error) => {
              this.alertError = true
              this.errorMessage = error.message
            }
          )
      }
    }
  }
</script>

<style lang="scss">
@import '~styles/index.scss';

.signIn-container__card {
  margin-top: 80px;
}


</style>
