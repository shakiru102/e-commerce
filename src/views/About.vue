<template>
  <div class="about">
    <div class="relative">
    <div v-if="size" class="text-center my-16">
       <v-icon x-large color="">mdi-alert-circle-outline</v-icon>
       <div class="title text-center">oops.. sorry you can only view this page on medium size screen.. thank you</div>
      
    </div>
     <v-container v-if="!size" class="">
        <v-row>
          <v-col>
            <v-card>
              <v-simple-table >
                <template v-slot:default>
                  <thead class="grey lighten-4 ">
                    <tr>
                      <th>Item(s)</th>
                      <th>quantity</th>
                      <th>Unit Price</th>
                      <th>Sutotal</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(doc, index) in cartProducts" :key="index">
                      <td>
                         <v-container class="">
                            <v-row>
                              <v-col cols="1">
                                <v-img :aspect-ratio="16/16" contain :src="doc.productImage_url"></v-img>
                              </v-col>
                              <v-col cols="11">
                                <div class="caption">{{ doc.product_name }}</div>
                              </v-col>
                            </v-row>
                          </v-container>
                      </td>
                      <td>
                        <input @change="handleChange(doc._id)" :id="doc._id"  class="quantity" type="number" value="1"> 
                      </td>
                      <td>{{ '₦' + doc.product_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "," )}}</td>
                      <td>{{ '₦' + doc.subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
                     <td> 
                       <v-btn text light @click="handledelete(doc._id)" icon>
                             <v-icon >mdi-delete-forever</v-icon>
                           </v-btn>
                     </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card-actions>
                <v-spacer></v-spacer>
                <span class="mr-3">
                  total: {{  '₦' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </span>
                  <PayStack
                          v-if="currentuser"
                          :amount="total * 100"
                          :paystackkey="APP_KEY"
                          :email="currentuser.email"
                          :reference="reference"
                          :callback="success"
                          :close="close"
                          >
                <v-btn tile small dark class="deep-purple darken-2" > proceed to check out</v-btn>
                  </PayStack>
                <v-btn v-else  @click="authUser" tile small dark class="deep-purple darken-2" > proceed to check out</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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
import { mapGetters, mapState } from 'vuex'
import PayStack from 'vue-paystack'
export default {
 components: {
    PayStack
  },
  data: () => ({
    cartProducts: [],
    APP_KEY: process.env.VUE_APP_PAYSTACK_KEY,
    size: false

  }),
  methods: {
    handleChange(id){
      this.cartProducts.forEach(doc => {
        if(doc._id == id){
          const val = document.getElementById(doc._id).value
          if(val <= 0){
           document.getElementById(doc._id).value = 1
          }else{
            const amount = doc.product_amount
            doc.subTotal = val *  amount
            console.log(val)        
          }
            
        }
      });
         
    },
     authUser(){
     this.$router.push('/login')
   },
   success(){
     this.cartProducts.forEach(doc => {
        this.$store.dispatch('sold', { quantity: document.getElementById(doc._id).value, _id: doc._id, buyer: this.currentuser._id, amount:this.total  })
        .then(() => {
           this.cartProducts = []
          localStorage.setItem('cartItem', JSON.stringify(this.cartProducts))
          this.$store.dispatch('cartItems')
        })

     })
    

   },
   close(){
     alert('close')
   },
    handledelete(id){
      // this.cartProducts = this.$delete(this.cartProducts, index)
      const newProduct = this.cartProducts.filter(doc => doc._id !== id)
      this.cartProducts = newProduct
      localStorage.setItem('cartItem', JSON.stringify(this.cartProducts))
      this.$store.dispatch('cartItems')
    }
  },
  computed: {
    ...mapGetters(['computedItems', ]),
    ...mapState(['currentuser']),
    total(){
      return this.cartProducts.map( doc => {
        return doc.subTotal
      }).reduce((a, b) => {
          return a + b
        }, 0)

    },
    reference(){
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }

  },
  mounted() {
    if(screen.width < 1000){
      this.size = true
    }
    this.cartProducts = this.computedItems
   
  },

}
</script>
<style scoped>
.quantity{
  display: inline-block;
  border-radius: 5px;
  width: 50px;
  border: solid 2px grey;
  
}
.relative{
  position: relative;
    z-index: 2;
    background: white;
    min-height: 100vh;

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
