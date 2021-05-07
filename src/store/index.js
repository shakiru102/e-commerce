import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// const url = 'http://localhost:8001'
export default new Vuex.Store({
//  strict

  state: {
    country:[],
    currentuser: null,
    password: {
      currentPassword: '',
      newPassword: ''
    },
    UserProducts: null,
    items: null
    // AllProducts: null,
    // singleProduct: null
  },
  getters: {
    computedItems(state) {
      return state.items.map(doc => {
        return {...doc, quantity: 1, subTotal: doc.product_amount }
      })
    }
  },

  mutations: {
    // Product(state, payload){
    //   state.singleProduct = payload
    // },
    userProducts(state, payload) {
      state.UserProducts = payload
    },
    country(state, payload){
      payload.forEach(doc => {
        state.country.push(doc.name)
        
      });
    },

    User(state, payload) {
       state.currentuser = payload
    },
    cart(state, payload){
      state.items = payload
    }
    // allProducts(state, payload){
    //      state.AllProducts = payload
    // }
  },


  actions: {
   
    async deleteUser (commit, data) {
      // console.log(data)
      const res = axios.delete(`/api/deleteUser/${data}`)
      return res
    },
     
    async sold(commit, data){
        const res = await axios.post(`/api/sold/${data._id}`,{ quantity: data.quantity, buyer: data.buyer, amount: data.amount})
        return res
    },
     cartItems ({commit}) {
      const cart = JSON.parse(localStorage.getItem('cartItem'))
           commit('cart', cart)
        },
    async singleProduct (commit, data) {
      const res = await axios.get(`/api/singleProduct/${data}`)
      // commit('Product', res.data)
      return res.data
    },
    async getAllProducts () {
      const res = await axios.get('/api/allProducts')
        // commit('allProducts', res.data)
        return res.data
    },
    async deleteProduct({ commit }, payload){
      const res = await axios.post('/api/deleteProduct', payload)
      commit('userProducts', res.data)
      return res
      },

    async filterProducts ({ commit }, payload){
      const res = await axios.post('/api/filterProducts', payload)
      commit('userProducts', res.data)
      return res

    },

   async getUserProducts({commit}){
     const res = await axios.get('/api/userProducts')
     commit('userProducts', res.data)
     return res
   },

    async uploadProduct(commit, item){
      const formdata = new FormData()
      formdata.append('product_name', item.p_name)
      formdata.append('company_name', item.c_name)
      formdata.append('product_image', item.p_image)
      formdata.append('product_amount', item.p_amount)
      formdata.append('product_category', item.p_category)
      formdata.append('product_description', item.p_description)
      item.p_features.forEach(doc => {
      formdata.append('product_features', doc)
        
      });
      console.log(item)
     const res = await axios.post('/api/uploadProduct', formdata)
     return res
    },
    async getUser({commit}){
      const res = await axios.get('/api/user')
      commit('User', res.data)
    },
    async updatePassword( payload ) {
      console.log(payload)
      const res = await axios.post('/api/changePassword', payload)
      console.log(res)
      return res
    },
    async updateImage(commit, payload){
      const formdata = new FormData()
      formdata.append('uimg', payload)
    const res = await axios.post('/api/uploadImage', formdata)
     console.log(res)
     return res
    },

   async updateDoc(payload){
   const res = await axios.post(`/api/updateuser`, payload)
    return res;
   },

 async signup(commit, payload) {
  const res =  await axios.post(`/api/signup`, payload)
  return res
},

async login(commit, payload) {
  const res =  await axios.post(`/api/login`, payload)
  return res
},

async getCountry({commit}){
    const res = await axios.get('https://restcountries.eu/rest/v2/all')
      commit('country', res.data)
}
  },
  modules: {
  }
})
