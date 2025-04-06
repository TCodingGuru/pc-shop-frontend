<template>
  <div class="container home d-flex flex-column align-items-center justify-content-center text-center" style="min-height: 80vh;">
    <div>
      <h2 class="display-4 font-weight-bold">Get Your New Gear!</h2>
      <p class="lead mt-3">Find the best PC parts, gaming peripherals, and hardware at unbeatable prices.</p>
      <router-link to="/products" class="btn btn-custom mt-3">Explore Now</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
};
</script>

<style scoped>
body {
  background-color: #FAFAFA;
}

/* Splash screen styles */
h2.display-4 {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

p.lead {
  font-size: 1.25rem;
  color: #555;
  text-align: center;
  margin-top: 20px;
}

.btn-custom {
  background-color: #FAFAFA;
  color: #333;
  border: 2px solid #333;
  padding: 10px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
}

.btn-custom:hover {
  background-color: #e0e0e0;
  border-color: #333;
  transition: background-color 0.3s ease;
}
</style>
