<script setup>

defineProps({id: String, position: {type: String, default: 'end'}, backdrop: {type: Boolean, default: true}})

</script>


<template>
 <div
  :class="`offcanvas offcanvas-${position} bg-glass`"
  tabindex="-1"
  :id="id"
  aria-labelledby="staticBackdropLabel"
  :data-bs-backdrop="backdrop"
 >
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">
      <slot name="header">
       header
      </slot>
    </h5>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
  </div>
  <div class="offcanvas-body">
    <slot name="body">
      body
    </slot>
  </div>
 </div>

</template>


<style lang="scss" scoped>

.offcanvas{
  margin: 10px;
  border-radius: 3em;
  padding: .25em 1em;
  border: 1px solid rgba(255, 255, 255, .4);
}

.bg-glass{
  background-color: rgba(50, 50, 58, .95);
  // backdrop-filter: blur(5px);
}
</style>
