import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core"


export const useCartStore = defineStore("cart", {
  state: () => {
    return { 
      cart: useLocalStorage('cart', []),
     };
  },
  actions: {
    deleteCart(){
      this.cart = []
    },
    addToCart(dish, quantity)
    {
      let alreadyInCart = 1;
      for (let storeDish of this.cart){
        if(dish.id == storeDish.id)
        {
          storeDish['quantity'] = quantity
          return
        }
        else{
          alreadyInCart = 0
        }
      }
      if (alreadyInCart == 0 || this.cart.length == 0)
      {
        dish['quantity'] = quantity
        this.cart.push(dish)
      }
      console.log(this.cart)
    }
  },
  getters: {
    
  },
});