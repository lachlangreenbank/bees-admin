<template>
  <span>
    <MilestoneDetail :milestone="milestone"></MilestoneDetail>     
  </span>
</template>

<script>

  import MilestoneDetail from './MilestoneDetail'

  export default {
    created: function () {

    },
    components: {
      MilestoneDetail
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

        agreementListFields: [
          
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
        
          
        milestone: { isActive: true, Select: false, hive: true, endDate: '22/01/19',startDate: '22/01/20', Title: 'Agreement 26', Author: 'Carney' }
        
    }),
    props: {
      source: String
    }
  }
</script>