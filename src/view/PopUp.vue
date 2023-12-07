<template>
  <div
    class="flex flex-col items-center justify-start py-10 px-5 min-h-[500px] min-w-[400px]"
  >
    <button
      @click="startActivity"
      :loading="loading"
      :disabled="disabled"
      :class="[
        { 'cursor-not-allowed': disabled },
        'bg-orange-600 border border-orange-600 text-[#fff] rounded-lg min-w-[200px] font-bold h-12 py-3 hover:bg-[#fff] hover:text-orange-600',
      ]"
      type="button"
    >
      <div v-if="loading" class="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span v-else>Start Activity</span>
    </button>

    <div class="response mt-10">
      <img class="w-full" :src="imageSrc" />
      <h1 class="text-xl">
        {{ quote }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const disabled = ref<boolean>(false);
const loading = ref<boolean>(false);
const quote = ref<string>();
const imageSrc = ref<string>("");

const startActivity = async () => {
  disabled.value = true;
  loading.value = true;
  findInputFieldsHandler();
};

const findInputFieldsHandler = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let activeTabId: number | undefined = tabs[0]?.id;
    if (activeTabId) {
      chrome.tabs.sendMessage(
        activeTabId,
        { message: "start" },
        ({ type, response }) => {
          if (type == "image") {
            imageSrc.value = response;
          } else {
            quote.value = response.content;
          }
          disabled.value = false;
          loading.value = false;
        }
      );
    }
  });
};
</script>
