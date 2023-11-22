<template>
  <div class="col-3">
    {{ bugProp.title }}
  </div>
  <div class="col-2">
    {{ bugProp.priority }}
  </div>
  <div class="col-2">
    {{ bugProp.creator.name }}
  </div>
  <div class="col-3">
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