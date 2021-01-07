<template>
  <div class="dashboard_wrapper_heading">
    <slot name="page-title">
      <h1>{{ title }}</h1>
    </slot>

    <!-- <ul>
      <slot name="breadcrumb-items">
        <li><a is="router-link" :to="{name: $rns.USER_PANEL_HOME}"><i class="fas fa-home"></i> Home</a></li>
        <template v-if="$route.meta.pageInfo.back">
          <li>
            <a is="router-link" :to="{name: $route.meta.pageInfo.back}">
              {{$router.resolve({name: $route.meta.pageInfo.back}).resolved.meta.pageInfo.title}}
            </a>
          </li>
        </template>
        <slot name="breadcrumb-title">
          <li>{{$route.meta.pageInfo.title}}</li>
        </slot>
      </slot>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: "UserPanelPageBar",
  data: function () {
    return {
      title: "Welcome to Rocket.Chat Auditor",
    };
  },
  mounted() {
    this.$root.$on("getName", (name, rid) => {
      if (name) {
        this.title = name;
      } else {
        var self = this;
        this.$http
          .get(`http://0.0.0.0:8000/room/${rid}`)
          .then(function (response) {
           if(response.data.data[0].name){
             self.title = response.data.data[0].name;
           }else{
             self.title = response.data.data[0].usernames.join(', ')
           }
          });
      }
    });
  },
};
</script>

<style scoped>
</style>
