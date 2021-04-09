import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PostNotFoundException } from './post-not-found.exception';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './posts.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async getPosts(offset?: number, limit?: number) {
    const [items, count] = await this.postRepository.findAndCount({
      order: { id: 'ASC' }, // 不设置order的话，typeorm会报错
      skip: offset,
      take: limit,
    });
    return {
      items,
      count,
    };
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

  async searchForPosts(search: string, offset: number, limit: number) {
    const [items, count] = await this.postRepository.findAndCount({
      where: { title: Like(`%${search}%`) },
      order: { id: 'ASC' },
      skip: offset,
      take: limit,
    });
    return {
      items,
      count,
    };
  }
}
