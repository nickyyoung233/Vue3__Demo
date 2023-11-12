<script setup></script>

<template>
  <button>
    <slot name="icon"></slot>
    <slot>Default</slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  min-width: 20%;
  padding: 8px 16px;
  border: none;
}
</style>
