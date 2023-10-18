<template>
  <q-page class="flex flex-center">
    <q-table 
             :rows="rarocStore.rarocData"
             :columns="columns"
             style="width: 800px;"
             row-key="segment"
             separator="cell"
             v-column-draggable="columns"
             v-resizable />
  </q-page>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRarocStore } from '../stores/rarocStore.js'

  const rarocStore = useRarocStore();

  const columns = ref([
    {
      name: 'segment',
      required: true,
      label: 'Business Segment',
      align: 'left',
      field: row => row.segment,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'expectedReturn',
      required: true,
      label: 'Expected Return (in million USD)',
      align: 'left',
      field: row => row.expectedReturn,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'economicCapital',
      required: true,
      label: 'Economic Capital (in million USD)',
      align: 'left',
      field: row => row.economicCapital,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'raroc',
      required: true,
      label: 'RAROC (%)',
      align: 'left',
      field: row => row.raroc,
      format: val => `${val}`,
      sortable: true
    },
  ]);

  onMounted(() => {
    rarocStore.getRarocData()
      .then((res) => {
        rarocStore.rarocData = res;
      });
  });

</script>

