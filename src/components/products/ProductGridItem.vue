<template>
  <!-- Column for product card -->
  <div class="col-sm-6 col-lg-3">
    <div class="card h-100 d-flex flex-column justify-content-between">
      <img :src="product.image" class="card-img-top p-3" alt="product" />

      <div class="card-body d-flex flex-column">
        <p class="text-muted mb-2">{{ product.category_Name }}</p>

        <h5 class="card-title">{{ product.name }}</h5>

        <div class="mb-2">
          <p class="card-text text-dark fw-bold">€ {{ product.price }}</p>
          <p class="card-text text-muted">Available: <strong>{{ product.amount }}</strong></p>
        </div>

        <div class="mt-auto d-flex flex-wrap gap-2 justify-content-between">
          <!-- Admin options -->
          <div v-if="$store.state.role === 'Admin'" class="d-flex gap-2">
            <router-link
              :to="'/editProduct/' + product.product_ID"
              class="btn"
            >
              Edit
            </router-link>
            <button
              class="btn"
              @click="$emit('deleteProduct', product)"
            >
              Delete
            </button>
          </div>

          <!-- General user: Add to cart -->
          <button type="button" class="btn" @click="openModal">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="modal-overlay">
  <div class="modal-content">
    <h5>Add {{ product.name }} to cart</h5>
    <label>
      Quantity:
      <input type="number" v-model.number="quantity" min="1" :max="product.amount" />
    </label>
    <div class="modal-actions mt-3">
      <button class="btn" @click="confirmAddToCart">Add</button>
      <button class="btn" @click="closeModal">Cancel</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ProductGridItem",
  props: {
    product: Object,
  },
  data() {
    return {
      showModal: false,
      quantity: 1,
    };
  },
  methods: {
    openModal() {
      this.quantity = 1;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    confirmAddToCart() {
      this.$emit('addToCart', {
        product: this.product,
        quantity: this.quantity,
      });
      this.closeModal();
    },
  },
};
</script>


<style scoped>
.col-sm-6.col-lg-3 {
  flex: 1 0 21%;
  max-width: 300px;
  margin-bottom: 20px;
}

.card {
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  height: 100%;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
}

/* Button styling */
.card .btn {
  background-color: #FAFAFA;
  color: #333;
  border: 2px solid #333;
  border-radius: 5px;
  padding: 8px 16px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  transition: all 0.3s ease;
  display: inline-block;
}

.card .btn:hover {
  background-color: #333;
  color: #FAFAFA;
  border: 2px solid #FAFAFA;
}

.card .btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>
