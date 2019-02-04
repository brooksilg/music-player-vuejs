<template>
    <h2>Library</h2>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'Library',
    data: function() {
        return {
            library_structured: []
        }
    },
    computed: {
        ...mapState([
            'ui',
            'library'
        ])
    },
    methods: {
        constructLibrary: function() {

        }
    },
    watch: {
        library: function() {

        }
    }
}
</script>