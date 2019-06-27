<template>
  <span>
    <v-layout style="margin:0 important" fill-height wrap>
      <v-flex style="margin:10px;" xs6 md6 lg7>
        <v-container  grid-list-xl>
          <v-layout  text-xs-left  wrap v-bind="binding">
              <v-flex>
                <v-card style="padding:20px;" color="white">
                  <v-card-title   class="title">Agreeement {{agreement.agreement_id}}</v-card-title>
                  <div>
                  <b-table v-if="ready" class="milestone-list" hover :items="filteredMilestones" :fields="milestoneListFields">
                    <template slot="Open" slot-scope="row">
                      <v-btn v-if="row.item.Open" color="success"  @click="display = 'milestoneDetail'; row.item.Open = true" small outline>{{row.item.Open}}</v-btn>
                      <v-btn :to="'./' + $router.currentRoute.params.agreement + '/' + (row.index + 1) + '/m_id/' + row.item.milestone_Id" v-if="!row.item.Open"  @click="  row.item.Open = true" small outline>open</v-btn>
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
        self.$store.dispatch('getAgreements', {Id: self.$router.history.current.params.agreement}),
      ]).then(function(values) {
        console.log(values)

        self.milestones = values[0].data.data
        const milestones = self.milestones.filter(
          ms => ms.ms_agreement_id == self.$router.history.current.params.agreement
        );

        self.agreement = values[1].data.data[0]
        console.log(self.agreement)
        const agreement = values[1].data.data[0]
        
        // If 6 milestones dont exist for this agreement, go create missing ones
        if (milestones.length < 6) {
          self.fillEmptyMilestones(milestones, agreement)
        }
        console.log( self.filteredMilestones)
        self.ready = true
      })
    },
    components: {
      MilestoneDetail
    },

    computed: {
      ...mapState({
        milestones: state => state.milestones,
        agreements: state => state.agreements,
      }),
      binding: function () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

        return binding
      },
      trimPrependedAbbrev: function (myOriginalString) {
        return myOriginalString.substring(3);
      }
    },
    watch: {
      milestones: function  () {
        let self = this
        console.log(this.milestones)
        self.milestones = this.milestones
        const milestones = self.milestones.filter(
          ms => ms.ms_agreement_id == self.$router.history.current.params.agreement
        );
        let splitContextId = function (string) {return string.split('-');}
        milestones.sort(function(a, b) {
          a = splitContextId(a.ms_context_id)
          b = splitContextId(b.ms_context_id)
          
          return a[1] - b[1];
        });

        milestones.forEach((milestone, i) => {
          milestone = self.renameKeys(milestone)
          console.log(milestone)
          milestone = {
            ...milestone, 
            Open: false,
            Agreement_id: 'Agreement ' + splitContextId(milestone.context_id)[0] + ' part ' + splitContextId(milestone.context_id)[1]
          }
          self.filteredMilestones.push(milestone) 
        });
      }
    },
    methods: {
      // This function prims the ugly 'ms_' of the fields just for the displaying in the list
      renameKeys: function (obj) {
        let keysMap = {
          ms_Id: 'milestone_Id',
          ms_additional_activities: 'additional_activities', 
          ms_agreement_id: 'agreement_id', 
          ms_catchbox: 'catchbox', 
          ms_completed: 'completed', 
          ms_context_id: 'context_id', 
          ms_date_end: 'date_end', 
          ms_date_start: 'date_start', 
          ms_extention_details: 'extention_details', 
          ms_extention_end: 'extention_end', 
          ms_extention_start: 'extention_start', 
          ms_extention_status: 'extention_status', 
          ms_floral_sweep: 'floral_sweep', 
          ms_frame_inspection: 'frame_inspection', 
          ms_hive: 'hive', 
          ms_hornet_trapping: 'hornet_trapping', 
          ms_ports: 'ports', 
          ms_status: 'status', 
          ms_swarm_capture: 'swarm_capture', 
        }
        let cleanNames = Object.keys(obj) .reduce((acc, key) => ({ ...acc, ...{ [keysMap[key] || key]: obj[key] }    }), {})
        return cleanNames
        
      },

      fillEmptyMilestones: function(milestones, agreement) {
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
          this.ready =false
          if (!milestones[i-1]) {
            console.log(i)
            let context_id = self.$router.history.current.params.agreement + '-' + i;

            // Calculate the general milestone dates using the agreement start date
            console.log(agreement.agreement_start_date)

            var dateParts = agreement.agreement_start_date.split("/");
            var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 

            let agreement_start_date = new Date(dateObject);
            console.log(agreement_start_date)

            let milestone_start = new Date(dateObject)
            milestone_start.setDate(dateObject.getDate()+(7*(i-1)));

            let milestone_end = new Date(dateObject)
            milestone_end.setDate(dateObject.getDate()+(7*i));

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
          // if (i == 6) {
          //   window.location.reload()


          // }
            
        }
      }
    },
    data: () => ({
      agreement: {},
      ready: false,
        milestones: [],
        agreements: [],
        milestoneListFields: [
          
          {
            key: 'Agreement_id',
            sortable: true
          },
          {
            key: 'milestone_Id',
            sortable: true
          },
          {
            key: 'status',
            sortable: true
          },
          {
            key: 'date_start',
            sortable: true
          },
          {
            key: 'date_end',
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