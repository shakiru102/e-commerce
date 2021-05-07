<template>
  <div>
     <v-container class="">
        <v-row>
          <v-col>
            <v-card  >
              <v-toolbar color="#4527A0" flat>
                  <v-progress-linear
                  color="grey lighten-1"
                   :indeterminate="loading"
                   :active="loading"
                    absolute bottom></v-progress-linear>
                <v-spacer></v-spacer>
                  <v-col cols="3">
                  <v-select dense @change="handleFilter" class="mt-2 grey--text text--lighten-2 caption" dark prefix="Filter:" v-model="filter" :items="filterItem" 
                  label=""></v-select>
                  </v-col>
                <v-btn small @click="deleteAll" text color="error" class="text-capitalize"> remove all </v-btn>
              </v-toolbar>
              
                <v-simple-table  dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Product
          </th>
          <th class="text-left">
            Name
          </th>
           <th class="text-left">
            Category
          </th>
           <th class="text-left">
            Price
          </th>
           <th class="text-left">
            Date
          </th>
          <th class="text-left">
            Sold
          </th>
          <th class="text-left">
            Remove item
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in UserProducts"
          :key="item._id"
        >
          <td><v-img contain height="50px" width="50px" :src="item.productImage_url"></v-img>
          </td>
          <td class="caption">{{ item.product_name }}</td>
          <td class="caption">{{ item.product_category }}</td>
          <td class="caption"> ₦{{ item.product_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
          <td class="caption">{{ item.formated_date }}</td>
          <td class="caption">{{ item.product_sold }}</td>
          <td class="caption">
             <v-btn @click="handleDelete(item._id, item.productImage_urlID)" icon>
                    <v-icon small color="error">mdi-delete-forever</v-icon>
                  </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    filter: 'All',
    filterItem: ['All','Electronics', 'Latops', 'Phones', 'Men wears', 'Women wears', 'Shoes', 'Others'],
    loading: false
  }),

  computed: { 
    ...mapState(['UserProducts']),
      
    },
    methods: {
      handleFilter(){
        this.loading = true
        this.$store.dispatch('filterProducts', { category: this.filter })
      .then(() => this.loading = false)

      },
      handleDelete(id, imgID){
        this.loading = true
         this.$store.dispatch('deleteProduct', { id , imgID}).then(() => this.loading = false);
      },
      deleteAll(){
        if(this.UserProducts.length) {
          this.loading = true
         this.UserProducts.forEach(item => {
          const id = item._id
          const imgID = item.productImage_urlID
          this.$store.dispatch('deleteProduct', { id , imgID}).then(() => this.loading = false);
        })
        }
        
      }
    },

  mounted() {
          this.loading = true
    this.$store.dispatch('getUserProducts')
    .then(() => this.loading = false)
  
  },
  updated() {
    this.$store.dispatch('getAllProducts')
  },

}
</script>

<style>

</style>