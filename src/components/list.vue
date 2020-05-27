<template>
  <div>
    <h2>个性配置</h2>
    <div class="mdui-divider"></div>
    <vs-button size="xl" shadow floating>布局</vs-button>
    <div class="mdui-divider"></div>
    <ul class="mdui-list">
      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-icon material-icons">{{layout===1?'crop_7_5':'crop_portrait'}}</i>
        <div class="mdui-list-item-content">{{layout===1?'横版':'竖版'}}</div>
        <label class="mdui-switch">
          <input type="checkbox" checked />
          <i class="mdui-switch-icon"></i>
        </label>
      </li>

      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">bluetooth</i>
        <div class="mdui-list-item-content">Bluetooth</div>
        <label class="mdui-switch">
          <input type="checkbox" />
          <i class="mdui-switch-icon"></i>
        </label>
      </li>

      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">data_usage</i>
        <div class="mdui-list-item-content">Data usage</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      hoverIndex: -1,
      list: [],
      config: {
        layout: 2,
        width: 100,
        height: 100,
        background: 1,
        dataColor: '9F1111',
        borderRadius: 5,
        key: '75f7ef04ec64481cb131ff6621b8c8c1'
      }
    }
  },
  mounted() {
    // this.utools.onPluginReady(() => {
    //   console.log('插件装配完成，已准备好')
    //   // this.getData()
    // })
  },
  methods: {
    getData() {
      // this.$api.allDocsApi().then(res => {
      //   if (!res.error) {
      //     this.list = res.reverse()
      //     if (res.length) {
      //       res.map(item => {
      //         if (item.time) {
      //           let day = this.$api.toLocaleString(item.time)
      //           item['newtime'] = `{ "content": "${day}" }`
      //         }
      //       })
      //       !this.id && this.$emit('click', res['0'])
      //     }
      //   }
      // })
    }
  }
}
</script>

<style scoped>
</style>