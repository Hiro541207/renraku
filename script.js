document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('submissionForm');
    const postsDiv = document.getElementById('posts');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const timestamp = new Date().toLocaleString();

        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');
        postHeader.textContent = `名前: ${name} (${timestamp})`;
        postDiv.appendChild(postHeader);

        const postMessage = document.createElement('div');
        postMessage.classList.add('post-message');
        postMessage.textContent = `連絡内容: ${message}`;
        postDiv.appendChild(postMessage);

        const confirmationDiv = document.createElement('div');
        confirmationDiv.classList.add('confirmation');
        
        const confirmButton = document.createElement('button');
        confirmButton.textContent = '確認しました';
        confirmButton.addEventListener('click', () => {
            confirmationDiv.innerHTML = '<span>確認済み</span>';
        });
        confirmationDiv.appendChild(confirmButton);

        postDiv.appendChild(confirmationDiv);
        postsDiv.insertBefore(postDiv, postsDiv.firstChild);

        form.reset();
    });
});
