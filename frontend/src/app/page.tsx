'use client'
import { useState } from 'react'

type MedianPrimeNumbers = {
	median: number[]
}

export default function Home() {
	const [value, setValue] = useState<string>('10')
	const [result, setResult] = useState<string | null>(null)
	const [error, setError] = useState<string | null>('')
	const [loading, setLoading] = useState<boolean>(false)

	const getPrimeMedian = async (event: React.FormEvent) => {
		event.preventDefault()

		//Reset state
		setLoading(true)
		setError(null)

		//Parse value for an integer
		const inputValue = parseInt(value, 10)

		if (
			isNaN(inputValue) ||
			inputValue <= 0 ||
			inputValue > 10000000 ||
			!Number.isInteger(inputValue) ||
			inputValue !== parseFloat(value)
		) {
			setError('Please enter an integer between 1 and 10000000.')
			setLoading(false)
			return
		}

		//Prevent unecessary API calls.
		if (inputValue === 1 || inputValue === 2) {
			setResult('None.')
			setLoading(false)
			return
		}

		fetch(`http://localhost:4000/prime/${inputValue}`)
			.then((response) => {
				if (!response.ok) {
					throw Error('Something went wrong, please try again later.')
				}
				return response.json()
			})
			.then((data: MedianPrimeNumbers) => {
				setResult(data.median.join(', '))
				setError(null)
			})
			.catch((error: Error) => {
				setError(error.message)
				console.log(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<div className="bg-gradient-to-r from-indigo-500 to-purple-500 min-h-screen flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
				<h1 className="text-2xl font-semibold text-gray-800 mb-4">Find Primes</h1>
				<p className="text-m font-semibold text-gray-800 mb-4">
					Given a number n, this function will return the median prime number(s) of the set of prime
					numbers less than n.
				</p>
				<form>
					<div className="mb-4">
						<input
							type="text"
							id="valueInput"
							name="valueInput"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className="border border-gray-300 rounded-lg p-2 w-full focus:ring focus:ring-indigo-400"
							placeholder="Enter a number..."
						/>
					</div>
					{error && <p className="text-red-500 text-sm mb-2">{error}</p>}
					<div className="flex items-center justify-between">
						<button
							type="submit"
							disabled={loading}
							className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:ring focus:ring-indigo-400"
							onClick={getPrimeMedian}
						>
							Submit
						</button>
						{result && (
							<p className="text-gray-800 text-m font-semibold ml-4">
								Median(s): {result}
							</p>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}
