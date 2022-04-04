<template>
  <div class="container">
    <h1>
      <router-link to="/">My Ecommerce Site</router-link>
      <span class="pull-right">
        <router-link to="/cart">Cart ({{ cartDataCount }})</router-link>
      </span>
    </h1>
    <hr />

    <div class="row">
      <div class="col-sm-12">
        <div style="margin: 25px 0">
          <label for="" class="control-label">Sort by:</label>
          <select :value="sort" v-model="sort">
            <option value="default">Default</option>
            <option value="HighToLow">High to Low</option>
            <option value="LowToHigh">Low to High</option>
          </select>
        </div>
      </div>
    </div>

    <template v-for="(item, index) in allData" :key="index">
      <div class="row">
        <div v-for="({ _id, image, name, price }, inx) in item" :key="inx">
          <div class="col-md-3" :key="_id">
            <div :class="this.color[inx % 4]">
              <img
                :src="`http://interviewapi.ngminds.com/${image}`"
                width="100"
                height="200"
                :alt="name"
              />
              <br />
              <br />
              <p>{{ name }}</p>
              <p>
                <i class="fa fa-inr"></i>
                {{ price }}
              </p>
              <span
                @click="addToCart({ _id, image, name, price })"
                class="btn btn-warning"
              >
                Add to Cart
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </template>

    <div class="row">
      <div class="col-sm-8">
        <ul class="pagination">
          <li class="page-item"><a class="page-link">Previous</a></li>
          <li class="page-item active"><a class="page-link">1</a></li>
          <li class="page-item"><a class="page-link">2</a></li>
          <li class="page-item"><a class="page-link">3</a></li>
          <li class="page-item"><a class="page-link">Next</a></li>
        </ul>
      </div>
      <div class="col-sm-4 text-right">
        <div style="margin: 25px 0">
          <label for="" class="control-label">Items Per Page:</label>
          <select name="" id="">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import localService from "../mixins/localService";

export default {
  name: "HomePage",
  data() {
    return {
      allData: [],
      rowData: [],
      color: ["bg-info", "bg-success", "bg-warning", "bg-danger"],
      cartDataCount: 0,
      sort: "default",
    };
  },
  mixins: [localService],
  methods: {
    sorting(arr, type) {
      switch (type) {
        case "LowToHigh":
          return arr.sort((a, b) => a.price - b.price);
        case "HighToLow":
          return arr.sort((a, b) => b.price - a.price);
        default:
          return arr;
      }
    },
  //see in mixins
    // //for setting data to local Storage
    // putIntoLocalStorage(key, value) {
    //   localStorage.setItem(key, JSON.stringify(value));
    // },
    // //for getting data from local Storage
    // getDataFromLocalStorage(key) {
    //   return localStorage.getItem(key)
    //     ? JSON.parse(localStorage.getItem(key))
    //     : [];
    // },
    //for seting state data
    setState(data) {
      this.allData = data;
    },
    //setting showing data
    setShowData(res) {
      let i = 0;
      let arr = [];
      // let res = this.sorting(param, this.sort);
      res = this.sorting(res, this.sort);
      while (i < res.length) {
        const na = res.slice(i, i + 4);
        let e = na.map(({ _id, image, name, price }) => {
          return { _id, image, name, price };
        });
        arr.push(e);
        i += 4;
      }
      this.setState(arr);
    },
    //for after @clicking add to cart adding element to cart
    addToCart({ _id, image, name, price }) {
      //{ _id, image, name, price }
      let localData = this.getDataFromLocalStorage("cartItem");

      if (localData.length > 0) {
        //scenario second it is local storage data available but different products are added into cart
        //scenario third if it is local storage data available and same products added multiple time
        let indx = -1;
        localData.find((item, index) => {
          if (item._id === _id) {
            item.qty++;
            indx = index;
          }
        });
        if (indx < 0) {
          localData.push({ _id, image, name, price, qty: 1 });
        }
      } else {
        //scenario first if nothing present in local storage
        localData.push({ _id, image, name, price, qty: 1 });
      }
      this.putIntoLocalStorage("cartItem", localData);
      this.cartDataCount = localData.length;
    },
  },
  watch: {
    sort: {
      handler() {
        this.setShowData([...this.rowData]);
      },
      immediate: true,
      deep: true,
    },
  },
  created: async function () {
    const res = await axios.get(
      "http://interviewapi.ngminds.com/api/getAllProducts"
    );
    this.setShowData(res.data.products);
    this.rowData = res.data.products;
    this.cartDataCount = this.getDataFromLocalStorage("cartItem").length;
  },
};
</script>

<style scoped>
</style>