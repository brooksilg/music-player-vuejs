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
					'kg1j1jmayr',
					'bptbofjw96',
					'2ia9qssyy5',
					'i4xjiob1ku',
					'n4r31cehbt',
					'x34u08u9kq',
					'2a84ko9svv',
					'7yhqnn2mdb',
					'd73ovaqsgj',
					'87tk7jtxq4',
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
			'oyua3woaet' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "Bleed Black",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/03 - Bleed Black.mp3"
			},
			'uqds9uih0r' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "Silver and Cold",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/04 - Silver and Cold.mp3"
			},
			'w4k5m9woo4' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "Dancing Through Sunday",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/05 - Dancing Through Sunday.mp3"
			},
			'mr7mcde5nh' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "Girl's Not Grey",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/06 - Girl's Not Grey.mp3"
			},
			'kdcv9uw94f' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "Death of Seasons",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/07 - Death of Seasons.mp3"
			},
			'3nzxj6v42f' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "The Great Disappointment",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/08 - The Great Disappointment.mp3"
			},
			'4a0jxz2lmz' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "Paper Airplanes (makeshift wings)",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/09 - Paper Airplanes (makeshift wings).mp3"
			},
			'iekveo600k' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "This Celluloid Dream",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/10 - This Celluloid Dream.mp3"
			},
			'nn4x9pmdv7' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "The Leaving Song",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/11 - The Leaving Song.mp3"
			},
			'm4n71ndakx' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "…But Home Is Nowhere",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/12 - …But Home Is Nowhere.mp3"
			},
			'blrqyko76c' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "Synthesthesia",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/13 - Synthesthesia.mp3"
			},
			's8tdzxycb2' : {
				tags: {
					artist: "AFI",
					album: "Sing The Sorrow",
					title: "Now the World",

				},
				filepath: "./library/AFI - Sing The Sorrow (2003) [V0]/14 - Now the World.mp3"
			},
			'm76v0dvgk6' : {
				filepath: "./library/Daughters - You Won't Get What You Want (2018) [V0]/01 - City Song.mp3"
			},
			'u9flgw0ict' : {
				filepath: "./library/Daughters - You Won't Get What You Want (2018) [V0]/02 - Long Road, No Turns.mp3"
			},
			'i9ezo6cfai' : {
				filepath: "./library/Daughters - You Won't Get What You Want (2018) [V0]/03 - Satan In the Wait.mp3"
			},
			'wzb0uo1hfu' : {
				filepath: "./library/Daughters - You Won't Get What You Want (2018) [V0]/04 - The Flammable Man.mp3"
			},
			'141773f5uk' : {
				filepath: "./library/Daughters - You Won't Get What You Want (2018) [V0]/05 - The Lords Song.mp3"
			},
			'arj0pqsela' : {
				filepath: "./library/Daughters - You Won't Get What You Want (2018) [V0]/06 - Less Sex.mp3"
			},
			'kg1j1jmayr' : {
				filepath: "./library/Daughters - You Won't Get What You Want (2018) [V0]/07 - Daughter.mp3"
			},
			'bptbofjw96' : {
				filepath: "./library/Daughters - You Won't Get What You Want (2018) [V0]/08 - The Reason They Hate Me.mp3"
			},
			'2ia9qssyy5' : {
				filepath: "./library/Daughters - You Won't Get What You Want (2018) [V0]/09 - Ocean Song.mp3"
			},
			'i4xjiob1ku' : {
				filepath: "./library/Daughters - You Won't Get What You Want (2018) [V0]/10 - Guest House.mp3"
			},
			'n4r31cehbt' : {
				filepath: "./library/Swans - To Be Kind (2014) [V0]/1-01 - Screen Shot.mp3"
			},
			'x34u08u9kq' : {
				filepath: "./library/Swans - To Be Kind (2014) [V0]/1-02 - Just A Little Boy (For Chester Burnett).mp3"
			},
			't09ufb80g3' : {
				filepath: "./library/Swans - To Be Kind (2014) [V0]/1-03 - A Little God In My Hands.mp3"
			},
			'bt8fvzr9s5' : {
				filepath: "./library/Swans - To Be Kind (2014) [V0]/1-04 - Bring The Sun - Toussaint L'Ouverture.mp3"
			},
			'zt2shpp32r' : {
				filepath: "./library/Swans - To Be Kind (2014) [V0]/1-05 - Some Things We Do.mp3"
			},
			'gp0ua7owkk' : {
				filepath: "./library/Swans - To Be Kind (2014) [V0]/2-01 - She Loves Us.mp3"
			},
			'2a84ko9svv' : {
				filepath: "./library/Swans - To Be Kind (2014) [V0]/2-02 - Kirsten Supine.mp3"
			},
			'7yhqnn2mdb' : {
				filepath: "./library/Swans - To Be Kind (2014) [V0]/2-03 - Oxygen.mp3"
			},
			'd73ovaqsgj' : {
				filepath: "./library/Swans - To Be Kind (2014) [V0]/2-04 - Nathalie Neal.mp3"
			},
			'87tk7jtxq4' : {
				filepath: "./library/Swans - To Be Kind (2014) [V0]/2-05 - To Be Kind.mp3"
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
	
				commit('setPlayerCurrentTrack');
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
