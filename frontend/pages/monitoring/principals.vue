<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Principals">
        <template #action>
          <v-dialog v-model="dialogModel" max-width="400">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="text-capitalize"
                text="Add Principal"
                color="primary"
                rounded
                elevation="0"
              >
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <UiParentCard title="New Principal">
                <template #action>
                  <v-btn
                    :icon="XIcon"
                    @click="isActive.value = false"
                    density="compact"
                    variant="text"
                  />
                </template>
                <v-form
                  v-model="vFormModel"
                  @submit.prevent="createPrincipalHandler"
                  validate-on="blur"
                  class="pb-3"
                >
                  <div>
                    <v-text-field
                      v-model.trim="principalName.model"
                      :rules="principalName.rules"
                      label="Name"
                      variant="outlined"
                      class="mb-5"
                    ></v-text-field>
                  </div>
                  <div class="d-flex justify-end">
                    <v-btn
                      class="mr-2"
                      color="error"
                      rounded
                      text="Cancel"
                      @click="isActive.value = false"
                    ></v-btn>
                    <v-btn color="primary" rounded text="Submit" type="submit"></v-btn>
                  </div>
                </v-form>
              </UiParentCard>
            </template>
          </v-dialog>
        </template>
        <div class="border-table">
          <v-table>
            <thead>
              <tr>
                <th class="text-subtitle-1 font-weight-bold">#</th>
                <th class="text-subtitle-1 font-weight-bold">Name</th>
                <th class="text-subtitle-1 font-weight-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, count) in equipmenBrandResult?.equipmentBrands" :key="item.id">
                <td>
                  <p class="text-15 font-weight-medium">{{ count + 1 }}</p>
                </td>
                <td>
                  <div class="">
                    <h6 class="text-subtitle-1 font-weight-bold text-capitalize">
                      {{ item.name }}
                    </h6>
                  </div>
                </td>
                <td>
                  <div class="d-flex">
                    <v-btn :icon="PencilIcon" variant="text" color="primary" />
                    <v-btn :icon="TrashIcon" variant="text" color="error" />
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { PencilIcon, TrashIcon, XIcon } from 'vue-tabler-icons';
import type { EquipmentBrand } from '@/types/monitoring/equipmentBrand';
import type { FormInput } from '@/types/pages/form';

type EquipmentBrandResult = {
  equipmentBrands: EquipmentBrand[];
};

const dialogModel = ref<boolean>(false);
const vFormModel = ref<boolean>(false);

const principalName = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'Provide valid principal name.'],
});

const { data: equipmenBrandResult, refresh: loadEquipmentBrands } =
  await useApiFetch<EquipmentBrandResult>('/admin/equipment-brands', {
    showError: true,
  });

const createPrincipalHandler = async () => {
  if (!vFormModel.value) return;

  const payload = {
    name: principalName.model,
  };
  const { status } = await useApiFetch('/admin/equipment-brands', {
    method: 'post',
    body: payload,
    showError: true,
  });
  if (status.value === 'success') {
    dialogModel.value = false;
    loadEquipmentBrands();
  }
};
</script>
