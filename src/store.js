import Vue from 'vue'
import Vuex from 'vuex'
import { PlayerConst, UI } from './config/constants.js'
import { Howl } from 'howler'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
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
					'12gph7xe6p',
					'kpvpf8wx0f',
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
	},
	mutations: {
		setPlayerCurrentTrack (state, payload) {
			if (state.player.current.track) {
				// stop (now) previous track
				state.player.current.track.stop();
			}
		},
		setPlayerPreloadTrack (state, payload) {
			if (payload.track_id) {
				state.player.preload = state.library[payload.track_id]
			} else {
				// console.error('Track ID required');
			}
		},
		controlsPause (state) {
			state.player.isPlaying = false;
			state.player.current.track.pause();
		},
		controlsNextTrack (state) {
			// handle repeat-all, repeat-one, and shuffle
			if (state.usePreload && state.player.preload) {
				let playingTrack = state.player.current.track;
				state.player.preload.play();

				// set current
				state.player.current.track = state.player.preload;
				// state.player.preload = setPlayerPreloadTrack(state, {
				// 	id: "asdf",
				// });

				// stop (now) previous track
				playingTrack.stop();
			}
			// if ((state.queue.currentTrack + 1) >= this.playlist.length) {
			// 	// assume repeat-all for now
			// 	this.currentQueueItem = 0;
			// } else {
			// 	this.currentQueueItem++;
			// }
		},
		setUICurrentPlaylist(state, payload) {
			state.ui.selectedPlaylist = payload.playlist_id;
		},
		addTracksToPlaylist(state, payload) {
			let tracks = payload.tracks;
			let playlist = (typeof payload.playlist !== 'undefined') ? payload.playlist : state.ui.selectedPlaylist;
			let position = (typeof payload.position !== 'undefined') ? payload.position : state.playlists[playlist].tracklist.length;
			if (tracks && tracks.length != 0) {
				state.playlists[playlist].tracklist.splice(position, 0, ...tracks);
			}
		},
	},
	actions: {
		setCurrentTrack ({ state, commit, dispatch }, payload) {
			console.log(payload);

			let trackSource = null;
			if (payload.track_id) {
				trackSource = state.library[payload.track_id].filepath;
				
			} else if (payload.filepath) {
				trackSource = payload.filepath;
			} else {
				alert('Track ID required');
				return;
			}

			if (payload.playlist != null) {
				state.player.current.playlist = payload.playlist;
			}

			if (payload.playlistTrack != null) {
				state.player.current.playlistTrack = payload.playlistTrack;
			}

			if (trackSource) {
				commit('setPlayerCurrentTrack');
				state.player.current.track = new Howl({
					src: trackSource,
					onend: () => { dispatch('handleTrackEnd') },
					onload: () => {
						if (payload.playNow || state.player.isPlaying) {
							state.player.isPlaying = true;
							state.player.current.track.play();
						}
					},
					onloaderror: (soundID, errorMessage) => {
						console.error('error loading file:', soundID, errorMessage);
					}
				});
	
				console.log("current track", state.player.current.track);
			} else {

			}
		},
		handleTrackEnd ({state, commit, dispatch}) {
			let nextPlaylistTrack = 0;
            if (state.player.current.playlistTrack + 1 < state.playlists[state.player.current.playlist].tracklist.length) {
                nextPlaylistTrack = state.player.current.playlistTrack + 1;
            } else {
                // TODO: Update with stop mutation
                state.player.isPlaying = false;
			}
			
			dispatch({
				type: 'setCurrentTrack',
				track_id: state.playlists[state.player.current.playlist].tracklist[nextPlaylistTrack],
				playlistTrack: nextPlaylistTrack,
			})
		},
		trackPlay ({ state, commit, dispatch }) {
			state.player.isPlaying = true;
			state.player.current.track.play();
		},
	},
	getters: {
		songDuration: state => {
            if (state.player.current.track) {
                return state.player.current.track.duration();
            } else {
                return 0
            }
        },
	}
})
