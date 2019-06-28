<template>
  <span>
    <v-layout style="margin:0 important" fill-height wrap>
      <v-flex style="margin:10px;" xs12 md9 lg7>
        <v-container  grid-list-xl>
          <v-layout  text-xs-left  wrap v-bind="binding">
          <span class="title">Milestones</span>
              <v-flex>
                <v-card style="padding:20px;" color="white">
                  <div>
                  <b-table class="milestone-list" hover :items="milestoneList" :fields="milestoneListFields">
                    <template slot="Open" slot-scope="row">
                      <v-btn v-if="row.item.Open" color="success"  @click="display = 'milestoneDetail'; row.item.Open = true" small outline>{{row.item.Open}}</v-btn>
                      <v-btn :to="'./agreement-milestones/' + row.item.ms_agreement_id + '/' + 'single' + '/m_id/' + row.item.ms_Id" v-if="!row.item.Open"  @click="  row.item.Open = true" small outline>open</v-btn>
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
      console.log('hello')
      let self = this
      this.$store.dispatch('getMilestones')
      .then(res => self.milestoneList = res.data.data)
      .then(function  () {
        self.milestoneList.sort(function(a, b) {
          a = a.ms_Id
          b = b.ms_Id
          
          return a[1] - b[1];
        });
      })


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
            key: 'ms_agreement_id',
            sortable: true
          },
          {
            key: 'ms_Id',
            sortable: true
          },
          {
            key: 'ms_status',
            sortable: true
          },
          {
            key: 'ms_date_start',
            sortable: true
          },
          {
            key: 'Open',
            sortable: false
          },
          // {
          //   key: 'endDate',
          //   sortable: true,
          // },
          // {
          //   key: 'Title',
          //   sortable: true,
          // },
        ],
        milestoneList: [
          // { isActive: true, startDate: '22/01/19', endDate: '22/01/19', hive: true, status: 'Pending', Date: '22/01/19', Title: 'Milestone 435', Author: 'Macdonald', Open: false },
          // { isActive: false, startDate: '22/01/19', endDate: '22/01/19', hive: true, status: 'Pending', Date: '22/01/19', Title: 'Milestone 436', Author: 'Shaw', Open: false },
          // { isActive: false, startDate: '22/01/19', endDate: '22/01/19', hive: true, status: 'Pending', Date: '22/01/19', Title: 'Milestone 437', Author: 'Wilson', Open: false },
          // { isActive: true, startDate: '22/01/19', endDate: '22/01/19', hive: true, status: 'Pending', Date: '22/01/19', Title: 'Milestone 438', Author: 'Carney', Open: false }
        ]
    }),
    props: {
      source: String
    }
  }
</script>