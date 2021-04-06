export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface CreatePostDto {
  content: string;
  title: string;
}

export interface UpdatePostDto {
  id: number;
  content: string;
  title: string;
}
