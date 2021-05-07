<template>
  <div>
    <v-snackbar
      v-model="uploaded"
      top
    >
      Product has been uploaded successfully
      <v-btn text  class="ml-3 " color="primary" @click.native="uploaded = false">Close</v-btn>
    </v-snackbar>
     <v-container class="">
        <v-card class="px-5 pt-10" flat  >
          <v-form ref="form">
             <v-container class="">
                <v-row>
                  <v-col cols="6">
                    <v-row>
                      <v-col>
                        <v-text-field lazy-validation :rules="nameRules" color="#4A148C" v-model="product.p_name" dense outlined type="text" label="Product name" ></v-text-field>
                       <v-file-input :error-messages="image_err" @change="handleChange" dark background-color="deep-purple darken-3"  accept="image/*"  prepend-icon="" append-icon="mdi-camera" dense solo label="Upload image"></v-file-input>
                      </v-col>
                      <v-col>
                        <v-text-field lazy-validation :rules="nameRules" color="#4A148C" dense outlined type="text" v-model="product.c_name" label="Company name" ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field color="#4A148C" :rules="numRules" v-model="product.p_amount" dense outlined type="text" prefix="₦" label="Amount" ></v-text-field>
                        <v-select color="#4A148C" v-model="product.p_category" :items="items" dense outlined label="Categories"></v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field :error-messages="features_err" v-model="features" @keypress.enter="handleFeatures" append-icon="mdi-plus" color="#4A148C" dense outlined type="text" label="Features" ></v-text-field>
                      </v-col>
                      <v-col>
                         <v-textarea lazy-validation :rules="nameRules" color="#4A148C" outlined v-model="product.p_description" label="Description" ></v-textarea>
                             <v-btn @click="uploadProduct" :loading="loading" block dark color="deep-purple darken-3">upload product </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row>
                    <v-img height="40vh" :src="img" contain></v-img>
                    </v-row>
                    <v-row class="mt-10">
                       <v-chip v-for="(text, index) in product.p_features" :key="index" class="mx-5"  color="#D1C4E9"  >
                            {{text}}
                          </v-chip>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
          </v-form>
        </v-card>
      </v-container>
  </div>
</template>

<script>
export default {
  updated() {
    this.$store.dispatch('getAllProducts')
    console.log('deleted')
  },
  
  data: () => ({
    items: ['Electronics', 'Latops', 'Phones', 'Men wears', 'Women wears', 'Shoes', 'Others'],
    img: '',
    features: '',
    product: {
      p_name: '',
      c_name: '',
      p_image: null,
      p_amount: 0,
      p_category: 'Electronics',
      p_description: '',
      p_features: []
    },
    uploaded: false,
    
    loading: false,
    nameRules: [
            v => ! !v || 'pls enter valid a product credential',
            // v => /^[a-zA-Z]*$/.test(v) || 'pls enter valid a product credential '
        ],
          numRules: [
            // v => ! !v || 'pls enter valid a product credential',
            v => /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/.test(v) || 'pls enter valid a product amount '
        ],
   features_err: '',
   image_err: ''
  }),
  methods: {
    handleChange(e){
      if(e && e.size <= 1 * 1024 * 1024) {
          const url = URL.createObjectURL(e) 
           this.img = url
           this.product.p_image = e
      }else{
        this.image_err = 'pls upload an image and  make sure image size is less than 1mb'
      }
           
    },
    handleFeatures(){
      this.product.p_features.push(this.features)
      this.features = ''
    },
    uploadProduct(){
    const validate =  this.$refs.form.validate() && this.product.p_features.length && !this.p_image
      if (validate){
        // alert('worked')
      this.loading = true
      this.$store.dispatch('uploadProduct', this.product).then(() => {
        this.loading = false
        this.product.p_name = ''
        this.product.c_name = ''
        this.product.p_description = '',
        this.product.p_amount = 0,
        this.product.p_features = [],
        this.product.p_image = null
        this.img = ''
        this.uploaded = true
      })
      .catch((err) => {
      console.log(err.response.data)
      this.loading = false
      })
      }else if (this.p_image == null && this.product.p_features.length ) {
        this.image_err = 'pls upload a product image'
        this.features_err = ''

      }else if( !this.p_image && !this.product.p_features.length) {
        this.features_err = 'product must have atleast one feature'
        this.image_err = ''
      }
     
    }


  },

}
</script>

<style>

</style>