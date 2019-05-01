import { Request, Response} from 'express';

import { connect } from '../database';

import { Posts } from '../interfaces/posts.interface';

export async function getPosts(req: Request ,res: Response): Promise <Response> {

    const conn = await connect();

    const posts = await conn.query('SELECT * FROM posts');

    return res.json(posts[0]);
    
}

export async function getPost(req: Request ,res: Response): Promise <Response> {

    const {id} = req.params;

    const conn = await connect();

    const post = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);

    return res.json(post[0]);
    
}

export async function createPosts( req: Request ,res: Response ) {

    const newPost:Posts = req.body;

    const conn = await connect();

    const posts = await conn.query('INSERT INTO posts SET ? ', [newPost]);    

    return res.json({
        message: 'Post created',
        data: newPost,
        resp: posts
    });
    
}

export async function updatePost( req: Request ,res: Response ) {

    const {id} = req.params;

    const updatePost: Posts = req.body;

    const conn = await connect();

    const post = await conn.query('UPDATE posts SET ? WHERE id = ?', [updatePost,id]);

    return res.json({

        message: 'post updated',
        resp: post,

    });
    
}

export async function deletePost(req: Request ,res: Response): Promise <Response> {

    const {id} = req.params;

    const conn = await connect();

    await conn.query('DELETE FROM posts WHERE id = ?', [id]);

    return res.json({
        message: `post deleted`
    });
    
}