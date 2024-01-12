<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Warranties">
        <template #action>
          <v-dialog v-model="dialogModel" max-width="400">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="text-capitalize"
                text="Add Warranty"
                color="primary"
                rounded
                elevation="0"
              >
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <UiParentCard title="New Warranty">
                <template #action>
                  <v-btn
                    :icon="XIcon"
                    @click="isActive.value = false"
                    density="compact"
                    variant="text"
                  />
                </template>
                <v-form v-model="vFormModel" validate-on="blur" class="pb-3">
                  <div>
                    <v-text-field label="Name" variant="outlined" class="mb-5"></v-text-field>
                    <v-text-field label="Location" variant="outlined" class="mb-5"></v-text-field>
                  </div>
                  <div class="d-flex justify-end">
                    <v-btn color="primary" rounded text="Submit" class="mr-2" type="submit"></v-btn>
                    <v-btn
                      color="error"
                      rounded
                      text="Cancel"
                      @click="isActive.value = false"
                    ></v-btn>
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
                <th class="text-subtitle-1 font-weight-bold">Message</th>
                <th class="text-subtitle-1 font-weight-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, count) in warrantyTypeResult?.warrantyTypes" :key="item.id">
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
                  <h6 class="text-body-1 text-muted text-capitalize">{{ item.algoMessage }}</h6>
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

<script lang="ts" setup>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { PencilIcon, TrashIcon, XIcon } from 'vue-tabler-icons';
import type { FormInput } from '@/types/pages/form';
import type { WarrantyType } from '@/types/monitoring/warrantyType';

type WarrantyTypeResult = {
  warrantyTypes: WarrantyType[];
};

const dialogModel = ref<boolean>(false);
const vFormModel = ref<boolean>(false);

const { data: warrantyTypeResult, refresh: loadWarranties } = await useApiFetch<WarrantyTypeResult>(
  '/admin/warranty-types',
  { showError: true },
);
</script>
