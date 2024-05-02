<script setup>
import OffcanvasWrapper from './OffcanvasWrapper.vue'
import OptionsMenu from './OptionsMenu.vue'
</script>


<template>
 <div class="options-wrapper container-fluid ">
  <div class="d-flex justify-content-end">
    <button data-bs-toggle="offcanvas" data-bs-target="#options-offcanvas" class="btn"><i class="mdi mdi-cog"></i></button>
  </div>
</div>
<OffcanvasWrapper id="options-offcanvas" position="top" :backdrop="false">
  <template #header>
    <div class="text-info">
      options <i class="mdi mdi-cog mdi-spin"></i>
    </div>
  </template>
  <template #body>
    <div class="row">
      <OptionsMenu/>
    </div>
  </template>
</OffcanvasWrapper>
</template>


<style lang="scss" scoped>
.options-wrapper{
  position: fixed;
  padding: 25px;
}
</style>
