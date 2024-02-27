<template>
  <q-page class="q-ma-lg">
    <IndexComponent />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import IndexComponent from "../components/IndexComponent.vue";

export default defineComponent({
  name: "IndexPage",

  components: {
    IndexComponent,
  },
});
</script>
