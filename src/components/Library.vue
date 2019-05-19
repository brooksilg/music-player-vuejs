<template>
    <div id="library">
        <div class="header">
            <h2>Library</h2>
            <button v-on:click="chooseLibraryFolder">Source</button>
        </div>
        <div v-for="(track) in this.library_structured" v-bind:key="track.id">
            <div>
                <span v-on:click="addToPlaylist(track)" title="Add to playlist">
                    (+)
                </span>
                <span v-if="track.tags">
                    <span>{{ track.tags.artist }}</span> - 
                    <span>{{ track.tags.title }}</span>
                </span>
                <span v-else>
                    {{ track.filepath }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { UI } from '../config/constants.js'

const ipcRenderer = window.ipcRenderer

ipcRenderer.on('choose-library-source-reply', (event, arg) => {
    console.log(arg)
})

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
                let track = this.library[track_id];
                track.id = track_id;
                return track;
            })
        },
        addToPlaylist: function(track) {
            this.addTracksToPlaylist({
                tracks: [track.id],
            });
        },
        chooseLibraryFolder: function() {
            ipcRenderer.send('choose-library-source-request')
        },
        ...mapMutations({
            addTracksToPlaylist: 'addTracksToPlaylist',
        })
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