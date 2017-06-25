// import path from 'path';
import express from 'express';

const router = express.Router();

// router.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Index',
//   });
// });

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    evil: `<script>alert('you hacked')</script>`,
  });
});

// router.get('/chat', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/chat.html'))
// });

// router.get('/join-chat', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/join.html'))
// });

router.get('/', (req, res) => {
  res.send('<h1>Index</h1>');
});

router.get('/hello', (req, res) => {
  res.send('Hello!');
});


export default router;
