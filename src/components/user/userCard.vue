<template>
<div>
  <div class="background-user">
    <v-flex class="user-card" xs12 sm6 offset-sm3>
      <v-card class="card-info animated fadeInUp">
        <div class="background-avatar">
          <v-avatar size="80px">
             <img src="/static/user-images/userIcon.png" alt="John">
          </v-avatar>
        </div>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{email}}</h3>
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
  props: ['email']
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
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-image: url('/static/user-images/user-background.jpg')
}

</style>
