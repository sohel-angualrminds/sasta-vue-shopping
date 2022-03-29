<template>
  <div class="container">
    <div class="row">
      <h1>
        <Router-Link to="/">My Ecommerce Site</Router-Link>

        <span class="pull-right">
          <Router-Link to="cart">Cart ({{ orders.length }})</Router-Link>
        </span>
      </h1>
      <hr />
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">Place Order</div>
          <div class="panel-body">
            <form class="form-horizontal" role="form">
              <table class="table table-striped">
                <thead class="table-head">
                  <tr>
                    <th>Product Name</th>
                    <th>Quntity</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="({ name, qty, price }, index) in orders"
                    :key="index"
                  >
                    <td>{{ name }}</td>
                    <td>{{ qty }}</td>
                    <td><i class="fa fa-inr"></i>{{ price * qty }}</td>
                  </tr>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td>
                      <strong>{{ qtyTotal }}</strong>
                    </td>
                    <td>
                      <strong><i class="fa fa-inr"></i>{{ amtTotal }}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />

              <br />
              <div class="form-group">
                <label for="inputName3" class="col-sm-2 control-label"
                  >Enter Order Details</label
                >
              </div>
              <div class="form-group">
                <label for="inputName3" class="col-sm-2 control-label"
                  >Name</label
                >
                <div class="col-sm-6">
                  <input
                    class="form-control"
                    id="inputName3"
                    placeholder="Name"
                    v-model="userInfo.userName"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label"
                  >Address</label
                >
                <div class="col-sm-6">
                  <textarea
                    class="form-control"
                    id="inputEmail3"
                    placeholder="Deliver Address"
                    v-model="userInfo.address"
                  ></textarea>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label"></label>
                <div class="col-sm-6">
                  <button
                    type="submit"
                    class="btn btn-warning"
                    @click="(e) => submitData(e)"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.container -->
</template>

<script>
import axios from "axios";

export default {
  name: "PlaceOrder",
  data() {
    return {
      orders: [],
      qtyTotal: 0,
      amtTotal: 0,
      userInfo: {
        userName: "",
        address: "",
      },
    };
  },
  methods: {
    //for getting data from local Storage
    getDataFromLocalStorage(key) {
      return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : [];
    },
    calculateTotal(data) {
      let sum = 0;
      let qtyTot = 0;
      data.forEach(({ qty, price }) => {
        sum += qty * price;
        qtyTot += qty;
      });
      this.amtTotal = sum;
      this.qtyTotal = qtyTot;
    },
    setOrders(data) {
      this.orders = data;
      this.calculateTotal(data);
    },
    submitData(e) {
      e.preventDefault();
      // console.log(this.userInfo);
      let obj = {
        personName: this.userInfo.userName,
        deliveryAddress: this.userInfo.address,
        productsOrdered: this.orders.map(({ _id, price, qty }) => {
          return { productID: _id, price, qty, total: price * qty };
        }),
        orderTotal: this.amtTotal,
      };
      async function post(self) {
        const res = await axios.post(
          "http://interviewapi.ngminds.com/api/placeOrder",
          obj
        );

        if (res.status === 200) {
          self.$router.push({ path: "/" });
        }
      }
      post(this);
    },
  },
  mounted() {
    let d = this.getDataFromLocalStorage("cartItem");
    this.setOrders(d);
  },
};
</script>

<style scoped>
</style>