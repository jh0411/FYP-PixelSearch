const { assert } = require('chai');

const ImgHash = artifacts.require("ImgHash");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('ImgHash', (accounts) => {
    let hash

    before(async () => {
        hash = await ImgHash.deployed()
    })

    describe('deployment', async() => {
        it('deploys successfully', async () => {
        const address = hash.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        })
    })

    describe('storage', async () => {
        it('updates the imageHash', async () => {
          let imgHash = 'abc123'
          await ImgHash.set(imgHash)  

          const result = await ImgHash.get()
          assert.equal(result, imgHash)
        })
    })
})