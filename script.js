document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('submissionForm');
    const postsDiv = document.getElementById('posts');
    const clearPostsButton = document.getElementById('clearPostsButton');

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

    clearPostsButton.addEventListener('click', () => {
        const password = prompt('パスワードを入力してください:');
        if (password === 'kensa') { // 管理者用のパスワードを設定
            localStorage.removeItem('posts');
            postsDiv.innerHTML = '';
        } else {
            alert('パスワードが間違っています。');
        }
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
        confirmButton.textContent = post.confirmed ? '確認済み' : '確認しました';
        if (post.confirmed) {
            confirmationDiv.appendChild(document.createElement('span')).textContent = '確認済み';
        } else {
            confirmationDiv.appendChild(confirmButton);
        }
        
        confirmButton.addEventListener('click', () => {
            post.confirmed = true;
            localStorage.setItem('posts', JSON.stringify(savedPosts));
            confirmButton.remove();
            confirmationDiv.appendChild(document.createElement('span')).textContent = '確認済み';
        });

        postDiv.appendChild(confirmationDiv);
        postsDiv.appendChild(postDiv);
    }
});
