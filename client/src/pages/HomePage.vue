<template>
  <div class="container-fluid">
    <div v-for="bug in bugs" :key="bug.id" class="row">
      <BugListComponent :bugProp="bug" />
    </div>
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
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss"></style>
