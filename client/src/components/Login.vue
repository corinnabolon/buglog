<template>
  <span class="navbar-text">
    <button class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" @click="login"
      v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else class="d-flex align-items-center">
      <p class="mb-0 me-3 theme-beige-text">{{ account.email }}</p>
      <div>
        <div v-if="account.picture || user.picture">
          <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
        </div>
      </div>
      <div class="dropdown my-2 my-lg-0">
        <div type="button" class="theme-blue-bg border-0 selectable no-select" data-bs-toggle="dropdown"
          aria-expanded="false">
          <p class="mb-0 mx-2"><i class="mdi mdi-menu-down fs-3"></i></p>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
