<template>
  <span>
    <v-layout style="margin:0 important" fill-height wrap>
      <v-flex style="margin:10px;" xs6 md6 lg7>
        <v-container  grid-list-xl>
          <v-layout  text-xs-left  wrap v-bind="binding">
          <span class="title">Milestones</span>
              <v-flex>
                <v-card style="padding:20px;" color="white">
                  <div>
                  <b-table class="milestone-list" hover :items="milestoneList" :fields="milestoneListFields">
                    <template slot="Open" slot-scope="row">
                      <v-btn v-if="row.item.Open" color="success"  @click="display = 'milestoneDetail'; row.item.Open = true" small outline>{{row.item.Open}}</v-btn>
                      <v-btn to='milestone-detail/123' v-if="!row.item.Open"  @click="  row.item.Open = true" small outline>open</v-btn>
                    </template>
                </b-table>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout> 
</span>


</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'



  export default {
    created: function () {

    },
    components: {
      
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
            key: 'Open',
            
          },
        ],
        milestoneList: [
          { isActive: true, startDate: '22/01/19', endDate: '22/01/19', hive: true, status: 'Pending', Date: '22/01/19', Title: 'Milestone 435', Author: 'Macdonald', Open: false },
          { isActive: false, startDate: '22/01/19', endDate: '22/01/19', hive: true, status: 'Pending', Date: '22/01/19', Title: 'Milestone 436', Author: 'Shaw', Open: false },
          { isActive: false, startDate: '22/01/19', endDate: '22/01/19', hive: true, status: 'Pending', Date: '22/01/19', Title: 'Milestone 437', Author: 'Wilson', Open: false },
          { isActive: true, startDate: '22/01/19', endDate: '22/01/19', hive: true, status: 'Pending', Date: '22/01/19', Title: 'Milestone 438', Author: 'Carney', Open: false }
        ]
    }),
    props: {
      source: String
    }
  }
</script>