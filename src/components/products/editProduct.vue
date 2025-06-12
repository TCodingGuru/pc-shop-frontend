<template>
  <div class="container">
    <h2 class="mt-3 mt-lg-5">Edit product:</h2>

    <div class="row">
      <div class="col-md-12 col-lg-4 mb-4">
        <form @submit.prevent="update">
          <!-- Product Name -->
          <div class="form-group">
            <label for="productName">Product name:</label>
            <input
              type="text"
              class="form-control"
              id="productName"
              v-model="product.name"
              required
            />
          </div>

          <!-- Product Price -->
          <div class="form-group">
            <label for="productPrice">Price:</label>
            <input
              type="number"
              class="form-control"
              id="productPrice"
              v-model="product.price"
              min="0"
              step="0.01"
              required
            />
          </div>

            <!-- Product Price -->
          <div class="form-group">
            <label for="productPrice">Stock:</label>
            <input
              type="number"
              class="form-control"
              id="productPrice"
              v-model="product.amount"
              min="0"
              step="0.01"
              required
            />
          </div>

          <!-- Category -->
          <div class="form-group">
            <label for="productCat">Category:</label>
            <select
              class="form-control"
              id="productCat"
              v-model="product.category_ID"
              required
            >
              <option
                v-for="category in categories"
                :key="category.category_ID"
                :value="category.category_ID"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Image -->
          <div class="form-group">
            <label for="productImage">Image URL:</label>
            <input
              type="text"
              class="form-control"
              id="productImage"
              v-model="product.image"
              required
            />
          </div>

          <!-- Buttons -->
          <div class="mt-2">
            <button
              type="button"
              class="btn btn-danger m-1"
              @click="cancel"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="btn btn-success"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../axios-auth';


export default {
  name: "EditProduct",
  data() {
    return {
      id: this.$route.params.id,
      product: {
        product_ID: 0,
        name: "",
        price: 0.0,
        image: "",
        category_ID: 0,
        category_Name: "",
        amount: 0,
      },
      categories: [],
    };
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(`http://localhost/products/${this.id}`);
        this.product = response.data;
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost/categories/");
        this.categories = response.data;
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },
    async update() {
      try {
        await axios.put(
          `http://localhost/products/${this.product.product_ID}`,
          this.product
        );
        this.$router.push("/products");
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    },
    cancel() {
      this.$router.push("/products");
    },
  },
  mounted() {
    this.fetchProduct();
    this.fetchCategories();
  },
};
</script>
