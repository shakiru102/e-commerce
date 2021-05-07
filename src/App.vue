<template>
  <v-app>
     <v-app-bar color="#EEEEEE" flat app clipped-left >
       <!-- <v-spacer></v-spacer> -->
          <v-toolbar-title class="ml-8"> S.A.S stores. </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text href="/" color="#6A1B9A" >
            <span class="text-capitalize grey--text text--darken-1">Home</span>
            <v-icon></v-icon>
          </v-btn>
          <v-btn text href="/merchant" color="#6A1B9A" >
            <span class="text-capitalize grey--text text--darken-1">Become A Seller</span>
            <v-icon></v-icon>
          </v-btn>
          <v-btn href="/about" icon>
            <v-icon>mdi-cart-outline</v-icon>
            <span v-if="items != null && items.length">{{ items.length}}</span>
          </v-btn>
          <!-- <v-spacer></v-spacer> -->
        </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',

 

  data: () => ({
    //
  }),
  computed: mapState(['items']),
  mounted() {
    this.$store.dispatch('cartItems') 
  },

};
</script>
