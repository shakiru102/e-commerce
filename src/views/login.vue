<template>
  <div>
      <v-snackbar color="black" top v-model="value" >
        <v-spacer></v-spacer>  {{ errors }} 
           <v-btn class="ml-16" small text color="error" @click.native="value = false">Close</v-btn>
      </v-snackbar>
      <div class="parent">
       <v-container fluid class="signupContainer">
           <v-layout row wrap>
                <v-flex xs12 sm7 md5>
                 <v-card flat class="signupCard">
                     <v-form ref="form" lazy-validation>
                         <v-text-field color="#42A5F5"  :rules="emailRules"  filled v-model="loginDetails.email" type="text" label="Email" ></v-text-field>
                         <v-text-field color="#42A5F5"  :rules="passwordRules" filled v-model="loginDetails.password" type="password" label="Password" ></v-text-field>
                         <v-card-actions>
                             <v-container>
                                         <v-btn :loading="loading" width="100%" dark @click="login" color="#42A5F5">Log in </v-btn>
                                         <v-btn class="mt-5" href="/signup" width="100%" dark  color="#4A148C">sign up </v-btn>
                             </v-container>
                         </v-card-actions>
                     </v-form>
                 </v-card>
            </v-flex>
            <v-flex class="hidden-xs-only" sm5  md7>
              <v-img height="100vh"  src="@/assets/login.jpg"></v-img>
            </v-flex>  
           </v-layout>
        </v-container>
      </div>
  </div>
</template>

<script>
export default {
    data: () => ({
        loginDetails: {
            email: '',
            password:'',
        },
        nameRules: [
            v => ! !v || 'enter name',
            v => /^[a-zA-Z]*$/.test(v) || ' enter a valid name'
        ],
        emailRules: [
            v => ! !v || 'enter email',
            v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'invalid email'
         ],
        passwordRules: [
      v => !!v || 'Password is required',
      v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'invalid password',
  ],
  errors:'',
  value: false,
  loading: false
        
    }),
    methods: {
        login(){
            const valid = this.$refs.form.validate()
            if (valid) {
                    this.loading = true
                     this.$store.dispatch('login', this.loginDetails)
                .then((res) => {
                    if(res) {
                        this.loading = false
                        this.$router.push('/')
                    }})
                    .catch( err => {
                        if (err.response.status == 400) {
                        this.value = !this.value
                        this.loading = false
                        this.errors = err.response.data
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