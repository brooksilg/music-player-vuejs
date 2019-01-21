<template>
    <button v-on:click="playPause">{{buttonText}}</button>
</template>

<script>
import {Howl} from 'howler';

export default {
    name: 'Controls',
    data: function() {
        return {
            isPlaying: false,
            buttonText: 'Play',
            currentTrack: null
        }
    },
    methods: {
        playPause: function() {
            this.isPlaying = ! this.isPlaying;
        },
    },
    watch: {
        isPlaying: function () {
            if (this.isPlaying) {
                this.currentTrack.play();
                this.buttonText = "Pause";
            } else {
                this.currentTrack.pause();
                this.buttonText = "Play";
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