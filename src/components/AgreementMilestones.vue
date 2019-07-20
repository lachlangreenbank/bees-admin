<template>
  <span>
    <v-layout style="margin:0 important" fill-height wrap>
      <v-flex style="margin:10px;" xs12 md9 lg7>
        <v-container  grid-list-xl>
          <v-layout  text-xs-left  wrap v-bind="binding">
              <v-flex>
                <v-card style="padding:20px;" color="white">
                  <v-card-title   class="title">Agreeement <span style="color:gray; font-size:14px"> - {{agreement.agreement_name}}</span></v-card-title>
                  <div>
                  <b-table :sort-by="'Milestone_Id'" v-if="ready" class="milestone-list" hover :items="filteredMilestones" :fields="milestoneListFields">
                    <template slot="Open" slot-scope="row">
                      <v-btn v-if="row.item.Open" color="success"  @click="ready = 'milestoneDetail'; row.item.Open = true" small outline>{{row.item.Open}}</v-btn>
                      <v-btn :to="'./' + $router.currentRoute.params.agreement + '/' + (row.index + 1) + '/m_id/' + row.item.milestone_Id" v-if="!row.item.Open"  @click="  row.item.Open = true" small outline>open</v-btn>
                    </template>
                  </b-table>

                  <v-flex xs12 v-if="!ready && !timeout">
                    <v-progress-linear
                      indeterminate
                      color="yellow darken-2"
                    ></v-progress-linear>
                  </v-flex>
                  <v-btn :key="timeout" v-if="!ready && timeout" @click="reload()">Initialize agreement</v-btn>
                  <v-btn :key="timeout" v-if="ready && timeout && !milestoneAddHide" small @click="addExtraMilestone()">Add milestone</v-btn>
                  
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
      let self = this

      Promise.all([
        self.$store.dispatch('getMilestones'),
        self.$store.dispatch('getAgreements', {Id: self.$route.params.agreement}),
      ]).then(function(values) {
        console.log(values)

        const agreement = values[1].data.data[0]

        self.milestones = values[0].data.data
        const milestones = self.milestones.filter(
          ms => ms.ms_agreement_id == agreement.agreement_jurisdictions[0].post_name + '-' +self.$router.history.current.params.agreement
        );

        self.agreement = values[1].data.data[0]
        console.log(self.agreement)
        
        // If 6 milestones dont exist for this agreement, go create missing ones
        if (milestones.length < 6) {
          self.fillEmptyMilestones(milestones, agreement)
        }

        console.log( self.filteredMilestones)
        self.ready = true
      })

      setTimeout(function  () {
        self.timeout = true
      },1000)
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
          ms => ms.ms_agreement_id == self.agreement.agreement_jurisdictions[0].post_name + '-' + self.$router.history.current.params.agreement
        );
        let splitContextId = function (string) {return string.split('-');}

        milestones.sort(function(a, b) {
          a = splitContextId(a.ms_context_id)
          b = splitContextId(b.ms_context_id)
          return a[1] + b[1];
        });

        milestones.forEach((milestone, i) => {
          milestone = self.renameKeys(milestone)
          console.log(milestone)
          milestone = {
            ...milestone, 
            Open: false,
            Milestone_Id: 'Milestone ' + splitContextId(milestone.context_id)[1]
          }
          self.filteredMilestones.push(milestone) 
        });
      }
    },
    methods: {
      reload: function () {
        window.location.reload()
      },
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
      // There is alwasy at least 6 milesotnes, if there are not 6, create any missing ones
      fillEmptyMilestones: async function(milestones, agreement) {
        let self = this
        console.log(self.agreement.agreement_jurisdictions[0].post_name)

        let i = 1
        for (i; i <= 6; i++) {
          this.ready =false
          if (!milestones[i-1]) {
            console.log(i)
            let context_id = self.$router.history.current.params.agreement + '-' + i;

            // Calculate the general milestone dates using the agreement start date

            var dateParts = agreement.agreement_start_date.split("/");
            var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 

            let agreement_start_date = new Date(dateObject);
            console.log(agreement_start_date)

            let milestone_start = new Date(dateObject)
            milestone_start.setDate(dateObject.getDate()+((7*(i-1)*6))+1);

            let milestone_end = new Date(dateObject)
            milestone_end.setDate(dateObject.getDate()+(42*i));

            // console.log(agreement_start_date)

            let getFormattedDate = function (dateObj) {
              var month = dateObj.getUTCMonth() + 1; //months from 1-12
              var day = dateObj.getUTCDate();
              var year = dateObj.getUTCFullYear();

              return year + "/" + month + "/" + day;
            }

            await self.setMilestone(
              context_id, 
              getFormattedDate(milestone_start), 
              getFormattedDate(milestone_end)
            )
          } 
        }
      },
      addExtraMilestone: function () {
        let self = this

        // hide the add milestone button for a sec
        self.milestoneAddHide = true
        setTimeout(function () {
          self.milestoneAddHide = false
        }, 2000)

        var last_element = this.filteredMilestones[0];
        console.log(this.filteredMilestones.length)
        let context_id = last_element.context_id.split("-");
        // Construct the new context ID by getting length of current limestones to get the next number and attach that to the agreement id
        context_id = context_id[0] + '-' +  (this.filteredMilestones.length + 1)

        let milestone_start = new Date(last_element.date_end)
        milestone_start.setDate(milestone_start.getDate() + 1)

        let milestone_end = new Date(last_element.date_end)
        milestone_end.setDate(milestone_start.getDate() + 43)

        let getFormattedDate = function (dateObj) {
          var month = dateObj.getUTCMonth() + 1; //months from 1-12
          var day = dateObj.getUTCDate();
          var year = dateObj.getUTCFullYear();

          return year + "/" + month + "/" + day;
        }

        console.log(context_id + ' ' + getFormattedDate(milestone_start) + ' ' + getFormattedDate(milestone_end))
        let setTheNewMilestone = async function () {
          await self.setMilestone(context_id, getFormattedDate(milestone_start), getFormattedDate(milestone_end))
          .then(function (res) {
            console.log(res)
            self.filteredMilestones.push(Object.assign({
              Milestone_Id: 'Milestone ' + (res.data.data[0].ms_context_id).split("-")[1],
              date_start: getFormattedDate(milestone_start),
              date_end: getFormattedDate(milestone_end)
            },
              self.renameKeys(res.data.data[0])))
            // self.reload()
          })
        }
        setTheNewMilestone()
      },
      setMilestone: function (context_id, start_date, end_date) {
        let self = this
        return new Promise(function(resolve, reject) {
          let params = {
            "context_id": context_id,
            "completed": "0",
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
            "agreement_id": self.agreement.agreement_jurisdictions[0].post_name + '-' + self.$router.history.current.params.agreement
          }


          self.$store.dispatch('setMilestone', params)
          .then((res) => resolve(res))
        })
      }
    },
    data: () => ({
      milestoneAddHide: false,
      timeout: false,
      agreement: {},
      ready: false,
        milestones: [],
        agreements: [],
        milestoneListFields: [
          
          {
            key: 'Milestone_Id',
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
        ],
        filteredMilestones: [
        ]
    }),
    props: {
      source: String
    }
  }
</script>