<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="10">
        <v-card-text>
          <div class="d-flex align-center">
            <div class="w-100 w-md-25">
              <v-text-field
                id="search"
                name="search"
                density="compact"
                hide-details
                placeholder="Search Principal"
                @update:model-value="onSearchedPrincipals"
              ></v-text-field>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

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
        <div class="text-center mt-4" v-if="(equipmenBrandResult?.pagination.totalPages || 0) > 1">
          <v-pagination
            density="compact"
            v-model="currentPage"
            :total-visible="5"
            :length="equipmenBrandResult?.pagination.totalPages"
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
import type { EquipmentBrand } from '@/types/monitoring/equipmentBrand';
import type { FormInput } from '@/types/pages/form';
import type { Pagination } from '@/types/pages/navigation';
import { debounce } from '@/utils/debounce';

type EquipmentBrandResult = {
  equipmentBrands: EquipmentBrand[];
  pagination: Pagination;
};

const dialogModel = ref<boolean>(false);
const vFormModel = ref<boolean>(false);

const route = useRoute();
const router = useRouter();

const principalName = reactive<FormInput<string>>({
  model: '',
  disabled: false,
  rules: [(v: string) => !!v || 'Provide valid principal name.'],
});

const initialPage =
  route.query.page && !isNaN(Number(route.query.page)) ? Number(route.query.page) : 1;

const currentPage = ref<number>(initialPage);
const searchPrincipal = ref<string>('');

const { data: equipmenBrandResult, refresh: loadEquipmentBrands } =
  await useApiFetch<EquipmentBrandResult>('/admin/equipment-brands', {
    showError: true,
    query: {
      currentPage: currentPage,
      pageSize: 10,
      searchBy: 'Name',
      searchValue: searchPrincipal,
    },
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

watch(currentPage, (newPage, _) => {
  router.push({ path: route.path, query: { ...route.query, page: newPage } });
});

const onSearchedPrincipals = debounce((search: string) => {
  currentPage.value = 1;
  searchPrincipal.value = search;
}, 500);
</script>
