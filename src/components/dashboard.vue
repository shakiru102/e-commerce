<template>
  <div>
       <v-container fluid class="">
          <v-row>
            <v-col cols="8">
              <v-sparkline
              stroke-linecap="round"
              :fill="false"
              :gradient="selectedGradient"
              :value="currentuser.products_bought"
              padding="16"
              auto-draw
              smooth="10"
              color="grey"
              label-size="4"
              line-width="2"
              :auto-line-width="false"
              >
               <template v-slot:label="label">
            {{ '₦' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
          </template>
              </v-sparkline>
            </v-col>
            <v-col cols="4" class="text-center ">
              <div class="font-weight-bold deep-purple--text text--darken-3  mt-16">TOTAL BOUGHT</div>
              <div class="grey--text ">{{ '₦' + bought.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</div>
            </v-col>
          </v-row>
                <v-row>
            <v-col cols="8">
              <v-sparkline
              stroke-linecap="round"
              :fill="false"
              :gradient="selectedGradient"
              :value="currentuser.products_sold"
              padding="16"
              auto-draw
              smooth="10"
              color="grey"
              label-size="4"
              line-width="2"
              :auto-line-width="false"
              >
               <template v-slot:label="label">
            {{ '₦' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
          </template>
              </v-sparkline>
            </v-col>
            <v-col cols="4" class="text-center ">
              <div class=" font-weight-bold deep-purple--text text--darken-3 mt-16">TOTAL SOLD</div>
              <div class=" grey--text ">{{ '₦' + sold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</div>
            </v-col>
          </v-row>
        </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'dashboard',
  data: () => ({
    selectedGradient: ['#00c6ff', '#F0F', '#FF0'],
  }),
  computed:{
   ...mapState(['currentuser']),
   bought(){
     return this.currentuser.products_bought.reduce((a, b) => {
       return a + b
     })
   },
   sold(){
     return this.currentuser.products_sold.reduce((a, b) => {
       return a + b
     })
   }
   },
  

}
</script>

<style>

</style>