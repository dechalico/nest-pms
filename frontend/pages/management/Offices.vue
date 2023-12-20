<template>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Branches">
        <template #action>
          <v-dialog max-width="400">
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
                <v-form @submit.prevent="" class="pb-3">
                  <div>
                    <v-text-field label="Name" variant="outlined"></v-text-field>
                    <v-text-field label="Location" variant="outlined"></v-text-field>
                  </div>
                  <div class="d-flex justify-end">
                    <v-btn
                      color="primary"
                      rounded
                      text="Submit"
                      @click="isActive.value = false"
                      class="mr-2"
                      type="submit"
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
                <th class="text-subtitle-1 font-weight-bold">Location</th>
                <th class="text-subtitle-1 font-weight-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in productPerformance" :key="item.name">
                <td>
                  <p class="text-15 font-weight-medium">{{ item.id }}</p>
                </td>
                <td>
                  <div class="">
                    <h6 class="text-subtitle-1 font-weight-bold">{{ item.name }}</h6>
                  </div>
                </td>
                <td>
                  <h6 class="text-body-1 text-muted">{{ item.pname }}</h6>
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
import { productPerformance } from '@/data/dashboard/dashboardData';
import { PencilIcon, TrashIcon, XIcon } from 'vue-tabler-icons';
</script>
