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
                v-model="pmsEngineers.model"
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
                      >{{ toOrdinal((warrantyHistoryResult?.warranties.length ?? 0) - wIndex ) }} Warranty</v-chip
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
                      <v-btn
                        :icon="PencilIcon"
                        variant="text"
                        color="warning"
                        @click="selectWarrantyToUpdate(warranty.id, item)"
                      />
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

  <v-dialog v-model="dialogModel" max-width="400">
    <template v-slot:default="{ isActive }">
      <UiParentCard title="Update Maintenance">
        <template #action>
          <v-btn :icon="XIcon" @click="isActive.value = false" density="compact" variant="text" />
        </template>
        <v-form
          v-model="vFormMaintenanceModel"
          @submit.prevent="updateWarrantyMaintenance"
          validate-on="blur"
          class="pb-3"
        >
          <v-row class="mb-2" dense>
            <v-col cols="12">
              <v-label for="field-warranty-date" class="font-weight-medium mb-0 text-subtitle-1"
                >Warranty Date</v-label
              >
              <v-text-field
                v-model="selectedWarranty.warrantyDate.model"
                id="field-warranty-date"
                name="field-warranty-date"
                variant="outlined"
                class="mb-0"
                hide-details="auto"
                density="compact"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-label for="field-engineers" class="font-weight-medium mb-0 text-subtitle-1"
                >Engineers</v-label
              >
              <v-select
                v-model="selectedWarranty.engineers.model"
                :items="engineersResult?.engineers"
                item-title="fullName"
                item-value="id"
                id="field-engineers"
                name="field-engineers"
                variant="outlined"
                class="mb-0 text-capitalize"
                chips
                multiple
                hide-details="auto"
                density="compact"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-label for="field-status" class="font-weight-medium mb-0 text-subtitle-1"
                >Current Status</v-label
              >
              <v-text-field
                v-model="selectedWarranty.status.model"
                readonly
                id="field-status"
                name="field-status"
                variant="outlined"
                class="mb-0 text-capitalize"
                hide-details="auto"
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <!-- ignore-prettier -->
              <v-btn
                v-if="selectedWarranty.status.model === 'Pending'"
                color="success"
                size="small"
                @click="selectedWarranty.status.model = 'Done'"
                variant="outlined"
              >
                Mark as Done
              </v-btn>
              <v-btn
                v-else
                color="warning"
                size="small"
                @click="selectedWarranty.status.model = 'Pending'"
                variant="outlined"
              >
                Mark as Pending
              </v-btn>
            </v-col>
          </v-row>
          <div class="d-flex justify-end mt-6">
            <v-btn color="primary" rounded text="Submit" class="mr-2" type="submit"></v-btn>
            <v-btn color="error" rounded text="Cancel" @click="isActive.value = false"></v-btn>
          </div>
        </v-form>
      </UiParentCard>
    </template>
  </v-dialog>
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
import { useGlobalMessageStore } from '@/stores/globalMessage';

type PmsResult = {
  pms: Pms;
};

type WarrantyHistoryResult = {
  warranties: WarrantyHistory[];
};

type EngineersResult = {
  engineers: Engineer[];
};

interface SelectedWarranty {
  id: FormInput<string>;
  warrantyHistoryId: FormInput<string>;
  status: FormInput<'Pending' | 'Done'>;
  engineers: FormInput<string[]>;
  warrantyDate: FormInput<string | undefined>;
}

const dialogModel = ref<boolean>(false);
const vFormMaintenanceModel = ref<boolean>(false);
const route = useRoute();
const messageStore = useGlobalMessageStore();

const serialNumbers = reactive<FormInput<string[]>>({
  model: [],
});

const pmsEngineers = reactive<FormInput<string[]>>({
  model: [],
});

const selectedWarranty = reactive<SelectedWarranty>({
  id: {
    model: '',
    rules: [(v: string) => !!v || 'Selected warranty id is required'],
  },
  status: {
    model: 'Pending',
  },
  warrantyHistoryId: {
    model: '',
    rules: [(v: string) => !!v || 'Selected warranty history id is required'],
  },
  warrantyDate: {
    model: undefined,
    rules: [(v: string) => !!v || 'Warranty date is required'],
  },
  engineers: {
    model: [],
  },
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
  pmsEngineers.model =
    pmsResult.value?.pms.engineers.map((e) => `${e.firstName} ${e.lastName}`) || [];
}

const { data: engineersResult, status: engineersStatus } = await useApiFetch<EngineersResult>(
  'admin/engineers',
  {
    showError: true,
  },
);
if (engineersStatus.value === 'success') {
  engineersResult.value?.engineers.forEach((engineer) => {
    engineer.fullName = `${engineer.firstName} ${engineer.lastName}`;
  });
}

const formattedEngineer = (engineer: Engineer) => {
  return `${engineer.firstName.split(' ')[0]} ${engineer.lastName[0]}.`;
};

const selectWarrantyToUpdate = (warrantyHistoryId: string, warranty: Warranty) => {
  selectedWarranty.id.model = warranty.id;
  selectedWarranty.warrantyHistoryId.model = warrantyHistoryId;
  selectedWarranty.status.model = warranty.isDone ? 'Done' : 'Pending';
  selectedWarranty.engineers.model = warranty.engineers.map((e) => e.id);
  selectedWarranty.warrantyDate.model = dayjs(warranty.warrantyDate).format('YYYY-MM-DD');
  dialogModel.value = true;
};

const updateWarrantyMaintenance = async () => {
  if (!vFormMaintenanceModel.value) return;

  const payload = {
    id: selectedWarranty.id.model,
    warrantyHistoryId: selectedWarranty.warrantyHistoryId.model,
    engineers: selectedWarranty.engineers.model,
    warrantyDate: dayjs(selectedWarranty.warrantyDate.model).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    isDone: selectedWarranty.status.model === 'Done',
  };

  const { status } = await useApiFetch(`/admin/pms/warranties/${payload.id}`, {
    method: 'PUT',
    body: payload,
    showError: true,
  });
  if (status.value === 'success') {
    dialogModel.value = false;
    reloadWarrantyHistory();
    messageStore.showMessage('Maintenance updated successfully.', 'success');
  }
};
</script>
