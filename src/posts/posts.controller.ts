import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationParams } from 'src/utils/pagination-params';
import { CreatePostDto, UpdatePostDto } from './posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(
    @Query('search') search: string,
    @Query() { offset, limit }: PaginationParams,
  ) {
    console.log(search);
    if (search) {
      return this.postsService.searchForPosts(search, offset, limit);
    }
    return this.postsService.getPosts(offset, limit);
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPost(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async replacePost(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.replacePost(id, post);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ParseIntPipe)
  async deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }
}
