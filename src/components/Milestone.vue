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

    }),
    props: {
      source: String
    }
  }
</script>