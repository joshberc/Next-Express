import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../src/app/page'

describe('Home Component', () => {
	beforeEach(() => {
		render(<Home />)
	})

	it('renders the essential components', () => {
		expect(screen.getByText('Find Primes')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter a number...')).toBeInTheDocument()
        expect(screen.getByText('Submit')).toBeInTheDocument()
	})

	it('handles form submission and displays results (10)', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({ median: [2, 3] }),
            ok: true,
        });

		const input = screen.getByPlaceholderText('Enter a number...')
		const submitButton = screen.getByText('Submit')

		fireEvent.change(input, { target: { value: '10' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Median(s): 2, 3')).toBeInTheDocument()
		})
	})

	it('handles form submission and displays results (1)', async () => {

		const input = screen.getByPlaceholderText('Enter a number...')
		const submitButton = screen.getByText('Submit')

		fireEvent.change(input, { target: { value: '1' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Median(s): None.')).toBeInTheDocument()
		})
	})

	it('handles form submission and displays results (2)', async () => {

		const input = screen.getByPlaceholderText('Enter a number...')
		const submitButton = screen.getByText('Submit')

		fireEvent.change(input, { target: { value: '2' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Median(s): None.')).toBeInTheDocument()
		})
	})

	it('handles form submission with an invalid value', async () => {
		const input = screen.getByPlaceholderText('Enter a number...')
		const submitButton = screen.getByText('Submit')

		fireEvent.change(input, { target: { value: 'invalid' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(
				screen.getByText('Please enter an integer between 1 and 10000000.')
			).toBeInTheDocument()
		})
	})

    it('handles form submission with an invalid int (too large)', async () => {
		const input = screen.getByPlaceholderText('Enter a number...')
		const submitButton = screen.getByText('Submit')

		fireEvent.change(input, { target: { value: '10000001' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(
				screen.getByText('Please enter an integer between 1 and 10000000.')
			).toBeInTheDocument()
		})
	})

    it('handles form submission with an invalid int (too small)', async () => {
		const input = screen.getByPlaceholderText('Enter a number...')
		const submitButton = screen.getByText('Submit')

		fireEvent.change(input, { target: { value: '0' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(
				screen.getByText('Please enter an integer between 1 and 10000000.')
			).toBeInTheDocument()
		})
	})

    it('handles form submission with an invalid int (negative)', async () => {
		const input = screen.getByPlaceholderText('Enter a number...')
		const submitButton = screen.getByText('Submit')

		fireEvent.change(input, { target: { value: '-20' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(
				screen.getByText('Please enter an integer between 1 and 10000000.')
			).toBeInTheDocument()
		})
	})

    it('handles form submission with an invalid int (float)', async () => {
		const input = screen.getByPlaceholderText('Enter a number...')
		const submitButton = screen.getByText('Submit')

		fireEvent.change(input, { target: { value: '10.5' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(
				screen.getByText('Please enter an integer between 1 and 10000000.')
			).toBeInTheDocument()
		})
	})

	it('handles form submission with a server error', async () => {
		global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({ median: [2, 3] }),
            ok: false,
        });

		const input = screen.getByPlaceholderText('Enter a number...')
		const submitButton = screen.getByText('Submit')

		fireEvent.change(input, { target: { value: '10' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Something went wrong, please try again later.')).toBeInTheDocument()
		})
	})
})
