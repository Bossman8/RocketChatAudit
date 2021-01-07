<template>
  <div >
    <page-bar></page-bar>
    <div class="row">
      <div class="col-xl-8 col-lg-12 col-md-12 col-12">
        <div class="dsbrd_card dsbrd_profile" style="max-height:800px; overflow-y: auto">
          <div v-if="data.length > 0">
            <div class="m-3" v-for="d in data" v-bind:key="d._id">
              <span style="font-size: 12px; color: grey">{{
                formatDate(new Date(d.ts))
              }}</span>
              <div class="clickable" @click.prevent="loadRoom(d.rid)">
                {{ d.u.username }}: <strong>{{ d.msg }}</strong>
              </div>
            </div>
          </div>
          <div v-else class="m-3">No Messages</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import UtilMixin from "../../mixins/UtilMixin";
import PageBar from "./partials/PageBar";

export default {
  components: {PageBar},
  mixins: [ UtilMixin],
  data: function () {
    return {
      data: {},
      url: null
    };
  },
  methods: {
    loadRoom: function(rid){
      var self = this;
      this.$http.get(`http://0.0.0.0:8000/message/rid/${rid}`).then(
        function(response){
          self.data = {}
          self.data = response.data.data[0]
          self.data.sort(function (a, b) {
            return new Date(b.ts) - new Date(a.ts);
          });
          self.$root.$emit('getName', null, rid)
        },
        function(error) {
            self.showDefaultServerError(error);
          }
      )
    }
  },
  mounted() {
    this.$root.$on('getMessages', (type, id) => {
      var self = this;
      var url = type == 'groups'? `http://0.0.0.0:8000/message/rid/${id}` : `http://0.0.0.0:8000/message/user/${id}`
      this.$http.get(url).then(
        function(response){
          self.data = response.data.data? response.data.data[0] : []
          if (self.data) {
            self.data.sort(function (a, b) {
            return new Date(b.ts) - new Date(a.ts);
          });
          }
          
        },
        function(error) {
            self.showDefaultServerError(error);
          }
      )
    })
  }
};
</script>
