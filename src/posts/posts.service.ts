import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostNotFoundException } from './post-not-found.exception';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './posts.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  getPosts() {
    return this.postRepository.find();
  }

  async getPost(id: number) {
    const post = await this.postRepository.findOne(id);
    if (post) return post;
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postRepository.create(post);
    await this.postRepository.save(newPost);
    return newPost;
  }

  async replacePost(id: number, post: UpdatePostDto) {
    await this.postRepository.update(id, post);
    const updatedPost = await this.postRepository.findOne(id);
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const resp = await this.postRepository.delete(id);
    if (!resp.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
