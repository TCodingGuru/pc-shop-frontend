import { createStore } from "vuex";
import axios from "../axios-auth";

const store = createStore({
  state() {
    return {
      cart: [],
      token: null,
      username: null,
      role: "User",
      logged_in: null,
    };
  },
  getters: {
    cartItemCount(state) {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    cartItems(state) {
      return state.cart;
    },
  },
  mutations: {
    saveToken(state, params) {
      state.token = params.token;
      state.username = params.username;
      state.role = params.role;
      state.logged_in = true;
    },
    addToCart(state, productWithQuantity) {
      const existing = state.cart.find(
        (item) =>
          item.product.product_ID === productWithQuantity.product.product_ID
      );
      if (existing) {
        existing.quantity += productWithQuantity.quantity;
      } else {
        state.cart.push(productWithQuantity);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart(state, productId) {
      state.cart = state.cart.filter(
        (item) => item.product.product_ID !== productId
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    loadCart(state) {
      const cart = localStorage.getItem("cart");
      if (cart) {
        state.cart = JSON.parse(cart);
      }
    },

    clearCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
  actions: {
    logout() {
      return new Promise((resolve) => {
        localStorage.clear();
        this.state.token = null;
        this.state.username = null;
        this.state.role = "User";
        this.state.logged_in = false;
        resolve();
      });
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const role = localStorage.getItem("role");

      if (!token) return;

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      commit("saveToken", {
        username: username,
        token: token,
        role: role,
      });
    },
    login({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios
          .post("/users/login", {
            username: params.username,
            password: params.password,
          })
          .then((result) => {
            console.log(result);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + result.data.token;
            console.log("Username:", result.data.username);
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("username", result.data.username);
            localStorage.setItem("role", result.data.role);

            commit("saveToken", {
              username: result.data.username,
              token: result.data.token,
              role: result.data.role,
            });
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject();
          });
      });
    },
  },
});

export default store;
