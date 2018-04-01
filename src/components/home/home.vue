<template>
  <v-carousel>
    <v-carousel-item v-for="item in items" 
        :src="item.src" 
        :key="item.src">
        <div class='title-image'>
          {{item.title}}
        </div>
    </v-carousel-item>
  </v-carousel>
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
</style>
