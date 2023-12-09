class CustumerHelper {
  constructor( ) {
    this.api = "";
  };

  getAllMetrics(date) {
    return this.request("/metrics", {
      params: { date }
    });
  };

  editPayment(id, payment, price, date) {
    return this.request("/custumer/payments/edit", {
      body: { price, date },
      params: { id, paymentID: payment }
    });
  };

  removePayment(id, payment) {
    return this.request("/custumer/payments/remove", {
      params: { id, paymentID: payment }
    });
  };

  createPayment(id, price, date) {
    return this.request(`/custumer/payments/create`, {
      body: { price, date },
      params: { id }
    });
  };

  editCustumer(id, data) {
    return this.request(`/custumer/edit`, {
      body: data,
      params: { id }
    });
  };

  createCustumer(data) {
    return this.request("/custumer/create", {
      body: data
    });
  };

  deleteCustumer(id) {
    return this.request(`/custumer/delete`, {
      params: { id }
    });
  };

  searchCustumer(params) {
    return this.request(`/custumer/search`, {
      params
    });
  };

  getCustumer(id) {
    return this.request("/custumer/get", {
      params: { id }
    });
  };

  getAllCustumers( ) {
    return this.request("/custumer/all");
  };
};

export default new CustumerHelper( );