document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('submissionForm');
    const postsDiv = document.getElementById('posts');
    const clearPostsButton = document.getElementById('clearPostsButton');

    // サーバーから投稿内容を読み込む
    fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                addPostToDOM(post);
            });
        });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const timestamp = new Date().toLocaleString();
        const confirmed = false;

        // 投稿内容をサーバーに送信
        fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, message, timestamp, confirmed })
        })
        .then(response => response.json())
        .then(post => {
            addPostToDOM(post);
        });

        form.reset();
    });

    clearPostsButton.addEventListener('click', () => {
        const password = prompt('パスワードを入力してください:');
        if (password === 'kensa') {
            fetch('http://localhost:3000/api/posts', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            })
            .then(response => {
                if (response.status === 200) {
                    postsDiv.innerHTML = '';
                } else {
                    alert('パスワードが間違っています。');
                }
            });
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
            fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            });
            confirmButton.remove();
            confirmationDiv.appendChild(document.createElement('span')).textContent = '確認済み';
        });

        postDiv.appendChild(confirmationDiv);
        postsDiv.appendChild(postDiv);
    }
});
