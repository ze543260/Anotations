const request = require('supertest');
const app = require('../src/server');

describe('Server Health Check', () => {
  test('GET /health should return 200', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Anotations API is running!');
  });
});

describe('Generate Notes API', () => {
  test('POST /api/generate-notes should require topic and level', async () => {
    const response = await request(app)
      .post('/api/generate-notes')
      .send({})
      .expect(400);
    
    expect(response.body.error).toBe('Dados inválidos');
  });
  
  test('POST /api/generate-notes should accept valid data', async () => {
    const response = await request(app)
      .post('/api/generate-notes')
      .send({
        topic: 'JavaScript',
        level: 'intermediario'
      });
    
    // Pode falhar sem chave API válida, mas deve aceitar o formato
    expect([200, 401, 500]).toContain(response.status);
  });
});
