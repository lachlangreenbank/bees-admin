
<template>
  <span>
    <v-layout style="margin:0 important" fill-height wrap>
      <v-flex style="margin:10px;" xs6 md6 lg7>
        <v-container  grid-list-xl>
          <v-layout  text-xs-left  wrap v-bind="binding">
          <v-card style="padding:20px;" color="white">
            <v-card-title   class="title">Milestone {{milestone.data[0].ms_Id}}</v-card-title>
            <!-- <b-input-group size="lg" prepend="$" append=".00">
          <b-form-input></b-form-input>
        </b-input-group> -->
          <v-flex xs3>
            <label for="exampleFormControlSelect1">Milestone status</label>
            {{milestoneStatus}}
            <select v-model="milestoneStatus" class="form-control" id="exampleFormControlSelect1">
              <option>created</option>
              <option>Pending</option>
              <option>In progress</option>
              <option>Overdue</option>
              <option>Overdue/Extended</option>
            </select>
        </v-flex>
         
         
            <v-flex xs12>
              <v-layout wrap>
              <v-flex xs3>
                <label for="exampleFormControlSelect1">Start date</label>
                  <b-form-input :id="`type-date`" type="date"
                    id="input-2"
                    v-model="milestone.data[0].ms_date_start"
                    required
                    placeholder="Start date"
                  ></b-form-input>
              </v-flex>
              <v-flex xs3>
                <label for="exampleFormControlSelect1">End date</label>
                  <b-form-input :id="`type-date`" type="date"
                    id="input-2"
                    v-model="milestone.data[0].ms_date_end"
                    required
                    placeholder="Start date"
                  ></b-form-input>
              </v-flex>
            </v-layout>
             </v-flex>



              <v-flex xs3>
            <label for="exampleFormControlSelect1">Extention status</label>
            <select v-model="extentionStatus" class="form-control" id="exampleFormControlSelect1">
              <option>Pending</option>
              <option>In progress</option>
              <option>Overdue</option>
              <option>Overdue/Extended</option>
            </select>
        </v-flex>




              <v-flex xs12>
              <v-layout wrap>
              <v-flex xs3>
                <label for="exampleFormControlSelect1">Extention start date</label>


                  <b-form-input :id="`type-date`" type="date"
                    id="input-2"
                    v-model="extentionDates.startDate"
                    required
                    placeholder="Start date"
                  ></b-form-input>
              </v-flex>
              <v-flex xs3>
                <label for="exampleFormControlSelect1">Extention end date</label>
                  <b-form-input :id="`type-date`" type="date"<b-form-input :id="`type-date`" type="date"
                    id="input-2"
                    v-model="extentionDates.endDate"
                    required
                    placeholder="Start date"
                  ></b-form-input>
              </v-flex>
            </v-layout>
             </v-flex>
         
           
          <v-flex xs12>
            <label for="exampleFormControlSelect1">Select tests</label>
          </v-flex>
          <v-layout style="margin-left:2px;">  
            <v-flex xs3>
              <b-list-group>
                <label for="exampleFormControlSelect1">Available tests</label>
              <b-list-group-item v-bind:style= "[test.selected ? {'background-color':'silver !important', 'color':'white !important'} : {}]" :disabled="test.selected" v-for="(test, i) in availableTests" @click="addTest(test, i)" style="cursor:pointer">
                 {{test.name}} 
              </b-list-group-item>
               
            </b-list-group>
          </v-flex>
              <v-flex xs3>
              <b-list-group v-if="tests.length > 0">
                <label for="exampleFormControlSelect1">Selected tests</label>
                <b-list-group-item v-for="(test, i) in tests">{{test.name}}
                  <v-btn style="margin:0 !important; float:right" @click="removeTest(test, i)" color="error" flat icon small>x</v-btn>
                </b-list-group-item>
              </b-list-group>
              <b-list-group v-else>
                <label for="exampleFormControlSelect1">Selected tests</label>
                <b-list-group-item>No tests selected
                   
                </b-list-group-item>
              </b-list-group>
          </v-flex>
         </v-layout>
         <v-flex xs12>
            <label for="exampleFormControlSelect1">Users</label>
          </v-flex>
      
            <v-flex xs3>
              <b-list-group>
              <b-list-group-item disabled v-for="(user, i) in users">{{user.email}}</b-list-group-item>
               
            </b-list-group>
          </v-flex>         
       
         <!-- <v-flex xs12>
            <label for="exampleFormControlSelect1">Ports</label>
          </v-flex>
     
            <v-flex xs3>
              <b-list-group>
              <b-list-group-item disabled v-for="(port, i) in ports">{{port.portName}}</b-list-group-item>
               
            </b-list-group>
          </v-flex>
 -->
          <v-flex xs12 d-flex>
            <v-flex xs2>
              <v-btn outline @click="$router.go(-1)" flat> Cancel</v-btn>
            </v-flex>
          
            <v-flex xs2>
              <v-btn outline @click="updateMilestone()" v-bind:style= "[updated == 'updated' ? {'background-color':'green !important', 'color':'white !important'} : {}]" flat> {{updated}}</v-btn>
              </v-flex>
          </v-flex>
      
          </v-card>
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
import { mapState } from 'vuex'

  export default {
    
    mounted: function () {

      
    },
    created: function () {

      this.$store.dispatch('getMilestone', {Id: this.$router.history.current.params.milestone_pk_id})
    },
    computed: {
      ...mapState({
        milestoneCreateStatus: state => state.milestoneCreateStatus,
        milestone: state => state.milestone,
      }),
      binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

        return binding
      }
    },
    watch: {
      milestoneCreateStatus: function  () {
        this.updated = 'updated'
      },
      milestone: function  () {
        console.log(this.milestone)
        this.milestoneDates.startDate = this.milestone.data[0].ms_date_start
        this.milestoneDates.endDate = this.milestone.data[0].ms_date_end

         this.extentionDates.startDate = this.milestone.data[0].ms_extention_start
         this.extentionDates.endDate = this.milestone.data[0].ms_extention_end

        this.milestoneStatus = this.milestone.data[0].ms_status
        this.extentionStatus = this.milestone.data[0].ms_extention_status

        if (this.milestone.data) {
          let milestoneDisplay = {
            // startDate: ms_date_start,
            // endDate: ms_date_end,
            hive: this.milestone.data[0].ms_hive,
            floral: this.milestone.data[0].ms_floral_sweep,
            catchbox: this.milestone.data[0].ms_catchbox,
            stickyMat: this.milestone.data[0].ms_sticky_mat,
            frameInspection:this.milestone.data[0]. ms_frame_inspection,
            hornetTrapping: this.milestone.data[0].ms_hornet_trapping,
            // swarmCapture: this.milestone.data[0].ms_swarm_capture,
           
            additionalActivities: this.milestone.data[0].ms_additional_activities
          } 

          console.log(milestoneDisplay)

          if (milestoneDisplay.hive == "1") {
            this.tests.push({
                name: 'Hive test',
                type: 'hive',
                selected: true
              })
            this.availableTests[0].selected = true
          }

          if (milestoneDisplay.floral == "1") {
            this.tests.push({
                name: 'Floral sweep',
                type: 'floral',
                selected: true
              })
            this.availableTests[1].selected = true
          }


          if (milestoneDisplay.catchbox == "1") {
            this.tests.push({
                name: 'Catchbox',
                type: 'catchbox',
                selected: true
              })
            this.availableTests[2].selected = true
          }

          // if (milestoneDisplay.stickyMat == "1") {
          //   this.tests.push({
          //       name: 'Sticky mat',
          //       type: 'sticky',
          //       selected: true
          //     })
          //   this.availableTests[3].selected = true
          // }

          if (milestoneDisplay.frameInspection == "1") {
            this.tests.push({
                name: 'Frame inspeciton',
                type: 'frame',
                selected: true
              })
            this.availableTests[3].selected = true
          }

          if (milestoneDisplay.hornetTrapping == "1") {
            this.tests.push({
                name: 'Asian hornet trapping',
                type: 'hornet',
                selected: true
              })
            this.availableTests[4].selected = true
          }

          // if (milestoneDisplay.hornetTrapping == "1") {
          //   this.tests.push({
          //       name: 'Asian hornet trapping',
          //       type: 'hornet',
          //       selected: true
          //     })
          //   this.availableTests[5].selected = true
          // }

          if (milestoneDisplay.swarmCapture == "1") {
            this.tests.push({
                name: 'swarm capture',
                type: 'swarm',
                selected: true
              })
            this.availableTests[5].selected = true
          }

          if (milestoneDisplay.additionalActivities == "1") {
            this.tests.push({
                name: 'Additional activities',
                type: 'additional',
                selected: true
              })
            this.availableTests[6].selected = true
          }

          
        }
      }
    },
    methods: {
      addTest: function  (test, i) {
        this.tests.push(test)
        this.availableTests[i].selected = true
      },
      removeTest: function  (test, i) {
        this.tests.splice(i, 1);
        for (let t = 0; t < this.availableTests.length; t++) {
          if (this.availableTests[t].type == test.type) {
            this.availableTests[t].selected = false
          }
        }
      },
      updateMilestone () {
        let params = {
          "context_id": this.$router.history.current.params.agreement + '-' + this.$router.history.current.params.milestone_id,
          "completed": true,
          "status": this.milestoneStatus,
          // "ports": this.availableTests[0].selected == "1" ? true : false,
          "hive": this.availableTests[0].selected ? "1" : "0",
          "floral_sweep": this.availableTests[1].selected ? "1" : "0",
          "catchbox": this.availableTests[2].selected ? "1" : "0",
          // "sticky_mat": this.availableTests[0].selected == "1" ? true : false,
          "frame_inspection": this.availableTests[3].selected ? "1" : "0",
          "hornet_trapping": this.availableTests[4].selected ? "1" : "0",
          "swarm_capture": this.availableTests[5].selected ? "1" : "0",
          "additional_activities": this.availableTests[6].selected ? "1" : "0",
          "date_start": this.milestoneDates.startDate,
          "date_end": this.milestoneDates.endDate,
          "extention_status": "extending",
          "extention_start": this.extentionDates.startDate,
          "extention_end": this.extentionDates.endDate,
          "extention_details": "extention_details create", 
          "agreement_id": this.$router.history.current.params.agreement
        }

        // let hive_id = this.$route.params.hive_id
        // if (hive_id == 'create') {
        //   this.$store.dispatch('setMilestone', params)
        // } else {
          params = Object.assign({Id: this.$router.history.current.params.milestone_pk_id}, params)
          console.log(params)
          this.$store.dispatch('updateMilestone', params)
        // }
      }
    },
    data: () => ({
        updated: 'Update',
        milestoneStatus: 'Pending',
        items: [
          { title: 'Milestones', icon: 'dashboard' },
        ],
        display: true,

        // Milestone detail
        users: [
          {
            name: 'Jimmy Tables',
            email: 'jimbo@jmail.com'
          }
        ],
        tests: [],
        availableTests: [
          {
            name: 'Hive inspeciton',
            type: 'hive',
            selected: false
          },
          {
            name: 'Floral sweep',
            type: 'floral',
            selected: false
          },
          {
            name: 'Catchbox',
            type: 'catchbox',
            selected: false
          },
          // {
          //   name: 'Sticky mat',
          //   type: 'sticky',
          //   selected: false
          // },
          {
            name: 'Frame inspection',
            type: 'frame',
            selected: false
          },
          {
            name: 'Asian hornet trapping',
            type: 'hornet',
            selected: false
          },
          {
            name: 'Swarm capture',
            type: 'swarm',
            selected: false
          },
          {
            name: 'Additional activities',
            type: 'additional',
            selected: false
          }
        ],
        milestoneDates: {
          startDate: '2019/12/11',
          endDate: '2019/12/12'
        },
        extentionDates: {
          startDate: '2019/12/11',
          endDate: '2019/12/12'
        },
        extentionStatus: ""

    }),
    props: {
      source: String
    }
  }
</script>