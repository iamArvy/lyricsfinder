<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  closeable: {
    type: Boolean,
    default: true
  },
  close: {
    type: Function,
    default: open
  },
  title: {
    type: String,
    default: 'Modal'
  }
})
const dialog = ref(null)

watch(
  () => props.show,
  () => {
    if (props.show) {
      document.body.style.overflow = 'hidden'
      // @ts-ignore
      dialog.value?.showModal()
    } else {
      document.body.style.overflow = 'scroll'
      setTimeout(() => {
        // @ts-ignore
        dialog.value?.close()
      }, 200)
    }
  }
)
</script>
<template>
  <div>
    <dialog ref="dialog">
      <div class="dialog-content">
        <div class="content">
          <header>
            <h1>{{ props.title }}</h1>
            <button @click="props.close()"><i class="bx bx-x"></i></button>
          </header>
          <main>
            <slot />
          </main>
        </div>
      </div>
    </dialog>
  </div>
</template>
<style scoped>
.content {
  background: white;
  width: 50%;
  height: 70%;
  border-radius: 30px;
}
.dialog-content {
  position: fixed;
  inset: 0; /* This covers the entire viewport */
  padding: 1.5rem; /* Adds space around the dialog content */
  display: flex; /* Enables Flexbox layout */
  justify-content: center; /* Centers items horizontally */
  align-items: center; /* Centers items vertically */
}
.content {
  padding: 2rem;
  background: white;
  min-width: 200px;
  width: 50%;
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
h1 {
  text-transform: capitalize;
}
button {
  background: transparent;
  border: none;
  font-size: 50px;
  cursor: pointer;
}
main {
  display: flex;
  place-content: center;
  justify-content: center;
  align-items: center;
}
</style>
