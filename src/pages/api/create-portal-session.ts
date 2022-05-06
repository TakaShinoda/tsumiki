import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { session_id } = req.body
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

    const returnUrl = `${req.headers.origin}`

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    })

    res.redirect(303, portalSession.url)
  }
}
