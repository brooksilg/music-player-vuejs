import {Howl} from 'howler';

export default {
    // create new Howl instance from audio file
    create (track_info) {
        return new Howl({
            src: [track_info.filepath],
            // onend: this.onTrackEnd
        });
    },

    play (track) {
        track.play()
    },

    pause () {
        track.pause()
    },

    stop () {
        track.stop()
    }
}