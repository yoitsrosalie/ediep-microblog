export type PostType = 'text' | 'image' | 'embed' | 'quote' ;

export interface Post {
  id: string;
  type: PostType;
  headline: string;
  content: string;
  created_at: string;
  updated_at: string | null;
  image_url: string | null;
  embed_url: string | null;
  embed_label: string | null;
}