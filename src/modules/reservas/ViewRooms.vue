<template>
    <div class="content">
        <v-row class="pt-5 ma-0 w-100">
            <v-col cols="12" md="4" v-for="room in rooms" :key="room.id">
                <v-card height="100%" max-height="300px" elevation="5" outlined>
                    <v-card-title>{{ room.nombre }}</v-card-title>
                    <v-card-text>
                        <p class="text-truncate">
                            {{ room.descripcion }}
                        </p>
                        <p class="my-5">
                            {{ room.capacidad }} {{ room.capacidad > 1 ? 'Personas' : 'Persona' }}
                        </p>
                        <p>
                            {{ room.tipo }} {{ room.estado !== 'Activo' ? room.estado : '' }}
                        </p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="goToRoom(room.id)" outlined>
                            reservar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <!-- <v-sheet tile height="54" class="d-flex justify-center align-center">
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-sheet>
        <v-sheet height="600" width="90%">
            <v-calendar ref="calendar" v-model="value" color="primary" :locale="'es'" :allowed-dates="allowedDates"
                @click:date="dialog = true">
            </v-calendar>
        </v-sheet>
        <v-dialog v-model="dialog" width="90%">
            <v-card class="pa-5" elevation="10">
                <v-toolbar elevation="0">
                    <v-toolbar-title>Agendar Habitación</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon class="ml-3" @click="dialog = false"><v-icon>mdi-close-box</v-icon></v-btn>
                </v-toolbar>
                <v-row class="pa-5">
                    <template v-for="room in rooms">
                        <v-col cols="12" md="6" :key="room.id">
                            <v-card height="100%" outlined>
                                <v-card-title>{{ room.nombre }}</v-card-title>
                                <v-card-text>
                                    <div>
                                        {{ room.descripcion }}
                                    </div>
                                    <div class="my-5">
                                        Capacidad: {{ room.capacidad }}
                                    </div>
                                    <div>
                                        Tipo: {{ room.tipo }}{{ room.estado !== 'Activo' ? ` - ${room.estado}` : '' }}
                                    </div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn @click="dialogAgendar = true" outlined>
                                        reservar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </template>
                </v-row>
            </v-card>
        </v-dialog> -->
        <AgendarRoom :show="dialogAgendar" @close="dialogAgendar = false"></AgendarRoom>
    </div>
</template>

<script>

// import Swal from 'sweetalert2'
import AgendarRoom from './components/AgendarRoom'
import reservaService from './service/reservaService'

export default {
    name: 'ReservasInterno',
    components: {
        AgendarRoom,
    },
    data: () => ({
        value: '',
        rooms: [],
        dialog: false,
        dialogAgendar: false,
    }),
    methods: {
        getRooms() {
            reservaService.obtenerRooms()
                .then(res => {
                    this.rooms = res
                })
                .catch(err => {
                    console.log(err)
                })
        },
        goToRoom(id) {
            this.$router.push({ name: 'room', params: { id: id } })
        },
    },
    mounted() {
        this.getRooms()
    },
};
</script>

<style scoped>
.w-100 {
    width: 100%;
}
</style>