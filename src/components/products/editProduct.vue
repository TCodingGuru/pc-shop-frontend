<template>
  <div class="container">
    <h2 class="mt-3 mt-lg-5">Edit product:</h2>

    <div class="row">
      <div class="col-md-12 col-lg-4 mb-4">
        <form @submit.prevent="update">
          <!-- Product Name -->
          <div class="form-group">
            <label for="productName">Product name:</label>
            <input type="text" class="form-control" id="productName" v-model="product.name" required />
          </div>

          <!-- Price -->
          <div class="form-group">
            <label for="productPrice">Price:</label>
            <input type="number" class="form-control" id="productPrice" v-model="product.price" min="0" step="0.01"
              required />
          </div>

          <!-- Stock -->
          <div class="form-group">
            <label for="productStock">Stock:</label>
            <input type="number" class="form-control" id="productStock" v-model="product.amount" min="0" required />
          </div>

          <!-- Category -->
          <div class="form-group">
            <label for="productCat">Category:</label>
            <select class="form-control" id="productCat" v-model="product.category_ID" required>
              <option v-for="category in categories" :key="category.category_ID" :value="category.category_ID">
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Image Upload -->
          <div class="form-group">
            <label for="productImage">Upload New Image:</label>
            <input type="file" class="form-control-file" id="productImage" @change="onFileSelected" accept="image/*" />
            <div class="mt-2">
              <small class="text-muted">Current image:</small>
              <img :src="product.image" alt="Current" class="img-thumbnail mb-2" style="max-width: 100%;" />
            </div>
            <div v-if="imagePreview">
              <small class="text-muted">Preview of new image:</small>
              <img :src="imagePreview" alt="Preview" class="img-thumbnail" style="max-width: 100%;" />
            </div>
          </div>

          <!-- Buttons -->
          <div class="mt-2">
            <button type="button" class="btn btn-danger m-1" @click="cancel">Cancel</button>
            <button type="submit" class="btn btn-success">Update</button>
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
        amount: 0,
      },
      categories: [],
      selectedFile: null,
      imagePreview: null,
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
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.selectedFile);
    },
    async uploadImage() {
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append('image', this.selectedFile);

      const uploadRes = await axios.post(
        `http://localhost/products/${this.product.product_ID}/upload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      this.product.image = uploadRes.data.image;
    },
    async update() {
      try {
        if (this.selectedFile) {
          await this.uploadImage();
        }

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
