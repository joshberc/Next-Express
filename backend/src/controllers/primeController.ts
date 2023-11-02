import { Request, Response } from 'express'

export const getMedianPrimeNumbers = async (req: Request, res: Response) => {
	const { value } = req.params

	try {
		const num = parseInt(value, 10)
		const primes = generatePrimesLessThanN(num)

		if (primes.length === 0) {
			return res.status(200).json({ message: 'No prime numbers found' })
		}

		primes.sort((a, b) => a - b)

		if (primes.length % 2 === 1) {
			const middleIndex = Math.floor(primes.length / 2)
			return res.status(200).json({ median: [primes[middleIndex]] })
		} else {
			const middleIndex = primes.length / 2
			return res.status(200).json({ median: [primes[middleIndex - 1], primes[middleIndex]] })
		}
	} catch (e) {
		return res
			.status(500)
			.json({ message: 'An internal server error occurred. Please try again later.' })
	}
}

//Implements Sieve of Eratosthenes algorithm
function generatePrimesLessThanN(num: number) {
	const isPrime = new Array(num).fill(true)
	isPrime[0] = isPrime[1] = false

	for (let p = 2; p * p < num; p++) {
		if (isPrime[p]) {
			for (let i = p * p; i < num; i += p) {
				isPrime[i] = false
			}
		}
	}

	const primes = []
	for (let i = 2; i < num; i++) {
		if (isPrime[i]) {
			primes.push(i)
		}
	}

	return primes
}
