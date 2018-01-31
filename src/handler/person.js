import contract from 'truffle-contract'
import PersonContract from '@contracts/Person.json'

const Person = {
  contract: null,
  instance: null,

  init: () => {
    let self = this
    return new Promise((resolve, reject) => {
      self.contract = contract(PersonContract)
      self.contract.setProvider(window.web3.currentProvider)
      self.instance = self.contract.deployed()
        .then(personInstance => personInstance)
        .catch(error => {
          reject(error)
        })
      resolve('Successfully initialized')
    })
  },

  getName: () => {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance
        .then(personInstance => personInstance.name())
        .then(name => { resolve(name) })
        .catch(error => { reject(error) })
    })
  },

  setName: name => {
    let self = this
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase()
        .then((coinbase, error) => {
          if(error) { reject(error) }
          self.instance
            .then(personInstance => personInstance.setName(name, {from: coinbase}))
            .then(tx => { resolve(tx.tx) })
            .catch(error => { reject(error) })
        })
    })
  }
}

export default Person
