<template>
  <div id="app">
    <Library />
    <PlaylistPane />
    <Controls />
  </div>
</template>

<script>
import Library from './components/Library.vue'
import PlaylistPane from './components/PlaylistPane.vue'
import Controls from './components/Controls.vue'

export default {
  name: 'app',
  components: {
    Library,
    PlaylistPane,
    Controls
  },
}
</script>