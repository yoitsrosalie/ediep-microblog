import { Post } from "@/lib/types";
import { getPostMeta } from "@/lib/format";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { isNew, display } = getPostMeta(post.created_at);

  return (
    <div className="post">
        <div className="post-meta">
            {isNew && (
                <div className="new-flag">
                    <span className="dot" />New
                </div>
            )}
            <span className="timestamp">{display}
            </span>
        </div>
        <div className="headline-bracket">
            <span className="slash">// </span> 
            {post.headline} 
            <span className="slash"> //</span>
        </div>
    {post.type === 'text' && post.content && (
        <p className="post-body">{post.content}</p>
    )}

    {post.type === 'image' && (
    <>
        {post.content && <p className="post-body">{post.content}</p>}
        {post.image_url ? (
        <img src={post.image_url} alt={post.headline} className="media-image" />
        ) : (
        <div className="media-placeholder">Photo</div>
        )}
    </>
    )}

    {post.type === 'embed' && (
    <>
        {post.content && <p className="post-body">{post.content}</p>}
        <div className="embed">
        <div className="embed-thumb" />
        <div className="embed-text">{post.embed_label ?? null}</div>
        </div>
    </>
    )}
    </div>
  );
}
