<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Users">
        <template #action>
          <v-dialog v-model="dialogModel" max-width="400">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="text-capitalize"
                text="Invite User"
                color="primary"
                rounded
                elevation="0"
              >
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <UiParentCard title="Generate Link">
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
                  @submit.prevent="handleGenerateLink"
                  validate-on="blur"
                  class="pb-3"
                >
                  <div>
                    <v-select
                      label="Area Office"
                      variant="outlined"
                      class=""
                      :items="officeResult?.offices"
                      item-title="name"
                      item-value="id"
                      v-model="selectedBranch.model"
                    ></v-select>
                    <p
                      v-if="generatedLink"
                      class="mb-5 whitespace-nowrap overflow-hidden text-overflow-ellipsis cursor-pointer"
                    >
                      {{ generatedLink }}
                    </p>
                  </div>
                  <div class="d-flex justify-end">
                    <v-btn
                      color="primary"
                      rounded
                      :text="generateBtnState.text"
                      class="mr-2"
                      type="submit"
                      :loading="generateBtnState.loading"
                      :disabled="generateBtnState.diabled"
                    ></v-btn>
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
                <th class="text-subtitle-1 font-weight-bold">Username</th>
                <th class="text-subtitle-1 font-weight-bold">Area</th>
                <th class="text-subtitle-1 font-weight-bold">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, count) in usersResult?.users" :key="item.id">
                <td>
                  <p class="text-15 font-weight-medium">{{ count + 1 }}</p>
                </td>
                <td>
                  <div class="">
                    <h6 class="text-subtitle-1 font-weight-bold text-capitalize">
                      {{ item.firstName }} {{ item.lastName }}
                    </h6>
                  </div>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted">{{ item.username }}</h6>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted">
                    {{ item.areaOffice?.name }} - {{ item.areaOffice?.city }}
                  </h6>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted">
                    {{ item.email }}
                  </h6>
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
import type { User } from '@/types/management/user';
import type { FormInput } from '@/types/pages/form';
import type { Office } from '@/types/management/office';

type UsersResult = {
  users: User[];
};

type OfficeResult = {
  offices: Office[];
};

type InviteResult = {
  guid: string;
  token: string;
};

const dialogModel = ref<boolean>(false);
const vFormModel = ref<boolean>(false);
const selectedBranch = reactive<FormInput<string>>({
  model: '',
  rules: [(v: string) => !!v || 'Select area office to assign'],
});

const generatedLink = ref<string>('');

const generateBtnState = reactive({
  loading: false,
  text: 'generate link',
  diabled: false,
});

const userFetch = useApiFetch<UsersResult>('admin/users/?includeOffice=true', {
  showError: true,
});
const officeFetch = useApiFetch<OfficeResult>('admin/offices', {
  showError: true,
});

const [users, offices] = await Promise.all([userFetch, officeFetch]);
const { data: usersResult, refresh: refreshUsers } = users;
const { data: officeResult, refresh: refreshOffices } = offices;

if (officeResult.value && officeResult.value.offices.length > 0) {
  selectedBranch.model = officeResult.value.offices[0].id;
}

const handleGenerateLink = async () => {
  if (!vFormModel.value) return;

  generateBtnState.loading = true;
  generateBtnState.diabled = true;
  const { status, data } = await useApiFetch<InviteResult>('admin/users/create-invite', {
    method: 'POST',
    body: {
      areaOfficeId: selectedBranch.model,
    },
    showError: true,
  });
  generateBtnState.loading = false;
  if (status.value === 'success') {
    generatedLink.value = `https://google.com/auth/?token=${data.value?.guid}&guid=${data.value?.token}`;

    let countdown = 10;
    const intervalRes = setInterval(() => {
      generateBtnState.text = `Generate again in ${countdown}`;
      countdown--;
    }, 1000);

    setTimeout(() => {
      generateBtnState.diabled = false;
      generateBtnState.text = 'generate link';
      clearInterval(intervalRes);
    }, 1000 * 10);
  }
};
</script>
