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
    <Queue />
  </div>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane'

import Library from './components/Library.vue'
import PlaylistPane from './components/PlaylistPane.vue'
import Controls from './components/Controls.vue'
import Queue from './components/Queue.vue'

export default {
  name: 'app',
  components: {
    multipane: Multipane,
    "multipane-resizer": MultipaneResizer,
    Library,
    PlaylistPane,
    Controls,
    Queue
  },
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