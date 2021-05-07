<template>
  <div>
      <div class="parent">
       <v-container fluid class="signupContainer">
           <v-layout row wrap>
                <v-flex class="hidden-xs-only" sm5 md7>
              <v-img height="100vh"  src="@/assets/973.jpg"></v-img>
              
            </v-flex>
            <v-flex xs12 sm7  md5>
             <v-card flat class="signupCard">
                 <v-form ref="form" lazy-validation>
                     <v-text-field color="#4A148C" :rules="nameRules" filled v-model="signupDetails.first_name" type="text" label="First name" ></v-text-field>
                     <v-text-field color="#4A148C" :rules="nameRules" filled v-model="signupDetails.last_name" type="text" label="Last name" ></v-text-field>
                     <v-text-field color="#4A148C" :error-messages="errors" :rules="emailRules"  filled v-model="signupDetails.email" type="text" label="Email" ></v-text-field>
                     <v-text-field color="#4A148C" :rules="passwordRules" filled v-model="signupDetails.password" type="password" label="Password" ></v-text-field>
                     <v-card-actions>
                         <v-container>
                                    <v-btn :loading="loading" width="100%" dark @click="signup" color="#4A148C">Sign up </v-btn>
                                         <v-btn class="mt-5" href="/login" width="100%" dark  color="#42A5F5">log in </v-btn>

                         </v-container>
                     </v-card-actions>
                 </v-form>
             </v-card>
            </v-flex>  
           </v-layout>
        </v-container>
      </div>
  </div>
</template>

<script>
export default {
    data: () => ({
        signupDetails: {
            first_name: '',
            last_name: '',
            email: '',
            password:'',
            uimg: '',
            dob: '',
            country: '',
            state: '',
            address: '',
            uimg_id: '',
            products_sold: [0],
            products_bought: [0]
        },
        loading: false,
        nameRules: [
            v => ! !v || 'enter name',
            v => /^[a-zA-Z]*$/.test(v) || ' enter a valid name'
        ],
        emailRules: [
            v => ! !v || 'enter email',
            v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
         ],
        passwordRules: [
      v => !!v || 'Password is required',
      v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
  ],
  errors: '',
        
    }),
    methods: {
        signup(){
            const valid = this.$refs.form.validate()
            if (valid) {
                   this.loading = true
                     this.$store.dispatch('signup', this.signupDetails)
                .then((res) => {
                    if(res) {
                        this.loading = false
                        this.$router.push('/')
                    }}).catch( err => {
                        if (err.response.status == 400) {
                        this.errors = err.response.data.error
                        this.loading = false
                        }
                    })  
              
             
            }
        }
    },

}
</script>

<style scoped>
.v-card.signupCard{
    padding: 5em;
}
</style>