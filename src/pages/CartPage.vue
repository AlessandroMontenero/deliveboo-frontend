<!-- Schermata di riepilogo del carrello -->
<!-- Per il suo z-index, nasconde il componente CartComponent.vue (il carrello) -->

<script>
import { useCartStore } from '../stores/cart';
import { useEndpointStore } from '../stores/endpoint.js';
export default {
    data() {
        return {
            cart: useCartStore(),
            endpoint: useEndpointStore()
        }
    }
}
</script>

<template>
    <div class="cart-container">
        <div class="cart-backdrop" @click="$emit('close')"></div>
            <div class="cart" @click="$emit('cartExpanded')">
                
                <div v-if="cart.dishes.length" class="container">
            
                    <div class="dishes">
                    <div class="container">
                        <div class="dish" v-for="dish, i in cart.dishes">
    
                            <img :src=" endpoint.endpoint + dish.image" alt="" srcset="">
    
                            <span class="name">
                                {{ dish.name }}
                            </span>
                            <div class="quantity-buttons d-flex gap-3 justify-content-center fs-4">

                                <div @click="dish.quantity != 1 ? dish.quantity-- : dish.quantity = 1" class="d-flex align-items-center justify-content-end btn-hover">
                                    -
                                </div>
                                <div class="d-flex align-items-center justify-content-end">
                                    {{ dish.quantity }}
                                </div>
                                <div @click="dish.quantity++" class="d-flex align-items-center justify-content-end btn-hover">
                                    +
                                </div>
                            </div>
                                <div @click="cart.removeDish(i)" class="d-flex align-items-center justify-content-end fs-4">
                                    X
                                </div>
                                <span></span>
                                <span class="description">{{dish.description}}</span>
                                <div class="d-flex justify-content-end">
                                    {{ (dish.price * dish.quantity).toFixed(2) }}€
                                </div>
                        </div>
                    </div>
                    </div>

                </div>

                <div v-if="cart.dishes.length" class="container bottom-cart d-flex w-100 justify-content-center">

                    <div class="button red" @click="cart.deleteCart">
                            Svuota
                    </div>
                    <div class="button" @click="$router.push('/checkout')">
                            <a href="/checkout">
                                <span>
                                    ORDINA ORA |
                                </span>
                                <span>
                                    {{ cart.totalPrice }}€
                                </span>
                            </a>
                    </div>

                </div>
        

                <!-- se il carrello è vuoto -->
                <div v-if="!cart.dishes.length">

                    <h2 class="empty-chart">
                        Il carrello è vuoto!
                    </h2>

                </div>

            </div>
    </div>


</template>
<style lang="scss" scoped>
a {
    text-decoration: none;
    color: inherit;
}

.cart-container {

    display: flex;

    @media (orientation: landscape) {
        flex-direction: row;

        .cart-backdrop {
            height: 100vh;
            width: 60%;
        }

        .cart {
            height: 100vh;
            width: 100%;
        }

        .bottom-cart {
            max-width: 60%;
        }
    }

    @media (orientation: portrait) {
        flex-direction: column;

        .cart-backdrop {
            height: 20vh;
            width: 100%;
        }

        .cart {
            width: 100%;
            height: 80vh;
        }
    }

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;

    .cart-backdrop {
        background-color: black;
        opacity: var(--backdrop-opacity);
    }

    .cart {
        background-color: var(--bg-color);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        z-index: 3;
        overflow-y: scroll;
        margin: 0;
    }

    .dishes {
        bottom: 5rem;
        top: calc(var(--cartComponent-mobile-height) + 4.5rem);
        left: 0;
        right: 0;
        margin: 10px auto 5rem auto;

        .container {
            display: grid;
            grid-auto-rows: auto;
            grid-template-columns: 1fr;
            gap: 5px;
        }

        .dish {
            padding: 0 5px;
            position: relative;
            max-height: 150px;
            display: grid;
            grid-template-columns: 5fr 10fr 4fr 1fr;
            grid-auto-rows: auto;
            align-items: center;
            font-size: 1.2rem;
            margin-bottom: 10px;

            .name {
                font-size: 1.2rem;
                line-height: 1.5rem;
                max-height: 3rem;
                overflow: hidden;
            }

            img {
                margin: auto 5px;
                width: 80px;
                height: 80px;

                @media screen and (min-width: 968px) {
                    width: 100px;
                    height: 100px;
                }

                object-fit: contain;
                object-position: center;
            }

            .quantity-buttons {
                background-color: var(--bg-primary-color);
                align-items: center;
                border-radius: 10px;
                max-height: 50px;
            }
            
            .description{
                font-size: .8rem;
                line-height: 1rem;
                overflow: hidden;
                max-height: 2rem;
            }

            &::after {
                content: '';
                position: absolute;
                bottom: -10px;
                border-radius: 20px;
                width: 30%;
                height: 5px;
                background: var(--bg-secondary-color);
            }
        }
    }

    .bottom-cart {
        bottom: 0;
        position: fixed;
        max-height: 5rem;
        z-index: 2;
        background-color: inherit;
    }

    .button {
        padding: 20px;
        white-space: nowrap;
        margin: 1rem;
        background-color: var(--bg-secondary-color);
        border-radius: 20px;
        font-weight: 600;
        width: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        a {
            color: white;

            span {
                color: white;
            }
        }

        &.red {
            width: 25%;
            background-color: red;
        }
    }
}
.empty-chart {
    color: var(--bg-secondary-color);
    margin-top: 45vh;
}
</style>   
