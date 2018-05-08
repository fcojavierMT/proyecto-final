<template>
  <div>
    <user-card v-bind:email="userEmail" v-bind:auth="auth"></user-card>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      userEmail: '',
      auth: ''
    }
  },
  methods: {
    getUserInformation: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userEmail = user.email
          this.auth = user.emailVerified
        }
      })
    }
  },
  created: function () {
    this.getUserInformation()
  }

}
</script>

<style lang="scss">

</style>
