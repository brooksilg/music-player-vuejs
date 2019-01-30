<template>
    <div>
        <h2>Playlists</h2>
        <div class="tabs">
            <div v-bind:key="index" v-for="(playlist, index) in this.playlists">
                {{ playlist.name }}
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Playlist from './Playlist.vue';

export default {
    name: 'PlaylistPane',
    components: {
        Playlist,
    },
    data: function() {
        return {
            // data
        }
    },
    computed: mapState([
        // map this.count to store.state.count
        'playlists',
        'player',
    ])
}
</script>