import { NextFunction, Request, Response } from 'express'
import { ValidationError, validationResult } from 'express-validator'

const validate = (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((error: ValidationError) => ({
				error,
			}))

			return res.status(400).json({ errors: errorMessages })
		}

		return next()
	} catch (e) {
		if (process.env.NODE_ENV === 'production') {
			return res.status(500).json({ error: 'Something Went wrong. Please try again later.' })
		} else {
			return res.status(500).json({ error: { e } })
		}
	}
}

export default validate
