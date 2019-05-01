import { Router } from 'express';
import { getPosts, createPosts, getPost, updatePost, deletePost } from '../controllers/posts.controller';

const router = Router();

router.route('/')
    .get(getPosts)
    .post(createPosts);

router.route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);

export default router;