<template>
  <div class="container-fluid position-relative">
    <section class="row justify-content-end mt-5 mb-3">
      <div class="col-11 d-flex justify-content-between">
        <p class="fs-3 theme-green-text fw-bold">Bugs</p>
        <button v-if="account.id" class="btn theme-btn me-3">Report Bug</button>
      </div>
    </section>
    <section class="row justify-content-end me-1">
      <div class="col-11 blue-box ">
        <section class="row theme-beige-text fw-bold fs-3">
          <div class="col-3">
            <p>Title</p>
          </div>
          <div class="col-2">
            <p>Priority</p>
          </div>
          <div class="col-2">
            <p>Reported By</p>
          </div>
          <div class="col-3">
            <p>Last Updated</p>
          </div>
          <div class="col-2 d-flex align-items-center">
            <input @change="flipWantsAllAndWantsOpen()" type="checkbox" class="toggle"
              :title="[wantsOpenBugs ? 'Click to see all bugs.' : 'Click to see open bugs only.']">
          </div>
        </section>
      </div>
    </section>
    <section class="row bug-list-container">
      <div class="col-1"></div>
      <div class="col-11">
        <div v-if="!wantsOpenBugs">
          <div v-for="bug in bugs" :key="bug.id" class="row bug-list">
            <BugListComponent :bugProp="bug" />
          </div>
        </div>
        <div v-else>
          <div v-for="bug in openBugs" :key="bug.id" class="row bug-list">
            <BugListComponent :bugProp="bug" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Pop from "../utils/Pop.js"
import { bugsService } from "../services/BugsService.js"
import { computed, onMounted, ref } from "vue"
import { AppState } from "../AppState.js"

export default {

  setup() {
    onMounted(() => {
      getBugs()
    })

    let wantsOpenBugs = ref(false)

    async function getBugs() {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      wantsOpenBugs,
      bugs: computed(() => AppState.bugs),
      openBugs: computed(() => {
        return AppState.bugs.filter(
          (bug) => bug.closed == false)
      }),
      account: computed(() => AppState.account),

      flipWantsAllAndWantsOpen() {
        wantsOpenBugs.value = !wantsOpenBugs.value
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bug-list:nth-child(even) {
  background-color: var(--theme-limegreen);
}

.bug-list:nth-child(odd) {
  background-color: var(--theme-green);
}

.bug-list-container {
  position: absolute;
  left: 2.5%;
  top: 70%;
  width: 95vw;
}

//Toggle styling thanks to https://danklammer.com/articles/simple-css-toggle-switch/!
.toggle {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100px;
  height: 32px;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: var(--theme-green);
  transition: background-color ease 0.3s;
}

.toggle:before {
  content: "OPEN ALL";
  display: block;
  position: absolute;
  z-index: 2;
  width: 28px;
  height: 28px;
  background: var(--theme-beige);
  left: 2px;
  top: 1px;
  border-radius: 50%;
  font: 10px/28px Helvetica;
  text-transform: uppercase;
  font-weight: bold;
  text-indent: -43px;
  word-spacing: 60px;
  color: var(--theme-brown);
  text-shadow: -1px -1px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}

.toggle:checked {
  background-color: var(--theme-limegreen);
}

.toggle:checked:before {
  left: 68px;
}
</style>