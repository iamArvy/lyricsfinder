<template>
  <ul>
    <slot />
  </ul>
</template>

<style scoped>
ul {
  padding: 5px;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  font-family: poppins;
  gap: 1rem;
}
</style>
