<template>
  <div id="app" :class="{'app-bg':bg}" :style="{backgroundImage: 'url(' +bgIMG  + ')'}">
    <Title :bg="bg" @showPopup="showPopup" @handleReset="handleReset" @handleSearch="handleSearch"></Title>
    <van-popup v-model="show" position="left" :style="{ height: '100%',width:'50%' }">
      <list @changeSet="handleChangeCity" @handleSetBg="handleSetBg" ref="list" />
    </van-popup>
    <div class="mdui-container-fluid" @click="showClass=false">
      <div class="mdui-row">
        <weather ref="weather"></weather>
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
import Title from './components/title.vue'
import weather from './components/weather.vue'
// import Vue from 'vue'
// import weather from './components/weather'
import { mapState } from 'vuex'
// const Weather = Vue.extend(weather)
export default {
  name: 'App',
  components: {
    Title,
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
      bgIMG: '',
      show: false
    }
  },
  computed: {
    ...mapState({
      config: state => state.config
    })
  },
  methods: {
    showPopup() {
      this.show = true
    },
    handleReset() {
      this.handleChangeCity({ ...this.config, city: undefined })
    },
    handleChangeCity(config) {
      this.$refs['weather'].renderDOM({ ...this.config, ...config })
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
            this.$toast.fail('暂未找到相关地区,请换个关键词再试吧');
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
