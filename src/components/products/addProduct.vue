<template>
  <div class="container">
    <h2 class="mt-3 mt-lg-5">Add product:</h2>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-12 col-lg-4 mb-4 mb-lg-4">
        <form @submit.prevent="add">
          <!-- Product Name -->
          <div class="form-group">
            <label for="productName">Product name:</label>
            <input type="text" class="form-control" id="productName" v-model="product.name" required />
          </div>

          <!-- Price -->
          <div class="form-group">
            <label for="productPrice">Price:</label>
            <input type="number" class="form-control" id="productPrice" v-model="product.price" min="0" required />
          </div>

          <!-- Category -->
          <div class="form-group">
            <label for="productCategory">Category:</label>
            <select class="form-control" id="productCategory" v-model="product.category_ID" required>
              <option v-for="category in categories" :key="category.category_ID" :value="category.category_ID">
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Image Upload -->
          <div class="form-group">
            <label for="productImage">Upload Image:</label>
            <input type="file" class="form-control-file" id="productImage" @change="onFileSelected" accept="image/*" />
            <div v-if="imagePreview" class="mt-2">
              <img :src="imagePreview" alt="Preview" class="img-thumbnail" style="max-width: 100%;" />
            </div>
          </div>

          <!-- Stock Amount -->
          <div class="form-group">
            <label for="stockAmount">Stock Amount:</label>
            <input type="number" class="form-control" id="stockAmount" v-model="stock.amount" min="0" />
          </div>

          <!-- Buttons -->
          <div class="mt-2">
            <button type="button" class="btn btn-danger m-1" @click="$router.push('/products')">Cancel</button>
            <button type="submit" class="btn btn-success" :disabled="!product.name || product.price <= 0">
              Add
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
  name: 'AddProduct',
  data() {
    return {
      categories: [],
      product: {
        name: '',
        price: 0,
        category_ID: 1,
        image: '',
      },
      stock: {
        product_ID: 0,
        amount: 0,
      },
      selectedFile: null,
      imagePreview: null,
    };
  },
  mounted() {
    axios
      .get('http://localhost/categories/')
      .then((res) => {
        this.categories = res.data;
      })
      .catch(console.error);
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.selectedFile);
    },
    async add() {
      try {
        // Step 1: Create the product (without image first)
        const res = await axios.post('http://localhost/products', this.product);
        const productId = res.data.product_ID;
        this.product.product_ID = productId;
        this.stock.product_ID = productId;

        console.log('Created product ID:', productId);

        // Step 2: Create stock (so getOne works for upload)
        await axios.post('http://localhost/stocks', this.stock);

        // Step 3: Upload image if selected
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('image', this.selectedFile);

          const uploadRes = await axios.post(
            `http://localhost/products/${productId}/upload`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );

          // Step 4: Update product with image path
          this.product.image = uploadRes.data.image;
          await axios.put(`http://localhost/products/${productId}`, this.product);
        }

        // Step 5: Navigate back to product list
        this.$router.push('/products');
      } catch (error) {
        console.error(error);
      }
    }
    ,
  },
};
</script>

<style scoped>
/* Form container styling */
.container {
  margin-top: 2rem;
}

form {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

/* Label styling */
label {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

/* Input spacing */
.form-group {
  margin-bottom: 1.25rem;
}

/* Input focus effect */
input:focus,
select:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
  transition: 0.2s ease-in-out;
}

/* Button spacing */
button {
  min-width: 100px;
}

.btn-success:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* You can style form inputs and spacing here later */
</style>
