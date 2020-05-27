<template>
  <div style="display:flex;justify-content: center;">
    <div id="demo"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-undef

export default {
  props: ['config'],
  data() {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  mounted() {
    window.weatherID = 'demo'
    window.WIDGET = {
      CONFIG: {
        layout: 1,
        width: window.innerWidth - 100,
        height: window.innerHeight - 100,
        background: 1,
        dataColor: 'FFFFFF',
        borderRadius: 5,
        city:this.config.city,
        key: '75f7ef04ec64481cb131ff6621b8c8c1'
      }
    }
    var s = document.createElement('script')
    s.src = `${this.publicPath}/static/he-standard.js`
    var sn = document.getElementsByTagName('script')[0]
    sn.parentNode.insertBefore(s, sn)
  }
}
</script>

<style lang="scss" scoped>
</style>