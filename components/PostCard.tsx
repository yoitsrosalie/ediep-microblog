import { Post } from "@/lib/types";
import { getPostMeta } from "@/lib/format";
import { getOEmbed } from "@/lib/oembed";

interface PostCardProps {
  post: Post;
}

export default async function PostCard({ post }: PostCardProps) {
  const { isNew, display } = getPostMeta(post.created_at);
  const embed =
    post.type === "embed" && post.embed_url
      ? await getOEmbed(post.embed_url)
      : null;

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
        {post.embed_url ? (
          <>
            {embed?.html ? (
              <div
                className="embed-media"
                dangerouslySetInnerHTML={{ __html: embed.html }}
              />
            ) : (
              <a href={post.embed_url} target="_blank" rel="noreferrer" className="embed">
                {embed?.thumbnail_url ? (
                  <img
                    src={embed.thumbnail_url}
                    alt={embed.title ?? post.headline}
                    className="embed-thumb"
                  />
                ) : (
                  <div className="embed-thumb" />
                )}
                <div className="embed-text">
                  <div>{embed?.title ?? post.embed_label ?? post.headline}</div>
                  <div>{embed?.provider_name ?? 'External link'}</div>
                </div>
              </a>
            )}
          </>
        ) : null}
    </>
    )}
    </div>
  );
}
