<template>
  <span>

    <v-layout align-left style="margin:0 important" fill-height wrap>
      <v-flex style="margin:10px;" xs10>
        <v-container  grid-list-xl>
          <v-layout  text-xs-left  wrap v-bind="binding">
          
              <v-flex>
                <v-card style="padding:20px;" color="white">
                  <v-card-title   class="title">All Agreements</v-card-title>
                  <div>
                  <b-table class="agreement-list" hover :items="agreements.data" :fields="agreementListFields">

                    <template slot="agreement_start_date" slot-scope="row">
                      <span v-if="row.item.agreement_start_date">{{row.item.agreement_start_date}}</span>
                      <span v-else="row.item.agreement_start_date">Set a start date in wordpress before opening</span>
                    </template>


                    <template slot="Open" slot-scope="row">
                      <v-btn v-if="row.item.Open" color="success"  @click="display = 'agreementDetail'; row.item.Open = true" small outline>{{row.item.Open}}</v-btn>
                      <v-btn :to="'agreement-milestones/' + row.item.agreement_id" v-if="!row.item.Open"  @click=" row.item.Open = true" small outline>open</v-btn>
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

import { mapState } from 'vuex'


  export default {
    created: function () {
      this.$store.dispatch('getAllAgreements')
    },
    components: {
      
    },

    computed: {
      ...mapState({
        agreements: state => state.agreements,
      }),
      binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

        return binding
      }
    },
    methods: {
    },
    data: () => ({

        agreementListFields: [
          
          {
            key: 'agreement_name',
            sortable: true
          },
          {
            key: 'agreement_start_date',
            sortable: true,
          },
          {
            key: 'agreement_end_date',
            sortable: false
          },
          {
            key: 'Open',
            
          },
        ],
        agreementList: [
        ]
    }),
    props: {
      source: String
    }
  }
</script>