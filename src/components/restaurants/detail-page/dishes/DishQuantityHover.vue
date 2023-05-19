<!-- Componente per scegliere la quantità del piatto da aggiungere al carrello -->
<script>
import {useCartStore} from '../../../../stores/cart'
export default{
    props: {
        dish:Object
    },
    data(){
        return{
            cart: useCartStore(),
            quantity: 1
        }
    },
    created(){
        this.cart.cart.forEach((storeDish) => {
            if(this.dish.id == storeDish.id)
            {
                this.quantity = storeDish.quantity
            }
        });
    }

}
</script>

<template>
    <!-- Container della schermata -->
    <div class="quantityHover">

        <!-- Scurisce la porzione non coperta dalla schermata e al click chiude la schermata -->
        <div class="backdrop" @click="$emit('close')">

        </div>

        <!-- Schermata -->
        <div class="quantity d-flex justify-content-center">
            <div class="container d-flex flex-column m-2 h-100">
                <div class="title d-flex justify-content-center">
                    <h1>
                        {{ dish.name }}
                        <div @click="cart.deleteCart">ciao</div>
                    </h1>
                </div>
                <div class="description h-100">
                    {{ dish.description }}
                </div>
                <div class="selectQuantity mb-4">
                    <div class="buttons">
                        <div @click=" quantity != 1 ? quantity-- : quantity = 1">-</div>
                        <div class="div">{{quantity}}</div>
                        <div @click="quantity++ ">+</div>
                    </div>
                    <div class="add-to-cart" @click="cart.addToCart(dish, quantity)">
                        Aggiungi al carrello
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>
<style lang="scss">
.quantityHover{
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    display: flex;
    padding-left: 0 !important;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    .backdrop{
        width: 100vw;
        height: calc(100vh - var(--quantity-height));
        background-color: black;
        opacity: var(--backdrop-opacity);
    }
    .quantity{
        height: var(--quantity-height);
        width: 100vw;
        background-color: var(--bg-primary-color);

    }

    .add-to-cart{
        width: 80%;
        background-color: var(--bg-secondary-color);
        display: flex;
        justify-content: center;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1rem;
        padding: 1rem;
        border-radius: 10px;
        &:hover{
            opacity: .5;
        }
    }
    .buttons{
        display: flex;
        justify-content: center;
        font-size: 2.5rem;
        gap: 2rem;
    }
}
</style>