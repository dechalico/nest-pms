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
                <v-form
                  v-model="vFormModel"
                  @submit.prevent="createWarrantyType"
                  validate-on="blur"
                  class="pb-3"
                >
                  <div>
                    <v-row>
                      <v-col cols="12">
                        <v-label for="warranty-name" class="font-weight-medium mb-1"
                          >Warranty Name</v-label
                        >
                        <v-text-field
                          id="warranty-name"
                          v-model="warrantyName.model"
                          variant="outlined"
                          :rules="warrantyName.rules"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                  <div>
                    <v-label for="interval" class="font-weight-medium mb-1">Interval</v-label>
                    <v-row>
                      <v-col cols="6">
                        <v-select
                          id="interval"
                          :items="intervals"
                          item-title="text"
                          item-value="value"
                          variant="outlined"
                          v-model="selectedInterval.model"
                        ></v-select>
                      </v-col>
                      <v-col cols="6"
                        ><v-text-field
                          type="number"
                          min="1"
                          variant="outlined"
                          v-model="numberInterval.model"
                          :rules="numberInterval.rules"
                          :hint="numberInterval.hint"
                          persistent-hint
                        ></v-text-field
                      ></v-col>
                    </v-row>
                  </div>
                  <div>
                    <v-label for="duration" class="font-weight-medium mb-1">Duration</v-label>
                    <v-row>
                      <v-col cols="6"
                        ><v-select
                          id="duration"
                          :items="durations"
                          item-title="text"
                          item-value="value"
                          variant="outlined"
                          v-model="selectedDuration.model"
                        ></v-select
                      ></v-col>
                      <v-col cols="6"
                        ><v-text-field
                          type="number"
                          min="1"
                          v-model="numberDuration.model"
                          :rules="numberDuration.rules"
                          :hint="numberDuration.hint"
                          variant="outlined"
                          persistent-hint
                        ></v-text-field
                      ></v-col>
                    </v-row>
                  </div>
                  <div class="d-flex justify-end mt-4">
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

type Interval = {
  text: string;
  value: string;
};

type Duration = {
  text: string;
  value: string;
};

const dialogModel = ref<boolean>(false);
const vFormModel = ref<boolean>(false);

const intervals: Interval[] = [
  { text: 'Day', value: 'D' },
  { text: 'Week', value: 'W' },
  { text: 'Month', value: 'M' },
  { text: 'Year', value: 'Y' },
];
const selectedInterval = reactive<FormInput<string>>({
  model: 'M',
  disabled: false,
});

const numberInterval = reactive<FormInput<Number>>({
  model: 1,
  rules: [(val: number) => val > 0 || 'Value must be a number and greater than zero.'],
  hint: 'Number of times to skip',
});

const durations: Duration[] = [
  { text: 'Month', value: 'M' },
  { text: 'Year', value: 'Y' },
];
const selectedDuration = reactive<FormInput<string>>({
  model: 'Y',
  disabled: false,
});

const numberDuration = reactive<FormInput<Number>>({
  model: 1,
  rules: [(val: number) => val > 0 || 'Value must be a number and greater than zero.'],
  hint: 'Number of how long the duration is',
});

const warrantyName = reactive<FormInput<String>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'Provide valid warranty name.'],
});

const { data: warrantyTypeResult, refresh: loadWarranties } = await useApiFetch<WarrantyTypeResult>(
  '/admin/warranty-types',
  { showError: true },
);

const createWarrantyType = async () => {
  if (!vFormModel.value) return;

  const payload = {
    name: warrantyName.model,
    algorithm: `${selectedInterval.model}|${numberInterval.model}|${selectedDuration.model}|${numberDuration.model}`,
  };

  const { status } = await useApiFetch('/admin/warranty-types', {
    method: 'post',
    body: payload,
    showError: true,
  });
  if (status.value === 'success') {
    dialogModel.value = false;
    loadWarranties();
  }
};
</script>
