<template>
  <div style="display:flex;justify-content: center;">
    <div id="demo"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-undef
import { mapState } from 'vuex'
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL
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
        console.log('🐛:: val', val)
        this.renderDOM()
      },
      deep: true //深度监听
    }
  },
  mounted() {
    window.weatherID = 'demo'
    this.renderDOM()
  },
  methods: {
    renderDOM() {
      console.log('🐛:: renderDOM -> this.config', this.config)
      window.WIDGET = {
        CONFIG: this.config
      }
      var s = document.createElement('script')
      s.src = `${this.publicPath}static/he-standard.js`
      var sn = document.getElementsByTagName('script')[0]
      sn.parentNode.insertBefore(s, sn)
      this.$api.putApi({ ...this.config, id: 'weather' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>