<!-- Schermata di riepilogo del carrello -->
<!-- Per il suo z-index, nasconde il componente CartComponent.vue (il carrello) -->

<script>
import { useCartStore } from '../stores/cart';

export default {
    data() {
        return{
            cart: useCartStore()
        }
    }
}
    /**
     * TODO: Link allo Store
      */
</script>

<template>
    <div class="cart-container">
        <div class="cart-backdrop" @click="$emit('cartClose')"></div>
        <div class="cart" @click="$emit('cartExpanded')">
            <div class="container h-100">
                <div class="h-100">
                    <div v-for="dish in cart.cart" class="w-100 dish">
                            {{ dish.name }}
                    </div>
                </div>
                <div class="order-button">
                    Ordina
                </div>
            </div>
        
            <!-- TODO -->
            <!-- Lista dei piatti nel carrello !!creare componenti Lista e Piatto -->
        
            <!-- In fondo mobile/desktop non lo so tasto che reindirizza alla pagina 'pagamento'  -->
        </div>
    </div>
</template>
<style lang="scss">
.cart-container{
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;

    .cart-backdrop{
        height: 20vh;
        width: 100%;
        background-color: black;
        opacity: var(--backdrop-opacity);
    }

    .cart{
        width: 100%;
        height: 80vh;
        background-color: var(--bg-color);
        z-index: 3;
    }

    .dish{
        max-height: 2rem;
    }
}

</style>