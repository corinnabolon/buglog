<template>
  <router-link :to="{ name: 'BugDetails', params: { bugId: bugProp.id } }">
    <div class="theme-brown-text my-2 fw-bold fs-5 d-flex" :class="{
      'danger-border': bugProp.priority == 5
    }">
      <div class="col-3" :class="{ 'text-danger': bugProp.priority == 5 }">
        <p :class="{ 'strikethrough': bugProp.closed }">{{ bugProp.title }}</p>
      </div>
      <div class="col-1" :class="[bugProp.priority == 5 ? 'text-danger' : '']">
        <p :class="{ 'strikethrough': bugProp.closed }">{{ bugProp.priority }}</p>
      </div>
      <div class="col-2">
        <p class="ms-5" :class="{ 'strikethrough': bugProp.closed }">{{ bugProp.creator.name }}</p>
      </div>
      <div class="col-4 me-2">
        <p :class="{ 'strikethrough': bugProp.closed }">{{ formattedUpdatedAtDateTime }}</p>
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

  setup(props) {
    let formattedDate = props.bugProp.updatedAt.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    let formattedTime = props.bugProp.updatedAt.toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    let formattedUpdatedAtDateTime = `${formattedDate} ${formattedTime}`;

    return {
      formattedUpdatedAtDateTime,
    }
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

.danger-border {
  border: 2px solid firebrick;
  padding: 3px;
}

.strikethrough {
  text-decoration: line-through;
}
</style>