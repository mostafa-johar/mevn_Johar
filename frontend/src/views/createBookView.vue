<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// to redirct 
const router = useRouter()
const serv = ref(import.meta.env.VITE_API_URL)
const baseURL = ref(`${serv.value}/api/books`)
const title = ref<string>('')
const slug = ref<string>('')
const stars = ref<any>()
const description = ref<string>('')
const CategoriesComma = ref()
const image = ref<string>(`${serv.value}/uploads/no-image-selected.jpg`);
const thumbnail = ref<string>('')

// Function redirect 
const redirect = (route: string) => {
    router.push(route)
}

const onChangeCategory = (e: any) => {
    CategoriesComma.value = e.target.value.split(',').map((cate: string) => cate.trim())
    console.log(CategoriesComma.value)
}

const handleChange = (e: any) => {
    image.value = URL.createObjectURL(e.target.files[0])
    thumbnail.value = e.target.files[0]
}

/*============================
-- Fetch Data
===================================*/

// get data form backend
function PostData() {

    const formatData = new FormData()
    formatData.append('title', title.value)
    formatData.append('slug', slug.value)
    formatData.append('stars', stars.value)
    formatData.append('description', description.value)
    formatData.append('category', CategoriesComma.value)
    formatData.append('thumbnail', thumbnail.value)

    fetch(baseURL.value, {
        method: "post",
        body: formatData

    })
        .then(response => {
            redirect('/books')
        })
        .catch(error => {
            console.log(error)
        })

}

</script>

<template>
    <main>
        <h1>Create Book</h1>
        <p>
            This is where we use NodeJs,
            Express & MongoDB to grab some data. The data below is pulled from a MongoDB database.
        </p>
        <form class="details_book" @submit.prevent="PostData" enctype="multipart/form-data">
            <!-- col-1 left -->
            <div class="img_book">
                <label>Upload thumbnail</label>
                <img :src="image" alt="image-selected">
                <input type="file" accept="image/gif, image/jpeg, image/png" @change="handleChange($event)">
            </div>
            <!-- col-2 right -->
            <div class="col-right">
                <div class="form_group">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" v-model="title">
                </div>
                <div class="form_group">
                    <label for="slug">Slug</label>
                    <input type="text" id="slug" name="slug" v-model="slug">
                </div>
                <div class="form_group">
                    <label for="stars">Stars</label>
                    <input type="number" id="stars" min="0" max="5" name="stars" v-model="stars">
                </div>
                <div class="form_group">
                    <label for="description">Description</label>
                    <textarea name="description" v-model="description"></textarea>
                </div>
                <div class="form_group">
                    <label for="Categories_comma">Categories (comma-seperated)</label>
                    <input type="text" id="Categories_comma" v-on:change="onChangeCategory" name="CategoriesComma"
                        v-model="CategoriesComma">
                </div>
                <div class="form_group">
                    <button type="submit">SUBMIT</button>
                </div>
            </div>


        </form>

    </main>
</template>

<style scoped>
/*------------- 
-- left 
--------------*/
.details_book {
    display: flex;
    flex-wrap: wrap;
    gap: .8rem;
}

.details_book .img_book {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
}

.details_book .img_book img {
    max-width: 100%;
    height: auto;
}

/*------------- 
-- right 
--------------*/
.col-right {
    flex: 2;
}

.details_book .form_group {
    margin-bottom: 0.5rem;
}

.details_book .form_group label {
    display: block;
}

.details_book .form_group input {
    width: 100%;
    height: 2rem;
}

.details_book .form_group textarea {
    width: 100%;
    height: 8rem;
    margin-bottom: .5rem;
    resize: none;
    padding: .5rem;
}

.details_book .form_group button {
    width: 100%;
    height: 2.5rem;
    background-color: var(--mainColor);
    color: white;
}
</style>