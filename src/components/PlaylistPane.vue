<template>
    <div>
        <h2>Playlists</h2>
        <div class="tabs">
            <div
                v-for="(playlist, playlist_id) in this.playlists"
                v-bind:key="playlist_id"
                v-on:click="onClickPlaylist(playlist_id)"
            >
                {{ playlist.name }}
            </div>
        </div>
        <div class="pane">
            <div
                v-bind:key="playlist_id"
                v-for="(playlist, playlist_id) in this.playlists"
            >
                <template v-if="isSelectedPlaylist(playlist_id)">
                    <Playlist
                        v-bind:playlist="playlist"
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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
    methods: {
        onClickPlaylist: function(playlist_id) {
            // set ui.selectedPlaylist
            this.setUICurrentPlaylist({
                playlist_id
            })
        },
        isSelectedPlaylist: function(playlist_id) {
            return (this.ui.selectedPlaylist == playlist_id);
        },
        ...mapMutations({
            setUICurrentPlaylist: 'setUICurrentPlaylist'
        })
    },
    computed: mapState([
        'playlists',
        'player',
        'ui',
    ])
}
</script>