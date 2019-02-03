<template>
    <div>
        <h2>Playlists</h2>
        <div class="ui top attached tabular menu">
            <div v-for="(playlist, playlist_id) in this.playlists"
                v-bind:key="playlist_id"
                v-on:click="onClickPlaylist(playlist_id)"
                v-bind:class="{
                    active: isSelectedPlaylist(playlist_id),
                    item: true
                }"
            >
                {{ playlist.name }}
            </div>
        </div>
        <template v-for="(playlist, playlist_id) in this.playlists">
            <div v-bind:key="playlist_id"
                v-if="isSelectedPlaylist(playlist_id)"
                class="ui bottom attached active tab segment"
            >
                <template>
                    <Playlist
                        v-bind:playlist="playlist"
                        v-bind:playlist_id="playlist_id"
                    />
                </template>
            </div>
        </template>
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