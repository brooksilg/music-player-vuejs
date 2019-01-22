<template>
    <div>
        <button v-on:click="playPause">{{buttonText}}</button>
        <p>{{ parseInt(seekPosition) }} / {{ parseInt(songDuration) }}</p>
        <div class="progress">
            <div 
                v-bind:style="{ width: seekPercentage + '%' }"
                class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
            ></div>
        </div>
    </div>
</template>

<script>
import {Howl} from 'howler';

export default {
    name: 'Controls',
    data: function() {
        return {
            isPlaying: false,
            buttonText: 'Play',
            currentTrack: null,
            seekPosition: 0,
            seekbarAnimRequest: null
        }
    },
    computed: {
        songDuration: function() {
            if (this.currentTrack) {
                return this.currentTrack.duration();
            }
        },
        seekPercentage: function() {
            // if (this.trackIsLoaded) {
                return 100 * this.seekPosition / this.songDuration;
            // } else {
                // return 0;
            // }
        }
    },
    methods: {
        playPause: function() {
            this.isPlaying = ! this.isPlaying;
        },
        performAnimation: function() {
            this.seekbarAnimRequest = requestAnimationFrame(this.performAnimation)
            this.seekPosition = this.currentTrack.seek();
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
        }
    },
    mounted: function() {
        // Setup the new Howl.
        this.currentTrack = new Howl({
            src: ['./mp3/sample.mp3']
        });
    }
}
</script>

<style>
.progress-bar {
    transition: none !important;
}
</style>
