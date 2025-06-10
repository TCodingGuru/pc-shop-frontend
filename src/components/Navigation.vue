<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">

      <!-- Navbar Left -->
      <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">
              🛒 Cart<span v-if="cartItemCount > 0"> ({{ cartItemCount }})</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Navbar Right -->
      <div class="navbar-nav ms-auto">
        <li class="nav-item">
          <button v-if="$store.state.logged_in" class="nav-link btn btn-link p-0 text-decoration-none" @click="logout">
            Logout
          </button>
          <router-link v-else to="/login" class="nav-link">
            Login
          </router-link>
        </li>
      </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  computed: {
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
        .catch(console.error)
    },
  },
}
</script>
