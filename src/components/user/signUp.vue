<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="animated fadeIn">
          <v-layout justify-center>
            <v-flex xs8 sm8 class="text-xs-center">
              <v-form>
                <v-text-field label="E-mail" prepend-icon="email" v-model="email" required>
                </v-text-field>
                <v-text-field label="Contraseña" prepend-icon="lock_open" type="password" v-model="password" required>
                </v-text-field>
                <v-text-field label="Confirma la contraseña" prepend-icon="phonelink_lock" type="password" v-model="confirmPass" :rules="[comparePasswordsOnInput]">
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
    <v-layout v-if="alertSuccess">
      <v-flex xs12 sm6 offset-sm3>
        <v-alert type="success" :value="true">
          Te has registrado correctamente, redirigiendo..
        </v-alert>
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
        alertSuccess: false
      }
    },
    computed: {
      comparePasswordsOnInput () {
        return this.password !== this.confirmPass ? 'Las contraseñas no coinciden' : ''
      }
    },
    methods: {
      signUp: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.alertSuccess = true
            setTimeout((user) => {
              this.$router.replace('home')
            }, 3000)
          },
          (error) => {
            alert('Ooops' + error.message)
          }
        )
      }
    }
  }
</script>

<style lang="scss">
  @import '~styles/index.scss';

</style>
