<template>
  <div class="container-fluid">
    <div v-if="account.id" class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <BugChartComponent />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import BugChartComponent from "../components/BugChartComponent.vue";
import Pop from "../utils/Pop.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";
import { bugsService } from "../services/BugsService.js";

export default {
  setup() {

    onMounted(() => {
      getAllMyTrackedBugs()
      getBugs()
    })

    async function getBugs() {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.error(error)
      }
    }


    async function getAllMyTrackedBugs() {
      try {
        await trackedBugsService.getAllMyTrackedBugs()
      } catch (error) {
        Pop.error(error)
      }
    }


    return {
      account: computed(() => AppState.account)
    };
  },
  components: { BugChartComponent }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
