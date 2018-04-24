<template>
  <div :class="['sidebar menu handle vertical right']">
    <div class="menu-logo">
      <a href="#">
        <img src="../../../assets/Q.png" />
        <span class="menu-logo-text">QFusion 控制台</span>
      </a>
    </div>

    <div class="menu-extend bdb-groove"><i class="fa fa-outdent"></i></div>
    <el_Menu />
  </div>
</template>

<script>
import el_Menu from '../../Menu'
export default {
  name: "sidebar",
  data () {
    return {
    }
  },
  props: ['isLogin'],
  methods: {
  },
  components: {
    el_Menu
  }
}
</script>

<style>
  @import '../styles/Sidebar.scss';
</style>

