<template>
    <main class="aboutPage">
        <h1>About</h1>
        <p>
            <span>Demo project showcasing the use of NodeJs, Express & MongoDB.</span>
            <span>That's pretty much it. </span>
        </p>
        <table>
            <thead>
                <th>ACTION</th>
                <th>URL</th>
                <th>HTTP</th>
                <th>BODY</th>
                <th>RESULT</th>
            </thead>
            <tbody>
                <tr>
                    <td style="color: blue;">READ</td>
                    <td>/api/books</td>
                    <td>GET</td>
                    <td>Empty</td>
                    <td>Returns ALL Books</td>
                </tr>
                <tr>
                    <td style="color: blue;">READ</td>
                    <td>/api/books/id</td>
                    <td>GET</td>
                    <td>Empty</td>
                    <td>Returns A Single Book</td>
                </tr>
                <tr>
                    <td style="color: green;">CREATE</td>
                    <td>/api/books</td>
                    <td>POST</td>
                    <td>JSON?</td>
                    <td>New Book Created</td>
                </tr>
                <tr>
                    <td style="color: orange;">UPDATE</td>
                    <td>/api/books/:id</td>
                    <td>PUT</td>
                    <td>JSON?</td>
                    <td>Updates Book</td>
                </tr>
                <tr>
                    <td style="color: red;">DELETE</td>
                    <td>/api/books/:id</td>
                    <td>DELETE</td>
                    <td>JSON?</td>
                    <td>Delete Book</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>
<style scoped>
.aboutPage {
    overflow: auto;
}

p {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1rem;

}

table {
    width: 100%;
}

th,
td {
    border: 1px solid #000;
}

td {
    padding: .5rem;
}
</style>