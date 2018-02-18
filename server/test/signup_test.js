/* eslint-env node, mocha */
/* eslint import/no-extraneous-dependencies:0 */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import logger from '../logger';
import config from '../config';

chai.use(chaiHttp);
// Our parent block
describe('Signup', () => {
  const app = require('../server'); // eslint-disable-line global-require
  beforeEach(done => {
    app.default.listen(config.app.port, done);
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
});
