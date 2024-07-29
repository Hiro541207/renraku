const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let posts = [];

// 投稿を取得するエンドポイント
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// 投稿を保存するエンドポイント
app.post('/api/posts', (req, res) => {
    const post = req.body;
    posts.push(post);
    res.status(201).json(post);
});

// 投稿を全て削除するエンドポイント
app.delete('/api/posts', (req, res) => {
    const password = req.body.password;
    if (password === 'kensa') {
        posts = [];
        res.status(200).send('All posts deleted');
    } else {
        res.status(403).send('Forbidden');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
