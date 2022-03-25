<template>
  <div class="container">
    <h1>
      <a href="/">My Ecommerce Site</a>
      <span class="pull-right">
        <a href="/cart">Cart (0)</a>
      </span>
    </h1>
    <hr />

    <div class="row">
      <div class="col-sm-12">
        <div style="margin: 25px 0">
          <label for="" class="control-label">Sort by:</label>
          <select name="" id="">
            <option value="">Default</option>
            <option value="High to Low">High to Low</option>
            <option value="Low to High">Low to High</option>
          </select>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="({ _id, image, name, price }, inx) in allData" :key="inx">
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
            <span class="btn btn-warning"> Add to Cart </span>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      allData: [],
      color: ["bg-info", "bg-success", "bg-warning", "bg-danger"],
    };
  },
  methods: {
    setState(data) {
      this.allData = data;
      console.log(this.allData);
    },
    //setting showing data
    setShowData(res) {
      let i = 0;
      let arr = [];
      // res = sorting(res, sort);
      while (i < res.length) {
        const na = res.slice(i, i + 4);
        let e = na.map(({ _id, image, name, price }, index) => {
          return (
            <div class="col-md-3" key={_id}>
              <div class={this.color[index]}>
                <img
                  src={`http://interviewapi.ngminds.com/${image}`}
                  width="100"
                  height="200"
                  alt={name}
                />
                <br />
                <br />
                <p>{name}</p>
                <p>
                  <i class="fa fa-inr"></i>
                  {price}
                </p>
                <span class="btn btn-warning">Add to Cart</span>
              </div>
            </div>
          );
        });
        arr.push(
          <div key={i}>
            <div class="row">{e}</div>
            <hr />
          </div>
        );
        i += 4;
      }
      return arr;
      // setShowProducts(arr);
    },
  },
  mounted: async function () {
    const res = await axios.get(
      "http://interviewapi.ngminds.com/api/getAllProducts"
    );
    this.setState(res.data.products);
  },
};
</script>

<style scoped>
</style>