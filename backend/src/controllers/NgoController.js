const connection = require('../database/connection')
const crypto = require('crypto')

module.exports = {
    async create(request, response) {
        const {name, email, phone, city, state } = request.body
        const id = crypto.randomBytes(4).toString('HEX')
        
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