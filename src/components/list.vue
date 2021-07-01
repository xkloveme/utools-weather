<template>
  <div>
    <h2>个性配置</h2>
    <div class="mdui-divider"></div>
    <ul class="mdui-list">
      <li class="mdui-list-item mdui-ripple" @click="handleClickBg">
        <!-- <i class="mdui-icon material-icons">crop_original</i> -->
        <div class="mdui-list-item-content">随机背景</div>
         <van-icon name="exchange" />
        <!-- <label class="mdui-switch"> -->
          <!-- <input type="checkbox"  :checked="config.bg" /> -->
          <!-- <i class="mdui-switch-icon"></i> -->
          <!-- <i class="mdui-icon material-icons">&#xe86a;</i> -->
         
        <!-- </label> -->
      </li>
      <li class="mdui-list-item mdui-ripple">
        <!-- <i
          class="mdui-icon material-icons"
        >{{config.layout===1?'stay_primary_landscape':'smartphone'}}</i>-->
        <div class="mdui-list-item-content">{{config.layout===1?'横版':'竖版'}}</div>
        <label class="mdui-switch">
          <input type="checkbox" @click="handleLayout" :checked="config.layout===2" />
          <i class="mdui-switch-icon"></i>
        </label>
      </li>
      <li class="mdui-list-item mdui-ripple">
        <!-- <i class="mdui-icon material-icons">{{backgroundlist[config.background]}}</i> -->
        <div class="mdui-list-item-content">背景</div>
        <select class="mdui-select" @change="handleClick">
          <option :value="1" :selected="config.background===1">随天气</option>
          <option :value="2" :selected="config.background===2">浅色</option>
          <option :value="3" :selected="config.background===3">深色</option>
          <option :value="5" :selected="config.background===5">透明</option>
        </select>
      </li>

      <li class="mdui-list-item mdui-ripple">
        <!-- <i class="mdui-icon material-icons">translate</i> -->
        <div class="mdui-list-item-content">{{config.language==='zh'?'中文':'英文'}}</div>
        <label class="mdui-switch">
          <input type="checkbox" @click="handleClickLan()" :checked="config.language==='en'" />
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
import { mapState } from 'vuex'
export default {
  name: 'list',
  data() {
    return {
      bg: false,
      backgroundlist: {
        1: 'brightness_4', // 随天气变化
        2: 'brightness_3', // 浅色
        3: 'brightness_1', // 深色
        5: 'brightness_low' // 透明
      }
    }
  },
  watch: {
    'config.width'() {
      this.$emit('changeSet', this.config)
    },
    'config.height'() {
      this.$emit('changeSet', this.config)
    }
  },
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  methods: {
    handleClick(e) {
      let background = e.target.value
      this.$emit('changeSet', { background: background })
    },
    handleClickLan() {
      let language = ''
      this.config.language === 'zh' ? (language = 'en') : (language = 'zh')
      this.$emit('changeSet', {
        language: language
      })
    },
    handleClickBg() {
      this.bg = !this.bg
      this.$emit('changeSet', { bg: this.bg })
      this.$emit('handleSetBg', { bg: this.bg })
    },
    onSubmit() {},
    handleLayout() {
      if (this.config.layout === 1) {
        this.$emit('changeSet', {
          layout: 2,
          width: 400,
          height: 450
        })
      } else {
        this.$emit('changeSet', {
          layout: 1,
          width: 600,
          height: 450
        })
      }
    }
  }
}
</script>

<style scoped>
</style>