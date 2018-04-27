<template>
  <h2>  {{logOutUser}} </h2>
</template>

<script>
import firebase from 'firebase'

export default {
  computed: {
    logOutUser: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('home')
      },
      (error) => {
        alert(error.message)
      })
    }
  }
}
</script>

<style lang="scss">

</style>
