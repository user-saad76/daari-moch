import React from "react";
import { useFetch } from "../hook/useFetch";

function Orders() {
  const { data, error, loading } = useFetch("http://localhost:7000/orders"); // removed extra space
  console.log(data);

  return (
    <div className="container fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            <h6 className="mb-4">Orders</h6>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Order Amount</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Order Status</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="7" className="text-center text-danger">
                        {error.message || "Error fetching orders"}
                      </td>
                    </tr>
                  ) : data?.orders && data.orders.length > 0 ? (
                    data.orders.map((item, index) => (
                      <tr key={item._id || index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.customer?.name || "N/A"}</td>
                        <td>{item.customer?.email || "N/A"}</td>
                        <td>{item.amountTotal || "N/A"}</td>
                        <td>{item.paymentStatus || "N/A"}</td>
                        <td>{item.orderStatus || "Pending"}</td>
                        <td>
                          {item.createdAt
                            ? moment(item.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
