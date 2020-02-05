const supertest = require('supertest')
const app = require('../api/index')
const request = supertest(app)

/*describe('Getting all the balances; index page', () => {
    it('should return the data from the database', async done =>{
        const res = await request.get('/')

        expect(res.statusCode).toBe(200)
        done()
    })
})*/

describe('Saving a balance', ()=>{
    it('should save a balance in the database', async done =>{
        const res = await request.post('/balance')
                    .send({
                        "initialBalances": 
                            {"cash": 1000, 
                            "issuers": [
                                {"issuerName": "GBM", "totalShares": 100, "sharePrice": 10}
                            ]
                        },
                        "orders":[
                            {"timestamp": 1571325625, "operation": "SELL", "IssuerName": "GBM", "TotalShares": 10, "SharePrice": 10},
                            {"timestamp": 1571325627, "operation": "SELL", "IssuerName": "GBM", "TotalShares": 10, "SharePrice": 10}
                        ]
                    }
                )
        expect(res.statusCode).toEqual(500)
        done()
    })
})

/*describe('Saving issuers', ()=>{
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
})*/