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
            <template v-slot:item="{ item }">
                <tr>
                    <td>
                        <v-menu v-if="item.created_at" :offset-x="true" transition="scale-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" v-on="on">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item link @click="type = item, dialogUpdate = true">
                                    <v-list-item-title v-text="'Ajustes'"></v-list-item-title>
                                </v-list-item>
                                <v-list-item link @click="type = item, dialogDelete = true">
                                    <v-list-item-title v-text="'Eliminar'"></v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                    <td>{{ item.tipo }}</td>
                    <td>{{ item.created_at }}</td>
                </tr>
            </template>
        </v-data-table>
        <v-dialog :value="dialogCreate" width="90%" max-width="500px" persistent>
            <v-card class="pa-5">
                <v-form ref="formCreate" v-model="validCreate" @submit.prevent="newTipo">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="newtipo" :rules="[rules.required]" outlined required>
                                <template v-slot:label>
                                    Tipo <span class="red--text">*</span>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <div class="buttons">
                        <v-btn @click="dialogCreate = false, $refs.formCreate.reset()" color="red">cancelar</v-btn>
                        <v-btn :disabled="!validCreate" type="submit" :loading="loadingbtn"
                            color="light-green">crear</v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog :value="dialogUpdate" width="90%" max-width="500px" persistent>
            <v-card class="pa-5">
                <v-form ref="formUpdate" v-model="validUpdate" @submit.prevent="updateTipo">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="tipo" :rules="[rules.required]" outlined required>
                                <template v-slot:label>
                                    Tipo <span class="red--text">*</span>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <div class="buttons">
                        <v-btn @click="dialogUpdate = false" color="red">cancelar</v-btn>
                        <v-btn :disabled="!validUpdate" type="submit" :loading="loadingbtn"
                            color="light-green">actualizar</v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog :value="dialogDelete" width="90%" max-width="500px" persistent>
            <v-card>
                <v-sheet class="d-flex justify-center align-center flex-column pa-5">
                    <h3>Eliminar el tipo {{ type.tipo }}?</h3>
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
import roomService from '../service/roomService'

export default {
    name: 'tipoSettings',
    data() {
        return {
            search: '',
            newtipo: '',
            tipo: '',
            loading: false,
            loadingbtn: false,
            validCreate: false,
            validUpdate: false,
            dialogCreate: false,
            dialogUpdate: false,
            dialogDelete: false,
            desserts: [],
            type: {},
            rules: {
                required: value => !!value || 'Campo requerido.',
            },
            headers: [
                { text: '', key: 'actions', sortable: false },
                { text: 'Tipo', key: 'tipo', value: 'tipo' },
                { text: 'Creado', key: 'created_at', value: 'created_at' },
            ],
        }
    },
    methods: {
        newTipo() {
            this.loadingbtn = true

            let data = {
                tipo: this.newtipo,
            }

            roomService.crearRoomTipo(data)
                .then(res => {
                    this.loadingbtn = false
                    this.dialogCreate = false
                    this.getTipos()
                    this.$refs.formCreate.reset()
                    Swal.fire({
                        icon: 'success',
                        text: res.message,
                    })
                })
                .catch(err => {
                    this.loadingbtn = false
                    Swal.fire({
                        icon: 'error',
                        text: err.response.data.message,
                    })
                    console.log(err)
                })
        },
        getTipos() {
            this.loading = true

            roomService.obtenerRoomTipos()
                .then(res => {
                    this.loading = false
                    this.desserts = res
                })
                .catch(err => {
                    this.loading = false
                    console.log(err)
                })
        },
        updateTipo() {
            this.loadingbtn = true

            let data = {
                tipo: this.tipo,
            }

            roomService.actualizarRoomTipo(data, this.type.id)
                .then(res => {
                    this.loadingbtn = false
                    this.dialogUpdate = false
                    this.getTipos()
                    Swal.fire({
                        icon: 'success',
                        text: res.message,
                    })
                })
                .catch(err => {
                    this.loadingbtn = false
                    Swal.fire({
                        icon: 'error',
                        text: err.response.data.message,
                    })
                    console.log(err)
                })
        },
        deleted() {
            this.loadingbtn = true

            roomService.eliminarRoomTipo(this.type.id)
                .then(res => {
                    this.loadingbtn = false
                    this.dialogDelete = false
                    this.getTipos()
                    Swal.fire({
                        icon: 'success',
                        text: res.message,
                    })
                })
                .catch(err => {
                    this.loadingbtn = false
                    Swal.fire({
                        icon: 'error',
                        text: err.response.data.message,
                    })
                    console.log(err)
                })
        },
    },
    watch: {
        type: {
            handler(newtype) {
                this.tipo = newtype.tipo;
            },
            immediate: true,
        }
    },
    mounted() {
        this.getTipos()
    },
}
</script>

<style scoped></style>