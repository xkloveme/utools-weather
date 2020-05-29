<template>
  <div id="app" :class="{'app-bg':bg}" :style="{backgroundImage: 'url(' +bgIMG  + ')'}">
    <div :style="{color: bg?'#fff':''}" class="mdui-appbar mdui-shadow-0">
      <div class="mdui-toolbar">
        <a href="javascript:;" @click="showClass=!showClass" class="mdui-btn mdui-btn-icon">
          <i class="mdui-icon material-icons">menu</i>
        </a>
        <a href="javascript:;" class="mdui-typo-title">天气</a>
        <div class="mdui-toolbar-spacer"></div>
        <a
          href="javascript:;"
          @click="handleReset"
          class="mdui-btn mdui-btn-icon"
          mdui-tooltip="{content: '当前天气'}"
        >
          <i class="mdui-icon material-icons">gps_fixed</i>
        </a>
        <a
          href="javascript:;"
          @click="handleSearch"
          class="mdui-btn mdui-btn-icon"
          mdui-tooltip="{content: '搜索地区'}"
        >
          <i class="mdui-icon material-icons">search</i>
        </a>
        <a
          @click="open('https://github.com/xkloveme/utools-weather')"
          target="_blank"
          mdui-tooltip="{content: '地址'}"
          class="mdui-btn mdui-btn-icon"
        >
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 36 36"
            enable-background="new 0 0 36 36"
            xml:space="preserve"
            class="mdui-icon"
            style="width: 24px;height:24px;"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              :fill="bg?'#fff':'#2c3e50'"
              d="M18,1.4C9,1.4,1.7,8.7,1.7,17.7c0,7.2,4.7,13.3,11.1,15.5
	c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1
	c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4
	c-0.2-0.4-0.7-2.1,0.2-4.3c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7
	c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5
	c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C34.3,8.7,27,1.4,18,1.4z"
            />
          </svg>
        </a>
        <a
          @click="open('https://github.com/xkloveme/utools-weather/issues')"
          mdui-tooltip="{content: '反馈'}"
          target="_blank"
          class="mdui-btn mdui-btn-icon"
        >
          <i class="mdui-icon material-icons">feedback</i>
        </a>
      </div>
    </div>
    <div>
      <div :class="{'mdui-drawer-body-left':showClass}">
        <div
          class="mdui-drawer"
          :class="['mdui-drawer',showClass?'mdui-drawer-open':'mdui-drawer-close']"
          style="top: 50px;"
        >
          <list @changeSet="handleChangeCity" @handleSetBg="handleSetBg" ref="list" />
        </div>
        <div class="mdui-container-fluid" @click="showClass=false">
          <div class="mdui-row">
            <weather ref="weather"></weather>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索地区-->
    <vs-dialog blur v-model="active">
      <template #header>
        <h4 class="not-margin">
          <b>搜索地区</b>
        </h4>
      </template>

      <div class="con-form" style="display:flex;justify-content: center;">
        <vs-input v-model="location" success placeholder="输入地区">
          <template #icon>
            <i class="mdui-icon material-icons">search</i>
          </template>
        </vs-input>
        <vs-button gradient @click="handleSearchCity">搜索</vs-button>
      </div>
      <div style="min-height:200px;margin-top:20px">
        <vs-button
          floating
          block
          v-for="(item ,i) in cityList"
          :key="i+1"
          @click="handleChangeCity({city:item.cid})"
        >{{item.str}}</vs-button>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import list from './components/list.vue'
import weather from './components/weather.vue'
// import Vue from 'vue'
// import weather from './components/weather'
import { mapState } from 'vuex'
// const Weather = Vue.extend(weather)
export default {
  name: 'App',
  components: {
    list,
    weather
  },
  data() {
    return {
      active: false,
      location: '',
      cityList: [],
      showClass: false,
      editData: {},
      bg: false,
      bgIMG: ''
    }
  },
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  mounted() {
    // this.utools.onPluginEnter(({ code, type }) => {
    // this.$store.dispatch('getConfig').then(() => {
    //   this.handleChangeCity()
    // })
    this.handleChangeCity()
    // console.log('用户进入插件', code, type)
    // })
  },
  methods: {
    open(url) {
      window.openExternal(url)
    },
    handleReset() {
      this.$store.commit('SET_CONFIG', { city: undefined })
      this.handleChangeCity(this.config)
    },
    handleChangeCity(config) {
      this.$store.commit('SET_CONFIG', config)
      this.$refs['weather'].renderDOM()
      this.active = false
      // const player = this.$refs['weather']
      // let vm = new Weather().$mount()
      // player.appendChild(vm.$el)
    },
    handleSetBg(val) {
      this.bg = val
      this.bgIMG = val ? `https://picsum.photos/800/600?t=${new Date().getTime()}` : ''
      if (val) {
        const loading = this.$vs.loading()
        setTimeout(() => {
          loading.close()
        }, 2000)
      }
    },
    handleSearch() {
      this.active = true
    },
    handleSearchCity() {
      this.cityList = []
      if (this.location) {
        this.$api.getCityApi(this.location).then(res => {
          if (res.indexOf('unknown location') === -1) {
            if (JSON.parse(res).HeWeather6.length) {
              JSON.parse(res).HeWeather6.map(item => {
                let arr = []
                item.basic.cnty && arr.push(item.basic.cnty)
                item.basic.admin_area && arr.push(item.basic.admin_area)
                item.basic.parent_city && arr.push(item.basic.parent_city)
                item.basic.location && arr.push(item.basic.location)
                let str = arr.join('-')
                this.cityList.push({ str, cid: item.basic.cid })
              })
            }
          } else {
            this.$vs.notification({
              color: 'warn',
              position: 'top-center',
              title: '搜索提示',
              text: '暂未找到相关地区,请换个关键词再试吧'
            })
          }
        })
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-bg {
  /* color: #fff !important; */
  position: absolute;
  width: 100%;
  height: 100%;
  -moz-background-size: 100% 100%; /*  Firefox 3.6 */
  -o-background-size: 100% 100%; /* Opera 9.5 */
  -webkit-background-size: 100% 100%; /* Safari 3.0 */
  background-size: 100% 100%; /*  Firefox 4.0 and other CSS3-compliant browsers */
  background-repeat: no-repeat;
}
</style>
