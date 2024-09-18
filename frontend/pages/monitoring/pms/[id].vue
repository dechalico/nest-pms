<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Pms Details">
        <template #action> </template>
        <div>
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
                :model-value="pmsResult?.pms.dateInstalled"
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
  </v-row>
</template>

<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { PencilIcon, XIcon, EyeIcon } from 'vue-tabler-icons';
import type { Pms } from '@/types/monitoring/pms';
import type { FormInput } from '@/types/pages/form';

type PmsResult = {
  pms: Pms;
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

if (status.value === 'success') {
  serialNumbers.model = pmsResult.value?.pms.serialNumbers || [];
  engineers.model = pmsResult.value?.pms.engineers.map((e) => `${e.firstName} ${e.lastName}`) || [];
}
</script>
