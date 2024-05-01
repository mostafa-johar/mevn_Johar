<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// to get slug from Url
const route = useRoute()
const slugParam = route.params.slug

// to redirct 
const router = useRouter()

// Variables
const serv = ref(import.meta.env.VITE_API_URL)
const baseURL = ref(`${serv.value}/api/books`)
const bookId = ref<string>('')
const title = ref<string>('')
const slug = ref<string>('')
const stars = ref()
const description = ref<string>('')
const CategoriesComma = ref<any>()
const image = ref<string>(``);
const thumbnail = ref<string>('')


// Function redirect 
const redirect = (route: string) => {
    router.push(route)
}

// function To change category
const onChangeCategory = (e: any) => {
    CategoriesComma.value = e.target.value.split(',').map((cate: string) => cate.trim())
}

// function to changeImg
const onImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {

        image.value = URL.createObjectURL(e.target.files[0])
        thumbnail.value = e.target.files[0]
    }

}

/*===================================
-- Fetch Data
===================================*/

// [1] get data form backend
async function fetchData() {

    try {
        const response = await fetch(`${baseURL.value}/${slugParam}`)
        const data = await response.json()

        // updata inputs
        bookId.value = data._id
        title.value = data.title;
        slug.value = data.slug;
        description.value = data.description;
        stars.value = data.stars;
        CategoriesComma.value = data.category;
        thumbnail.value = data.thumbnail
        image.value = `${serv.value}/uploads/${thumbnail.value}`

    }
    catch (error) {
        console.log('wrong !! = ', error)
    }

}
// call function 
fetchData()


// [2] To update Book
const updateBook = () => {

    const formatData = new FormData()
    formatData.append('bookId', bookId.value)
    formatData.append('title', title.value)
    formatData.append('slug', slug.value)
    formatData.append('stars', stars.value)
    formatData.append('description', description.value)
    formatData.append('category', CategoriesComma.value)

    if (thumbnail.value) {
        formatData.append('thumbnail', thumbnail.value)
    }

    fetch(baseURL.value, {
        method: "PUT",
        body: formatData

    })
        .then(response => {
            if (response.ok) {
                redirect('/books')

            } else {
                alert('It is not Ok , try again ⚠️')
            }

        })
        .catch(error => {
            console.log(error)
        })

}


// [2] To Delete Book

const deleteBook = async () => {

    try {
        const response = await fetch(`${baseURL.value}/${bookId.value}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            redirect('/books')
        }
    }
    catch (error) {
        console.log('mistake in delete', error)
    }

}

</script>

<template>
    <main>
        <h1>Create Book</h1>
        <p>
            This is where we use NodeJs,
            Express & MongoDB to grab some data. The data below is pulled from a MongoDB database.
        </p>
        <!-- Remove book -->
        <button class="delete_book" v-on:click.prevent="deleteBook">Delete</button>

        <!-- form Book -->
        <form class="details_book" @submit.prevent="updateBook" enctype="multipart/form-data">
            <!-- col-1 left -->
            <div class="img_book">
                <label>Upload thumbnail</label>
                <img :src="image" alt="image-selected">
                <input type="file" accept="image/gif, image/jpeg, image/png" @change="onImageChange">
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
    gap: .8rem;
}

@media (max-width: 480px) {
    .details_book {
        flex-direction: column;
    }
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

/* delete Book */
.delete_book {
    background-color: rgb(255 0 0 / 80%);
    color: rgb(255, 255, 255);
    font-size: 1.3rem;
    font-weight: 500;
    padding: .5rem 1rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
}

.delete_book:hover {
    background-color: rgb(197 4 4 / 80%);
}
</style>