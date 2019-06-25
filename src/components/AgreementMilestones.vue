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
      // this.$store.dispatch('getMilestones')
      // this.$store.dispatch('getAgreements')
      let self = this

      Promise.all([
        self.$store.dispatch('getMilestones'),
        self.$store.dispatch('getAgreements'),
      ]).then(function(values) {
        console.log(values)

        self.milestones = values[0].data.data
        const milestones = self.milestones.filter(
          ms => ms.ms_agreement_id == self.$router.history.current.params.agreement
        );
        self.agreements = values[1].data.data
        const agreement = self.agreements.filter(
          ag => ag.agreement_id == self.$router.history.current.params.agreement
        );
        console.log(agreement)
        
        // If 6 milestones dont exist for this agreement, go create missing ones
        if (milestones.length < 6) {
          self.fillEmptyMilestones(milestones, agreement[0])
        }
        // Sorting milestones to ascending order
        let splitContextId = function (string) {return string.split('-');}
        milestones.sort(function(a, b) {
          a = splitContextId(a.ms_context_id)
          b = splitContextId(b.ms_context_id)
          
          return a[1] - b[1];
        });
        milestones.forEach((milestone, i) => {
          milestone = {
            ...milestone, 
            Open: false,
            formattedContextId: 'Agreement ' + splitContextId(milestone.ms_context_id)[0] + ' part ' + splitContextId(milestone.ms_context_id)[1] + ' Milestone ' + milestone.ms_Id
          }
          self.filteredMilestones.push(milestone) 
        });
        console.log( self.filteredMilestones)
      })
    },
    components: {
      MilestoneDetail
    },

    computed: {
      ...mapState({
        rawMilestones: state => state.milestones,
        rawAgreements: state => state.agreements,
      }),
      binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

        return binding
      }
    },
    watch: {
    },
    methods: {

      fillEmptyMilestones(milestones, agreement) {
        let self = this
        let setMilestone = function (context_id, start_date, end_date) {
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
            "date_start":  start_date,
            "date_end": end_date,
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
          if (!milestones[i-1]) {
            console.log(i)
            let context_id = self.$router.history.current.params.agreement + '-' + i;

            // Calculate the general milestone dates using the agreement start date
            let agreement_start_date = new Date(agreement.agreement_start_date);

            let milestone_start = new Date(agreement.agreement_start_date)
            milestone_start.setDate(agreement_start_date.getDate()+(7*(i-1)));

            let milestone_end = new Date(agreement.agreement_start_date)
            milestone_end.setDate(agreement_start_date.getDate()+(7*i));

            // console.log(agreement_start_date)

            let getFormattedDate = function (dateObj) {
              var month = dateObj.getUTCMonth() + 1; //months from 1-12
              var day = dateObj.getUTCDate();
              var year = dateObj.getUTCFullYear();

              return year + "/" + month + "/" + day;
            }
            console.log(getFormattedDate(milestone_start))
            console.log(getFormattedDate(milestone_end))
             


            setMilestone(
              context_id, 
              getFormattedDate(milestone_start), 
              getFormattedDate(milestone_end)
            )
          }
        }
      }
    },
    data: () => ({
        milestones: [],
        agreements: [],
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
            key: 'ms_date_start',
            sortable: true
          },
          {
            key: 'ms_date_end',
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