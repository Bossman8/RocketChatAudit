<template>
  <div>
    <!-- <site-header></site-header> -->
    <keep-alive include="NOPAGE">
      <router-view></router-view>
    </keep-alive>
  </div>

</template>

<script>
  // import SiteHeader from "../partials/SiteHeader";

  export default {
    // components: {
    //   SiteHeader
    // },
    mounted: function () {
    }
  };
</script>
