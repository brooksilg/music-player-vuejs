<template>
    <div id="library">
        <h2>Library</h2>
        <div v-for="(track) in this.library_structured" v-bind:key="track">
            <template v-if="track.tags">
                <div>
                    <span>{{ track.tags.artist }}</span> - 
                    <span>{{ track.tags.title }}</span>
                </div>
            </template>
            <template v-else>
                <div>
                    {{ track.filepath }}
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { UI } from '../config/constants.js'

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
            this.library_structured = Object.keys(this.library).map(track_id => {
                console.log(track_id);
                return this.library[track_id]
            })
        }
    },
    watch: {
        library: function() {

        }
    },
    mounted: function() {
        this.constructLibrary();
    }
}
</script>