function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener('click', loadPost);
    document.getElementById("btnViewPost").addEventListener('click', displayPost)
}

attachEvents();


async function displayPost() {
    let id = document.getElementById("posts").value;

    let [post, comments] = await Promise.all([
        getPostById(id),
        viewPost(id)
    ])


    let postTitle = document.getElementById("post-title");
    let postBody = document.getElementById("post-body");
    postTitle.textContent = post.title;
    postBody.textContent = post.body;

    let postComments = document.getElementById("post-comments");
    postComments.replaceChildren()
    comments.forEach(el => {
        let liElement = document.createElement('li');
        liElement.id = el.id;
        liElement.textContent = el.text;

        postComments.appendChild(liElement);
    })

}

async function getPostById(postId) {
    let url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    let res = await fetch(url)
    let data = await res.json();

    return data;
}

async function loadPost() {
    let selectElement = document.getElementById("posts")
    selectElement.replaceChildren()
    let url = 'http://localhost:3030/jsonstore/blog/posts'

    let res = await fetch(url);
    let data = await res.json();

    Object.values(data).forEach(el => {
        let option = document.createElement('option');
        option.textContent = el.title;
        option.value = el.id;

        selectElement.appendChild(option);
    })

    return data;
}

async function viewPost(postId) {
    let url = 'http://localhost:3030/jsonstore/blog/comments'

    let res = await fetch(url);
    let data = await res.json();

    let result = Object.values(data).filter(p => p.postId == postId);

    return result;
}