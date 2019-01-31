<template>
    <div class="playlist">
        <div
            v-for="(track_id, track_index) in this.playlist.tracklist"
            v-bind:key="track_index"
            v-on:click="selectTrack(track_index)"
        >
            {{ track_id }}
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Playlist',
    props: ['playlist'],
    data: function() {
        return {
            // data
        }
    },
    methods: {
        selectTrack: function() {

        }
    }
}
</script>