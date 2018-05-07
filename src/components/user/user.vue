<template>
  <div>
    <user-card v-bind:email="userEmail"></user-card>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      userEmail: ''
    }
  },
  methods: {
    getUserInformation: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userEmail = user.email
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
