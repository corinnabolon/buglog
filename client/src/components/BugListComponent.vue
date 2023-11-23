<template>
  <router-link :to="{ name: 'BugDetails', params: { bugId: bugProp.id } }">
    <div class="theme-brown-text my-2 fw-bold fs-5 d-flex">
      <div class="col-3">
        {{ bugProp.title }}
      </div>
      <div class="col-2">
        {{ bugProp.priority }}
      </div>
      <div class="col-2">
        {{ bugProp.creator.name }}
      </div>
      <div class="col-3 me-5">
        {{ bugProp.updatedAt.toLocaleString() }}
      </div>
      <div class="col-2">
        <div v-if="bugProp.closed">
          Closed
        </div>
        <div v-else>
          Open
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Bug } from "../models/Bug.js";

export default {
  props: { bugProp: { type: Bug, required: true } },

  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped></style>