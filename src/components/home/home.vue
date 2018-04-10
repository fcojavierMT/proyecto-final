<template>
  <div class="home-container">

    <v-layout row wrap class="ma-0">
      <v-flex xs12>
        <v-parallax src="/static/main-page/mainPage.png" height="600">
          <v-layout column align-center justify-center>
            <img src="/static/main-page/stick.png" class="note-logo animated fadeInDown">
            <h1 class="title-home animated fadeInDown">Stick a note!</h1>
          </v-layout>
        </v-parallax>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex v-for="card in cardItems" :key="card.src">
        <v-card class="card-info animated fadeInLeft">
          <v-card-media :src="card.src" height="200px">
           </v-card-media>
           <v-card-title primary-title>
             <div>
               <h3 class="headline mb-0">{{card.title}}</h3>
               <div>{{card.description}}</div>
             </div>
          </v-card-title>
        </v-card>
       </v-flex>
     </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      items: [
        {
          src: '/static/carousel-images/image1.jpg',
          title: 'Apunta todo lo que necesites'
        },
        {
          src: '/static/carousel-images/image2.jpg',
          title: 'No te olvides de nada'
        },
        {
          src: '/static/carousel-images/image3.jpg',
          title: 'No olvidarse de lo importante'
        },
        {
          src: '/static/carousel-images/image4.jpg',
          title: 'Meetings, quedadas, trabajos..'
        }
      ],
      cardItems: [
        {
          src: '/static/card-images/joinUs.png',
          title: 'Unete a nosotros, y crea tus notas!',
          description: 'No te olvides de nada importante y unete a nosotros a través de este link!'
        },
        {
          src: '/static/card-images/newNote.jpg',
          title: 'Crea tu nota, y no te olvides de ella!',
          description: 'Una simple interación con dos clicks y tu nota ya esta lista!'
        }
      ]
    }
  },
  computed: {
    checkIfUserIsLoggedIn: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('Estoy conectado' + this.user.email)
        } else {
          console.log('No estoy conectado')
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>

@import '~styles/index.scss';

.title-image {
  position: relative;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 2em;
  color: $color-text;
}

.card-info{
  margin: 20px;
}

.home-container{
  padding: 0px;
}

.note-logo{
  width: 200px;
}

.title-home{
  font-size: 50px;
}
</style>
