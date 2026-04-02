<template>
    <div class="space-y-10">
        <section>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div
                    class="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div class="p-4 rounded-xl bg-blue-100 text-blue-700 shadow-blue-50 shadow-inner">
                        <RectangleGroupIcon class="w-9 h-9" />
                    </div>
                    <div>
                        <h3 class="text-gray-500 text-sm font-semibold tracking-wide uppercase">Total Kelas</h3>
                        <p class="text-4xl font-extrabold text-gray-950 mt-1">12</p>
                        <div class="text-sm text-gray-500 mt-1">Sesuai data koleksi</div>
                    </div>
                </div>

                <div
                    class="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div class="p-4 rounded-xl bg-purple-100 text-purple-700 shadow-purple-50 shadow-inner">
                        <UsersIcon class="w-9 h-9" />
                    </div>
                    <div>
                        <h3 class="text-gray-500 text-sm font-semibold tracking-wide uppercase">Total Siswa</h3>
                        <p class="text-4xl font-extrabold text-gray-950 mt-1">320</p>
                        <div class="text-sm text-gray-500 mt-1">Aktif tahun ini</div>
                    </div>
                </div>

                <div
                    class="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div class="p-4 rounded-xl bg-green-100 text-green-700 shadow-green-50 shadow-inner">
                        <BriefcaseIcon class="w-9 h-9" />
                    </div>
                    <div>
                        <h3 class="text-gray-500 text-sm font-semibold tracking-wide uppercase">Total Guru</h3>
                        <p class="text-4xl font-extrabold text-gray-950 mt-1">45</p>
                        <div class="text-sm text-gray-500 mt-1">Pengajar & Staf</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-white p-7 lg:p-9 rounded-2xl shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold text-gray-950 tracking-tight">Daftar Kelas Terakhir</h2>
                <a href="#"
                    class="text-sm font-semibold text-blue-600 hover:text-blue-700 transition flex items-center space-x-1.5">
                    <span>Lihat Semua Kelas</span>
                    <ArrowRightIcon class="w-4 h-4" />
                </a>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead
                        class="bg-gray-50 text-gray-500 font-semibold text-xs tracking-wider uppercase border-b border-gray-100">
                        <tr>
                            <th scope="col" class="px-6 py-4">Kode Kelas</th>
                            <th scope="col" class="px-6 py-4">Nama Kelas</th>
                            <th scope="col" class="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr class="hover:bg-gray-50/50 transition">
                            <td class="px-6 py-5 font-mono text-gray-700">X-IPA-1</td>
                            <td class="px-6 py-5 font-semibold text-gray-900">Kelas X IPA 1</td>
                            <td class="px-6 py-5 text-right space-x-2">
                                <button
                                    class="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition">Detail</button>
                                <button
                                    class="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition">Hapus</button>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50/50 transition">
                            <td class="px-6 py-5 font-mono text-gray-700">X-IPS-1</td>
                            <td class="px-6 py-5 font-semibold text-gray-900">Kelas X IPS 1</td>
                            <td class="px-6 py-5 text-right space-x-2">
                                <button
                                    class="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition">Detail</button>
                                <button
                                    class="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<script setup>
import { RectangleGroupIcon, UsersIcon, BriefcaseIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
</script>