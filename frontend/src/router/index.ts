import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BooksView.vue')
    },
    {
      path: '/addBook',
      name: 'creakBook',
      component: () => import('../views/createBookView.vue')
    },
    {
      path: '/book/:slug',
      name: 'singleBook',
      component: () => import('../views/SingleBookView.vue')
    },
    {
      path: '/editBook/:slug',
      name: 'editBook',
      component: () => import('../views/EditBookView.vue')
    }
  ]
})

export default router

