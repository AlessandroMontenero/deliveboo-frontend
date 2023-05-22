<!-- Icona di ricerca della navbar -->

<script>
/* Importo il componente Search */
import Search from '../SearchComponent.vue'
import axios from 'axios'
export default{
    watch: {
    $route(newVal, oldVal) {
      this.expanded = newVal.meta && newVal.meta.expanded;
    }
    },
    data(){
        return{
            /* Variabile per aprire o chiudere il componente Search */
            expanded: 0,
            restaurants: [], 
        }
    },
    components: {
        /* Componente ricerca */
        Search
    },
    /* creazione di due chiamate axios distinte per ristoranti e piatti */

    methods: {
    fetchRestaurants(query) {
      console.log(query)
      axios
        .get('http://127.0.0.1:8000/api/search/' + query)
        .then((RestaurantResponse) => {
          this.restaurants = RestaurantResponse.data
        });
    }
  },
}

</script>

<template>

    <!-- Icona di ricerca -->
    <!-- @click apre il componente Search -->

    <i class="fa-solid fa-magnifying-glass" 
    @click="expanded = 1" 
    ></i>

    
    <!-- Componente Search -->

    <div v-if="expanded">
        <Search @search="fetchRestaurants" v-show="expanded" 
        @close="expanded = 0" :restaurants="restaurants"/>
        
        <router-view v-if="!expanded"></router-view>
    </div>
</template>

<style lang="scss">

</style>