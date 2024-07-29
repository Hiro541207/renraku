document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('submissionForm');
    const postsDiv = document.getElementById('posts');

    // ローカルストレージから投稿内容を読み込む
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    savedPosts.forEach(post => {
        addPostToDOM(post);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const timestamp = new Date().toLocaleString();
        const confirmed = false;

        // 投稿内容を保存
        const post = { name, message, timestamp, confirmed };
        savedPosts.push(post);
        localStorage.setItem('posts', JSON.stringify(savedPosts));

        addPostToDOM(post);
        form.reset();
    });

    function addPostToDOM(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');
        postHeader.textContent = `名前: ${post.name} (${post.timestamp})`;
        postDiv.appendChild(postHeader);

        const postMessage = document.createElement('div');
        postMessage.classList.add('post-message');
        postMessage.textContent = `連絡内容: ${post.message}`;
        postDiv.appendChild(postMessage);

        const confirmationDiv = document.createElement('div');
        confirmationDiv.classList.add('confirmation');
        
        const confirmButton = document.createElement('button');
        confirmButton.textContent = '確認しました';
        confirmButton.disabled = post.confirmed;
        confirmButton.addEventListener('click', () => {
            post.confirmed = true;
            localStorage.setItem('posts', JSON.stringify(savedPosts));
            confirmationDiv.innerHTML = '<span>確認済み</span>';
        });
        confirmationDiv.appendChild(confirmButton);

        if (post.confirmed) {
            confirmationDiv.innerHTML = '<span>確認済み</span>';
        }

        postDiv.appendChild(confirmationDiv);
        postsDiv.appendChild(postDiv);
    }
});
