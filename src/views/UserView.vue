<template>
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-950 tracking-tight">Manajemen Akun User</h1>
                <p class="text-sm text-gray-500 mt-1">Kelola hak akses sistem, username, dan password pengguna.</p>
            </div>
            <button @click="openModal"
                class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-blue-200 flex items-center space-x-2">
                <PlusIcon class="w-5 h-5" />
                <span>Tambah User</span>
            </button>
        </div>

        <transition enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform -translate-y-4 opacity-0" enter-to-class="transform translate-y-0 opacity-100">
            <div v-if="koleksi.queries && koleksi.queries.length > 0"
                class="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-gray-100">
                <form @submit.prevent="handleSearch" class="flex flex-col sm:flex-row gap-4 items-end">
                    <div class="flex-1 w-full">
                        <label for="search" class="block text-sm font-medium text-gray-600 mb-1.5">Pencarian
                            User</label>
                        <input id="search" v-model="searchForm.search" type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Cari berdasarkan Username..." />
                    </div>
                    <div class="flex space-x-3 w-full sm:w-auto pt-2 sm:pt-0">
                        <button type="submit"
                            class="flex-1 sm:flex-none bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-md flex justify-center">Cari</button>
                        <button type="button" @click="resetSearch"
                            class="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium transition flex justify-center">Reset</button>
                    </div>
                </form>
            </div>
        </transition>

        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
        <div v-else-if="errorMessage"
            class="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 flex flex-col items-center justify-center text-center">
            <ExclamationTriangleIcon class="w-10 h-10 mb-2 text-red-500" />
            <p class="font-medium">{{ errorMessage }}</p>
            <button @click="fetchUsers(1)"
                class="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium transition">Coba
                Lagi</button>
        </div>

        <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead
                        class="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider uppercase border-b border-gray-100">
                        <tr>
                            <th scope="col" class="px-6 py-4">ID</th>
                            <th scope="col" class="px-6 py-4">Username</th>
                            <th scope="col" class="px-6 py-4 text-center">Hak Akses (Role)</th>
                            <th scope="col" class="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="user in koleksi?.items || []" :key="user.id" class="hover:bg-gray-50/50 transition">
                            <td class="px-6 py-5 font-mono text-gray-500">#{{ user.id }}</td>
                            <td class="px-6 py-5 font-semibold text-gray-900">{{ user.username }}</td>
                            <td class="px-6 py-5 text-center">
                                <span
                                    class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border"
                                    :class="user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'">
                                    {{ user.role }}
                                </span>
                            </td>
                            <td class="px-6 py-5 text-right space-x-2">
                                <button @click="openEditModal(user)"
                                    class="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">Edit</button>
                                <button @click="confirmDelete(user)"
                                    class="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">Hapus</button>
                            </td>
                        </tr>
                        <tr v-if="koleksi?.items?.length === 0 || !koleksi?.items">
                            <td colspan="4" class="px-6 py-10 text-center text-gray-500">Data akun tidak ditemukan.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div
                class="bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                <div class="text-center sm:text-left w-full sm:w-auto">
                    Menampilkan halaman <span class="font-semibold text-gray-900">{{ koleksi.meta?.current_page || 1
                        }}</span> dari <span class="font-semibold text-gray-900">{{ koleksi.meta?.last_page || 1
                        }}</span>
                </div>
                <div class="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                    <button @click="fetchUsers(koleksi.meta?.current_page - 1)"
                        :disabled="!koleksi.meta || koleksi.meta.current_page === 1"
                        class="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition shadow-sm">Sebelumnya</button>
                    <button @click="fetchUsers(koleksi.meta?.current_page + 1)"
                        :disabled="!koleksi.meta || koleksi.meta.current_page === koleksi.meta.last_page"
                        class="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition shadow-sm">Selanjutnya</button>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" @click="closeModal"></div>
                    <div
                        class="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
                        <div class="px-6 py-5 border-b border-gray-100">
                            <h3 class="text-xl font-bold text-gray-900">{{ selectedUser ? 'Edit Akun User' : 'Tambah Akun Baru' }}</h3>
                            <p v-if="selectedUser" class="text-xs text-orange-500 mt-1">Biarkan kolom password kosong
                                jika tidak ingin mengubah sandi.</p>
                        </div>

                        <form @submit.prevent="submitForm">
                            <div class="p-6 space-y-4">
                                <div v-if="formErrors.message"
                                    class="bg-red-50 text-red-600 text-sm p-3 rounded-lg font-medium">{{
                                    formErrors.message }}</div>

                                <div v-for="field in koleksi?.template?.data || []" :key="field.name">
                                    <label :for="'modal-' + field.name"
                                        class="block text-sm font-medium text-gray-700 mb-1.5 capitalize">
                                        {{ field.name.replace('_', ' ') }}
                                    </label>

                                    <select v-if="field.name === 'type' || field.name === 'role'"
                                        :id="'modal-' + field.name" v-model="formModel[field.name]"
                                        class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                        <option value="" disabled>-- Pilih Role --</option>
                                        <option value="admin">Administrator</option>
                                        <option value="guru">Guru</option>
                                    </select>

                                    <input v-else :id="'modal-' + field.name" v-model="formModel[field.name]"
                                        :type="field.name === 'password' ? 'password' : 'text'"
                                        class="w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
                                        :class="formErrors[field.name] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'"
                                        :placeholder="field.prompt || ''" />

                                    <p v-if="formErrors[field.name]" class="text-red-500 text-xs mt-1 font-medium">{{
                                        formErrors[field.name][0] }}</p>
                                </div>
                            </div>

                            <div class="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                                <button type="button" @click="closeModal"
                                    class="px-5 py-2.5 rounded-xl text-gray-700 hover:bg-gray-200 transition font-medium">Batal</button>
                                <button type="submit" :disabled="isSubmitting"
                                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl transition shadow-md flex items-center font-medium disabled:opacity-70">
                                    <span v-if="isSubmitting"
                                        class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                                    <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Akun' }}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </transition>
        </Teleport>

        <ConfirmModal :isOpen="isDeleteModalOpen" :isLoading="isDeleting" title="Hapus Akun"
            message="Apakah Anda yakin ingin menghapus akun ini? Akun yang dihapus tidak bisa login kembali."
            confirmText="Ya, Hapus" cancelText="Batal" type="danger" @confirm="executeDelete"
            @cancel="isDeleteModalOpen = false" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PlusIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import ConfirmModal from '../components/ConfirmModal.vue'
import api from '../utils/api'

const koleksi = ref({ items: [], meta: null, template: null, queries: [] })
const isLoading = ref(true)
const errorMessage = ref('')
const searchForm = ref({})

const isModalOpen = ref(false)
const isSubmitting = ref(false)
const formModel = ref({})
const formErrors = ref({})
const selectedUser = ref(null)

const isDeleteModalOpen = ref(false)
const isDeleting = ref(false)

const getLinkByRel = (item, rel) => {
    if (!item || !item._links) return null;
    const link = item._links.find(l => l.rel === rel);
    return link ? link.href : null;
}

const fetchUsers = async (page = 1) => {
    isLoading.value = true
    errorMessage.value = ''
    try {
        const cleanParams = Object.fromEntries(Object.entries(searchForm.value).filter(([_, v]) => v !== '' && v !== null))
        const response = await api.get('/users', { params: { page: page, ...cleanParams } })
        const rawData = response.data
        koleksi.value = { items: [], meta: null, template: null, queries: [] }

        if (rawData.items) koleksi.value.items = rawData.items
        else if (rawData.data?.items) koleksi.value.items = rawData.data.items

        if (rawData.meta) koleksi.value.meta = rawData.meta
        else if (rawData.data?.meta) koleksi.value.meta = rawData.data.meta

        if (rawData.template) koleksi.value.template = rawData.template
        else if (rawData.data?.template) koleksi.value.template = rawData.data.template
    } catch (error) {
        errorMessage.value = 'Gagal mengambil data dari server.'
    } finally {
        isLoading.value = false
    }
}

const handleSearch = () => fetchUsers(1)
const resetSearch = () => { searchForm.value = {}; fetchUsers(1) }

const openModal = () => {
    selectedUser.value = null;
    formErrors.value = {};
    formModel.value = {}
    if (koleksi.value?.template?.data) {
        koleksi.value.template.data.forEach(field => formModel.value[field.name] = field.value || '')
    }
    isModalOpen.value = true
}

const openEditModal = (user) => {
    selectedUser.value = user;
    formErrors.value = {};
    formModel.value = {}

    if (koleksi.value?.template?.data) {
        koleksi.value.template.data.forEach(field => {
            // Jangan isi field password saat edit (biarkan kosong agar tidak keriset tak sengaja)
            if (field.name === 'password') {
                formModel.value[field.name] = ''
            } else {
                // Ambil data 'type' atau 'role' dari object user (sesuaikan dengan API)
                formModel.value[field.name] = user[field.name] || user.role || ''
            }
        })
    }
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false;
    selectedUser.value = null
}

const submitForm = async () => {
    isSubmitting.value = true;
    formErrors.value = {}
    try {
        // Validasi form manual jika ada password kosong saat create
        if (!selectedUser.value && !formModel.value.password) {
            formErrors.value = { password: ['Password wajib diisi untuk akun baru.'] }
            isSubmitting.value = false
            return
        }

        if (selectedUser.value) {
            // HATEOAS Update
            const updateUrl = getLinkByRel(selectedUser.value, 'update');
            if (!updateUrl) throw new Error('Link update tidak ditemukan, pastikan backend mengisi _links pada UserResource');
            await api.put(updateUrl, formModel.value)
        } else {
            await api.post('/users', formModel.value)
        }

        closeModal();
        fetchUsers(koleksi.value.meta?.current_page || 1)
    } catch (error) {
        if (error.response?.status === 422) formErrors.value = error.response.data.errors
        else formErrors.value = { message: 'Terjadi kesalahan sistem.' }
    } finally {
        isSubmitting.value = false
    }
}

const confirmDelete = (user) => {
    selectedUser.value = user;
    isDeleteModalOpen.value = true
}

const executeDelete = async () => {
    if (!selectedUser.value) return;
    isDeleting.value = true
    try {
        const deleteUrl = getLinkByRel(selectedUser.value, 'delete');
        if (!deleteUrl) throw new Error('Link delete tidak ditemukan, pastikan backend mengisi _links');

        await api.delete(deleteUrl)
        fetchUsers(koleksi.value.meta?.current_page || 1)
    } catch (error) {
        alert('Gagal menghapus data user. Pastikan anda sudah menambahkan blok _links di Laravel backend.')
    } finally {
        isDeleting.value = false;
        isDeleteModalOpen.value = false;
        selectedUser.value = null
    }
}

onMounted(() => fetchUsers(1))
</script>