const Person = artifacts.require('Person');

chai = require('chai');
chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised)

expect = chai.expect;

contract('Person', accounts => {
  describe('Deployed contract', () => {
    return Person.deployed()
      .then(instance => {
        person = instance;
        expect(person).to.be.not.null;
      });
  });

  describe('Variables', () => {
    describe('Name', () => {
      it('should set the person name', () => {
        return person.setName('Lizzy')
          .then(tx => {
            console.log(tx.tx);
            expect(tx).to.not.be.an('error');
          });
      });

      it('should get the person name', () => {
        return person.name()
          .then(name => {
            console.log(name);
            expect(name).to.be.equal('Lizzy');
          });
      });
    });
  });
});
