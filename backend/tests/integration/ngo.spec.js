const request = require('supertest')
const app = require('../../src/app')
const conn = require('../../src/database/connection')

describe('ngo', () => {
  beforeEach(async ()=>{
    await conn.migrate.rollback();
    await conn.migrate.latest();

  })

  afterAll(async ()=>{
    await conn.destroy()
  })

  it('should be able to create a new ngo', async () => {
    const response = await request(app).post('/ngos').send({
        name: "wwf",
        email: "ww@fwf.com",
        phone: "3343322790",
        city: "worldwide",
        state: "AL"
    })
    
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})