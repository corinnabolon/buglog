<template>
  <div class="container-fluid position-relative">
    <div v-if="account.id" class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded account-picture" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <section class="row justify-content-end mt-5 mb-3">
      <div class="col-12 col-md-11 d-flex justify-content-between">
        <p class="fs-3 theme-green-text fw-bold">Bugs You're Tracking</p>
        <button v-if="account.id" class="img-shadow btn theme-btn me-3" data-bs-toggle="modal"
          data-bs-target="#bugCreatorModal">Report Bug</button>
      </div>
    </section>
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
      bugsService.clearAppState()
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

.account-picture {
  height: 10vh;
  object-fit: cover;
}
</style>
