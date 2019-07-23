export default {
    ui: {
        selectedPlaylist: 0,
        library : {
            sortBy : UI.SORTBY_ARTIST,
            groupBy: UI.GROUPBY_ALBUM,
        }
    },
    player: {
        current: {
            track: null, // currently loaded/playing track - Howl instance
            playlist: 0, // set to first (default) playlist
            playlistTrack: 0, // index of current track in current.playlist
        },
        preload: null, // pre-load next track for gapless playback support
        isPlaying: false,
        usePreload: true,
        loop: PlayerConst.LOOP_OFF,
    },
    playlists: [
        {
            id: "00",
            name: "Default",
            tracklist: [
            ],
        },
        {
            id: "01",
            name: "Another Playlist",
            tracklist: [
            ],
        }
    ],
    library: {
        // TODO: Investigate using a hash (crc? md5?) as identifier for now
        '12gph7xe6p' : {
            tags: {
                artist: "AFI",
                album: "Sing The Sorrow",
                title: "Miseria Cantare- The Beginning",
                
            },
            filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/01 - Miseria Cantare- The Beginning.mp3"
        },
        'kpvpf8wx0f' : {
            tags: {
                artist: "AFI",
                album: "Sing The Sorrow",
                title: "The Leaving Song Pt. II",
                
            },
            filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/02 - The Leaving Song Pt. II.mp3"
        },
    }
};