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
      publicPath: process.env.BASE_URL,
      rev: ''
    }
  },
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  watch: {
    config: {
      handler: function(val) {
        console.log('watch:: val', val)
        this.renderDOM(val)
      },
      deep: true //深度监听
    }
  },
  mounted() {
    window.weatherID = 'demo'
    // this.renderDOM(this.config)
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
      this.$api.putApi({ ...config, _rev: config._rev || this.rev, id: 'weather' }).then(res => {
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