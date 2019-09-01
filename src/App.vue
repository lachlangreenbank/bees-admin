<template>
  <v-app>
        <v-content>
    <v-layout style="background-color:#ecebe9 !important;margin:0 important" fill-height wrap>
      <v-navigation-drawer v-if="$cookies.get('Token-l3253h')" style="background-color:#23282d" height="100%" width="180" dark permanent>
          <v-toolbar style="background-color:#23282d" flat>
            <v-list>
              <v-list-tile>
                <v-list-tile-title class="title">
                  PHA-admin
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-toolbar>

          <v-divider></v-divider>

          <v-list style="background-color:#23282d" dense class="pt-0">
             
            <v-list-tile
              @click="$router.push('../../../../../../../../agreement-list')"
            >
                <v-icon style="margin-right:10px">dashboard</v-icon>
              <v-list-tile-content>
                <v-list-tile-title>Agreements</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            
            <!--  -->
           <!--  <v-list-tile
              @click=""
              color=""
            >
                
              <v-list-tile-content>
                <v-list-tile-title>Add new</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile> -->
          </v-list>

         
        </v-navigation-drawer>
        <v-content  v-if="$route.path == '/login' || $route.path == '/'">
          <v-container style="background-color:#ecebe9 !important; " fluid fill-height>
            <v-layout
              
            >
              <v-flex text-xs-center>
                
                <router-view></router-view>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
        <v-flex v-else xs8>
          
          <router-view></router-view>
        </v-flex>
        <!-- <p v-if="$cookies.get('Token-l3253h')" @click="logout()" style="cursor:pointer; position:absolute; right:20px; top:20px;">Logout</p> -->
      </v-layout>

      
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
    }
        
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
  .loginButton hover{
      color:white !important;
  }
</style>
