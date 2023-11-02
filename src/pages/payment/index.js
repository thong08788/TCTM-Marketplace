import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Box ,FormData} from 'mdi-material-ui'
import { FormControl } from '@mui/material'

const MyPage = () => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()

    if (loading) return

    setLoading(true)

    const stripe = await loadStripe('your-publishable-key') // Replace with your actual publishable key

    // Create a Stripe PaymentMethod and handle the payment process here

    setLoading(false)
  }

  useEffect(() => {
    const stripePromise = loadStripe(
      'pk_test_51O7YpnLAtZtjvlxKMlrJHhWJ7Y7ibQk9brWCXhA7kQIXexikMwYNmfMqT8T6h4M8RmKQSuVH7VsS3SfRqtEJ3q7g00Rr3KTdVY'
    ) // Use the test Publishable Key for development and testing

    const handlePayment = async () => {
      setLoading(true)

      const stripe = await stripePromise

      // Use Stripe Elements to securely collect card details
      const elements = stripe.elements()

      // Create an instance of the card Element
      const cardElement = elements.create('card')

      // Mount the card Element to the DOM
      cardElement.mount('#card-element')

      // Handle the payment process with Stripe Elements
      try {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement
        })

        if (error) {
          console.error('Error creating PaymentMethod:', error)
        } else {
          console.log('PaymentMethod created successfully:', paymentMethod)

          // Continue with the payment process
        }
      } catch (error) {
        console.error('Error creating PaymentMethod:', error)
      } finally {
        setLoading(false)
      }
    }

    handlePayment()
  }, [])

  return (
    <FormControl onSubmit={handleSubmit}>
      <label>
        Card details:
        <div id='card-element'></div>
      </label>
      <button type='submit' disabled={loading}>
        Pay
      </button>
    </FormControl>
  )
}

export default MyPage
