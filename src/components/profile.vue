<template>
  <div>
     <v-container class="">
        <v-card class="px-5 pt-10" flat  >
          <v-form>
            <v-container>
              <v-row>
                <v-col >
                  <v-row>
                   <v-col>
                    <v-text-field type="text" :rules="nameRules" outlined dense color="#4A148C" v-model="currentuser.first_name" label="First name"></v-text-field>
                    <v-text-field type="text" :rules="nameRules" outlined dense color="#4A148C" v-model="currentuser.last_name" label="Last name" ></v-text-field>
                   </v-col>
                   <v-col>
                    <v-text-field type="text" :rules="emailRules" outlined color="#4A148C" v-model="currentuser.email"  dense label="Email" ></v-text-field>
                  </v-col>
                 </v-row>
                 <v-row>
                   <v-col cols="6">
                     <v-select color="#4A148C" v-model="currentuser.country" autofocus :items="country" outlined dense label="Country"></v-select>
                    <v-text-field type="text" outlined color="#4A148C" v-model="currentuser.state"  dense label="State" ></v-text-field>   
                   </v-col>
                 </v-row>
                 <v-row>
                    <v-col cols="6">
                    <v-text-field type="text" outlined v-model="currentuser.address" color="#4A148C"  dense label="Address" ></v-text-field>   
                        <v-menu offset-y>
                          <template v-slot:activator="{ on, attrs }">
                          <v-text-field type="text"  v-model="currentuser.dob" v-bind="attrs" v-on="on" outlined color="#4A148C"  dense label="Date Of Birth" ></v-text-field>   
                          </template>
                             <v-date-picker color="#4A148C" v-model="currentuser.dob"></v-date-picker>
                         
                        </v-menu>
                   </v-col>
                   <v-col class="password">
                     <div class="subtitle mb-3">Change Password</div>
                    <v-text-field :error-messages="err" v-model="password.currentPassword" type="password" prepend-inner-icon="mdi-key-variant " outlined color="#4A148C"  dense label="Current Password" ></v-text-field>   
                    <v-text-field :error-messages="new_err" v-model="password.newPassword" type="password" outlined color="#4A148C"  dense label="New Password" >
                      <template v-slot:append-outer>
                            <v-btn small @click="changePassword" :loading="s_loading" elevation="1" color="">save</v-btn>
                      </template>
                      </v-text-field>   
                   </v-col>
                 </v-row>
                 <v-col>
                   <v-btn @click="updateDoc" :loading="loading" block dark color="#4527A0">save profile</v-btn>
                 </v-col>
                </v-col>
                <v-col class="text-center">
                   <v-avatar  height="150px" class="" width="150px">
                    <v-img v-if="!currentuser.uimg && !imagePreview" src="@/assets/dummy.jpg"></v-img>
                    <v-img v-else-if="!imagePreview && currentuser.uimg" :src="currentuser.uimg"></v-img>
                    <v-img v-else :src="imagePreview"></v-img>
                  </v-avatar>
                  <div class="image">
                   <v-file-input :error-messages="img_err" @change="uploadImage" prepend-icon="mdi-camera" color="#4A148C"  accept="image/*" label=""></v-file-input>
                   <v-btn @click="updatedImage" :loading="img_loading" :disabled="disabled" block color="" light>upload image</v-btn>
                   <v-btn class="mt-16" :loading="dloading" @click="deleteUser" block color="error" dark>delte account</v-btn>
                  </div>
                </v-col>
              </v-row> 
            </v-container>
          </v-form>
        </v-card>
      </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      err: '',
      new_err: '',
      loading: false,
      s_loading: false,
      imagePreview: '',
       nameRules: [
            v => ! !v || 'enter name',
            v => /^[a-zA-Z]*$/.test(v) || ' enter a valid name'
        ],
        emailRules: [
            v => ! !v || 'enter email',
            v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
         ],
         uimg: null,
         disabled: true,
         img_err: '',
         img_loading: false,
         dloading: false
      
      
    }
  },

  computed: mapState(['country', 'currentuser', 'password']),

methods: {

deleteUser(){
  this.dloading = true
this.$store.dispatch('deleteUser', this.currentuser._id)
.then(() => this.$router.push('/'))
},

  changePassword(){
   const validate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(this.password.newPassword)
  
    if (validate) {

    this.s_loading = true
    this.$store.dispatch('updatePassword', this.password )
    .then(() => {
      this.password.currentPassword = ''
      this.password.newPassword = ''
      this.s_loading = false
    })
    .catch( err => {
        this.err = err.response.data
      this.s_loading = false
    })


    }else{
       this.new_err = 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter'
      console.log('in valid new password')
    }   
 
   
  },
  uploadImage(e){
     if( e && e.size <= 5 * 1024 * 1024) {
    this.uimg = e
    this.imagePreview = URL.createObjectURL(this.uimg)
    this.img_err = ''
    console.log(this.uimg)
     }else{
       this.uimg = null
       this.imagePreview = ''
        this.img_err = 'pls upload an image and  make sure image size is less than 5mb'
     }
    

  },
  updatedImage(){
      this.img_loading = true
    this.$store.dispatch('updateImage', this.uimg)
    .then(() => {
      this.$store.dispatch('getUser')
      this.img_loading = false
      this.img_err = ''

    })
  },

  updateDoc(){
    this.loading = true
   const formData = new FormData()
   formData.append('user', this.currentuser)
   this.$store.dispatch('updateDoc', formData)
   .then(() => this.loading = false )
     
       
  }
},
watch : {
uimg(){
  if(this.uimg !== null ) {
  this.disabled = false

  }else{
  this.disabled = true

  }
  console.log('this has changed')
}
},

  
  mounted() {
    this.$store.dispatch('getCountry')
  },

}
</script>

<style scoped>
.image{
  width: 50%;
  margin: 0 auto;
}
.password.col{
  position: relative;
  bottom: 2.3em;
}
</style>