<template>
    <div>
        <button v-on:click="playPause">{{buttonText}}</button>
        <p>{{ parseInt(seekPosition) }} / {{ parseInt(songDuration) }}</p>
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
        },
        seekManual: function(event) {
            let seekPercentage = event.offsetX / event.target.clientWidth;
            this.seekPosition = this.currentTrack.duration() * seekPercentage;
            this.currentTrack.seek(this.seekPosition);
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
