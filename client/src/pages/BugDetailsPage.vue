<template>
  <div v-if="activeBug" class="container-fluid position-relative">
    <section class="row mt-4 me-2 align-items-center">
      <div class="col-1"></div>
      <div class="col-9 col-md-5 green-box fs-2 fw-bold theme-brown-text text-center">
        <p class="my-2">{{ activeBug.title }}</p>
      </div>
      <div data-bs-toggle="modal" data-bs-target="#bugCreatorModal" role="button"
        v-if="account.id == activeBug.creatorId && !activeBug.closed" class="col-2 brown-box">
        <p class="my-2 fs-2 text-center theme-green-text"><i class="mdi mdi-pencil"></i></p>
      </div>
    </section>
    <section class="row justify-content-end me-2">
      <div class="col-11 blue-box"></div>
    </section>
    <section class="row bug-details-container">
      <div class="col-12"
        :class="[activeBug.priority == 5 ? 'danger-border' : 'limegreen-border', activeBug.closed ? 'blurred' : '']">
        <div class="row my-3 theme-brown-text">
          <div class="col-6 col-md-3">

            <img :src="activeBug.creator.picture" alt="Bug Creator Picture" class="creator-picture">

          </div>
          <div class="col-6 col-md-2">
            <p class="mb-0">Reported by:</p>
            <p>{{ activeBug.creator.name }}</p>
          </div>
          <div class="col-4 m-3 m-md-0 col-md-2" :class="[activeBug.priority == 5 ? 'danger-border px-md-2' : '']">
            <p class="mb-0">Priority:</p>
            <p class="mb-0">{{ activeBug.priority }}</p>
          </div>
          <div class="col-6 col-md-2">
            <p class="mb-0">Last Updated:</p>
            <p>{{ formattedDate }}</p>
          </div>
          <div class="col-12 col-md-3">
            <div v-if="!activeBug.closed">
              <button v-if="activeBug.creatorId == account.id" @click="closeBug()" type="button"
                class="btn theme-btn me-2" title="Close bug when resolved">Close Bug</button>
              <button v-else type="text" disabled class="btn theme-btn square me-2">
                This Bug Is Open
              </button>
            </div>
            <div v-else>
              <button type="text" disabled class="btn theme-btn-closed fw-bold me-2 square">This Bug Is Closed</button>
            </div>
          </div>
        </div>
        <div class="col-11 my-4 mx-2 theme-brown-text">
          <p>{{ activeBug.description }}</p>
        </div>
        <div class="col-11 d-flex align-items-center">
          <div v-if="account.id && !activeBug.closed">
            <div v-if="isTracker">
              <button @click="unTrackBug()" class="btn theme-btn my-3 mx-2">Un-track</button>
            </div>
            <div v-else>
              <button @click="trackBug()" class="btn theme-btn my-3 mx-2">Track</button>
            </div>
          </div>
          <div v-for="bug in trackedBugs" :key="bug.id">
            <img :src="bug.tracker.picture" :alt="bug.tracker.name" class="small-picture mx-1 my-3">
          </div>
        </div>
      </div>
      <div
        v-if="(notes && notes.length > 0 && activeBug.closed) || !activeBug.closed && (account.id || notes && notes.length > 0)"
        class="col-12 mt-5 mb-3"
        :class="[activeBug.priority == 5 ? 'danger-border' : 'limegreen-border', activeBug.closed ? 'blurred' : '']">
        <section class="row">
          <div class="col-4 col-md-2 green-box fs-2 fw-bold theme-brown-text text-center">
            <p class="mb-0">Notes</p>
          </div>
        </section>
        <section v-if="!activeBug.closed && account.id" class="row justify-content-center">
          <div class="col-10 col-md-5 d-flex justify-content-center">
            <form @submit.prevent="createNote()">
              <textarea v-model="editable.body" class="mt-5 mb-3" placeholder="Add your notes for this bug here"
                maxlength="1000" minlength="3" required></textarea>
              <div class="d-flex justify-content-end">
                <button type="submit" class="btn theme-btn mb-3">Submit</button>
              </div>
            </form>
          </div>
        </section>
        <section class="row">
          <div v-for="note in notes " :key="note.id" class="ms-4 me-2">
            <div class="d-flex">
              <div
                class="col-6 col-md-2 mt-4 green-box fs-4 fw-bold theme-brown-text text-center d-flex justify-content-between">
                <div class="d-flex p-2">
                  <img :src="note.creator.picture" :alt="`${note.creator.name}'s picture'`" class="small-picture me-2">
                  <p class="mb-0">{{ note.creator.name }}</p>
                </div>
                <p v-if="account.id == note.creator.id" @click="removeNote(`${note.id}`)" role="button"
                  class="me-2 text-danger" title="Delete this note"><i class="mdi mdi-close fs-5"></i></p>
              </div>
            </div>
            <div class="col-10 mb-3" :class="[activeBug.priority == 5 ? 'danger-border' : 'limegreen-border']">
              <p class="p-2 mb-0">{{ note.body }}</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { bugsService } from "../services/BugsService.js";
import { useRoute } from "vue-router";
import { trackedBugsService } from "../services/TrackedBugsService.js"
import { notesService } from "../services/NotesService.js"

export default {
  setup() {
    let route = useRoute()
    let editable = ref({})

    onMounted(() => {
      bugsService.clearAppState()
      getBugById()
      getTrackersOfBug()
      getNotesByBugId()
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

    async function getNotesByBugId() {
      try {
        let bugId = route.params.bugId
        await notesService.getNotesByBugId(bugId)
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      editable,
      activeBug: computed(() => AppState.activeBug),
      trackedBugs: computed(() => AppState.trackedBugs),
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      isTracker: computed(() =>
        AppState.trackedBugs.find((trackedBug) => trackedBug.accountId == AppState.account.id && trackedBug.bugId == AppState.activeBug.id)
      ),
      formattedDate: computed(() => AppState.activeBug.updatedAt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      })),

      async trackBug() {
        try {
          let bugId = route.params.bugId
          await trackedBugsService.trackBug(bugId)
          Pop.success("You are tracking this bug.")
        } catch (error) {
          Pop.error(error)
        }
      },

      async unTrackBug() {
        try {
          let bugId = route.params.bugId
          await trackedBugsService.unTrackBug(bugId)
          Pop.success("You have stopped tracking this bug.")
        } catch (error) {
          Pop.error(error)
        }
      },

      async closeBug() {
        try {
          if (!this.activeBug.closed) {
            let wantsToClose = await Pop.confirm("Are you sure you want to close this bug?")
            if (!wantsToClose) {
              return
            }
          }
          let bugId = route.params.bugId
          await bugsService.closeBug(bugId)
          Pop.success("This bug is now closed.")
        } catch (error) {
          Pop.error()
        }
      },

      async createNote() {
        try {
          let noteData = editable.value
          noteData.bugId = route.params.bugId
          await notesService.createNote(noteData)
          Pop.success("Note posted!")
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      },

      async removeNote(noteId) {
        try {
          let wantsToDelete = await Pop.confirm("Are you sure you want to delete this note?")
          if (!wantsToDelete) {
            return
          }
          await notesService.removeNote(noteId)
          Pop.success("Note deleted")
        } catch (error) {
          Pop.error(error)
        }
      },

    }
  }
};
</script>


<style lang="scss" scoped>
textarea {
  width: 50vw;
  height: 30vh;
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
}

.limegreen-border {
  border: 2px solid var(--theme-limegreen);
}

.danger-border {
  border: 2px solid firebrick;
}

.creator-picture {
  height: 10vh;
  width: auto;
  object-fit: cover;
  object-position: center;
}

.small-picture {
  height: 6vh;
  width: auto;
  object-fit: cover;
  object-position: center;
}

.blurred {
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.323);
}

@media (max-width: 768px) {
  .danger-border {
    padding-right: 0px;
  }

  textarea {
    width: 70vw;
    height: 30vh;
  }
}
</style>