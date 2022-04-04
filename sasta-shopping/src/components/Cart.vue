<template>
  <div class="container">
    <div class="row">
      <h1>
        <router-link to="/">My Ecommerce Site</router-link>

        <span class="pull-right">
          <router-link to="/cart">Cart ({{ data.length }})</router-link>
        </span>
      </h1>
      <hr />
      <div class="col-md-12">
        <div class="panel panel-default">
          <div class="panel-heading">MY CART ({{ data.length }})</div>
          <div class="panel-body">
            <form>
              <div
                v-for="({ _id, image, name, price, qty }, index) in data"
                :key="index"
              >
                <div class="row" :key="_id">
                  <div class="col-md-3">
                    <img
                      :src="`http://interviewapi.ngminds.com/${image}`"
                      width="100"
                      height="200"
                      :alt="name"
                    />
                  </div>
                  <div class="col-md-3">
                    {{ name }} <br /><i class="fa fa-inr"></i>{{ price }}
                  </div>
                  <div class="col-md-3">
                    quantity
                    <br />
                    <button
                      @click="(e) => decrementQty(e, index)"
                      class="qtyminus"
                      :disabled="qty <= 1 && 'disabled'"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      name="quantity"
                      class="qty"
                      :value="qty"
                    />
                    <button @click="(e) => incrementQty(e, index)">+</button>
                  </div>
                  <div class="col-md-3">
                    <button @click="() => remove(_id)" class="btn btn-warning">
                      remove
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9">
                    <label class="pull-right">Amount Payable </label>
                  </div>
                  <div class="col-md-3">{{ price * qty }}</div>
                </div>

                <hr />
              </div>
            </form>
          </div>

          <div class="row">
            <div class="col-md-9">
              <label class="pull-right">Total Amount Payable </label>
            </div>
            <div class="col-md-3">{{ total }}</div>
          </div>
          <div class="panel-footer">
            <router-link to="/" class="btn btn-success"
              >Continue Shopping</router-link
            >

            <router-link
              to="/placeOrder"
              class="pull-right btn btn-danger"
              :class="total < 500 && 'disabled'"
              >Place Order</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localService from "../mixins/localService";
export default {
  name: "CartItem",
  data() {
    return {
      data: [],
      total: 0,
    };
  },
  mixins: [localService],//for common functionality
  methods: {
    calculateTotal(data) {
      let sum = 0;
      data.forEach(({ qty, price }) => (sum += qty * price));
      this.total = sum;
    },
    setData(data) {
      this.data = data;
      this.calculateTotal(data);
    },
    incrementQty(e, index) {
      e.preventDefault();
      this.data[index].qty++;
      this.setData(this.data);
      this.putIntoLocalStorage("cartItem", this.data);
    },
    decrementQty(e, index) {
      e.preventDefault();
      if (this.data[index].qty >= 1) {
        this.data[index].qty--;
        this.setData(this.data);
        this.putIntoLocalStorage("cartItem", this.data);
      } else {
        return;
      }
    },
    remove(_id) {
      let d = this.data.filter((item) => item._id != _id);
      this.setData(d);
      this.putIntoLocalStorage("cartItem", d);
    },
  },
  mounted() {
    let d = this.getDataFromLocalStorage("cartItem");
    this.setData(d);
  },
};
</script>

<style scoped>
</style>