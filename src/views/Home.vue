<template>
  <div class="home">
    <div class="relative">
      <v-carousel
        cycle
        height="80vh"
        hide-delimiter-background
        show-arrows-on-hover
        delimiter-icon="mdi-minus"

      >
        <v-carousel-item v-for="(item, index) in image" :key="index" 
        :src="require('@/assets/' + item)"
        > </v-carousel-item>
      </v-carousel>
      <Content />
    </div>
      <div class="footer">
         <v-container class="">
            <v-layout row wrap>
              <v-flex xs12 sm4>
                <div class=" my-10 grey--text text--darken-2 text-center">
                  <span class="title">S.A.S</span>
                  <span class=" ml-1 font-weight-bold">stores.</span>
                </div>
                <div class="router_link text-center">
                  <router-link class="mx-1 link" to="/">Home</router-link>
                  <router-link class="mx-1 link" to="/merchant">Become A seller</router-link>
                  <router-link class="mx-1 link" to="/about">View Products On Cart</router-link>
                </div>
              </v-flex>
              <v-flex xs12 sm4 class="icons text-center">
                 <v-icon large class=" mx-2 my-16" color="">mdi-facebook</v-icon>
                 <v-icon large class=" mx-2 my-16" color="">mdi-twitter</v-icon>
                 <v-icon large class=" mx-2 my-16" color="">mdi-youtube</v-icon>
                 <v-icon large class=" mx-2 my-16" color="">mdi-linkedin</v-icon>
                 <v-icon large class=" mx-2 my-16" color="">mdi-twitch</v-icon>
                
              </v-flex>
              <v-flex xs12 sm4>
                <div v-if="currentuser != null" class="text-center my-16">{{ currentuser.email }}</div>
              </v-flex>
            </v-layout>
          </v-container>
      </div>
  </div>
</template>

<script>
import Content from '@/components/homeContent'
import { mapState } from 'vuex'
// import Foot from '@/components/footer'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Content,
    // Foot
  },
  data: () => ({
    image: ['sl1.jpg', 'sl2.jpg', 'sl3.jpg', 'sl4.jpg']
  }),
  computed: mapState(['currentuser']),
  mounted() {
    this.$store.dispatch('getUser')
    
  },
 
}
</script>
<style scoped>
.relative{
  position: relative;
    z-index: 2;
    background: white;

}
.footer{
    min-height: 30vh;
    position: sticky;
    z-index: 1;
    bottom: 0;
    background: rgb(229, 228, 231);
}
.link{
  text-decoration: none;
  color: rgb(157, 156, 160);
  transition: 0.3s ease-in-out all;
}
.link:hover{
  color: #4527a0b2;
}
</style>
