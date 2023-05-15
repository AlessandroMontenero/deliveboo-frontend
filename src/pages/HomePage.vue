<script>
import axios from 'axios'
export default {
  created(){
    axios.get('http://127.0.0.1:8001/api/restaurants')
    .then((res) => {
      this.restaurants = res.data.data
      console.log(this.restaurants)
    })
    },
  data() {
    return {
      restaurants: []
    }
  }  
    }
</script>

<template>
  <div v-for="restaurant in restaurants">
    {{ restaurant.name }}
    <ul>
      <li v-for="dish in restaurant.dishes">
        {{ dish.name }}
      </li>
    </ul>
  </div>
    
</template>
