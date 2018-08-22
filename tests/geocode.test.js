const expect = require('chai').expect;
const request = require('supertest');

const geocode = require('./../JS/geocode');

describe('geocode',()=>{
  it('should find address', async()=>{
    let getRoute = await geocode.getLocation('kildeagervej 241 8361 hasselager')
    expect(getRoute.distance.text).to.equal('29.2 km')
    expect(getRoute).to.have.property('distance')
    expect(getRoute).to.have.property('duration')
  })
  it('should return not found on invalid address', async()=>{
    let getRoute = await geocode.getLocation('0123')
    expect(getRoute).to.equal('NOT FOUND')
  })
})
