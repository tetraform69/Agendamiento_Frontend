<template>
    <v-dialog :value="show" width="90%" persistent>
        <v-card class="pa-5">
            <v-form ref="form" v-model="valid" @submit.prevent="newClient">
                <v-row>

                    <v-col cols="12" md="4">
                        <v-select v-model="tipoDocumento" :items="tipoDocuments" :rules="[rules.required]"
                            no-data-text="Espere un momento..." item-text="tipo" item-value="id" outlined required>
                            <template v-slot:label>
                                Tipo de documento<span class="red--text">*</span>
                            </template>
                        </v-select>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field v-model="documento" :rules="[rules.required, rules.min]"
                            @click:append="searchDocument" type="number" append-icon="mdi-magnify" hide-spin-buttons
                            outlined required>
                            <template v-slot:label>
                                Documento<span class="red--text">*</span>
                            </template>
                            <template v-slot:append-outer>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">
                                            mdi-help-circle-outline
                                        </v-icon>
                                    </template>
                                    Buscar documento
                                </v-tooltip>
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-text-field v-model="nombre1" :rules="[rules.required]" outlined required>
                            <template v-slot:label>
                                Primer Nombre<span class="red--text">*</span>
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-text-field v-model="nombre2" outlined>
                            <template v-slot:label>
                                Segundo Nombre
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-text-field v-model="apellido1" :rules="[rules.required]" outlined required>
                            <template v-slot:label>
                                Primer Apellido<span class="red--text">*</span>
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-text-field v-model="apellido2" outlined>
                            <template v-slot:label>
                                Segundo Apellido
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field v-model="direccion" :rules="[rules.required]" append-icon="mdi-map-marker" outlined
                            required>
                            <template v-slot:label>
                                Direccion<span class="red--text">*</span>
                            </template></v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select v-model="pais" :items="countries" item-text="country_name" item-value="country_name"
                            :rules="[rules.required]" @change="getStates" no-data-text="Espere un momento..." outlined
                            required>
                            <template v-slot:label>
                                País<span class="red--text">*</span>
                            </template>
                        </v-select>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select v-model="departamento" :items="states" item-text="state_name" item-value="state_name"
                            :loading="loadingState" @change="getCities" no-data-text="No hay departamentos" outlined>
                            <template v-slot:label>
                                Departamento<span class="red--text">*</span>
                            </template>
                        </v-select>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select v-model="ciudad" :items="cities" item-text="city_name" item-value="city_name"
                            :loading="loadingCity" no-data-text="No hay ciudades" outlined>
                            <template v-slot:label>
                                Ciudad<span class="red--text">*</span>
                            </template>
                        </v-select>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-text-field v-model="correo" :rules="[rules.required, rules.email]" type="email" outlined
                            required>
                            <template v-slot:label>
                                Correo<span class="red--text">*</span>
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-text-field v-model="telefono" :rules="[rules.required, rules.phone]" type="number"
                            append-icon="mdi-cellphone" hide-spin-buttons outlined required>
                            <template v-slot:label>
                                Teléfono Celular<span class="red--text">*</span>
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-text-field v-model="telefonoAlt" type="number" append-icon="mdi-phone" hide-spin-buttons outlined>
                            <template v-slot:label>
                                Teléfono Alternativo
                            </template>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-select v-model="tipoPersona" :items="tipoPeople" :rules="[rules.required]"
                            no-data-text="Espere un momento..." item-text="tipo" item-value="id" outlined required>
                            <template v-slot:label>
                                Tipo de Persona<span class="red--text">*</span>
                            </template>
                        </v-select>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-select v-model="tipoObligacion" :items="tipoObligations" :rules="[rules.required]"
                            no-data-text="Espere un momento..." item-text="tipo" item-value="id" outlined required>
                            <template v-slot:label>
                                Tipo de Obligación<span class="red--text">*</span>
                            </template>
                        </v-select>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-select v-model="tipoRegimen" :items="tipoRegimens" :rules="[rules.required]"
                            no-data-text="Espere un momento..." item-text="tipo" item-value="id" outlined required>
                            <template v-slot:label>
                                Tipo de Régimen<span class="red--text">*</span>
                            </template>
                        </v-select>
                    </v-col>

                    <v-col cols="12">
                        <v-textarea v-model="observacion" auto-grow rows="5" dense label="Observaciones"
                            outlined></v-textarea>
                    </v-col>

                </v-row>

                <div class="buttons">
                    <v-btn @click="close" color="red">cancelar</v-btn>
                    <v-btn :disabled="!valid" type="submit" :loading="loadingbtn" color="light-green">crear</v-btn>
                </div>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>

import Swal from 'sweetalert2'
import clienteService from '../services/clienteService'
import UbicacionService from '../services/UbicacionService'

export default {
    name: 'DialogCreate',
    props: {
        show: Boolean,
    },
    data() {
        return {
            tipoDocumento: '',
            documento: '',
            nombre1: '',
            nombre2: '',
            apellido1: '',
            apellido2: '',
            direccion: '',
            pais: '',
            departamento: '',
            ciudad: '',
            correo: '',
            telefono: '',
            telefonoAlt: '',
            tipoPersona: '',
            tipoObligacion: '',
            tipoRegimen: '',
            observacion: '',
            valid: false,
            loadingbtn: false,
            loadingState: false,
            loadingCity: false,
            tipoDocuments: [],
            tipoObligations: [],
            tipoPeople: [],
            tipoRegimens: [],
            countries: [],
            cities: [],
            states: [],
            rules: {
                required: value => !!value || 'Campo requerido.',
                max: value => (value && value.length <= 20) || 'Maximo 20 caracteres',
                min: value => (value && value.length >= 5) || 'Minimo 5 caracteres',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Correo inválido.'
                },
                phone: value => {
                    const pattern = /^(\+?[0-9]{1,3}[-.\s]?)?(\([0-9]{1,4}\)|[0-9]{1,4})[-.\s]?[0-9]{1,10}$/
                    return pattern.test(value) || 'Número de teléfono inválido.'
                },
            },
        }
    },
    methods: {
        newClient() {
            this.loadingbtn = true

            let data = {
                nombre1: this.nombre1,
                nombre2: this.nombre2,
                apellido1: this.apellido1,
                apellido2: this.apellido2,
                tipoDocumento: this.tipoDocumento,
                documento: this.documento,
                direccion: this.direccion,
                pais: this.pais,
                departamento: this.departamento,
                ciudad: this.ciudad,
                correo: this.correo,
                telefono: this.telefono,
                telefonoAlt: this.telefonoAlt,
                tipoPersona: this.tipoPersona,
                tipoObligacion: this.tipoObligacion,
                tipoRegimen: this.tipoRegimen,
                observacion: this.observacion,
            }

            clienteService.crear(data)
                .then(res => {
                    this.loadingbtn = false
                    this.$refs.form.reset()
                    this.$emit('create')
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
        getTypes() {
            clienteService.obtenerTipos()
                .then(res => {
                    this.tipoDocuments = res.documents
                    this.tipoObligations = res.obligations
                    this.tipoPeople = res.people
                    this.tipoRegimens = res.regimens
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getCountries() {
            UbicacionService.paises()
                .then(res => {
                    this.countries = res
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getStates() {
            this.loadingState = true
            this.departamento = ''
            this.ciudad = ''
            this.cities = []

            UbicacionService.departamentos(this.pais)
                .then(res => {
                    this.states = res
                    this.loadingState = false
                })
                .catch(err => {
                    console.log(err)
                    this.loadingState = false
                })
        },
        getCities() {
            this.loadingCity = true
            this.ciudad = ''

            UbicacionService.ciudades(this.departamento)
                .then(res => {
                    this.cities = res
                    this.loadingCity = false
                })
                .catch(err => {
                    console.log(err)
                    this.loadingCity = false
                })
        },
        searchDocument() {
            if (!this.documento) {
                Swal.fire({
                    icon: 'error',
                    text: 'No hay documento a buscar',
                })
                return
            }

            clienteService.encontrarDocumento(this.documento)
                .then(res => {
                    if (res.length) {
                        Swal.fire({
                            icon: 'error',
                            text: 'Ya se encuentra registrado ese número de documento',
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            text: 'Documento disponible',
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        close() {
            this.$refs.form.reset()
            this.$emit('close')
        },
    },
    mounted() {
        this.getTypes()
        this.getCountries()
    },
}
</script>

<style scoped>
.buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
}
</style>