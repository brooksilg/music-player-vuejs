const timeFormatter = {
    methods: {
        secondsToHHMMSS(seconds) {
            // Credit to Vishal on Stack Overflow:
            // https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
            
            // Hours, minutes and seconds
            let hrs = Math.floor(seconds / 3600);
            let mins = Math.floor((seconds % 3600) / 60);
            let secs = Math.floor(seconds) % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            let ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        }
    }
}
export default timeFormatter;