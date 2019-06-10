
<template>
  <span>
    <v-container  grid-list-xl>
      <v-layout  text-xs-left  wrap v-bind="binding">
        <span class="title">Agreement 23</span>
        <v-flex>

          <v-card style="padding:20px;" color="white">
            <v-card-title   class="title">Milestone: 344</v-card-title>
            <!-- <b-input-group size="lg" prepend="$" append=".00">
          <b-form-input></b-form-input>
        </b-input-group> -->
          <v-flex xs3>
            <label for="exampleFormControlSelect1">Sataus</label>
            <select class="form-control" id="exampleFormControlSelect1">
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
                    v-model="milestone.startDate"
                    required
                    placeholder="Start date"
                  ></b-form-input>
              </v-flex>
              <v-flex xs3>
                <label for="exampleFormControlSelect1">End date</label>
                  <b-form-input
                    id="input-2"
                    v-model="milestone.endDate"
                    required
                    placeholder="Start date"
                  ></b-form-input>
              </v-flex>
            </v-layout>
             </v-flex>
         
           
          <v-flex xs12>
            <label for="exampleFormControlSelect1">Select tests</label>
          </v-flex>
          <v-layout>  
            <v-flex xs3>
              <b-list-group>
              <b-list-group-item v-bind:style= "[test.selected ? {'background-color':'silver !important', 'color':'white !important'} : {}]" :disabled="test.selected" v-for="(test, i) in availableTests" @click="addTest(test, i)" >{{test.name}}</b-list-group-item>
               
            </b-list-group>
          </v-flex>
              <v-flex xs3>
              <b-list-group>
              <b-list-group-item v-for="(test, i) in tests">{{test.name}}
                <v-btn @click="removeTest(test, i)" color="error" flat icon small>x</v-btn>
              </b-list-group-item>

            </b-list-group>
          </v-flex>
         </v-layout>
         <v-flex xs12>
            <label for="exampleFormControlSelect1">Users</label>
          </v-flex>
          <v-layout>  
            <v-flex xs3>
              <b-list-group>
              <b-list-group-item disabled v-for="(user, i) in users">{{user.email}}</b-list-group-item>
               
            </b-list-group>
          </v-flex>
         </v-layout>
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

  export default {
    created: function () {
    },
    computed: {
    binding () {
      const binding = {}

      if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

      return binding
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
      }
    },
    data: () => ({
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
        milestone: {
          startDate: '14/11/2019',
          endDate: '21/12/2019'
        },

    }),
    props: {
      source: String
    }
  }
</script>