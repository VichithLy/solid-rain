<template>
  <div class="home">
    <img id="logo" alt="logo" src="../assets/logo.png" />
    <div>Bienvenue sur <strong>Solid Rain</strong> !</div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  margin-top: 1em;
  color: white;
}

.home div {
  margin-top: 2em;
  font-size: 2em;
}

.home img {
  margin: 5em 0;
  transform-origin: 50% 50%;
  -webkit-animation: rotating 40s linear infinite;
}

/*
.home img:hover {
    animation-play-state: paused;
  }
*/
@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
#logo {
  margin-top: 10em;
  width: 60%;
  height: auto;
}
@media (min-width: 1024px) {
  #logo {
    width: 40%;
  }
}
strong {
  color: #42b983;
}
</style>
