<template>
  <div id="app">
    <multipane class="custom-resizer" layout="vertical">
      <div class="pane">
        <Library />
      </div>
      <multipane-resizer />
      <div class="pane" :style="{ flexGrow: 1 }">
        <PlaylistPane />
      </div>
    </multipane>
    <Controls />
  </div>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane'
import { mapState, mapMutations, mapActions } from 'vuex'

import Library from './components/Library.vue'
import PlaylistPane from './components/PlaylistPane.vue'
import Controls from './components/Controls.vue'
const ipcRenderer = window.ipcRenderer

export default {
  name: 'app',
  components: {
    multipane: Multipane,
    "multipane-resizer": MultipaneResizer,
    Library,
    PlaylistPane,
    Controls,
  },
  computed: {
    ...mapState([
        'player',
        'playlists',
        'library'
    ]),
  },
  mounted: function() {
    this.setTrack({
        track_id: this.playlists[this.player.current.playlist].tracklist[this.player.current.playlistTrack],
    });
  },
  methods: {
    ...mapMutations({
      // setTrack: 'setPlayerCurrentTrack',
      setLibraryFileList: 'setLibraryFileList'
    }),
    ...mapActions({
      setTrack: 'setCurrentTrack',
    }),
  }
}
</script>
<style lang="scss">
.custom-resizer {
  width: 100%;
  height: 400px;
}
.custom-resizer > .pane {
  padding: 15px;
  overflow: hidden;
}
.custom-resizer > .multipane-resizer {
  position: relative;
  width: 2px;
  margin: 0;
  left: 0;
  background-color: #ccc;
}
</style>