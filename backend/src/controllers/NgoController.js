const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
    async create(request, response) {
        const {name, email, phone, city, state } = request.body
        const id = generateUniqueId()
        
        await connection('ngos').insert({
            id,
            name,
            email,
            phone,
            city,
            state
        })
        return response.json({id})
    },

    async index(request, response) {
        return response.json(await connection('ngos').select('*'))
    }
}