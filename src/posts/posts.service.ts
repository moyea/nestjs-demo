import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    throw new HttpException('data not found', HttpStatus.NOT_FOUND);
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
    throw new HttpException('data not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const resp = await this.postRepository.delete(id);
    if (!resp.affected) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }
  }
}
