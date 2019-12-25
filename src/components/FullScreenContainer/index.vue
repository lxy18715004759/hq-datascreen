<template>
  <div id="dv-full-screen-container" :ref="ref">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { debounce, observerDomResize } from "@/utils"

export default {
  data() {
    return {
      ref: "full-screen-container",
      allWidth: 0,
      scale: 0,
      datavRoot: "",
      ready: false,
      dom: "",
      width: 0,
      height: 0,
      debounceInitWHFun: "",
      domObserver: ""
    }
  },
  mounted() {
    const { autoResizeMixinInit } = this

    autoResizeMixinInit()
  },
  beforeDestroy() {
    const { unbindDomResizeCallback } = this

    unbindDomResizeCallback()
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { initConfig, setAppScale } = this

      initConfig()

      setAppScale()

      this.ready = true
    },
    initConfig() {
      const { dom } = this
      const { width, height } = screen

      this.allWidth = width

      dom.style.width = `${width}px`
      dom.style.height = `${height}px`
    },
    setAppScale() {
      const { allWidth, dom } = this

      const currentWidth = document.body.clientWidth
      dom.style.transform = `scale(${currentWidth / allWidth})`
    },
    onResize() {
      const { setAppScale } = this

      setAppScale()
    },
    async autoResizeMixinInit() {
      const { initWH, getDebounceInitWHFun, bindDomResizeCallback, afterAutoResizeMixinInit } = this

      await initWH(false)

      getDebounceInitWHFun()

      bindDomResizeCallback()

      if (typeof afterAutoResizeMixinInit === "function") afterAutoResizeMixinInit()
    },
    initWH(resize = true) {
      const { $nextTick, $refs, ref, onResize } = this

      return new Promise(resolve => {
        $nextTick(e => {
          const dom = (this.dom = $refs[ref])

          this.width = dom.clientWidth
          this.height = dom.clientHeight

          if (typeof onResize === "function" && resize) onResize()

          resolve()
        })
      })
    },
    getDebounceInitWHFun() {
      const { initWH } = this
      this.debounceInitWHFun = debounce(100, initWH)
    },
    bindDomResizeCallback() {
      const { dom, debounceInitWHFun } = this

      this.domObserver = observerDomResize(dom, debounceInitWHFun)

      window.addEventListener("resize", debounceInitWHFun)
    },
    unbindDomResizeCallback() {
      let { domObserver, debounceInitWHFun } = this

      domObserver.disconnect()
      domObserver.takeRecords()
      domObserver = null

      window.removeEventListener("resize", debounceInitWHFun)
    }
  }
}
</script>

<style lang="scss" scoped>
#dv-full-screen-container {
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
