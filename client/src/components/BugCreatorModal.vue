<template>
  <div class="modal fade" id="bugCreatorModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="bugCreatorModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content theme-beige-bg theme-brown-text">
        <div class="modal-header">
          <p class="modal-title fs-4" id="bugCreatorModalLabel">Bug Report</p>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body fs-5">
          <form @submit.prevent="createBug()">
            <div class="mb-3">
              <label for="bugTitle" class="form-label">Title</label>
              <input v-model="editable.title" type="text" id="bugTitle" name="bugTitle" class="form-control"
                placeholder="Bug title" maxlength="30" required>
            </div>
            <div class="mb-3">
              <label for="bugPriority" class="form-label">Select Bug Priority (5 is highest)</label>
              <select v-model="editable.priority" id="bugPriority" name="bugPriority" class="form-select" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="mb-3 d-flex flex-column">
              <label class="form-label" for="bugDescription" name="bugDescription">Describe the bug here:</label>
              <textarea v-model="editable.description" id="bugDescription" maxlength="1000" minlength="5" rows="5"
                placeholder="Bug description" required></textarea>
            </div>
            <div class="d-flex justify-content-end mb-2">
              <button type="submit" class="btn theme-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js"
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
import { bugsService } from "../services/BugsService.js";

export default {
  setup() {
    let editable = ref({})
    let router = useRouter()

    return {
      editable,


      async createBug() {
        try {
          let bugData = editable.value
          let bug = await bugsService.createBug(bugData)
          Pop.success("Bug created!")
          editable.value = {}
          Modal.getOrCreateInstance("#bugCreatorModal").hide()
          router.push({ name: "BugDetails", params: { bugId: bug.id } })
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped></style>