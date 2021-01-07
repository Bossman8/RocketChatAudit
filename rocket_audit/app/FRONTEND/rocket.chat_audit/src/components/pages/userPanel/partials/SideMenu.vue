<template>
  <div class="dashboard_wrapper_side_menu">
    <div class="dsbrd_wrpr_left_card dsbrd_wrpr_side_prfl">
      <h1 class="text-center">Rocket.Chat Auditor</h1>
      <!-- <h3>{{$store.state.currentUser.username}}</h3> -->
      <button
        id="dashboard_toggle"
        class="btn dashboard_toggle_btn"
        @click.prevent="$emit('toggle-clicked')"
      >
        <i></i><i></i><i></i>
      </button>
    </div>
    <div class="dsbrd_wrpr_left_card dsbrd_wrpr_side_menu pb-3">
      <!-- <ul class="nav nav-tabs">
        <li><a is="router-link" :to="{name: $rns.VIEW_PROFILE}"><i class="fas fa-user"></i> <span>Profile</span></a></li>
        <li><a is="router-link" :to="{name: $rns.EDIT_PROFILE}"><i class="fas fa-user-edit"></i> <span>Edit Profile</span></a></li>
      </ul> -->
      <h4 class="text-center text-light pt-3">Channels</h4>
      <hr />
      <div v-if="channels">
        <multiselect
          v-model="channel"
          track-by="_id"
          label="name"
          :options="filteredChannels"
          style="width: 80%; margin: auto"
          :show-labels="false"
          placeholder="Channels"
        ></multiselect>
        <!-- <div v-for="c in channels" v-bind:key="c._id">
          <div class="clickable" @click="getPanelMessages('groups', c._id, c.name)">
            <li class="text-center text-white"><a>{{ c.name }}</a></li>
          </div>
        </div> -->
      </div>
    </div>
    <div class="dsbrd_wrpr_left_card dsbrd_wrpr_side_menu pt-3 pb-3">
      <h4 class="text-center text-light">Users</h4>
      <hr />
      <div v-if="users">
        <multiselect
          v-model="user"
          track-by="id"
          label="username"
          :options="users"
          style="width: 80%; margin: auto"
          :show-labels="false"
          placeholder="Users"
        ></multiselect>
        <!-- <ul>
            <div v-for="u in users" v-bind:key="u.id">
              <div class="clickable" @click.prevent="getPanelMessages('users', u.id, u.username)">
                <li class="text-center text-white"><a>{{ u.username }}</a></li>
              </div>
            </div>
            </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
import UtilMixin from "../../../mixins/UtilMixin";
import Multiselect from "vue-multiselect";

export default {
  mixins: [UtilMixin],
  components: { Multiselect },
  data: function () {
    return {
      users: [],
      channels: [],
      user: null,
      channel: null,
    };
  },
  watch: {
    user: function (user) {
      if (user) {
        this.getPanelMessages("users", user.id, user.username);
        this.user = null;
      }
    },
    channel: function (channel) {
      if (channel) {
        this.getPanelMessages("groups", channel._id, channel.name);
        this.channel = null;
      }
    },
  },
  computed: {
    filteredChannels: function () {
      var list = [];
      this.channels.map((x) => {
        if (x.name) {
          list.push(x);
        }
      });
      this.sortObject(list, "name");
      return list;
    },
    filteredUsers: function () {
      var list = this.users;
      this.sortObject(list, "username");
      return list;
    },
  },
  created: function () {
    this.getUsers();
    this.getChannels();
  },
  methods: {
    sortObject: function (object, field) {
      object.sort(function (a, b) {
        var textA = a[field];
        var textB = b[field];
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    },
    getUsers: function () {
      var self = this;
      this.$http
        .get(`http://0.0.0.0:8000/user`)
        .then(function (response) {
          self.users = response.data.data[0] || {};
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getChannels: function () {
      var self = this;
      this.$http
        .get(`http://0.0.0.0:8000/room`)
        .then(function (response) {
          self.channels = response.data.data[0];
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getPanelMessages: function (type, d, name) {
      this.$root.$emit("getMessages", type, d);
      this.$root.$emit("getName", name);
    },
  },
};
</script>

<style scoped>
</style>
  <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>