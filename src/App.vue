<template>
  <v-app>
     <v-app-bar color="#EEEEEE" flat app clipped-left >
        <v-app-bar-nav-icon @click="dialog=!dialog" class="hidden-sm-and-up"></v-app-bar-nav-icon>
       <!-- <v-spacer></v-spacer> -->
          <v-toolbar-title class=""> S.A.S stores. </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text class="anchor" href="/"  >
            <span class=" hidden-xs-only text-capitalize ">Home</span>
            <v-icon></v-icon>
          </v-btn>
          <v-btn class="anchor" text href="/merchant"  >
            <span class=" hidden-xs-only text-capitalize ">Become A Seller</span>
            <v-icon></v-icon>
          </v-btn>
          <v-btn class="anchor" href="/about" icon>
            <v-icon>mdi-cart-outline</v-icon>
            <span v-if="items != null && items.length">{{ items.length}}</span>
          </v-btn>
          <!-- <v-spacer></v-spacer> -->
        </v-app-bar>
        <v-navigation-drawer color="#EEEEEE" app v-model="dialog" width="70%" disable-resize-watcher>
          <v-list class="mt-16">
            <v-list-item href="/">
              <v-list-item-content>
                <v-list-tile-sub-title class=" colour  text-center">Home</v-list-tile-sub-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item href="/merchant">
              <v-list-item-content>
                <v-list-tile-sub-title class=" colour text-center">Become A Seller</v-list-tile-sub-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
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
    dialog: false
    //
  }),
  computed: mapState(['items']),
  mounted() {
    this.$store.dispatch('cartItems') 
  },

};
</script>
<style scoped>
a.anchor{
  transition: 0.3s ease-in-out all;
  color: #757575;
  background: #EEEEEE;
}
a.anchor:hover{
  color:#761dadb0 ;
  background: #EEEEEE;
}
.colour{
  color:#761dadb0 ;

}
</style>
