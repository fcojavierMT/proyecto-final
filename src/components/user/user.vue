<template>
<div>
  <div class="background-user">
    <v-flex class="user-card" xs12 sm6 offset-sm3>
      <v-card class="card-info animated fadeInUp">
        <v-card-media class="background-avatar" height="200px" src="/static/user-images/user-background.jpg">
          <v-avatar size="80px">
             <img src="/static/user-images/userIcon.png" alt="John">
          </v-avatar>
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Nombre/Email</h3>
            <div>Description</div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '~styles/index.scss';

.background-user{
  background-color: #34ADFF;
  background-image: -webkit-linear-gradient(20deg, #34ADFF 35%, #4CBFFF 35%);
  min-height: 1000px;
}

.user-card {
  padding: 30px;
}

.background-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
