import { ChevronDownIcon } from '@heroicons/react/solid'
import React from 'react'

export const SuccessDisplay = ({ sessionId }: any) => {
  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between'>
        <div className='max-w-xl'>
          <h2 className='text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>
            Thank you
          </h2>
          <p className='mt-5 text-xl text-gray-500'>
            Subscription to starter plan successful! <br />
            まっててね
          </p>
          <form action='/api/create-portal-session' method='POST'>
              <input type='hidden' id='session-id' name='session_id' value={sessionId} />

              <button
                id='checkout-and-portal-button'
                type='submit'
                className='mt-10 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-gray-100 hover:bg-gray-50 md:py-4 md:text-lg md:px-10'
              >
                Manage your billing information
              </button>
            </form>
        </div>
        <div className='mt-10 w-full max-w-xs'>
          <section>
            
          </section>
        </div>
      </div>
    </div>
  )
}
