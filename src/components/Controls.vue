<template>
    <div id="controls">
        <div>Track {{ this.player.current.playlistTrack + 1 }} / {{ this.playlists[this.player.current.playlist].tracklist.length }}:</div>
        <button v-on:click="prevTrack">Previous</button>
        <button v-on:click="stopClicked">Stop</button>
        <button v-on:click="playPauseClicked">
            <template v-if="this.player.isPlaying">
                Pause
            </template>
            <template v-else>
                Play
            </template>
        </button>
        <button v-on:click="nextTrack">Next</button>
        <p>{{ secondsToHHMMSS(seekPosition) }} / {{ secondsToHHMMSS(songDuration) }}</p>
        <div
            class="ui progress tiny"
            v-on:click="seekManual"
        >
            <div 
                v-bind:style="{ width: seekPercentage + '%' }"
                v-bind:aria-valuenow="seekPercentage"
                class="bar"
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import {Howl} from 'howler';
import timeFormatter from '../mixins/timeFormatter.js';

export default {
    name: 'Controls',
    data: function() {
        return {
            seekPosition: 0,
            seekbarAnimRequest: null,
        }
    },
    mixins: [timeFormatter],
    computed: {
        seekPercentage: function() {
            // if (this.trackIsLoaded) {
                return 100 * this.seekPosition / this.songDuration;
            // } else {
                // return 0;
            // }
        },
        ...mapState([
            'player',
            'playlists',
            'library'
        ]),
        ...mapGetters([
            'songDuration'
        ])
    },
    methods: {
        playPauseClicked: function() {
            if (this.player.isPlaying) {
                this.controlsPause();
            } else {
                this.controlsPlay();
            }
        },
        performAnimation: function() {
            this.seekbarAnimRequest = requestAnimationFrame(this.performAnimation)
            this.seekPosition = this.player.current.track.seek();
        },
        seekManual: function(event) {
            let seekPercentage = event.offsetX / event.target.clientWidth;
            this.seekPosition = this.player.current.track.duration() * seekPercentage;
            this.player.current.track.seek(this.seekPosition);
        },
        nextTrack: function() {
            let nextPlaylistTrack = 0;
            if (this.player.current.playlistTrack + 1 < this.playlists[this.player.current.playlist].tracklist.length) {
                nextPlaylistTrack = this.player.current.playlistTrack + 1;
            } else {
                // TODO: Update with stop mutation
                this.player.isPlaying = false;
            }
            this.setTrack({
                track_id: this.playlists[this.player.current.playlist].tracklist[nextPlaylistTrack],
                playlistTrack: nextPlaylistTrack,
            });
        },
        prevTrack: function() {
            let prevPlaylistTrack = 0;
            if (this.player.current.playlistTrack - 1 >= 0) {
                prevPlaylistTrack = this.player.current.playlistTrack - 1;
            }
            this.setTrack({
                track_id: this.playlists[this.player.current.playlist].tracklist[prevPlaylistTrack],
                playlistTrack: prevPlaylistTrack,
            });
        },
        stopClicked: function() {
            this.player.isPlaying = false;
            this.seekPosition = 0;
            this.player.current.track.stop();
        },
        onTrackEnd: function() {
            this.nextTrack();
        },
        ...mapMutations({
            setTrack: 'setPlayerCurrentTrack',
            controlsPlay: 'controlsPlay',
            controlsPause: 'controlsPause'
        })
    },
    watch: {
        isPlaying: function () {
            if (this.player.isPlaying) {
                this.player.current.track.play();

                requestAnimationFrame(this.performAnimation);
            } else {
                this.player.current.track.pause();

                //stop the animation
                cancelAnimationFrame(this.seekbarAnimRequest);
            }
        },
        // currentQueueItem: function() {
        //     let isPlaying = this.player.isPlaying;
        //     if (this.player.current.track && isPlaying) {
        //         this.player.current.track.stop();
        //     }
        //     this.player.current.track = new Howl({
        //         src: [this.playlist[this.currentQueueItem]],
        //         onend: this.onTrackEnd
        //     });
        //     if (isPlaying) {
        //         this.player.current.track.play();
        //     }
        // }
    },
    mounted: function() {
        requestAnimationFrame(this.performAnimation);
    }
}
</script>

<style>
#controls {
    text-align: center;
}
button {
    min-width: 5em;
}
button + button {
    margin-left: 2px;
}
.ui.progress {
    max-width: 90%;
    margin: 0 auto !important;
    cursor: pointer;
}
.ui.progress .bar {
    pointer-events: none; /* seeking bug */
    min-width: 0;
    -webkit-transition: none;
    transition: none;
}
</style>
