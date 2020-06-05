<template>
  <div style="display:flex;justify-content: center;margin-top:1rem">
    <div id="demo"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-undef
import { mapState } from 'vuex'
export default {
  data() {
    return {
      rev: '',
      publicPath: process.env.BASE_URL
    }
  },
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  mounted() {
    window.weatherID = 'demo'
    // eslint-disable-next-line no-undef
    utools.onPluginEnter(() => {
      this.$store
        .dispatch('getConfig')
        .then(res => {
          this.renderDOM(res)
        })
        .catch(() => {
          this.renderDOM(this.config)
        })
    })
  },
  methods: {
    renderDOM(config) {
      console.log('🐛:: renderDOM -> this.config', config)
      window.WIDGET = {
        CONFIG: config
      }
      var s = document.createElement('script')
      s.src = `${this.publicPath}static/he-standard.js`
      var sn = document.getElementsByTagName('script')[0]
      sn.parentNode.insertBefore(s, sn)
      this.$api.putApi({ ...config, _rev: this.rev || config._rev, id: 'weather' }).then(res => {
        if (res.ok) {
          this.rev = res.rev
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>