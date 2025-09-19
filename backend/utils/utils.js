export const OrderBuilder = (session, lineItems = { data: [] }) =>{
  return {
    stripeSessionId: session.id,
    paymentIntentId: session.payment_intent,
    paymentStatus: session.payment_status,
    amountSubtotal: session.amount_subtotal,
    amountTotal: session.amount_total,
    currency: session.currency,

    customer: {
      name: session.customer_details?.name || "",
      email: session.customer_details?.email || "",
      country: session.customer_details?.address?.country || "",
    },

    lineItems: (lineItems.data || []).map((item) => ({
      stripeLineItemId: item.id,
      name: item.description || "Unknown",
      quantity: item.quantity,
      currency: item.currency,
      amountSubtotal: item.amount_subtotal,
      amountTotal: item.amount_total,
      price: {
        id: item.price?.id,
        product: item.price?.product,
        unit_amount: item.price?.unit_amount,
      },
    })),
  };
}
