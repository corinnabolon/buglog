<template>
  <div class="container-fluid position-relative">
    <section class="row justify-content-end mt-5 mb-3">
      <div class="col-12 col-md-11 d-flex justify-content-between">
        <p class="fs-3 theme-green-text fw-bold">Bugs</p>
        <button v-if="account.id" class="img-shadow btn theme-btn me-3" data-bs-toggle="modal"
          data-bs-target="#bugCreatorModal">Report Bug</button>
      </div>
    </section>
    <BugChartComponent />
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
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
.font-large {
  font-size: 16pt;
}

@media (max-width: 768px) {
  .font-large {
    font-size: 12pt;
  }
}
</style>