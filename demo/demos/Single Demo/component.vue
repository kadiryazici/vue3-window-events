<script lang="ts" setup>
import { ref } from 'vue';
import { WindowEvents } from '../../../src/lib';
const isEnabled = ref(true);
const log = console.log;
</script>

<template>
   <div style="width: 300px">
      <div>Window Events {{ isEnabled }}</div>
      <p>Do CTRL + ENTER and then check console</p>
      <p>Try to open contextmenu</p>

      <!-- <KeepAlive> -->
      <WindowEvents
         v-if="isEnabled"
         @keyup.ctrl.enter="log('did ctrl + enter')"
         @contextmenu.prevent="log('context menu prevented')"
         @click="log('did click window'), log('second did click')"
      />
      <!-- </KeepAlive> -->

      <button @click="isEnabled = !isEnabled">Toggle Window Events</button>
   </div>
</template>
