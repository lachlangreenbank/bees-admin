<template>
  <v-app>
        <v-content>
    <v-layout  style=" margin:0 important" fill-height wrap>
      <v-navigation-drawer  style="background-color:#23282d" height="100%" width="180" dark permanent>
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
           
          
            <v-list-tile
              @click="$router.push('../../../../../../../../milestone-list')"

            >
                <v-icon style="margin-right:10px">dashboard</v-icon>
              <v-list-tile-content>
                <v-list-tile-title>Milestones</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            
            <!--  -->
            <v-list-tile
              @click=""
              color=""
            >
                
              <v-list-tile-content>
                <v-list-tile-title>Add new</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>

        <v-flex>
            <router-view></router-view>
        </v-flex>
      
      </v-layout>

      
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      //
    }
  }
}
</script>
