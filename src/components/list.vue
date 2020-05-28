<template>
  <div>
    <h2>个性配置</h2>
    <div class="mdui-divider"></div>
    <ul class="mdui-list">
      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-icon material-icons">crop_original</i>
        <div class="mdui-list-item-content">{{bg?'背景开':'背景关'}}</div>
        <label class="mdui-switch">
          <input type="checkbox" @click="handleClickBg" :checked="bg" />
          <i class="mdui-switch-icon"></i>
        </label>
      </li>
      <li class="mdui-list-item mdui-ripple">
        <i
          class="mdui-icon material-icons"
        >{{config.layout===1?'stay_primary_landscape':'smartphone'}}</i>
        <div class="mdui-list-item-content">{{config.layout===1?'横版':'竖版'}}</div>
        <label class="mdui-switch">
          <input type="checkbox" @click="handleLayout" :checked="config.layout===2" />
          <i class="mdui-switch-icon"></i>
        </label>
      </li>
      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-icon material-icons">{{backgroundlist[config.background]}}</i>
        <div class="mdui-list-item-content">背景</div>
        <select class="mdui-select" @change="handleClick">
          <option :value="1" :selected="config.background===1">随天气</option>
          <option :value="2" :selected="config.background===2">浅色</option>
          <option :value="3" :selected="config.background===3">深色</option>
          <option :value="5" :selected="config.background===5">透明</option>
        </select>
      </li>

      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-icon material-icons">translate</i>
        <div class="mdui-list-item-content">{{config.language==='zh'?'中文':'英文'}}</div>
        <label class="mdui-switch">
          <input
            type="checkbox"
            @click="config.language==='zh'?(config.language='en'):(config.language='zh')"
            :checked="config.language==='en'"
          />
          <i class="mdui-switch-icon"></i>
        </label>
      </li>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">宽度(px)</label>
        <input class="mdui-textfield-input" v-model.number="config.width" type="number" />
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">高度(px)</label>
        <input class="mdui-textfield-input" v-model.number="config.height" type="number" />
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      bg: false,
      config: {
        layout: 1,
        width: 600,
        height: 450,
        background: 1,
        dataColor: 'FFFFFF',
        borderRadius: 5,
        language: 'zh', // zh en
        key: '75f7ef04ec64481cb131ff6621b8c8c1'
      },
      backgroundlist: {
        1: 'brightness_4', // 随天气变化
        2: 'brightness_3', // 浅色
        3: 'brightness_1', // 深色
        5: 'brightness_low' // 透明
      }
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    config: {
      handler: function(val) {
        this.$emit('changeSet', { ...val, bg: this.bg })
      },
      deep: true //深度监听
    }
  },
  methods: {
    handleClick(e) {
      this.config.background = e.target.value
    },
    handleClickBg() {
      this.bg = !this.bg
      this.$emit('handleSetBg', this.bg)
    },
    handleLayout() {
      if (this.config.layout === 1) {
        this.config.layout = 2
        this.config.width = 400
        this.config.height = 450
      } else {
        this.config.layout = 1
        this.config.width = 600
        this.config.height = 450
      }
    },
    getData() {
      this.$api.getApi('weather').then(res => {
        if (!res.error) {
          this.bg = res.bg
          this.config = res
        }
      })
    }
  }
}
</script>

<style scoped>
</style>