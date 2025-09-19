import { useEffect, useState } from "react";

function OrderSuccess() {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [called,setCalled] = useState(false)

  // 1. Extract sessionId from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("session_id");
    setSessionId(id);
  }, []);

  // 2. Confirm order on backend after sessionId is ready
  useEffect(() => {
    if (!sessionId || called) return;

    const confirmOrder = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:7000/order/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to confirm order");

        const data = await response.json();
        console.log("data coming",data)
        
          const ord = {
           
               id: data?._id, 
               status: data?.status
           
          }
        setOrderData(ord);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setCalled(true)
      }
    };

    confirmOrder();
  }, [sessionId]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🎉 Payment Successful</h1>
      {loading && <p>Confirming your order...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {orderData && (
        <>
          <p>✅ Your order has been confirmed.</p>
          <p><strong>Order ID:</strong> {orderData._id || sessionId}</p>
         
          {/* You can display more order details if backend returns them */}
        </>
      )}
    </div>
  );
}

export default OrderSuccess;
