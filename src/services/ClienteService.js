import axios from "axios"
import vuex from "@/store"
import CacheManager from "./CacheManager/CacheManager"

const LOCAL = {
    /**
     * Configura Axios con la URL base de la API y el token de autorización.
     */
    Axios() {
        LOCAL.api = axios.create({
            baseURL: process.env.VUE_APP_URL_BASE + "/api",
            headers: {
                Authorization: `Bearer ${vuex.state.token}`
            },
        })
    }
}


LOCAL.Axios()
const cacheManager = new CacheManager(LOCAL.api)

const ClienteService = {

    /**
     * Crea un nuevo cliente.
     * @memberof ClienteService
     * @param {Object} data - Datos del cliente a crear.
     * @returns {Promise<Object>} - Promesa que se resuelve con los datos de la respuesta.
     * @throws {Error} - Error si la creación del cliente falla.
     */
    crearCliente(data) {
        let url = 'cliente'

        return new Promise((resolve, reject) => {
            LOCAL.api.post(url, data)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    /**
     * Obtiene la lista de clientes.
     * @memberof ClienteService
     * @returns {Promise<Object>} - Promesa que se resuelve con los datos de la respuesta.
     * @throws {Error} - Error si la obtención de clientes falla.
     */
    obtenerClientes() {
        let url = 'clientes'

        return cacheManager.obtenerDatos('clientes', url)
    },
    
    /**
     * Obtiene los tipos de clientes.
     * @memberof ClienteService
     * @returns {Promise<Object>} - Promesa que se resuelve con los datos de la respuesta.
     * @throws {Error} - Error si la obtención de tipos de clientes falla.
    */
    obtenerTiposCliente() {
        let url = 'cliente-tipos'
        
        return cacheManager.obtenerDatos('cliente-tipos', url)
    },
    
    obtenerTiposDocumentoCliente() {
        let url = 'cliente-tipo-documentos'
        
        return cacheManager.obtenerDatos('cliente-tipo-documentos', url)
    },
    
    /**
     * Encuentra un cliente por su número de documento.
     * @memberof ClienteService
     * @param {string} documento - Número de documento del cliente a buscar.
     * @returns {Promise<Object>} - Promesa que se resuelve con los datos de la respuesta.
     * @throws {Error} - Error si la búsqueda del cliente falla.
     */
    encontrarClienteDocumento(documento) {
        let url = `cliente/documento/${documento}`
        
        return cacheManager.obtenerDatos(`cliente/documento/${documento}`, url)
    },

    /**
     * Actualiza un cliente existente.
     * @memberof ClienteService
     * @param {Object} data - Datos del cliente a actualizar.
     * @param {string} id - ID del cliente a actualizar.
     * @returns {Promise<Object>} - Promesa que se resuelve con los datos de la respuesta.
     * @throws {Error} - Error si la actualización del cliente falla.
     */
    actualizarCliente(data, id) {
        let url = `cliente/${id}`

        return new Promise((resolve, reject) => {
            LOCAL.api.patch(url, data)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    /**
     * Elimina un cliente existente.
     * @memberof ClienteService
     * @param {string} id - ID del cliente a eliminar.
     * @returns {Promise<Object>} - Promesa que se resuelve con los datos de la respuesta.
     * @throws {Error} - Error si la eliminación del cliente falla.
     */
    eliminarCliente(id) {
        let url = `cliente/${id}`

        return new Promise((resolve, reject) => {
            LOCAL.api.delete(url)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
}

export default ClienteService