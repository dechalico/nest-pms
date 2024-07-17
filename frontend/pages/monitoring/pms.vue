<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="PMS">
        <template #action>
          <v-dialog v-model="dialogModel" max-width="700">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="text-capitalize"
                text="Create PMS"
                color="primary"
                rounded
                elevation="0"
              >
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <UiParentCard title="Create Monitoring">
                <template #action>
                  <v-btn
                    :icon="XIcon"
                    @click="isActive.value = false"
                    density="compact"
                    variant="text"
                  />
                </template>
                <v-form v-model="vFormModel" @submit.prevent="" validate-on="blur" class="pb-3">
                  <v-row class="mb-2" dense>
                    <v-col cols="12" md="6" class="mb-2 mb-md-0 pr-0 pr-md-2">
                      <v-label for="field-hospital" class="font-weight-medium mb-0 text-subtitle-1"
                        >Hospital</v-label
                      >
                      <v-autocomplete
                        :items="client.data.value?.clients"
                        item-title="name"
                        item-value="id"
                        id="field-hospital"
                        variant="outlined"
                        class="mb-0 text-capitalize"
                        hide-details="auto"
                        density="compact"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6" class="pl-0 pl-md-2">
                      <v-label for="field-principal" class="font-weight-medium mb-0 text-subtitle-1"
                        >Principal</v-label
                      >
                      <v-autocomplete
                        :items="equipmentBrand.data.value?.equipmentBrands"
                        item-title="name"
                        item-value="id"
                        id="field-principal"
                        variant="outlined"
                        class="mb-0 text-capitalize"
                        hide-details="auto"
                        density="compact"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2 mt-0" dense>
                    <v-col cols="12" md="6" class="mb-2 mb-md-0 pr-0 pr-md-2">
                      <v-label for="field-model" class="font-weight-medium mb-0 text-subtitle-1"
                        >Model</v-label
                      >
                      <v-text-field
                        id="field-model"
                        variant="outlined"
                        class="mb-0 text-capitalize"
                        hide-details="auto"
                        density="compact"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pl-0 pl-md-2">
                      <v-label
                        for="field-fsr-number"
                        class="font-weight-medium mb-0 text-subtitle-1"
                        >FSR #</v-label
                      >
                      <v-text-field
                        id="field-fsr-number"
                        variant="outlined"
                        class="mb-0 text-capitalize"
                        hide-details="auto"
                        density="compact"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2 mt-0" dense>
                    <v-col cols="12" md="6" class="mb-2 mb-md-0 pr-0 pr-md-2">
                      <v-label
                        for="field-warranty-type"
                        class="font-weight-medium mb-0 text-subtitle-1"
                        >Warranty Type</v-label
                      >
                      <v-select
                        :items="warranty.data.value?.warrantyTypes"
                        item-title="name"
                        item-value="id"
                        id="field-warranty-type"
                        variant="outlined"
                        class="mb-0 text-capitalize"
                        hide-details="auto"
                        density="compact"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="pl-0 pl-md-2">
                      <v-label
                        for="field-date-installed"
                        class="font-weight-medium mb-0 text-subtitle-1"
                        >Date Installed</v-label
                      >
                      <v-text-field
                        id="field-date-installed"
                        variant="outlined"
                        class="mb-0"
                        hide-details="auto"
                        density="compact"
                        type="date"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2 mt-0" dense>
                    <v-col>
                      <v-label
                        for="field-serial-numbers"
                        class="font-weight-medium mb-0 text-subtitle-1"
                        >Serial Numbers</v-label
                      >
                      <v-combobox
                        id="field-serial-numbers"
                        variant="outlined"
                        class="mb-0 text-capitalize"
                        chips
                        multiple
                        hide-details="auto"
                        density="compact"
                      ></v-combobox>
                    </v-col>
                  </v-row>
                  <v-row class="mb-2 mt-0" dense>
                    <v-col>
                      <v-label for="field-engineers" class="font-weight-medium mb-0 text-subtitle-1"
                        >Engineers</v-label
                      >
                      <v-select
                        :items="engineer.data.value?.engineers"
                        item-title="fullName"
                        item-value="id"
                        id="field-engineers"
                        variant="outlined"
                        class="mb-0 text-capitalize"
                        chips
                        multiple
                        hide-details="auto"
                        density="compact"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <div class="d-flex justify-end mt-3">
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
                <th class="text-subtitle-1 font-weight-bold">Principal</th>
                <th class="text-subtitle-1 font-weight-bold">Hospital</th>
                <th class="text-subtitle-1 font-weight-bold">Model</th>
                <th class="text-subtitle-1 font-weight-bold">FSR #</th>
                <th class="text-subtitle-1 font-weight-bold">Serial #</th>
                <th class="text-subtitle-1 font-weight-bold">Date Installed</th>
                <th class="text-subtitle-1 font-weight-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, count) in pmsResult?.pms" :key="item.id">
                <td>
                  <p class="text-15 font-weight-medium">{{ count + 1 }}</p>
                </td>
                <td>
                  <h6 class="text-subtitle-1 font-weight-bold text-capitalize">
                    {{ item.equipmentBrand.name }}
                  </h6>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted text-capitalize">{{ item.client.name }}</h6>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted text-capitalize">{{ item.model }}</h6>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted text-capitalize">{{ item.fsrNumber }}</h6>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted text-capitalize">
                    {{ item.serialNumbers.join(', ') }}
                  </h6>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted text-capitalize">
                    {{ item.dateInstalled.toString() }}
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
import type { Pms } from '@/types/monitoring/pms';
import type { Client } from '@/types/monitoring/client';
import type { EquipmentBrand } from '@/types/monitoring/equipmentBrand';
import type { WarrantyType } from '@/types/monitoring/warrantyType';
import type { Engineer } from '@/types/management/engineer';
import type { FormInput } from '@/types/pages/form';

type PmsResult = {
  pms: Pms[];
};

type ClientResult = {
  clients: Client[];
};

type EquipmentBrandResult = {
  equipmentBrands: EquipmentBrand[];
};

type WarrantyTypeResult = {
  warrantyTypes: WarrantyType[];
};

type EngineerResult = {
  engineers: Engineer[];
};

const dialogModel = ref<boolean>(false);
const vFormModel = ref<boolean>(false);

const clientsRes = useApiFetch<ClientResult>('/admin/clients', {
  showError: true,
});

const equipmentBrandRes = useApiFetch<EquipmentBrandResult>('/admin/equipment-brands', {
  showError: true,
});

const warrantyRes = useApiFetch<WarrantyTypeResult>('/admin/warranty-types', { showError: true });

const engineerRes = useApiFetch<EngineerResult>('admin/engineers/?includeOffice=true', {
  showError: true,
});

const [client, equipmentBrand, warranty, engineer] = await Promise.all([
  clientsRes,
  equipmentBrandRes,
  warrantyRes,
  engineerRes,
]);
engineer.data.value?.engineers.forEach((e) => (e.fullName = `${e.firstName} ${e.lastName}`));

const { data: pmsResult, refresh: loadPms } = await useApiFetch<PmsResult>('/admin/pms', {
  showError: true,
});
</script>
