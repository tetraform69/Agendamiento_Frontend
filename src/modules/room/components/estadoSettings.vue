<template>
    <v-card class="my-5">
        <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
            <v-btn class="mx-5" @click="dialogCreate = true" color="primary">
                <v-icon>mdi-plus-circle</v-icon> agregar
            </v-btn>
        </v-card-title>
        <v-data-table :headers="headers" :items="desserts" :search="search" :loading="loading"
            no-results-text="No hay ninguna habitacion que coincida" no-data-text="No hay habitaciones"
            loading-text="Cargando... Por favor espera"
            :footer-props="{ itemsPerPageText: 'Número de filas', pageText: '{0}-{1} de {2}' }">
            <template v-slot:item="row">
                <tr>
                    <td>
                        <v-menu :offset-x="true" transition="scale-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item link @click="room = row.item, dialogUpdate = true">
                                    <v-list-item-title v-text="'Ajustes'"></v-list-item-title>
                                </v-list-item>
                                <v-list-item link @click="room = row.item, dialogDelete = true">
                                    <v-list-item-title v-text="'Eliminar'"></v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                    <td>{{ row.item.nombre }}</td>
                    <td>{{ row.item.descripcion }}</td>
                    <td>{{ row.item.tipo }}</td>
                    <td>{{ row.item.capacidad }}</td>
                    <td>{{ row.item.estado }}</td>
                </tr>
            </template>
        </v-data-table>
        <DialogCreate :show="dialogCreate" @close="close" @create="getRooms"></DialogCreate>
        <DialogUpdate :show="dialogUpdate" :room="room" @close="close" @update="getRooms"></DialogUpdate>
        <v-dialog :value="dialogDelete" width="90%" max-width="500px" persistent>
            <v-card>
                <v-sheet class="d-flex justify-center align-center flex-column pa-5">
                    <h3>Eliminar la habitación {{ room.nombre }}?</h3>
                    <div class="buttons">
                        <v-btn @click="dialogDelete = false" color="error"
                            class="white--text text--accent-4">cancelar</v-btn>
                        <v-btn @click="deleted" :loading="loadingbtn" color="primary">eliminar</v-btn>
                    </div>
                </v-sheet>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>

import Swal from 'sweetalert2'
import DialogCreate from "./DialogCreate.vue";
import DialogUpdate from "./DialogUpdate.vue";

export default {
    name: 'roomApp',
    components: {
        DialogCreate,
        DialogUpdate,
    },
    data() {
        return {
            search: '',
            loading: false,
            loadingbtn: false,
            dialogCreate: false,
            dialogUpdate: false,
            dialogDelete: false,
            room: {},
            desserts: [],
            headers: [
                { text: '', key: 'actions', sortable: false },
                { text: 'Nombre', key: 'nombre', value: 'nombre' },
                { text: 'Descripción', key: 'descripcion', value: 'descripcion' },
                { text: 'Tipo', key: 'tipo', value: 'tipo' },
                { text: 'Capacidad', key: 'capacidad', value: 'capacidad' },
                { text: 'estado', key: 'estado', value: 'estado' },
            ],
        }
    },
    methods: {
        getRooms() {
            this.loading = true
            this.close(false)

            let url = "room/read"

            this.$axios.get(url)
                .then(res => {
                    this.loading = false
                    this.desserts = res.data
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false
                })
        },
        deleted() {
            this.loadingbtn = true

            let url = `room/delete/${this.room.id}`

            this.$axios.delete(url)
                .then(res => {
                    this.loadingbtn = false
                    this.dialogDelete = false
                    this.getRooms()
                    Swal.fire({
                        icon: 'success',
                        text: res.data,
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.loadingbtn = false
                })
        },
        close(bolean) {
            this.dialogCreate = bolean
            this.dialogUpdate = bolean
        },
    },
    mounted() {
        this.getRooms()
    },
}
</script>

<style scoped></style>