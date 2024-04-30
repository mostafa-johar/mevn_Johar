<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// variables
const book = ref<any>({})
const route = useRoute()
const { slug } = route.params

/*============================
-- Fetch Data
===================================*/

// get data form backend
async function getData() {
    try {
        const response = await fetch(`http://localhost:5000/api/books/${slug}`)
        if (!response.ok) {
            throw new Error('Faild to fetch data')
        }
        const data = await response.json()
        book.value = data
    }
    catch (err) {
        console.log(err)
    }
}
// call function 
getData()

</script>
<template>
    <main class="singleBook">
        <router-link to="/books">⬅️ Books</router-link>

        <section class="detailBook">
            <!-- col-1 left -->
            <div class="img_box">
                <img :src="`http://localhost:5000/uploads/${book.thumbnail}`" :alt="book.title" loading="lazy">
                <router-link :to="`/editBook/${book.slug}`">➕edit</router-link>
            </div>

            <!-- col-2 right -->
            <div class="info_book">
                <h3 class="title">{{ book.title }}</h3>
                <p class="description">
                    {{ book.description }}
                </p>
                <p>
                    <span class="stars">Stars: </span>
                    <span> {{ '⭐'.repeat(book.stars) }}</span>
                </p>
                <dl>
                    <dt class="category">Category</dt>
                    <dd v-for="(item, index) in book.category" :key="index">- {{ item }}</dd>
                </dl>

            </div>
        </section>


    </main>
</template>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.detailBook {
    display: flex;
    align-items: center;
    gap: 1rem;
}

@media (max-width: 767px) {
    .detailBook {
        flex-direction: column;
    }
}

/* left img */
.detailBook .img_box {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    flex: 1;
}

.detailBook img {
    max-width: 100%;
}

/* right info */
.info_book {
    padding-top: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 2;
}

.info_book .title {
    font-size: 1.7rem;
    color: #281164;
}

.info_book .stars,
.info_book .category {
    font-weight: 500;
}
</style>