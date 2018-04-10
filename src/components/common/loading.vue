<template>
    <div class="loader">
      <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 81 45" >
        <circle class="circle1" fill="#1A7FC3" cx="13.5" cy="22.5" r="4.5" />
        <circle class="circle2" fill="#1A7FC3" cx="31.5" cy="22.5" r="4.5" />
        <circle class="circle3" fill="#1A7FC3" cx="49.5" cy="22.5" r="4.5" />
        <circle class="circle4" fill="#1A7FC3" cx="67.5" cy="22.5" r="4.5" />
      </svg> Redirigiendo...
    </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">

  @import "~styles/index.scss";

  .loader {
    width: 100px;
    margin: 0 auto;
    text-align: center;
    font-size: 1.2em;
    color: $loading-color;
  }

  $delays: 0 125ms 250ms .375s;
  @for $i from 1 through 4 {
    .circle#{$i} {
      animation: bounce linear 2.2s infinite forwards;
      animation-delay: nth($delays, $i);
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    20%,
    50% {
      transform: translateY(9px);
    }
    80% {
      transform: translateY(2px)
    }
    40% {
      transform: translateY(-15px);
    }
    60% {
      transform: translateY(-7px);
    }
  }

</style>
