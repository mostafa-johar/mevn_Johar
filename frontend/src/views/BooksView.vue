<script lang="ts" setup>
// imports from vue
import { ref, computed } from 'vue';

// variables
const val = ref<boolean>(true)
const loading = ref<boolean>(true)
const books = ref<any>([])
const serverURL = ref(import.meta.env.SERVER_URL) 
const baseURL = ref<string>(`${serverURL.value}/api/books`)
const selectCategory = ref<string>('')
const error = ref<string>('')


/*============================
-- Fetch Data
===================================*/

// get data form backend
async function getData() {
    try {
        const response = await fetch(baseURL.value)
        if (!response.ok) {
            throw new Error('Faild to fetch data')
        }
        const data = await response.json()
        books.value = data
        loading.value = false
    }
    catch (err) {
        console.log(err)
        loading.value = false
        error.value = 'Error fetching data. Please try again later'
    }
}
// call function 
getData()

// filter data to use it
const filterBooks = computed(() => {
    let filterData = books.value
    return filterData.filter((item: any) => {
        if (selectCategory.value) {
            return item.category.includes(selectCategory.value)
        } else {
            return books.value
        }
    })
})



</script>

<template>
    <div>
        <!-- title -->
        <h1>Books</h1>
        <p>
            This is where we use NodeJs,
            Express & MongoDB to grab some data. The data below is pulled from a MongoDB database.
        </p>
        <router-link to="/addBook">+ Add New Book</router-link>
        <h3>Fetch Example</h3>
        <h5 class="category_title">Categories</h5>

        <select class="category_select" v-model="selectCategory">
            <option value="">All</option>
            <option value="romance">Romance</option>
            <option value="science">Science</option>
            <option value="crime">Crime</option>
            <option value="food">Food</option>
            <option value="adventure">Adventure</option>
            <option value="thriller">Thriller</option>
            <option value="fiction">Fiction</option>
            <option value="other">other</option>
        </select>

        <!-- show data when fetch -->
        <div v-if="val" class="books">

            <!-- show loading untill fetch data -->
            <div v-if="loading">loading....</div>
            <!-- data -->
            <div class="box_card" v-for="book in filterBooks" :key="book._id" v-else>
                <div class="img_box">
                    <img :src="`${serverURL}/uploads/${book.thumbnail}`" :alt="book.title">
                </div>
                <router-link :to="`book/${book.slug}`">{{ book.title }}</router-link>
            </div>

        </div>

        <!-- if there is Error when fetch Data -->
        <div v-if="error">{{ error }}.</div>

    </div>
</template>

<style scoped>
h3 {
    font-size: 1.5rem;
    color: var(--titleColor);
}

.category_title {
    margin: 0;
    margin-bottom: 2px;
    font-size: 1rem;
    font-weight: 500;
}

.category_select {
    padding: .5rem;
    width: 12rem;
    margin: .5rem;
}

/*-------- 
-- Books grid
--------*/
.books {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0;
}

.books .box_card .img_box {
    width: 172px;
    height: 250px;
    border-radius: 10px;
    overflow: hidden;
}

.books .box_card .img_box img {
    width: 100%;
    height: 100%;
    display: block;


}

.books .box_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
}

/*------- 
-- media query
---------*/
@media (max-width:380px) {
    .books .box_card .img_box {
        width: 150px;
        height: 230px;
    }
}
</style>
