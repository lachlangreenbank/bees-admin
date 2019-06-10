
<template>
  <span>
    <v-container  grid-list-xl>
      <v-layout v-if="milestone.data" text-xs-left  wrap v-bind="binding">
        <v-flex>
          <v-card style="padding:20px;" color="white">
            <v-card-title   class="title"></v-card-title>
            <!-- <b-input-group size="lg" prepend="$" append=".00">
          <b-form-input></b-form-input>
        </b-input-group> -->
          <v-flex xs3>
            <label for="exampleFormControlSelect1">Sataus</label>
            <select v-model="milestoneStatus" class="form-control" id="exampleFormControlSelect1">
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
                  <b-form-input
                    id="input-2"
                    v-model="milestone.data[0].ms_date_start"
                    required
                    placeholder="Start date"
                  ></b-form-input>
              </v-flex>
              <v-flex xs3>
                <label for="exampleFormControlSelect1">End date</label>
                  <b-form-input
                    id="input-2"
                    v-model="milestone.data[0].ms_date_end"
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
       
         <v-flex xs12>
            <label for="exampleFormControlSelect1">Ports</label>
          </v-flex>
     
            <v-flex xs3>
              <b-list-group>
              <b-list-group-item disabled v-for="(port, i) in ports">{{port.portName}}</b-list-group-item>
               
            </b-list-group>
          </v-flex>

          <v-flex xs2>
            <v-btn outline @click="$router.go(-1)" flat> Cancel</v-btn>
          
            <v-flex xs2>
              <v-btn outline @click="updateMilestone()" v-bind:style= "[updated == 'updated' ? {'background-color':'green !important', 'color':'white !important'} : {}]" flat> {{updated}}</v-btn>
              </v-flex>
          </v-flex>
      
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </span>
</template>


<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'
import { mapState } from 'vuex'

  export default {
    
    mounted: function () {
      let {startDate, endDate, hive, floral} = this.$attrs.milestone

      if (hive) {
        this.tests.push({
            name: 'Hive test',
            type: 'hive',
            selected: false
          })
        this.availableTests[0].selected = true
      }

      if (floral) {
        this.tests.push({
            name: 'Floral sweep',
            type: 'floral',
            selected: false
          })
        this.availableTests[1].selected = true
      }
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
        this.milestoneDates.startDate = this.milestone.ms_date_start
        this.milestoneDates.endDate = this.milestone.ms_date_end
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
          "ports": true,
          "hive": true,
          "floral_sweep": true,
          "catchbox": true,
          "swarm_capture": true,
          "hornet_trapping": true,
          "frame_inspection": true,
          "additional_activities": true,
          "date_start": this.milestoneDates.startDate,
          "date_end": this.milestoneDates.endDate,
          "extention_status": "extending",
          "extention_start": "2019/03/28",
          "extention_end": "2019/03/28",
          "extention_details": "extention_details create", 
          "agreement_id": this.$router.history.current.params.agreement
        }

        // let hive_id = this.$route.params.hive_id
        // if (hive_id == 'create') {
          this.$store.dispatch('setMilestone', params)
        // } else {
        //   params = Object.assign({Id: Number(4)}, params)
        //   console.log(params)
        //   this.$store.dispatch('activities/updateStickyMat', params)
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
        ports: [
          {
            portName: 'Port 523',
            
          },
          {
            portName: 'Port 524',
            
          },
          {
            portName: 'Port 525',
            
          }
        ],
        tests: [
           
        ],
        availableTests: [
          {
            name: 'Hive test',
            type: 'hive',
            selected: false
          },
          {
            name: 'Floral sweep',
            type: 'floral',
            selected: false
          },
          {
            name: 'Sticky mat',
            type: 'sticky',
            selected: false
          }
        ],
        milestoneDates: {
          startDate: '14/11/2019',
          endDate: '21/12/2019'
        },

    }),
    props: {
      source: String
    }
  }
</script>