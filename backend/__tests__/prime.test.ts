import supertest from 'supertest'
import { app, server } from '../src/index'

const request = supertest(app)

afterAll((done) => {
	server.close(done) // Close the server after all tests are done
})

describe('Prime API Test', () => {
    it('should return No prime numbers found: 1', async () => {
		const response = await request.get('/prime/1')

		expect(response.status).toBe(200)
		expect(response.body).toEqual({message: "No prime numbers found"})
	})

    it('should return No prime numbers found: 2', async () => {
		const response = await request.get('/prime/1')

		expect(response.status).toBe(200)
		expect(response.body).toEqual({message: "No prime numbers found"})
	})

	it('should return the median prime numbers [3, 5]', async () => {
		const response = await request.get('/prime/10')

		expect(response.status).toBe(200)
		expect(response.body).toEqual({ median: [3, 5] })
	})

	it('should return an error (negative)', async () => {
		const response = await request.get('/prime/-10')

		expect(response.status).toBe(400)
		expect(response.body).toEqual({
			errors: [
				{
					error: {
						type: 'field',
						value: '-10',
						msg: 'Value must be a non-zero positive integer (limit of 10000000)',
						path: 'value',
						location: 'params',
					},
				},
			],
		})
	})

	it('should return an error (zero)', async () => {
		const response = await request.get('/prime/0')

		expect(response.status).toBe(400)
		expect(response.body).toEqual({
			errors: [
				{
					error: {
						type: 'field',
						value: '0',
						msg: 'Value must be a non-zero positive integer (limit of 10000000)',
						path: 'value',
						location: 'params',
					},
				},
			],
		})
	})

	it('should return an error (float)', async () => {
		const response = await request.get('/prime/10.5')

		expect(response.status).toBe(400)
		expect(response.body).toEqual({
			errors: [
				{
					error: {
						type: 'field',
						value: '10.5',
						msg: 'Value must be a non-zero positive integer (limit of 10000000)',
						path: 'value',
						location: 'params',
					},
				},
			],
		})
	})

	it('should return an error (string)', async () => {
		const response = await request.get('/prime/test')

		expect(response.status).toBe(400)
		expect(response.body).toEqual({
			errors: [
				{
					error: {
						type: 'field',
						value: 'test',
						msg: 'Value must be a non-zero positive integer (limit of 10000000)',
						path: 'value',
						location: 'params',
					},
				},
			],
		})
	})

    it('should return an error (over limit)', async () => {
		const response = await request.get('/prime/10000001')

		expect(response.status).toBe(400)
		expect(response.body).toEqual({
			errors: [
				{
					error: {
						type: 'field',
						value: '10000001',
						msg: 'Value must be a non-zero positive integer (limit of 10000000)',
						path: 'value',
						location: 'params',
					},
				},
			],
		})
	})
})
