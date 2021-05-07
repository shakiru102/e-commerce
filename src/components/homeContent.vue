<template>
  <div>
       <v-container class="mt-16">
          <v-layout row wrap>
              <v-flex xs12 sm8>
                  <div class="input">
                  <v-text-field color="#4527A0" v-model="search"   type="text" rounded outlined label="Search Product" ></v-text-field>
                  </div>
              </v-flex>
              <v-flex v-for="(doc, index) in filtered" :key="index" xs12 sm4 md3>
                <v-hover v-slot="{ hover }">
                    <v-card
                    class="ma-5"
                    color="grey lighten-3"
                    flat
                    
                    >
                       <!-- <v-skeleton-loader
                       v-if="homeProducts == null"
                        max-width="100%"
                        type="card"
                        ></v-skeleton-loader> -->
                    <v-img
                        :aspect-ratio="16/16"
                        :src="doc.productImage_url"
                    >
                        <v-expand-transition>
                        <div
                            v-if="hover"
                            class="d-flex transition-fast-in-fast-out v-card--reveal display-1 white--text"
                            style="height: 100%; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#4527a0d2 ;"
                        >
                        <div>
                            {{ '₦' + doc.product_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                        </div>
                            <v-btn :href="`/product/${doc._id}`" text dark elevation="" class="mt-5">view more</v-btn>
                        
                        </div>
                        </v-expand-transition>
                    </v-img>
                    <v-card-text
                        class="pt-6"
                        style="position: relative;"
                    >
                        <v-btn
                        absolute
                        color="#4527A0"
                        class="white--text"
                        fab
                        large
                        right
                        top
                        @click="handleadd(doc)"
                        >
                        <v-icon>mdi-cart</v-icon>
                        </v-btn>
                        <div class=" deep-purple--text subtitle text--darken-3 subtitle mb-2">
                        {{ doc.product_name.slice(0, 50) + '...' }}
                        </div>
                    </v-card-text>
                    </v-card>
                </v-hover>
              </v-flex>
          </v-layout>
        </v-container>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
    data: () => ({
        homeProducts: [],
        search: ''
    }),
    methods: {
        handleadd(data){
         const cart = JSON.parse(localStorage.getItem('cartItem')) || []
        const check = []
        cart.forEach(doc => {   check.push(doc._id)  });
        if(!check.includes(data._id)){
            cart.push(data)
            localStorage.setItem('cartItem', JSON.stringify(cart)) 
            this.$store.dispatch('cartItems') 
        }
        }
    },
    computed: {
        filtered(){
            return this.homeProducts.filter( doc => {
                return doc.product_name.toLowerCase().includes(this.search.toLowerCase()) 
            })
        }
    }, 
     mounted() {
    this.$store.dispatch('getAllProducts')
    .then(res => this.homeProducts = res )
  },
}
</script>

<style scoped>
.test{
    color:#4527a0 ;
}
.input{
    width: 50%;
    margin: 9em auto;
}
@media screen and (max-width: 500px) {
    .input{
    width: 90%;
    margin: 0 auto;
}
    
}

</style>