<template>
  <div class="q-pa-md q-gutter-md relative-position">
    <span class="text-yellow-9 text-h6 q-ma-md"
      >Coincidences: {{ format.outputCoincidences.length }}</span
    >
    <q-toggle
      v-model="copyAll"
      checked-icon="copy_all"
      color="green-9"
      label="Copy all"
      unchecked-icon="clear"
      @update:model-value="copyAllAccounts(format.outputCoincidences)"
    />

    <q-toggle
      v-model="copyAllGts"
      checked-icon="copy_all"
      color="green-9"
      label="Copy GTS"
      unchecked-icon="clear"
      @update:model-value="copyAllAccountsGts(format.outputCoincidences)"
    />

    <q-scroll-area
      dark
      class="bg-grey-9 text-white rounded-borders"
      style="height: 500px; max-width: 600px"
    >
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-show="format.showSimulatedReturnData">
          <q-list
            dark
            separator
            bordered
            class="rounded-borders"
            style="max-width: 600px"
          >
            <q-badge
              class="fixed-center text-white text-h6 shadow-10"
              v-if="format.outputCoincidences.length == 0"
              color="red-14"
            >
              {{ "No coincidences" }}
            </q-badge>
            <q-item
              v-for="(account, index) in format.outputCoincidences"
              :key="index"
              class=""
            >
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" size="30px">
                  {{ index + 1 }}
                </q-avatar>
              </q-item-section>

              <q-item-section top>
                <q-item-label>{{ account.empresa }}</q-item-label>
                <q-item-label caption lines="1">
                  {{ account.direccion }}
                </q-item-label>
                <q-item-label class="text-yellow" caption>{{
                  "Txa: " +
                  account.cuentaTxa +
                  " - " +
                  "Gts:" +
                  account.cuentaGts
                }}</q-item-label>
              </q-item-section>

              <q-item-section class="q-mt-xs" top side>
                <div class="text-primary q-gutter-xs">
                  <q-btn
                    class=""
                    size="12px"
                    flat
                    dense
                    round
                    @click="copyToClipboard(account)"
                    icon="content_copy"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </transition>
    </q-scroll-area>

    <q-inner-loading :showing="format.visible">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <q-separator class="q-my-md" dark inset />

    <div class="text-h6 text-red q-ma-md">
      No Coincidences: {{ format.outputNoCoincidences.length }}
    </div>

    <q-scroll-area
      dark
      class="bg-grey-9 text-white rounded-borders"
      style="height: 400px; max-width: 600px"
    >
      <q-list
        dark
        dense
        separator
        bordered
        class="rounded-borders"
        style="max-width: 600px"
      >
        <q-item
          v-for="(account, index) in format.outputNoCoincidences"
          :key="index"
          class=""
        >
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" size="30px">
              {{ index + 1 }}
            </q-avatar>
          </q-item-section>

          <q-item-section top>
            <q-item-label>{{ account.empresa }}</q-item-label>
            <q-item-label caption lines="1">
              {{ account.direccion }}
            </q-item-label>
            <q-item-label class="text-red text-weight-bolder" caption>{{
              "Cuenta #: " + account
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-badge
          class="fixed-center text-white text-h6 shadow-10"
          v-if="format.outputNoCoincidences.length == 0"
          color="red-14"
        >
          {{ "No coincidences" }}
        </q-badge>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
import { useFormatStore } from "../stores/format-entry";
import { ref } from "vue";

export default {
  data() {
    return {
      copyAll: ref(false),
      copyAllGts: ref(false),
    };
  },

  setup() {
    const format = new useFormatStore();
    return {
      format,
    };
  },

  methods: {
    copyToClipboard(account) {
      let text =
        "" +
        account.empresa +
        "\n" +
        account.direccion +
        "\n" +
        "Txa:" +
        account.cuentaTxa +
        "\n" +
        "Gts:" +
        account.cuentaGts;
      navigator.clipboard.writeText(text);

      //navigator.clipboard.writeText(text);
    },

    copyAllAccounts(account) {
      let text = "";

      for (let index = 0; index < account.length; index++) {
        text +=
          "" +
          account[index].empresa +
          "\n" +
          account[index].direccion +
          "\n" +
          "Txa:" +
          account[index].cuentaTxa +
          "\n" +
          "Gts:" +
          account[index].cuentaGts +
          "\n" +
          "------------------------------------" +
          "\n";
      }

      navigator.clipboard.writeText(text);

      setTimeout(() => {
        this.copyAll = false;
      }, 2000);
    },

    copyAllAccountsGts(account) {
      let text = "";

      for (let index = 0; index < account.length; index++) {
        text += "" + account[index].cuentaGts + "\n";
      }

      navigator.clipboard.writeText(text);

      setTimeout(() => {
        this.copyAllGts = false;
      }, 2000);
    },
  },
};
</script>

<style lang="sass"></style>
