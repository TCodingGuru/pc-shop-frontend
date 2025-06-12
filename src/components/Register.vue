<template>
  <div class="container mt-5 p-5 col-10 col-md-6 col-lg-4 col-xl-3">
    <form class="register-form">


      <h1 class="h3 mb-4 text-center font-weight-normal">Create Account</h1>

      <div class="form-group">
        <input type="text" v-model="name" class="form-control" placeholder="Name" required />
      </div>

      <div class="form-group">
        <input type="text" v-model="username" class="form-control" placeholder="Username" required />
      </div>

      <!-- pattern so only gmail is allowed -->
      <input type="email" v-model="email" class="form-control" placeholder="Email"
        pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$" required />

      <div class="form-group">
        <input type="password" v-model="password" class="form-control" placeholder="Password" required />
      </div>

      <!-- Submit Button -->
      <div class="form-group text-center">
        <button @click="register" class="btn btn-lg btn-success mt-4 w-100" type="button">
          Register
        </button>
        <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
      </div>

      <p class="text-center mt-3">
        Already have an account?
        <router-link to="/login">Sign in</router-link>
      </p>

    </form>
  </div>
</template>

<script>
import axios from '../axios-auth';
export default {
  name: "Register",
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    register() {
      if (!this.email.endsWith("@gmail.com")) {
        this.errorMessage = "Only Gmail addresses are allowed.";
        return;
      }

      this.errorMessage = "";

      axios.post("/users/register", {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push("/login");
      }).catch(error => {
        if (error.response && error.response.status === 409) {
          this.errorMessage = error.response.data.error;
        } else {
          this.errorMessage = "An unexpected error occurred";
        }
      });
    }
  }
};
</script>

<style scoped>
/* Reuse login styles */
.container {
  max-width: 400px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

h1 {
  color: #333;
  font-weight: 500;
}

.form-control {
  border-radius: 4px;
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 1px solid #ced4da;
  font-size: 1rem;
}

.form-control:focus {
  border-color: #28a745;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  font-size: 1.1rem;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.w-100 {
  width: 100%;
}
</style>
