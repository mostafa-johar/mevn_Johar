<template>
    <header>
        <nav>
            <!-- Right => 'logo' -->
            <router-link to="/" class="logo">
                <img src="../assets/vite.svg" alt="logo">
                <p>VueJs</p>
            </router-link>

            <!-- Left => 'Links' -->
            <ul class="links">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/books">Books</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
            </ul>

        </nav>
    </header>
</template>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap:1rem;
    border-bottom: 1px solid #007d9354;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: .5rem;
}
.logo p{
    font-size: 1.25rem;
    font-weight: 500;
    color: #007d93;
}

.links{
    display: flex;
    align-items: center;
    gap: 1.5rem;
}
</style>