<template>
  <div class="container-fluid position-relative">
    <section class="row justify-content-end mt-5 mb-3">
      <div class="col-11 d-flex justify-content-between">
        <p class="fs-3 theme-green-text fw-bold">Bugs</p>
        <button v-if="account.id" class="btn theme-btn me-3" data-bs-toggle="modal"
          data-bs-target="#bugCreatorModal">Report Bug</button>
      </div>
    </section>
    <section class="row justify-content-end me-1">
      <div class="col-11 blue-box">
        <section class="row theme-beige-text fw-bold fs-3 mt-2">
          <div class="col-2 me-5">
            <p>Title</p>
          </div>
          <div class="col-2 d-flex">
            <p v-if="!wantsByPriority" class="me-2"><i class="mdi mdi-clipboard-list-outline"
                @click="flipWantsByPriorityAndWantsByDate()" title="Click to sort by priority" role="button"></i>
            </p>
            <p v-else class="me-2"><i class="mdi mdi-clipboard-list" @click="flipWantsByPriorityAndWantsByDate()"
                title="Click to sort by priority" role="button"></i>
            </p>
            <p>Priority</p>
          </div>
          <div class="col-2">
            <p>Reported By</p>
          </div>
          <div class="col-3">
            <p>Last Updated</p>
          </div>
          <div class="col-2 d-flex align-items-center">
            <input @change="flipWantsAllAndWantsOpen()" type="checkbox" class="toggle mb-2"
              :title="[wantsOpenBugs ? 'Click to see all bugs.' : 'Click to see open bugs only.']">
          </div>
        </section>
      </div>
    </section>
    <section class="row bug-list-container">
      <div class="col-1"></div>
      <div class="col-11">
        <div v-for="bug in filteredAndPaginatedItems" :key="bug.id" class="row bug-list">
          <BugListComponent :bugProp="bug" />
        </div>
      </div>
      <div class="d-flex justify-content-around my-3">
        <button class="btn theme-btn" @click="prevPage()" :disabled="currentPage == 1">Previous</button>
        <button class="btn theme-btn" @click="nextPage()" :disabled="currentPage == totalPages">Next</button>
      </div>
    </section>
  </div>
</template>

<script>
import Pop from "../utils/Pop.js"
import { bugsService } from "../services/BugsService.js"
import { computed, onMounted, ref } from "vue"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"

export default {

  setup() {
    onMounted(() => {
      getBugs()
    })

    let wantsOpenBugs = ref(false)
    let wantsByPriority = ref(false)
    let itemsPerPage = 20
    let currentPage = ref(1)
    let totalPages = ref(0)

    async function getBugs() {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      itemsPerPage,
      currentPage,
      totalPages,
      wantsOpenBugs,
      wantsByPriority,
      bugs: computed(() => AppState.bugs),

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