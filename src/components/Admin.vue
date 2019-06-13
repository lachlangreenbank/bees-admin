<template>
  <span>
    
    <v-layout style="margin:0 important" fill-height wrap>
      <v-navigation-drawer color="#23282d" height="100%" width="180" dark permanent>
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                PHA-admin
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list dense class="pt-0">
           
          <v-list-tile
            @click=""
          >
              <v-icon style="margin-right:10px">dashboard</v-icon>
            <v-list-tile-content>
              <v-list-tile-title>Agreements</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        
          <v-list-tile
            @click=""
          >
              <v-icon style="margin-right:10px">dashboard</v-icon>
            <v-list-tile-content>
              <v-list-tile-title>Milestone</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!--  -->
          <v-list-tile
            @click=""
            color=""
          >
              
            <v-list-tile-content>
              <v-list-tile-title>All milestones</v-list-tile-title>
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

      <v-flex style="margin:10px;" xs6 md6 lg7>
        <!-- Milestone list -->
        <span v-if="display == 'milestoneList'">
          <v-container  grid-list-xl>
            <v-layout  text-xs-left  wrap v-bind="binding">
            <span class="title">Milestones: Agreement 432</span>
                <v-flex>
                  <v-card style="padding:20px;" color="white">
                    <div>
                    <b-table class="milestone-list" hover :items="milestoneList" :fields="milestoneListFields">
                      <template slot="Select" slot-scope="row">
                        <v-btn v-if="row.item.Select" color="success"  @click="display = 'milestoneDetail'; row.item.Select = true" small outline>{{row.item.Select}}</v-btn>
                        <v-btn v-if="!row.item.Select"  @click="display = 'milestoneDetail'; row.item.Select = true" small outline>{{row.item.Select}}</v-btn>
                      </template>
                  </b-table>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </span> 

      <MilestoneDetail v-if="display == 'milestoneDetail'"></MilestoneDetail>
    </v-flex>

    
  </v-layout> 
</span>


</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'

import MilestoneDetail from './MilestoneDetail'

  export default {
    created: function () {

    },
    components: {
      MilestoneDetail
    },

    computed: {
      binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

        return binding
      }
    },
    methods: {
    },
    data: () => ({
        items: [
          { title: 'Milestones', icon: 'dashboard' },
        ],
        display: 'milestoneList',

        milestoneListFields: [
          
          {
            key: 'Title',
            sortable: true
          },
          {
            key: 'Author',
            sortable: false
          },
          {
            key: 'Date',
            sortable: true,
          },
          {
            key: 'Select',
            
          },
        ],
        milestoneList: [
          { isActive: true, Select: false, Date: '22/01/19', Title: 'Milestone 435', Author: 'Macdonald' },
          { isActive: false, Select: false, Date: '22/01/19', Title: 'Milestone 436', Author: 'Shaw' },
          { isActive: false, Select: false, Date: '22/01/19', Title: 'Milestone 437', Author: 'Wilson' },
          { isActive: true, Select: false, Date: '22/01/19', Title: 'Milestone 438', Author: 'Carney' }
        ]
    }),
    props: {
      source: String
    }
  }
</script>