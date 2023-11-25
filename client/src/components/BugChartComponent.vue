<template>
  <section class="row justify-content-end me-1">
    <div class="col-12 col-md-11 blue-box">
      <section class="row theme-beige-text fw-bold font-large mt-2">
        <div class="col-1 col-md-2 me-3 me-md-5">
          <p>Title</p>
        </div>
        <div class="col-1 d-flex">
          <p v-if="!wantsByPriority" class="me-md-2"><i class="mdi mdi-clipboard-list-outline"
              @click="flipWantsByPriorityAndWantsByDate()" title="Click to sort by priority" role="button"></i>
          </p>
          <p v-else class="me-md-2"><i class="mdi mdi-clipboard-list" @click="flipWantsByPriorityAndWantsByDate()"
              title="Click to sort by date" role="button"></i>
          </p>
          <p>Priority</p>
        </div>
        <div class="col-1 col-md-2 me-4 me-md-0 ms-5">
          <p class="ms-md-3">Creator</p>
        </div>
        <div class="col-2 col-md-3 ms-md-3">
          <p>Last Updated</p>
        </div>
        <div class="col-3 col-md-2 ms-3 ms-md-0 d-flex align-items-center justify-content-center">
          <input @change="flipWantsAllAndWantsOpen()" type="checkbox" class="toggle mb-2"
            :title="[wantsOpenBugs ? 'Click to see all bugs.' : 'Click to see open bugs only.']">
        </div>
      </section>
    </div>
  </section>
  <section class="row" :class="[route.name == 'Account' ? 'tracked-bug-list-container' : 'bug-list-container']">
    <div class="col-md-1"></div>
    <div v-if="myTrackedBugs.length > 0 && route.name == 'Account'" class="col-12 col-md-11">
      <div v-for="bug in filteredAndPaginatedMyTrackedBugs" :key="bug.id" class="row bug-list">
        <BugListComponent :bugProp="bug" />
      </div>
    </div>
    <div v-else class="col-11">
      <div v-for="bug in filteredAndPaginatedItems" :key="bug.id" class="row bug-list">
        <BugListComponent :bugProp="bug" />
      </div>
    </div>
    <div class="d-flex justify-content-around my-3">
      <button class="btn theme-btn img-shadow" @click="prevPage()" :disabled="currentPage == 1"
        title="See previous 20 bugs">Previous</button>
      <button class="btn theme-btn img-shadow" @click="nextPage()" :disabled="currentPage == totalPages"
        title="See next 20 bugs">Next</button>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";

export default {
  setup() {
    let route = useRoute()
    let wantsOpenBugs = ref(false)
    let wantsByPriority = ref(false)
    let itemsPerPage = 20
    let currentPage = ref(1)
    let totalPages = ref(0)

    return {
      itemsPerPage,
      currentPage,
      totalPages,
      wantsOpenBugs,
      wantsByPriority,
      route,
      bugs: computed(() => AppState.bugs),

      myTrackedBugs: computed(() => AppState.bugsUserIsTracking),

      filteredAndPaginatedMyTrackedBugs: computed(() => {
        let filteredItems = [...AppState.bugsUserIsTracking];
        if (wantsOpenBugs.value == true) {
          filteredItems = filteredItems.filter((bug) => bug.closed === false);
        }
        if (wantsByPriority.value == true) {
          filteredItems = [...filteredItems].sort((bug1, bug2) => bug2.priority - bug1.priority);
        } else {
          // If !wantsByPriority, sort by date
          filteredItems = [...filteredItems].sort((bug1, bug2) => {
            const date1 = new Date(bug1.updatedAt);
            const date2 = new Date(bug2.updatedAt);
            return date2 - date1
          })
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        totalPages.value = Math.ceil(filteredItems.length / itemsPerPage)
        const startIndex = (currentPage.value - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredItems.slice(startIndex, endIndex);
      }),

      filteredAndPaginatedItems: computed(() => {
        let filteredItems = [...AppState.bugs];
        if (wantsOpenBugs.value == true) {
          filteredItems = filteredItems.filter((bug) => bug.closed === false);
        }
        if (wantsByPriority.value == true) {
          filteredItems = [...filteredItems].sort((bug1, bug2) => bug2.priority - bug1.priority);
        } else {
          // If !wantsByPriority, sort by date
          filteredItems = [...filteredItems].sort((bug1, bug2) => {
            const date1 = new Date(bug1.updatedAt);
            const date2 = new Date(bug2.updatedAt);
            return date2 - date1
          })
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        totalPages.value = Math.ceil(filteredItems.length / itemsPerPage)
        const startIndex = (currentPage.value - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredItems.slice(startIndex, endIndex);
      }),

      account: computed(() => AppState.account),

      flipWantsAllAndWantsOpen() {
        wantsOpenBugs.value = !wantsOpenBugs.value
        currentPage.value = 1
      },

      flipWantsByPriorityAndWantsByDate() {
        wantsByPriority.value = !wantsByPriority.value
        currentPage.value = 1
      },

      nextPage() {
        if (currentPage.value < this.totalPages) {
          currentPage.value += 1;
        }
      },

      prevPage() {
        if (currentPage.value > 1) {
          currentPage.value -= 1;
        }
      },

    }
  }
};
</script>


<style lang="scss" scoped>
.font-large {
  font-size: 16pt;
}

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

.tracked-bug-list-container {
  position: absolute;
  left: 2.5%;
  top: 88%;
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

@media (max-width: 768px) {
  .bug-list-container {
    position: absolute;
    left: 5%;
    top: 60%;
    width: 100vw;
  }

  .tracked-bug-list-container {
    position: absolute;
    left: 5%;
    top: 78%;
    width: 92vw;
  }

  .font-large {
    font-size: 10pt;
  }

  .toggle {
    width: 100%;
    height: 22px;
  }

  .toggle:before {
    z-index: 2;
    width: 15px;
    height: 18px;
    text-indent: -35px;
    word-spacing: 35px;
  }

  .toggle:checked:before {
    left: 50px;
  }
}
</style>