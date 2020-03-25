const connection = require('../database/connection')

module.exports = {
    async create(request,response) {
        const {title, description, value} = request.body
        const ngo_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ngo_id,
        })
        return response.json({id}) 
    },

    async index(request, response) {
        const {page = 1} = request.query

        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
                                    .join('ngos', 'ngos.id', '=','incidents.ngo_id')
                                    .limit(5)
                                    .offset((page-1)*5)
                                    .select(['incidents.*', 'ngos.name', 'ngos.email',
                                             'ngos.phone', 'ngos.city', 'ngos.state'])

        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },

    async delete(request,response) {
        const {id} = request.params
        const ngo_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id',id)
            .select('ngo_id')
            .first()
        
        //TODO: add condition for when the id does not exist

        if(incident.ngo_id != ngo_id ){
            return response.status(401).json({error: 'User does not have permission.'})
        }
        await connection('incidents').where('id', id).delete()
        return response.status(204).send()
    },

}
