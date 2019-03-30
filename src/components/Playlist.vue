<template>
    <div v-bind:class="{
        playing: this.player.isPlaying,
        playlist: true
    }">
        <div
            v-for="(track_id, track_index) in this.playlist.tracklist"
            v-bind:key="track_index"
            v-on:click="selectTrack(track_index)"
            v-bind:class="{
                current: isCurrentPlaylistTrack(track_index)
            }"
        >
            {{ getTrackTitle(track_id) }}
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
            'player'
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
        isCurrentPlaylistTrack(track_index) {
            return (this.player.current.playlistTrack == track_index) && (this.player.current.playlist == this.playlist_id);
        },
        ...mapActions({
            setTrack: 'changeTrack'
        })
    },
    mounted: function() {
        
    }
}
</script>
<style>
.current {
    background: #ccc;
}
.current:before{
    content:'\2026 ';
}
.playing .current:before{
    content:'\25b6 ';
}
</style>
