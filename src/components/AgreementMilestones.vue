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
                  <b-table class="milestone-list" hover :items="filteredMilestones" :fields="milestoneListFields">
                    <template slot="Open" slot-scope="row">
                      <v-btn v-if="row.item.Open" color="success"  @click="display = 'milestoneDetail'; row.item.Open = true" small outline>{{row.item.Open}}</v-btn>
                      <v-btn :to="'./' + $router.currentRoute.params.agreement + '/' + (row.index + 1) + '/m_id/' + row.item.ms_Id" v-if="!row.item.Open"  @click="  row.item.Open = true" small outline>open</v-btn>
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

  import MilestoneDetail from './MilestoneDetail'
  import router from '../router'
  import { mapState } from 'vuex'


  export default {
    created: function () {
      this.$store.dispatch('getMilestones')
    },
    components: {
      MilestoneDetail
    },

    computed: {
      ...mapState({
        rawMilestones: state => state.milestones,
      }),
      binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

        return binding
      }
    },
    watch: {
      rawMilestones: function() {
        this.milestones = this.rawMilestones.data
        const result = this.milestones.filter(
          ms => ms.ms_agreement_id == this.$router.history.current.params.agreement
        );
        
        // If 6 milestones dont exist for this agreement, go create missing ones
        if (result.length < 6) {
          this.fillEmptyMilestones(result)
        }
        // Sorting milestones to ascending order
        let splitContextId = function (string) {return string.split('-');}
        result.sort(function(a, b) {
          a = splitContextId(a.ms_context_id)
          b = splitContextId(b.ms_context_id)
          
          return a[1] - b[1];
        });
        result.forEach((milestone, i) => {
          milestone = {
            ...milestone, 
            Open: false,
            formattedContextId: 'Agreement ' + splitContextId(milestone.ms_context_id)[0] + ' - Milestone ' + splitContextId(milestone.ms_context_id)[1]
          }
          this.filteredMilestones.push(milestone) 
        });
        console.log( this.filteredMilestones)
      }
    },
    methods: {

      fillEmptyMilestones(result) {
        let self = this
        let setMilestone = function (context_id) {
         let params = {
          "context_id": context_id,
          "completed": false,
          "status": 'created',
          // "ports": this.availableTests[0].selected == "1" ? true : false,
          "hive": "1",
          "floral_sweep": "1",
          "catchbox": "1",
          // "sticky_mat": this.availableTests[0].selected == "1" ? true : false,
          "frame_inspection": "0",
          "hornet_trapping": "0",
          "swarm_capture": "0",
          // "additional_activities": this.availableTests[7].selected ? "1" : "0",
          "date_start": '0000/00/00',
          "date_end":' 0000/00/00',
          "extention_status": "0",
          "extention_start": "0000/00/00",
          "extention_end": "0000/00/00",
          "extention_details": "extention_details create", 
          "agreement_id": self.$router.history.current.params.agreement
        }
        self.$store.dispatch('setMilestone', params)
      }
        

        let i = 1
        for (i; i <= 6; i++) {
          if (!result[i-1]) {
            console.log(i)
            let context_id = this.$router.history.current.params.agreement + '-' + i;
            setMilestone(context_id)
          }
        }
      }
    },
    data: () => ({
        milestones: [],
        milestoneListFields: [
          
          {
            key: 'formattedContextId',
            sortable: true
          },
          {
            key: 'ms_status',
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
        filteredMilestones: [
          // { isActive: false,endDate: 'TBD',startDate: 'TBD', Title: 'TBD', ms_context_id: 'TBD', Open: false},
          // { isActive: false, endDate: 'TBD',startDate: 'TBD', Title: 'TBD', ms_context_id: 'TBD', Open: false},
          // { isActive: false, endDate: 'TBD',startDate: 'TBD', Title: 'TBD', ms_context_id: 'TBD', Open: false},
          // { isActive: true, endDate: 'TBD',startDate: 'TBD', Title: 'TBD', ms_context_id: 'TBD', Open: false},
          // { isActive: false, endDate: 'TBD',startDate: 'TBD', Title: 'TBD', ms_context_id: 'TBD', Open: false},
          // { isActive: false, endDate: 'TBD',startDate: 'TBD', Title: 'TBD', ms_context_id: 'TBD', Open: false}
        ]
    }),
    props: {
      source: String
    }
  }
</script>