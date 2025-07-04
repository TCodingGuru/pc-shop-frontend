<template>
  <div class="container mt-4">
    <h2>Your Shopping Cart</h2>

    <div v-if="cart.length === 0" class="text-muted">Your cart is empty.</div>

    <div v-else class="cart-items">
      <div class="card mb-3" v-for="item in cart" :key="item.product_ID">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5>{{ item.name }}</h5>
            <p class="mb-1">Price: € {{ item.price.toFixed(2) }}</p>
            <p class="mb-1">Subtotal: € {{ (item.price * item.quantity).toFixed(2) }}</p>
            <input type="number" :value="item.quantity" :min="1" :max="item.amount"
              @change="updateQuantity(item.product_ID, $event.target.valueAsNumber)" />
          </div>
          <button class="btn btn-danger" @click="removeItem(item.product_ID)">Remove</button>
        </div>
      </div>

      <h4 class="text-end">Total: € {{ totalPrice.toFixed(2) }}</h4>
    </div>
    <button class="btn btn-success" @click="checkout" :disabled="!isLoggedIn">
      Checkout
    </button>
    <p v-if="!isLoggedIn" class="text-danger">
      Please log in to proceed with checkout.
    </p>
  </div>
</template>

<script>
import axios from '../axios-auth';

export default {
  name: "Cart",
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    isLoggedIn() {
      return this.$store.state.logged_in === true;
    },
  },
  methods: {
    updateQuantity(index) {
      if (this.cart[index].quantity < 1) {
        this.cart[index].quantity = 1;
      }
      this.saveCart();
    },
    removeItem(productId) {
      const index = this.cart.findIndex(item => item.product_ID === productId);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.saveCart();
      }
    },
    loadCart() {
      const saved = localStorage.getItem("cart");
      if (saved) {
        this.cart = JSON.parse(saved).map(item => ({
          ...item,
          price: Number(item.price),
        }));
      }
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    async checkout() {
      try {
        const items = this.cart.map(item => ({
          product_ID: item.product_ID,
          quantity: item.quantity
        }));
        
       await axios.post('http://localhost/checkout', {
          items
        });

        alert("Invoice sent to your email!");
        this.$store.commit('clearCart');
        this.$router.push('/');
      } catch (error) {
        console.error("Checkout failed:", error);
        alert("Checkout failed. Please try again.");
      }
    },
  },
  mounted() {
    this.loadCart();
  },
};
</script>

<style scoped>
input[type="number"] {
  width: 60px;
  margin-top: 8px;
}
</style>
