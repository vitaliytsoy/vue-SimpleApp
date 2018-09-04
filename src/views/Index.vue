<template>
    <div class="index-page">
        <v-header></v-header>
        <v-operations></v-operations>
    </div>
</template>

<script>
  // import { mapActions } from 'vuex';
  import Header from '../components/Header.vue';
  import Operations from '../components/Operations.vue';

  export default {

    name: 'Index',
    components: {
      'v-header': Header,
      'v-operations': Operations,
    },
  };
</script>

<style scoped>

</style>
