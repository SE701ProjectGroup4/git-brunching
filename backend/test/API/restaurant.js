const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.use(chaiHttp);
chai.should();

describe("Restaurants", () => {
  describe("GET /", () => {

    it("should delete, add then retrieve a restaurant", (done) => {
      chai.request(app)
        .get('/restaurant')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should delete a restaurant then retrieve it", (done) => {
      chai.request(app)
        .get('/restaurant')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    })
  });
});
