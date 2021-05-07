<template>
  <div>
    <div class="relative">
      <v-container class="py-16 px-5">
         <v-layout row wrap>
           <v-flex sm4>
             <v-img contain :src="singleProduct.productImage_url"></v-img>
           </v-flex>
           <v-flex sm8>
              <v-container class="details">
                 <v-row>
                   <v-col>
                    <h2>{{ singleProduct.product_name }}</h2>
                   </v-col>
                 </v-row>
                  <v-row>
                   <v-col>
                    <div>Brand: {{ singleProduct.company_name }}</div>
                   </v-col>
                 </v-row>
                 <v-row>
                   <v-col>
                     <h2>{{ '₦' + singleProduct.product_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</h2>
                   </v-col>
                 </v-row>
                 <v-row class="hidden-xs-only">
                   <PayStack
                   v-if="currentuser"
                          :amount="singleProduct.product_amount * 100"
                          :paystackkey="APP_KEY"
                          :email="currentuser.email"
                          :reference="reference"
                          :callback="success"
                          :close="close"
                          >
                         <v-btn dark x-large elevation="" color="#4527A0">
                          <span class="mr-3">buy now</span>   <v-icon right large color="">mdi-credit-card-outline </v-icon>
                         </v-btn>
                   </PayStack>
                        <v-btn v-else @click="authUser" dark x-large elevation="" color="#4527A0">
                          <span class="mr-3">buy now</span>   <v-icon right large color="">mdi-credit-card-outline </v-icon>
                         </v-btn>
                         <v-btn @click="handleCart" x-large class="ml-3" elevation="" color="success">
                          <span class="mr-3">add to cart</span>   <v-icon right large color="">mdi-cart-outline</v-icon>
                         </v-btn>
                 </v-row>
                  <v-row class="hidden-sm-and-up">
                          <PayStack
                          v-if="currentuser"
                          :amount="singleProduct.product_amount * 100"
                          :paystackkey="APP_KEY"
                          :email="currentuser.email"
                          :reference="reference"
                          :callback="success"
                          :close="close"
                          >
                          <v-btn dark large elevation="" class="ml-3" color="#4527A0">
                            <span class="mr-3">buy now</span>   <v-icon right  color="">mdi-credit-card-outline </v-icon>
                         </v-btn>
                          </PayStack>
                          <v-btn v-else @click="authUser" dark class="ml-3" large elevation="" color="#4527A0">
                            <span class="mr-3">buy now</span>   <v-icon right  color="">mdi-credit-card-outline </v-icon>
                         </v-btn>
                         <v-btn @click="handleCart" large  class="ml-3 mt-2" elevation="" color="success">
                          <span class="mr-3">add to cart</span>   <v-icon right  color="">mdi-cart-outline</v-icon>
                         </v-btn>
                 </v-row>
               </v-container>
           </v-flex>
           <v-flex xs12>
              <v-container class="mt-16">
                 <v-row>
                   <v-col>
                     <h3>Description</h3>
                      <p class="caption">{{ singleProduct.product_description }}</p>
                   </v-col>
                 </v-row>
                 <v-row>
                   <v-col>
                     <h3>Specifications</h3>
                     <ul class="mt-3">
                       <li class="caption"  v-for="(feature, index) in singleProduct.product_features" :key="index">{{ feature }}</li>
                     </ul>
                   </v-col>
                 </v-row>
               </v-container>
           </v-flex>
         </v-layout>
       </v-container>
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
import { mapState } from 'vuex'
import PayStack from 'vue-paystack'
  // import { mapState } from 'vuex';

export default {
  components: {
    PayStack
  },
 data: () => ({
     singleProduct: null,
     APP_KEY: process.env.VUE_APP_PAYSTACK_KEY
 }),
computed:{ ...mapState(['currentuser']),
   reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
},
 beforeMount() {
   this.$store.dispatch('singleProduct', this.$route.params.product)
   .then(res => this.singleProduct = res)
   
 },
 methods: {
   handleCart(){
       const cart = JSON.parse(localStorage.getItem('cartItem')) || []
        const check = []
        cart.forEach(doc => {   check.push(doc._id)  });
        if(!check.includes(this.singleProduct._id)){
            cart.push(this.singleProduct)
            localStorage.setItem('cartItem', JSON.stringify(cart)) 
            this.$store.dispatch('cartItems') 
        }
   },
   authUser(){
     this.$router.push('/login')
   },
   success(){
     this.$store.dispatch('sold', { quantity: 1, _id: this.singleProduct._id, buyer: this.currentuser._id, amount:this.singleProduct.product_amount   })
   },
   close(){
     alert('payment failed')
   }
 },
}
</script>

<style scoped>
.container.details{
  padding-left: 3em;
}
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
@media screen and (max-width: 600px ) {
  .container.details{
  padding-left: 1.5em;
}
}

</style>