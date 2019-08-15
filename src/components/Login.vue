
<template>
  <v-content>
    <v-container fluid fill-height style="position:relative;top:20%">
      <v-layout align-center justify-center>
        <v-flex  xs12 sm8 md6>
          <v-card max-width="650px"    style='padding:60px 10%; margin: 0 auto; width:100%' color="#F7901E" class="elevation-12">
            <v-toolbar dark flat color="#F7901E">
              <v-toolbar-title> </v-toolbar-title>
              <v-flex xs4>
              </v-flex>
              <v-flex xs2>
                <img v-if="$vuetify.breakpoint.xs" style="margin-left:-35px;margin-top:-30px;" height="50px" src="../assets/logo.svg">
                <img v-else style="margin-top:-30px;" height="50px" src="../assets/logo.svg">
               <!-- <Logo width="160px" style="margin-top:-100px; margin-left:-20px;"></Logo> -->
              </v-flex>
              <v-flex xs4>
              </v-flex>
            </v-toolbar>
            <v-flex xs12>
             
  
  
                  <v-text-field color="white" v-model="email" style="font-weight:600" label="Username" light   name="pha_username"  type="text"></v-text-field>

                  <v-text-field id="enter" color="white" v-model="password" style="font-weight:600" label="Password" light    name="pha_password"  type="password"></v-text-field>

                  <span v-if="error != ''">*{{error}}</span>

                  <a style="color:black; text-decoration:none;" href="http://pha-bees.sodadev.com/wp-login.php?action=lostpassword" target="blank"><span  style="cursor:pointer;text-align:right;display:block" class="caption">Forgot password?</span></a>
 
            </v-flex>
            <v-card-actions style="margin-top:20px">
              <v-spacer></v-spacer>
              <v-btn class="loginButton" v-on:keyup.enter="login()"  @click="login()" color="white" flat> <span style="margin-top:2px;color:black">Login</span> <v-btn class="loginButton"  style="width:20px;height:20px;margin-left:20px" color="#9A3820" icon><v-icon color="white" style="font-size:10px">arrow_forward_ios</v-icon></v-btn></v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<style>

</style>
<script>
  // import Logo from './logo'
    import { mapState } from 'vuex'
       
  export default {
    data: () => ({
      drawer: null,
      email: '',
      password: '',
      error: ''
    }),
    components: {
      // Logo
    },
    computed: {
      ...mapState({
        user: state => state.user,
      }), 
    },
    props: {
      source: String
    },
    created: function () {
      this.$store.dispatch('changeLocation', {page: 'login'})
    },
    mounted: function () {
      // Get the input field
      var input = document.getElementById("enter");
      let self = this
      // Execute a function when the user releases a key on the keyboard
      input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          self.login()
        }
      });
    },
    watch: {
      user: function  () {
         
      }
    },
    methods: {
      login: function () {
        this.$store.dispatch('login', {email: this.email, password: this.password})
        .then((res) => {
          if(res.error) {
            this.error = res.error
          }
        })
        
      }
    }
  }
</script>

<style>
  .loginButton:hover{
      color:white !important;
  }
</style>

 