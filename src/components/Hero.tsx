import React, { FC, useState, useEffect } from 'react'
import { Message } from '@/components/Message'
import { SuccessDisplay } from '@/components/SuccessDisplay'

export const Hero: FC = () => {
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>('')

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setSuccess(true)
      setSessionId(query.get('session_id'))
    }

    if (query.get('canceled')) {
      setSuccess(false)
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.")
    }
  }, [sessionId])

  if (!success && message === '') {
    return (
      <>
        <main className='lg:relative'>
          <div className='mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left'>
            <div className='px-4 lg:w-1/2 sm:px-8 xl:pr-16'>
              <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'>
                <span className='block xl:inline'>Demo site</span>
                <br />
                <span className='block text-emerald-600 xl:inline'>cafe ticket letter</span>
              </h1>
              <p className='mt-3 max-w-md mx-auto text-2xl text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl'>
                500円 / 月
              </p>

              <div className='mt-10 sm:flex sm:justify-center lg:justify-start'>
                <div className='mt-3 rounded-md shadow sm:mt-0'>
                  {/* stripe */}
                  <form action='/api/create-checkout-session' method='POST'>
                    {/* Add a hidden field with the lookup_key of your Price */}
                    <input type='hidden' name='lookup_key' value='{{PRICE_LOOKUP_KEY}}' />
                    <button id="checkout-and-portal-button" type="submit" className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10'>
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full'>
            <img
              className='absolute inset-0 w-full h-full object-cover'
              src='./coffee.jpg'
              alt=''
            />
          </div>
        </main>
      </>
    )
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />
  } else {
    return <Message message={message} />
  }
}
