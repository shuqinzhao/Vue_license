<template>
  <div class="menu-auto">
    <ul v-for="(items, index) in menu" :key="index" class="menu-nav">
      <p class="menu-title" v-if="items.title !== ''">{{items.title}}</p>

      <li v-for="(item, i) in items.items" :key="i" :class="['menu-item', item.sub && 'has-sub', !!item.open && 'has-open']">
        <router-link :class="['menu-link', item.actives && 'active', !item.sub && 'menu-show']" v-if="!item.sub" :to="item.link ? item.link : '#'">
          <i v-show="!!item.icon" :class="['menu-icon', item.icon]"></i>
          <span class="menu-text">{{item.text}}</span>
        </router-link>

        <a v-if="!!item.sub" class="menu-link" :data-index="index" :data-item="i" href="#" @click="handleMenuClick">
          <i v-show="!!item.icon" :class="['menu-icon', item.icon]"></i>
          <span class="menu-text">{{item.text}}</span>
        </a>

        <ul v-if="!!item.sub" class="menu-list">
          <li v-for="(subItem, j) in item.sub" :key="j" class="menu-item">
            <router-link :to="subItem.link ? subItem.link : '#'" :class="['menu-link', subItem.actives && 'active']">
              <i :class="['menu-icon', subItem.icon]"></i>
              <span class="menu-text">{{subItem.text}}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "el_menu",
  data () {
    return {
      menu: [
        {
          title: '',
          items: [
            {
              icon: 'fa fa-key',
              text: 'License 生成',
              link: '/license',
              open: true,
              actives: ['/license'],
            },
            {
              icon: 'icon icon-cloud-flow',
              text: '虚拟化集群',
              open: false,
              actives: ['/kvmCluster', '/primaryStorage'],
              sub: [
                {
                  icon: 'fa fa-square',
                  text: '节点',
                  link: '/kvmCluster',
                  open: false,
                  actives: ['/kvmCluster'],
                },
                {
                  icon: 'fa fa-square',
                  text: '主存储',
                  link: '/primaryStorage',
                  open: false,
                  actives: ['/primaryStorage'],
                },
              ],
            },
          ],
        }
      ]
    }
  },
  methods: {
    handleMenuClick: function (e) {
      e.stopPropagation();
      e.preventDefault();

      const menu = JSON.parse(JSON.stringify(this.menu));
      const index = parseInt(e.currentTarget.dataset.index, 10);
      const item = parseInt(e.currentTarget.dataset.item, 10);

      Object.assign(menu[index].items[item], {
        open: !!!menu[index].items[item].open,
      });
      this.menu = menu
    }
  }
}
</script>

<style scoped>
  @import '../styles/Menu.scss';
</style>

