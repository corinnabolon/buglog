<template>
  <div v-if="activeBug" class="container-fluid position-relative">
    <section class="row mt-4 me-2 align-items-center">
      <div class="col-1"></div>
      <div class="col-5 green-box fs-2 fw-bold theme-brown-text text-center">
        <p class="my-2">{{ activeBug.title }}</p>
      </div>
      <div class="col-1 brown-box">
        <p class="my-2 fs-2 text-center"><i class="mdi mdi-pencil"></i></p>
      </div>
    </section>
    <section class="row justify-content-end me-2">
      <div class="col-11 blue-box"></div>
    </section>
    <section class="row bug-details-container">
      <div class="col-12 my-3 d-flex justify-content-between">
        <img :src="activeBug.creator.picture" alt="Bug Creator Picture" class="creator-picture">
        <div>
          <p>Reported by:</p>
          <p>{{ activeBug.creator.name }}</p>
        </div>
        <div>
          <p>Priority:</p>
          <p>{{ activeBug.priority }}</p>
        </div>
        <div>
          <p>Last Updated:</p>
          <p>{{ activeBug.updatedAt.toLocaleString() }}</p>
        </div>
        <div v-if="activeBug.closed">
          <p>Closed</p>
        </div>
        <div v-else>
          <p>Open</p>
        </div>
      </div>
      <div class="col-11 my-4 mx-2">
        <p>{{ activeBug.description }}</p>
      </div>
      <div class="col-11 d-flex align-items-center">
        <button class="btn theme-btn my-3 mx-2">Track</button>
        <!-- //TODO: v-if this button so it changes to un-track if already tracking -->
        <div v-for="bug in trackedBugs" :key="bug.id">
          <img :src="bug.tracker.picture" :alt="bug.tracker.name" class="tracker-picture mx-1">
        </div>

      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { bugsService } from "../services/BugsService.js";
import { useRoute } from "vue-router";
import { trackedBugsService } from "../services/TrackedBugsService.js"

export default {
  setup() {
    let route = useRoute()

    onMounted(() => {
      getBugById()
      getTrackersOfBug()
    })

    async function getBugById() {
      try {
        let bugId = route.params.bugId;
        await bugsService.getBugById(bugId)
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getTrackersOfBug() {
      try {
        let bugId = route.params.bugId;
        await trackedBugsService.getTrackersOfBug(bugId)
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      activeBug: computed(() => AppState.activeBug),
      trackedBugs: computed(() => AppState.trackedBugs)
    }
  }
};
</script>


<style lang="scss" scoped>
p {
  margin: 0px;
  color: var(--theme-brown);
  font-size: 14pt;
}

.green-box {
  background-color: var(--theme-green);
  border: 1px solid var(--theme-brown);
}

.brown-box {
  background-color: var(--theme-brown);
  color: var(--theme-green);
  border: 1px solid var(--theme-brown);
}

.bug-details-container {
  position: absolute;
  left: 13%;
  top: 55%;
  width: 83vw;
  background-color: var(--theme-beige);
  border: 2px solid var(--theme-limegreen);

  .creator-picture {
    height: 10vh;
    width: auto;
    object-fit: cover;
    object-position: center;
  }

  .tracker-picture {
    height: 6vh;
    width: auto;
    object-fit: cover;
    object-position: center;
  }
}
</style>