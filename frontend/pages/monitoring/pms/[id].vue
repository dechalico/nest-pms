<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Pms Detail">
        <template #action> </template>
        <div class="mb-5">
          <v-row>
            <v-col cols="12" sm="6" md="4" class="py-1">
              <v-label for="field-hospital" class="font-weight-medium mb-0 text-subtitle-1"
                >Hospital</v-label
              >
              <v-text-field
                readonly
                id="field-hospital"
                variant="outlined"
                class="mb-0 text-capitalize"
                hide-details="auto"
                density="compact"
                :model-value="pmsResult?.pms.client.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-1">
              <v-label for="field-principal" class="font-weight-medium mb-0 text-subtitle-1"
                >Principal</v-label
              >
              <v-text-field
                readonly
                id="field-principal"
                variant="outlined"
                class="mb-0 text-capitalize"
                hide-details="auto"
                density="compact"
                :model-value="pmsResult?.pms.equipmentBrand.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-1">
              <v-label for="field-model" class="font-weight-medium mb-0 text-subtitle-1"
                >Model</v-label
              >
              <v-text-field
                readonly
                id="field-model"
                variant="outlined"
                class="mb-0 text-capitalize"
                hide-details="auto"
                density="compact"
                :model-value="pmsResult?.pms.model"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-1">
              <v-label for="field-fsr" class="font-weight-medium mb-0 text-subtitle-1"
                >FSR #</v-label
              >
              <v-text-field
                readonly
                id="field-fsr"
                variant="outlined"
                class="mb-0 text-capitalize"
                hide-details="auto"
                density="compact"
                :model-value="pmsResult?.pms.fsrNumber"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-1">
              <v-label for="field-warranty-type" class="font-weight-medium mb-0 text-subtitle-1"
                >Warranty Type</v-label
              >
              <v-text-field
                readonly
                id="field-warranty-type"
                variant="outlined"
                class="mb-0 text-capitalize"
                hide-details="auto"
                density="compact"
                :model-value="pmsResult?.pms.warranty"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-1">
              <v-label for="field-date-installed" class="font-weight-medium mb-0 text-subtitle-1"
                >Date Installed</v-label
              >
              <v-text-field
                readonly
                id="field-date-installed"
                variant="outlined"
                class="mb-0 text-capitalize"
                hide-details="auto"
                density="compact"
                :model-value="dayjs(pmsResult?.pms.dateInstalled).format('MMMM DD, YYYY')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-1">
              <v-label for="field-remarks" class="font-weight-medium mb-0 text-subtitle-1"
                >Serial Numbers</v-label
              >
              <v-combobox
                v-model="serialNumbers.model"
                readonly
                id="field-serial-numbers"
                variant="outlined"
                class="mb-0 text-capitalize"
                chips
                multiple
                hide-details="auto"
                density="compact"
              >
              </v-combobox>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-1">
              <v-label for="field-remarks" class="font-weight-medium mb-0 text-subtitle-1"
                >Engineers</v-label
              >
              <v-combobox
                v-model="engineers.model"
                readonly
                id="field-serial-numbers"
                variant="outlined"
                class="mb-0 text-capitalize"
                chips
                multiple
                hide-details="auto"
                density="compact"
              >
              </v-combobox>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="py-1">
              <v-label for="field-remarks" class="font-weight-medium mb-0 text-subtitle-1"
                >Remarks</v-label
              >
              <v-textarea
                readonly
                rows="2"
                variant="outlined"
                class="mb-0 text-capitalize"
                hide-details="auto"
                density="compact"
                :model-value="pmsResult?.pms.remarks"
              ></v-textarea>
            </v-col>
          </v-row>
        </div>
      </UiParentCard>
    </v-col>

    <v-col cols="12" md="12">
      <UiParentCard title="Pms Warranties">
        <div class="border-table">
          <v-table>
            <thead>
              <tr>
                <th class="text-subtitle-1 font-weight-bold">#</th>
                <th class="text-subtitle-1 font-weight-bold">Warranty Date</th>
                <th class="text-subtitle-1 font-weight-bold">Engineers</th>
                <th class="text-subtitle-1 font-weight-bold">Status</th>
                <th class="text-subtitle-1 font-weight-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="(warranty, wIndex) in warrantyHistoryResult?.warranties"
                :key="wIndex"
              >
                <tr>
                  <td colspan="5" class="group-header py-1" style="height: 30px">
                    <v-chip size="small" density="compact" color="error"
                      >{{ toOrdinal(wIndex + 1) }} Warranty</v-chip
                    >
                  </td>
                </tr>
                <tr v-for="(item, index) in warranty.warranties" :key="index">
                  <td>
                    <p class="text-15 font-weight-medium">{{ index + 1 }}</p>
                  </td>
                  <td>
                    <h6 class="text-subtitle-1 font-weight-bold text-capitalize">
                      {{ dayjs(item.warrantyDate).format('MMMM DD, YYYY') }}
                    </h6>
                  </td>
                  <td>
                    <h6 class="text-body-1 text-muted text-capitalize">
                      <label v-if="item.engineers.length === 0">No engineer assigned</label>
                      <template v-for="(engineer, eIndex) in item.engineers" :key="eIndex">
                        <v-chip variant="tonal" size="small" color="info" class="me-1">{{
                          formattedEngineer(engineer)
                        }}</v-chip>
                      </template>
                    </h6>
                  </td>
                  <td>
                    <h6 class="text-body-1 text-muted text-capitalize">
                      <v-chip density="compact" v-if="item.isDone" color="primary">Done</v-chip>
                      <v-chip density="compact" v-else color="warning">Pending</v-chip>
                    </h6>
                  </td>
                  <td>
                    <div class="d-flex justify-center">
                      <NuxtLink href="#">
                        <v-btn :icon="EyeIcon" variant="text" color="primary" />
                      </NuxtLink>
                      <v-btn :icon="PencilIcon" variant="text" color="warning" />
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </v-table>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { toOrdinal } from 'number-to-words';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { PencilIcon, XIcon, EyeIcon } from 'vue-tabler-icons';
import type { Pms } from '@/types/monitoring/pms';
import type { WarrantyHistory, Warranty } from '@/types/monitoring/warrantyHistory';
import type { Engineer } from '@/types/management/engineer';
import type { FormInput } from '@/types/pages/form';

type PmsResult = {
  pms: Pms;
};

type WarrantyHistoryResult = {
  warranties: WarrantyHistory[];
};

const dialogModel = ref<boolean>(false);
const vFormModel = ref<boolean>(false);
const route = useRoute();

const serialNumbers = reactive<FormInput<string[]>>({
  model: [],
});

const engineers = reactive<FormInput<string[]>>({
  model: [],
});

const {
  data: pmsResult,
  refresh: loadPms,
  status,
} = await useApiFetch<PmsResult>(`/admin/pms/${route.params.id}`, {
  showError: true,
});

const {
  data: warrantyHistoryResult,
  refresh: reloadWarrantyHistory,
  status: warrantyStatus,
} = await useApiFetch<WarrantyHistoryResult>(`/admin/pms/${route.params.id}/warranties`, {
  showError: true,
});

if (status.value === 'success') {
  serialNumbers.model = pmsResult.value?.pms.serialNumbers || [];
  engineers.model = pmsResult.value?.pms.engineers.map((e) => `${e.firstName} ${e.lastName}`) || [];
}

const formattedEngineer = (engineer: Engineer) => {
  return `${engineer.firstName.split(' ')[0]} ${engineer.lastName[0]}.`;
};
</script>
