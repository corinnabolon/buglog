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
      <div class="col-3 me-2">
        {{ bugProp.updatedAt.toLocaleString() }}
      </div>
      <div class="col-2">
        <div v-if="bugProp.closed" class="d-flex">
          <div class="p-width">
            <p>Closed</p>
          </div>
          <div class="closed-circle"></div>
        </div>
        <div v-else class="d-flex">
          <div class="p-width">
            <p>Open</p>
          </div>
          <div class="open-circle"></div>
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


<style lang="scss" scoped>
p {
  margin: 0;
}

.toggle {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 62px;
  height: 32px;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #707070;
  transition: background-color ease 0.3s;
}

.toggle:before {
  content: "on off";
  display: block;
  position: absolute;
  z-index: 2;
  width: 28px;
  height: 28px;
  background: #fff;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  font: 10px/28px Helvetica;
  text-transform: uppercase;
  font-weight: bold;
  text-indent: -22px;
  word-spacing: 37px;
  color: #fff;
  text-shadow: -1px -1px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}

.toggle:checked {
  background-color: #4CD964;
}

.toggle:checked:before {
  left: 32px;
}

.closed-circle {
  height: 5vh;
  width: 5vh;
  background-color: #4CD964;
  border: 1px solid var(--theme-brown);
  border-radius: 50%;
}

.open-circle {
  height: 5vh;
  width: 5vh;
  background-color: firebrick;
  border: 1px solid var(--theme-brown);
  border-radius: 50%;
}

.p-width {
  width: 7vw;
}
</style>