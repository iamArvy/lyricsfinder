<template>
  <button class="download-button">
    <i class="bx bx-cloud-download"></i>
  </button>
</template>

<style scoped>
.download-button {
  position: fixed; /* Changed to fixed to stay in place */
  right: 100px; /* Adjust as needed */
  bottom: 50px; /* Adjust as needed */
  z-index: 999; /* Ensure it is above other content */
  background: greenyellow; /* Button background color */
  border: none; /* Remove default border */
  border-radius: 50%; /* Rounded corners */
  width: 100px;
  height: 100px;
  padding: 1rem; /* Add padding for a better click area */
  cursor: pointer; /* Change cursor on hover */
  transition: background 0.3s; /* Smooth background change on hover */
  font-size: 50px;
}

.download-button:hover {
  background: yellowgreen; /* Change background color on hover */
}
</style>
