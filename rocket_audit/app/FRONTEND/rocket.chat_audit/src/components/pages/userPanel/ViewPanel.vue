<template>
  <div class="dashboard_wrapper" v-bind:class="{ sidebar_on: sidebarExpanded }">
    <div class="dashboard_wrapper_in">
      <side-menu @toggle-clicked="sidebarExpanded=!sidebarExpanded"></side-menu>
      <keep-alive include="NOPAGE">
        <router-view class="dashboard_wrapper_working_area"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import SideMenu from "./partials/SideMenu";
  export default {
    components: {SideMenu},
    data: function () {
      return {
        sidebarExpanded: true
      }
    },
  };
</script>
