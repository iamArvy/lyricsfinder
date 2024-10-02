<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  closeable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])
const dialog = ref()
const showSlot = ref(props.show)

watch(
  () => props.show,
  () => {
    if (props.show) {
      document.body.style.overflow = 'hidden'
      showSlot.value = true
      dialog.value?.showModal()
    } else {
      document.body.style.overflow = null
      setTimeout(() => {
        dialog.value?.close()
        showSlot.value = false
      }, 200)
    }
  }
)

const close = () => {
  if (props.closeable) {
    emit('close')
  }
}

const closeOnEscape = (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()

    if (props.show) {
      close()
    }
  }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape)
  document.body.style.overflow = null
})
</script>

<template>
  <dialog class="custom-dialog" ref="dialog">
    <div class="dialog-overlay" @click="close">
      <transition
        enter-active-class="fade-in"
        enter-from-class="fade-out"
        enter-to-class="fade-in"
        leave-active-class="fade-out"
        leave-from-class="fade-in"
        leave-to-class="fade-out"
      >
        <div v-show="true" class="overlay-background"></div>
      </transition>

      <transition
        enter-active-class="fade-in"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="fade-out"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div v-show="true" class="dialog-content max-w-2xl">
          <slot />
        </div>
      </transition>
    </div>
  </dialog>
</template>
<style scoped>
.custom-dialog {
  backdrop-filter: blur(5px); /* Optional: Adds a blur effect */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full height */
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Overlay background */
.overlay-background {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
}

/* Dialog content styles */
.dialog-content {
  background: white;
  border-radius: 0.5rem; /* Rounded corners */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Shadow effect */
  transition:
    transform 0.3s ease,
    opacity 0.3s ease; /* Transition for animation */
}

/* Animation classes */
.fade-in {
  opacity: 1;
}

.fade-out {
  opacity: 0;
}

.translate-y-4 {
  transform: translateY(1rem); /* Translate down */
}

/* Max width class for 2xl */
.max-w-2xl {
  max-width: 42rem; /* 2xl max width in standard CSS (672px) */
  width: 100%; /* Ensure it takes full width available */
}
</style>
