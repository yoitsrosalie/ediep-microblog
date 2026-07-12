import PostCard from '@/components/PostCard';
import { supabase } from '@/lib/supabase';
import { Post } from '@/lib/types';

export default async function Home() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching posts:', error);
    return <div>Something went wrong loading the feed</div>;
  }

  return (
    <main className="feed">
      {posts?.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
