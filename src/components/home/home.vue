<template>
  <v-container>
    <v-layout row wrap >
      <v-flex>
        <v-carousel>
         <v-carousel-item v-for="item in items" 
            :src="item.src" 
            :key="item.src">
            <div class='title-image'>
              {{item.title}}
            </div>
        </v-carousel-item>
       </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex v-for="card in cardItems" :key="card.src">
        <v-card class="card-info">
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

  </v-container>
</template>

<script>
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
  margin-top: 20px;
  margin-right: 10px;
}
.carousel{
  margin-left: 0px;
  margin-right: 0px;
}
</style>
