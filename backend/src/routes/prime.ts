import express from 'express'
import { param } from 'express-validator'
import * as primeController from '../controllers/primeController'
import validateRequest from '../middleware/validateRequest'

const primeRouter = express.Router()

primeRouter.get(
	'/:value',
	param('value')
		.exists()
		.isInt({ min: 1, max: 10000000 })
		.withMessage('Value must be a non-zero positive integer (limit of 10000000)'),
	validateRequest,
	primeController.getMedianPrimeNumbers
)

export default primeRouter
