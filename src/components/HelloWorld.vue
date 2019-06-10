 <template>
  <span>
    
    <v-layout style="margin:0 important" fill-height wrap>
        <v-navigation-drawer height="100%" width="180" dark permanent>
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
          <span>
            <v-container  grid-list-xl>
              <v-layout  text-xs-left  wrap v-bind="binding">
              <span class="title">Milestones: Agreement 432</span>
                  <v-flex>
                    <v-card style="padding:20px;" color="white">
                      <div>
                      <b-table class="milestone-list" hover :items="milestoneList" :fields="milestoneListFields">
                        <template slot="Select" slot-scope="row">
                  <!--   -->
                            <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
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

          <!-- Milestone detail -->
        <span v-if="display == 'milestoneDetail'">
          <v-container  grid-list-xl>
          <v-layout  text-xs-left  wrap v-bind="binding">
            <span class="title">Milestones: Agreement 432</span>
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
      </v-flex>






        <v-flex  v-if="display == 'milestoneDetail'" style="margin:10px;" xs2>
            <v-card height="200px" >
              <v-layout >
                <v-flex xs6>
                  <div>
                      <span class=""><strong>Publish</strong></span><br/>
                    </div>
                </v-flex>
                <v-flex xs6>
                  <v-btn small color="silver">sdf</v-btn><br/>
                </v-flex>
              </v-layout>
              <v-card-title primary-title>

                
                
              </v-card-title>

              <v-card-actions>

                <v-btn small flat color="orange">Share</v-btn>
                <v-btn small flat color="orange">Explore</v-btn>
              </v-card-actions>
            </v-card>
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
      this.$store.dispatch('changeLocation', {page: 'bee-admin'})
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
        display: 'milestoneList',

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



        // Milestone list

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
          { isActive: true, Date: '22/01/19', Title: 'Milestone 435', Author: 'Macdonald', Open: false },
          { isActive: false, Date: '22/01/19', Title: 'Milestone 436', Author: 'Shaw', Open: false },
          { isActive: false, Date: '22/01/19', Title: 'Milestone 437', Author: 'Wilson', Open: false },
          { isActive: true, Date: '22/01/19', Title: 'Milestone 438', Author: 'Carney', Open: false }
        ]
    }),
    props: {
      source: String
    }
  }
</script>