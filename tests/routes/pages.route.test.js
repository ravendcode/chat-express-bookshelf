import 'babel-polyfill';
import request from 'supertest';
import expect from 'expect';
import app from '../../app';

describe('routes/pages.route.js', () => {
  describe('#GET /', () => {
    it('should return <h1>Index</h1> response', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect((res) => {
          expect(res.text).toInclude('Index');
        })
        .end(done);
    });
  });

  describe('#GET /hello', () => {
    it('should return Hello! response', (done) => {
      request(app)
        .get('/hello')
        .expect(200)
        .expect('Hello!')
        .end(done);
    });
  });
});
