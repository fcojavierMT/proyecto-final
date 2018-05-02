<template>
  <v-container class="signUp-container__card">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="animated fadeIn">
         <v-card-media src="/static/card-images/joinUs.png" height="200px"></v-card-media>
          <v-layout justify-center>
            <v-flex xs8 sm8 class="text-xs-center">
              <v-form>
                <v-text-field label="E-mail" prepend-icon="email" v-model="email" required>
                </v-text-field>
                <v-text-field label="Contraseña" prepend-icon="lock_open" type="password" v-model="password" required>
                </v-text-field>
                <v-text-field label="Confirma la contraseña" prepend-icon="phonelink_lock" type="password" v-model="confirmPass" :rules="[comparePasswordsOnInput]">
                </v-text-field>
                <v-btn v-on:click="signUp" :disabled="buttonDisabled">
                  Registrarse
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
    name: 'signUp',
    data () {
      return {
        email: '',
        password: '',
        confirmPass: '',
        errorMessage: '',
        alertSuccess: false,
        alertError: false,
        loadingState: false,
        buttonDisabled: false
      }
    },
    computed: {
      comparePasswordsOnInput () {
        return this.password !== this.confirmPass ? 'Las contraseñas no coinciden' : ''
      }
    },
    methods: {
      signUp: function () {
        if (!this.comparePasswords()) {
          this.buttonDisabled = true
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
            (user) => {
              this.alertSuccess = true
              this.alertError = false
              setTimeout((user) => {
                this.$router.replace('home')
              }, 3000)
            },
            (error) => {
              this.alertError = true
              this.buttonDisabled = false
              this.errorMessage = error.message
            }
          )
        } else {
          this.buttonDisabled = false
        }
      },
      comparePasswords: function () {
        return this.password !== this.confirmPass
      }
    }
  }
</script>

<style lang="scss">
@import '~styles/index.scss';

</style>
