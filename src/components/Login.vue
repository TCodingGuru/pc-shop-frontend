<template>
    <div class="container mt-5 p-5 col-10 col-md-6 col-lg-4 col-xl-3">
      <form class="login-form">
  
        <!-- header -->
        <h1 class="h3 mb-4 text-center font-weight-normal">Please sign in</h1>
  
        <!-- Username Input -->
        <div class="form-group">
          <label for="inputuserName" class="sr-only">Username</label>
          <input 
            type="text" 
            v-model="this.username" 
            id="inputuserName" 
            class="form-control"
            placeholder="Username" 
            required
          />
        </div>
  
        <!-- Password Input -->
        <div class="form-group">
          <label for="inputPassword" class="sr-only">Password</label>
          <input 
            type="password" 
            v-model="this.password" 
            id="inputPassword" 
            class="form-control"
            placeholder="Password" 
            required
          />
        </div>
  
        <!-- Submit Button -->
        <div class="form-group text-center">
          <button 
            @click="this.login()" 
            class="btn btn-lg btn-primary mt-4 w-100" 
            type="button">
            Sign in
          </button>
        </div>
  
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      login() {
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.push('/products')
        })
        .catch((error) => console.log(error))
      },
    }
  }
  </script>
  
  <style scoped>
  /* Styling for the login container */
  .container {
    max-width: 400px; 
    background-color: #f7f7f7; 
    border-radius: 8px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    padding: 30px; 
  }
  
  /* Title Styling */
  h1 {
    color: #333; 
    font-weight: 500; 
  }
  
  /* Styling for the input fields */
  .form-control {
    border-radius: 4px; 
    padding: 12px 15px; 
    margin-bottom: 15px; 
    border: 1px solid #ced4da; 
    font-size: 1rem; 
  }
  
  /* Focus styles for input fields */
  .form-control:focus {
    border-color: #007bff; 
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); 
  }
  
  /* Button Styling */
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff; 
    font-size: 1.1rem; 
  }
  
  .btn-primary:hover {
    background-color: #0056b3; 
    border-color: #0056b3; 
  }
  
  /* Make sure button has full width */
  .w-100 {
    width: 100%;
  }
  
  </style>
  