<template>
  <div>
    <div v-if="size" class="text-center my-16">
       <v-icon x-large color="">mdi-alert-circle-outline</v-icon>
       <div class="title text-center">oops.. sorry you can only view this page on medium size screen.. thank you</div>
      
    </div>
    <div v-if="!size">
    <div  class="component">
      <v-navigation-drawer
      disable-resize-watcher
      app
      v-model="drawer"
      :hide-overlay="true"
       width="20%"  color="#4527A0" clipped>
        <v-list class="mt-16">
          <v-list-item v-for="(doc, index) in merchant" :key="index" @click="component = doc.link">
            <v-list-item-icon>
              <v-icon color="#BDBDBD"> {{ doc.icon }}</v-icon>
            </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle class="grey--text text--lighten-1">
                 {{ doc.title}}
            </v-list-item-subtitle>
          </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
      <div class="components">
      <component :is='component'></component>
      </div>
      </div>
  </div>
</template>

<script>
import dashboard from '../components/dashboard';
import profile from '../components/profile';
import sellProducts from '../components/sellProducts';
import status from '../components/productStatus'
export default {
  components : {
    dashboard,
    profile,
    sellProducts,
    status
  },

  data: () => ({
    size: false,
    drawer: true,
    component: 'profile',
    merchant: [
      { link: 'dashboard', title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { link: 'profile', title: 'Profile', icon: 'mdi-account-outline' },
      { link: 'sellProducts', title: 'Sell Products', icon: 'mdi-tshirt-crew ' },
      { link: 'status', title: 'Products status', icon: 'mdi-chart-areaspline-variant'  }
    ]
  }),

  mounted() {
    if(screen.width < 1000){
      this.size = true
    }
  },
  
}
</script>

<style scoped>


</style>