<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Engineers">
        <template #action>
          <v-dialog v-model="dialogModel" max-width="400">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="text-capitalize"
                text="Add Engineer"
                color="primary"
                rounded
                elevation="0"
              >
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <UiParentCard title="New Engineer">
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
                  @submit.prevent="createEngineerHandler"
                  validate-on="blur"
                  class="pb-3"
                >
                  <div>
                    <v-text-field
                      v-model.trim="firstName.model"
                      :rules="firstName.rules"
                      label="First Name"
                      variant="outlined"
                      class="mb-5"
                    ></v-text-field>
                    <v-text-field
                      v-model.trim="lastName.model"
                      :rules="lastName.rules"
                      label="Last Name"
                      variant="outlined"
                      class="mb-5"
                    ></v-text-field>
                    <v-text-field
                      v-model.trim="middleName.model"
                      label="Middle Name"
                      variant="outlined"
                      class="mb-5"
                    ></v-text-field>
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
                <th class="text-subtitle-1 font-weight-bold">Location</th>
                <th class="text-subtitle-1 font-weight-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, count) in engineerResult?.engineers" :key="item.id">
                <td>
                  <p class="text-15 font-weight-medium">{{ count + 1 }}</p>
                </td>
                <td>
                  <div class="">
                    <h6 class="text-subtitle-1 font-weight-bold text-capitalize">
                      {{ item.firstName }} {{ item.middleName }} {{ item.lastName }}
                    </h6>
                  </div>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted text-capitalize">
                    {{ item.areaOffice?.name }} - {{ item.areaOffice?.city }}
                  </h6>
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
import type { Engineer } from '@/types/management/engineer';
import type { FormInput } from '@/types/pages/form';

type EngineerResult = {
  engineers: Engineer[];
};

const dialogModel = ref<boolean>(false);
const vFormModel = ref<boolean>(false);

const firstName = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'First name field required.'],
});
const lastName = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'Last name field required.'],
});
const middleName = reactive<FormInput<string>>({
  model: '',
  disabled: false,
});

const { data: engineerResult, refresh: loadEngineers } = await useApiFetch<EngineerResult>(
  'admin/engineers/?includeOffice=true',
  {
    showError: true,
  },
);

const createEngineerHandler = async () => {
  if (!vFormModel.value) return;

  const payload = {
    firstName: firstName.model,
    lastName: lastName.model,
    middleName: middleName.model,
  };
  const { status } = await useApiFetch('/admin/engineers', {
    method: 'POST',
    body: payload,
    showError: true,
  });
  if (status.value === 'success') {
    dialogModel.value = false;
    await loadEngineers();
  }
};
</script>
