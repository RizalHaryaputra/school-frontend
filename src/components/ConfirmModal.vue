<template>
    <Teleport to="body">
        <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-if="isOpen" class="fixed inset-0 z-[110] flex items-center justify-center px-4">
                <div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" @click="!isLoading && $emit('cancel')">
                </div>

                <div
                    class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center transform transition-all">

                    <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full mb-4"
                        :class="type === 'danger' ? 'bg-red-100' : 'bg-blue-100'">
                        <ExclamationTriangleIcon v-if="type === 'danger'" class="h-7 w-7 text-red-600" />
                        <InformationCircleIcon v-else class="h-7 w-7 text-blue-600" />
                    </div>

                    <h3 class="text-lg font-bold text-gray-900">{{ title }}</h3>

                    <div class="mt-2 mb-6">
                        <p class="text-sm text-gray-500">{{ message }}</p>
                    </div>

                    <div class="flex justify-center space-x-3">
                        <button type="button" @click="$emit('cancel')" :disabled="isLoading"
                            class="flex-1 px-4 py-2.5 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ cancelText }}
                        </button>

                        <button type="button" @click="$emit('confirm')" :disabled="isLoading"
                            class="flex-1 px-4 py-2.5 text-white rounded-xl font-medium transition shadow-md flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
                            :class="type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'">
                            <span v-if="isLoading"
                                class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                            <span>{{ isLoading ? 'Memproses...' : confirmText }}</span>
                        </button>
                    </div>

                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

defineProps({
    isOpen: { type: Boolean, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    confirmText: { type: String, default: 'Ya, Lanjutkan' },
    cancelText: { type: String, default: 'Batal' },
    type: { type: String, default: 'danger' },
    isLoading: { type: Boolean, default: false }
})

defineEmits(['confirm', 'cancel'])
</script>