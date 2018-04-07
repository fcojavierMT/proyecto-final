<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm12>
        <v-card>
          <v-card-media height="200px" src="../../../static/card-images/email-serv.jpg">
          </v-card-media>
          <v-layout justify-center>
            <v-flex xs8 sm6 class="text-xs-center">
              <v-form>
                <v-text-field label="E-mail"></v-text-field>
                <v-text-field label="Password"></v-text-field>
                <v-btn>
                  Registrarse
                </v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {

  }
</script>

<style>


</style>
