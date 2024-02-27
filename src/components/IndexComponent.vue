<template>
  <div class="row flex-center">
    <q-btn
      color="primary"
      icon="sync_alt"
      label="Convert / Entry"
      @click="
        convert.getEntry(entry),
          (convert.outputCoincidences = []),
          (convert.outputNoCoincidences = [])
      "
    />
  </div>

  <div class="q-pa-md q-gutter-md">
    <div class="row justify-evenly">
      <div class="col-12 col-sm-5">
        <q-card dark bordered class="bg-grey-5">
          <q-card-section>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6 text-black">Convert:</q-item-label>
              </q-item-section>
              <q-item-section>
                <div class="q-pa-md">
                  <q-btn-toggle
                    v-model="convert.convertType"
                    glossy
                    push
                    toggle-color="primary"
                    text-color="black"
                    color="white"
                    :options="[
                      { label: 'TXA', value: 'txa' },
                      { label: 'GTS', value: 'gts' },
                      { label: 'Company', value: 'empresa' },
                    ]"
                  />
                </div>
              </q-item-section>
            </q-item>

            <q-input
              type="textarea"
              v-model="entry"
              rows="30"
              clearable
              style="
                font-size: 20px;
                font-family: monospace;
                font-style: italic;
              "
              outlined
              filled
              borderless
              label="Enter your code TXA here"
              text-color="primary"
            />
          </q-card-section>

          <q-separator dark inset />

          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
      <q-separator vertical inset />
      <div class="col-12 col-sm-5">
        <q-card dark bordered class="bg-grey-9">
          <q-card-section>
            <ResponseComponent />
          </q-card-section>

          <q-separator dark inset />

          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useFormatStore } from "../stores/format-entry";
export default {
  data() {
    return {
      entry: ref(""),
      output: ref(""),
      convertGts: ref(false),
    };
  },

  setup() {
    const format = new useFormatStore();

    return {
      convert: format,
    };
  },

  components: {
    ResponseComponent: require("components/ResponseComponent.vue").default,
  },
};
</script>

<style lang="sass"></style>
