<template>
  <div>
    <component :is="layout"></component>
  </div>
</template>

<script>
import UtilMixin from "./components/mixins/UtilMixin"

const DEFAULT_LAYOUT = "UserPanelLayout";
const components = {};
// Load All Layouts Components Dynamically
const requireComponent = require.context(
  "./components/layouts",
  false,
  /^\.\/.*Layout\.vue$/
);
requireComponent.keys().forEach(fileName => {
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
  const componentConfig = requireComponent(fileName);
  components[componentName] = componentConfig.default || componentConfig;
});

export default {
  name: "App",
  components: components,
  mixins: [UtilMixin],
  computed: {
    layout: function() {
      return this.$route.meta.layout || ((this.$route.matched[0] || {}).meta || {}).layout || DEFAULT_LAYOUT;
    }
  },
};
</script>
