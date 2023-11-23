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
            Title
          </div>
          <div class="col-2">
            Priority
          </div>
          <div class="col-2">
            Reported By
          </div>
          <div class="col-3">
            Last Updated
          </div>
          <div class="col-2">
            All Bugs
          </div>
        </section>
      </div>
    </section>
    <section class="row bug-list-container">
      <div class="col-1"></div>
      <div class="col-11">
        <div v-for="bug in bugs" :key="bug.id" class="row bug-list">
          <BugListComponent :bugProp="bug" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Pop from "../utils/Pop.js"
import { bugsService } from "../services/BugsService.js"
import { computed, onMounted } from "vue"
import { AppState } from "../AppState.js"

export default {

  setup() {
    onMounted(() => {
      getBugs()
    })

    async function getBugs() {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account)
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
</style>