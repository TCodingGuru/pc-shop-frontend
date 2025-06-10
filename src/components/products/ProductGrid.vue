<template>
  <div class="container">
    <h2 class="mt-3 mt-lg-5">Product catalogue:</h2>
    <!-- Show add button only for Admins -->
    <div class="m-1" v-if="isAdmin">
      <router-link to="/addProduct">+ Add new product</router-link>
    </div>

    <!-- Product Grid -->
    <div id="row" class="row">
      <product-grid-item v-for="product in products" :key="product.product_ID" :product="product"
        @addToCart="handleAddToCart" @deleteProduct="deleteProduct" />
    </div>

    <div class="container d-flex justify-content-center">
      <button class="btn btn-outline-primary m-1" @click="back">Back</button>
      <button class="btn btn-outline-primary m-1" @click="next">Next</button>
    </div>
  </div>
</template>


<script>
import ProductGridItem from './ProductGridItem.vue';
import axios from '../../axios-auth';

export default {
  name: 'ProductGrid',
  components: { ProductGridItem },

  data() {
    return {
      products: [],
      offset: 0,
      limit: 3,
      isLoading: false,
      error: null,
      cart: [],
    };
  },

  computed: {
    isAdmin() {
      return this.$store.state.role === 'Admin';
    },
  },

  methods: {
    async fetch() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get(
          `http://localhost/products?offset=${this.offset}&limit=${this.limit}`
        );

        let data = response.data;

        if (typeof data === 'string') {
          data = JSON.parse(data.match(/\[.*\]/s)?.[0] || '[]');
        }

        if (data.length === 0 && this.offset > 0) {
          this.back(true); // Retry previous offset
        } else {
          this.products = data;
        }

      } catch (error) {
        this.error = 'Failed to load products';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteProduct(product) {
      if (!confirm(`Do you really want to delete ${product.category_Name}?`)) return;

      try {
        await axios.delete(`http://localhost/products/${product.product_ID}`);
        this.fetch();
      } catch (error) {
        console.error('Failed to delete:', error);
      }
    },

    next() {
      this.offset += this.limit;
      this.fetch();
    },

    back(retry = false) {
      if (this.offset - this.limit >= 0 || retry) {
        this.offset = Math.max(this.offset - this.limit, 0);
        this.fetch();
      }
    },
  },
  handleAddToCart({ product, quantity }) {
    const existing = this.cart.find(p => p.product_ID === product.product_ID);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }
    console.log("Cart:", this.cart);
  },

  mounted() {
    this.fetch();
  },
};
</script>
