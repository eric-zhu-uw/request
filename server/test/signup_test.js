/* eslint-env node, mocha */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import logger from '../logger';
import config from '../config';
import app from '../server';

chai.use(chaiHttp);
// Our parent block
describe('Signup', function() {
  beforeEach(done => {
    this.server = app.listen(config.app.port, done);
  });

  afterEach(done => {
    this.server.close(done);
  });
  /*
  * Test the /POST route
  */
  describe('/POST signup', () => {
    it('it should add a user', done => {
      chai
        .request('http://localhost:8080')
        .post('/signup')
        .field('username', 'u')
        .field('password', 'p')
        .then(res => {
          expect(res).to.have.status(200);
          done();
        })
        .catch(err => {
          logger.error(err);
          throw err;
        });
    });
  });

  describe('BLANK TEST', () => {
    it('BLANK', () => {
      expect(true);
    });
  });
});
