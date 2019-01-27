import Vue from 'vue'
import Vuex from 'vuex'
import { } from './config/mutation-types.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		player: {
			current: null, // currently loaded/playing track - Howl instance
			preload: null, // pre-load next track for gapless playback support
		},
		queue: {
			tracklist: [
				'oyua3woaet',
				'4a0jxz2lmz',
				'm76v0dvgk6',
				'u9flgw0ict',
				'bptbofjw96',
			],
			currentTrack: null, // ID of current track
		},
		playlists: [
			{
				name: "default",
				tracklist: [
					'm76v0dvgk6',
					'u9flgw0ict',
					'i9ezo6cfai',
					'wzb0uo1hfu',
					'141773f5uk',
					'arj0pqsela',
					'kg1j1jmayr',
					'bptbofjw96',
					'2ia9qssyy5',
					'i4xjiob1ku',
					'n4r31cehbt',
					'x34u08u9kq',
					't09ufb80g3',
					'bt8fvzr9s5',
					'zt2shpp32r',
					'gp0ua7owkk',
					'2a84ko9svv',
					'7yhqnn2mdb',
					'd73ovaqsgj',
					'87tk7jtxq4',
				],
			}
		],
		ui: {
			
		},
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
		setPlayerCurrentTrackByID (state, payload) {
			state.player.current = state.library[payload.id]
		},
		setPlayerPreloadTrackByID (state, payload) {
			state.player.preload = state.library[payload.id]
		}
	},
	actions: {
		
	},
	getters: {
		songDuration: state => {
            if (state.player.currentTrack) {
                return state.player.currentTrack.duration();
            } else {
                return 0
            }
        },
	}
})
