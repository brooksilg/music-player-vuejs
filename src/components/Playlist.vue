<template>
    <div class="playlist">
        <div
            v-for="(track_id, track_index) in this.playlist.tracklist"
            v-bind:key="track_index"
            v-on:click="selectTrack(track_index)"
        >
            {{ getTrackTitle(track_id) }}
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Playlist',
    props: [
        'playlist',
        'playlist_id'
    ],
    data: function() {
        return {
            // data
        }
    },
    computed: {
        ...mapState([
            'library',
        ])
    },
    methods: {
        selectTrack: function(track_index) {
            this.setTrack({
                track_id: this.playlist.tracklist[track_index],
                playlist: this.playlist_id,
                playlistTrack: track_index,
                playNow: true
            });
        },
        getTrackTitle(track_id) {
            if (this.library[track_id].tags) {
                return this.library[track_id].tags.title;
            } else {
                return this.library[track_id].filepath;
            }
        },
        ...mapMutations({
            setTrack: 'setPlayerCurrentTrack'
        })
    },
    mounted: function() {
        
    }
}
</script>