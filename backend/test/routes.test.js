const supertest = require('supertest')
const app = require('../api/index')
const request = supertest(app)

describe('Getting all the balances; index page', () => {
    it('should return the data from the database', async done =>{
        const res = await request.get('/')

        expect(res.statusCode).toBe(200)
        done()
    })
})

/*describe('Saving a balance', ()=>{
    it('should save a balance in the database', async done =>{
        const res = await request.post('/balance')
                    .send({
                        cash: 1005,
                        date: Date.now()
                    })
        expect(res.statusCode).toEqual(200)
        done()
    })
})*/

describe('Saving issuers', ()=>{
    it('should save issuers for a balance', async done => {
        const res = await request.post('/issuers')
                    .send([{
                        issuerName: "GBM",
                        totalShares: 100,
                        sharePrice: 10,
                        balance: "5e3a330557779f2f0a68a51e"
                    }])
                    expect(res.statusCode).toEqual(200)
                    done()
    })
})