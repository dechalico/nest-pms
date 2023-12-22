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
                text="Create Invite"
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
                <!-- <v-form
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
                    <v-btn color="primary" rounded text="Submit" class="mr-2" type="submit"></v-btn>
                    <v-btn
                      color="error"
                      rounded
                      text="Cancel"
                      @click="isActive.value = false"
                    ></v-btn>
                  </div>
                </v-form> -->
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

type UsersResult = {
  users: User[];
};

const dialogModel = ref<boolean>(false);
const vFormModel = ref<boolean>(false);

const { data: usersResult, refresh } = await useApiFetch<UsersResult>(
  'admin/users/?includeOffice=true',
  {
    showError: true,
  },
);
</script>
