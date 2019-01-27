<template>
    <div id="controls">
        <div>Track {{ this.currentQueueItem + 1 }} / {{ this.playlist.length }}:</div>
        <button v-on:click="prevTrack">Previous</button>
        <button v-on:click="stopClicked">Stop</button>
        <button v-on:click="playPauseClicked">
            <template v-if="isPlaying">
                Pause
            </template>
            <template v-else>
                Play
            </template>
        </button>
        <button v-on:click="nextTrack">Next</button>
        <p>{{ secondsToHHMMSS(seekPosition) }} / {{ secondsToHHMMSS(songDuration) }}</p>
        <div
            class="progress"
            v-on:click="seekManual"
        >
            <div 
                v-bind:style="{ width: seekPercentage + '%' }"
                v-bind:aria-valuenow="seekPercentage"
                class="progress-bar"
                role="progressbar"
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
            isPlaying: false,
            currentTrack: null,
            seekPosition: 0,
            seekbarAnimRequest: null,
            currentQueueItem: null,
            playlist:  [
                './mp3/sample-01.mp3',
                './mp3/sample-02.mp3'
            ]
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
            
        ]),
        ...mapGetters([
            'songDuration'
        ]),
        ...mapMutations({
            setTrack: 'setPlayerCurrentTrackByID'
        })
    },
    methods: {
        playPauseClicked: function() {
            this.isPlaying = ! this.isPlaying;
        },
        performAnimation: function() {
            this.seekbarAnimRequest = requestAnimationFrame(this.performAnimation)
            this.seekPosition = this.currentTrack.seek();
        },
        seekManual: function(event) {
            let seekPercentage = event.offsetX / event.target.clientWidth;
            this.seekPosition = this.currentTrack.duration() * seekPercentage;
            this.currentTrack.seek(this.seekPosition);
        },
        nextTrack: function() {
            // handle repeat-all, repeat-one, and shuffle
            if ((this.currentQueueItem + 1) >= this.playlist.length) {
                // assume repeat-all for now
                this.currentQueueItem = 0;
            } else {
                this.currentQueueItem++;
            }
        },
        prevTrack: function() {
            // handle repeat-all, repeat-one, and shuffle
            if ((this.currentQueueItem - 1) < 0) {
                // assume repeat-all for now
                this.currentQueueItem = this.playlist.length - 1;
            } else {
                this.currentQueueItem--;
            }
        },
        stopClicked: function() {
            this.isPlaying = false;
            this.seekPosition = 0;
            this.currentTrack.stop();
        },
        onTrackEnd: function() {
            this.nextTrack();
        }
    },
    watch: {
        isPlaying: function () {
            if (this.isPlaying) {
                this.currentTrack.play();
                this.buttonText = "Pause";

                requestAnimationFrame(this.performAnimation);
            } else {
                this.currentTrack.pause();
                this.buttonText = "Play";

                //stop the animation
                cancelAnimationFrame(this.seekbarAnimRequest);
            }
        },
        currentQueueItem: function() {
            let isPlaying = this.isPlaying;
            if (this.currentTrack && isPlaying) {
                this.currentTrack.stop();
            }
            this.currentTrack = new Howl({
                src: [this.playlist[this.currentQueueItem]],
                onend: this.onTrackEnd
            });
            if (isPlaying) {
                this.currentTrack.play();
            }
        }
    },
    mounted: function() {
        // Setup the new Howl.
        if (this.playlist.length) {
            if (this.currentQueueItem == null) {
                this.currentQueueItem = 0;
            }
            // this.currentTrack = new Howl({
            //     src: [this.playlist[this.currentQueueItem]]
            // });
        } else {
            // playlist is empty
        }
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
.progress {
    max-width: 400px;
    margin: 0 auto;
    cursor: pointer;
}
.progress-bar {
    transition: none !important;
    pointer-events: none;
}
</style>
