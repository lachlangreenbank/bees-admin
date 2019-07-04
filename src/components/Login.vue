

<template>
  <v-content>
    <v-container fluid fill-height style="position:relative;top:20%">
      <v-layout align-center justify-center>
        <v-flex  xs12 sm8 md6>
          <v-card  width="500px" style='padding:30px 80px; margin: 0 auto' color="#F7901E" class="elevation-12">
            <v-toolbar dark flat color="#F7901E">
              <v-toolbar-title> </v-toolbar-title>
              <v-flex xs4>
              </v-flex>
              <v-flex xs2>
               <Logo width="120px" style="margin-top:10px; margin-left:-10px;"></Logo>
              </v-flex>
              <v-flex xs4>
              </v-flex>
            </v-toolbar>
            <v-flex xs12>
             
  
  
                  <v-text-field label="Username" light     type="text"></v-text-field>

                  <v-text-field label="Password" light    name="password"  type="password"></v-text-field>

                  <span style="text-align:right;display:block" class="caption">Forgot passowrd?</span>
 
            </v-flex>
            <v-card-actions style="margin-top:20px">
              <v-spacer></v-spacer>
              <v-btn @click="login()" flat> Login <v-btn  style="width:20px;height:20px;margin-left:20px" color="#9A3820" icon><v-icon color="white" style="font-size:10px">arrow_forward_ios</v-icon></v-btn></v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import Logo from './Logo'
    import { mapState } from 'vuex'
       
  export default {
    data: () => ({
      drawer: null
    }),
    components: {
      Logo
    },
    computed: {
      ...mapState({
        user: state => state.user,
      }), 
    },
    props: {
      source: String
    },
    watch: {
      user: function  () {
        console.log(this.user.Token)
      }
    },
    methods: {
      login: function () {
        this.$store.dispatch('login')
        
      }
    }
  }
</script>

<style type="text/css">
  
  /* Bee Pest Surveillance Program logo - white */
 

</style>