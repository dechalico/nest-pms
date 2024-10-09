<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Branches">
        <template #action>
          <v-dialog v-model="dialogModel" max-width="400">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="text-capitalize"
                text="Add Office"
                color="primary"
                rounded
                elevation="0"
              >
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <UiParentCard title="New Office">
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
                  @submit.prevent="createNewOfficeBranch"
                  validate-on="blur"
                  class="pb-3"
                >
                  <div>
                    <v-text-field
                      v-model.trim="branchName.model"
                      :rules="branchName.rules"
                      label="Name"
                      variant="outlined"
                      class="mb-5"
                    ></v-text-field>
                    <v-text-field
                      v-model.trim="branchLocation.model"
                      :rules="branchLocation.rules"
                      label="Location"
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
                <th class="text-subtitle-1 font-weight-bold">Location</th>
                <th class="text-subtitle-1 font-weight-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, count) in officeResult?.offices" :key="item.id">
                <td>
                  <p class="text-15 font-weight-medium">{{ count + 1 }}</p>
                </td>
                <td>
                  <div class="">
                    <h6 class="text-subtitle-1 font-weight-bold">{{ item.name }}</h6>
                  </div>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted">{{ item.city }}</h6>
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
        <div class="text-center mt-4" v-if="(officeResult?.pagination.totalPages || 0) > 1">
          <v-pagination
            density="compact"
            v-model="currentPage"
            :total-visible="5"
            :length="officeResult?.pagination.totalPages"
            color="primary"
          ></v-pagination>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { PencilIcon, TrashIcon, XIcon } from 'vue-tabler-icons';
import type { Office } from '@/types/management/office';
import type { FormInput } from '@/types/pages/form';
import type { Pagination } from '@/types/pages/navigation';

type OfficeResult = {
  offices: Office[];
  pagination: Pagination;
};

const dialogModel = ref<boolean>(false);
const vFormModel = ref<boolean>(false);
const userAction = ref<'edit' | 'create'>('create');

const route = useRoute();
const router = useRouter();

const branchName = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'Provide valid branch name.'],
});

const branchLocation = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'Provide valid branch location.'],
});

const initialPage =
  route.query.page && !isNaN(Number(route.query.page)) ? Number(route.query.page) : 1;

const currentPage = ref<number>(initialPage);

const { data: officeResult, refresh } = await useApiFetch<OfficeResult>('admin/offices', {
  showError: true,
  query: { currentPage: currentPage, pageSize: 10 },
});

const createNewOfficeBranch = async () => {
  userAction.value = 'create';
  if (!vFormModel.value) return;

  const { status } = await useApiFetch('admin/offices', {
    method: 'POST',
    body: {
      name: branchName.model,
      city: branchLocation.model,
    },
    showError: true,
  });
  if (status.value === 'success') {
    resetFields();
    dialogModel.value = false;
    refresh();
  }
};

const resetFields = () => {
  branchLocation.model = '';
  branchName.model = '';
};

watch(currentPage, (newPage, _) => {
  router.push({ path: route.path, query: { ...route.query, page: newPage } });
});
</script>
