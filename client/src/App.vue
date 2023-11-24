<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
  </footer>
  <BugCreatorModal />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import BugCreatorModal from "./components/BugCreatorModal.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, BugCreatorModal }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
  --theme-blue: #61A3BA;
  --theme-beige: #FFFFDD;
  --theme-limegreen: #D2DE32;
  --theme-green: #A2C579;
  --theme-brown: #884A39;
}

body {
  background-color: var(--theme-beige);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.theme-blue-bg {
  background-color: var(--theme-blue);
}

.theme-beige-bg {
  background-color: var(--theme-beige);
}

.theme-limegreen-bg {
  background-color: var(--theme-limegreen);
}

.theme-green-bg {
  background-color: var(--theme-green);
}

.theme-brown-bg {
  background-color: var(--theme-brown);
}

.theme-blue-text {
  color: var(--theme-blue);
}

.theme-beige-text {
  color: var(--theme-beige);
}

.theme-limegreen-text {
  color: var(--theme-limegreen);
}

.theme-green-text {
  color: var(--theme-green);
}

.theme-brown-text {
  color: var(--theme-brown);
}

.theme-btn {
  background-color: var(--theme-green);
  font-weight: bold;
  color: var(--theme-brown);
}

.theme-btn:hover {
  background-color: var(--theme-limegreen);
  color: var(--theme-brown);
}

.theme-btn:active:focus {
  background-color: var(--theme-green);
  border: 1px solid var(--theme-brown);
  color: var(--theme-brown);
}

.theme-btn:disabled {
  background-color: var(--theme-brown);
  border: 1px solid var(--theme-limegreen);
  color: var(--theme-beige);
  border-radius: 0%;
}

.theme-btn-closed:disabled {
  background-color: var(--theme-limegreen);
  border: 3px solid var(--theme-brown);
  color: var(--theme-brown);
  border-radius: 0%;
}

.blue-box {
  background-color: var(--theme-blue);
  border: 1px solid var(--theme-brown);
  height: 20vh;
}
</style>
