export type OEmbedData = {
  title?: string;
  provider_name?: string;
  author_name?: string;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
  html?: string;
  width?: number;
  height?: number;
  type?: string;
};

function getProviderEndpoint(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();

    if (host === 'youtube.com' || host === 'm.youtube.com' || host.endsWith('.youtube.com')) {
      return 'https://www.youtube.com/oembed';
    }

    if (host === 'instagram.com' || host === 'instagr.am' || host.endsWith('.instagram.com')) {
      return 'https://www.instagram.com/oembed/';
    }

    if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) {
      return 'https://www.tiktok.com/oembed';
    }

    if (host === 'spotify.com' || host === 'open.spotify.com' || host.endsWith('.spotify.com')) {
      return 'https://open.spotify.com/oembed';
    }

    if (host === 'tidal.com' || host.endsWith('.tidal.com')) {
      return 'https://listen.tidal.com/oembed';
    }

    if (host === 'music.apple.com' || host === 'apple.com' || host.endsWith('.apple.com')) {
      return 'https://tools.applemediaservices.com/api/apple-media/music/oembed';
    }

    if (host === 'soundcloud.com' || host === 'm.soundcloud.com' || host.endsWith('.soundcloud.com')) {
      return 'https://soundcloud.com/oembed';
    }
  } catch {
    return null;
  }

  return null;
}

export async function getOEmbed(url: string): Promise<OEmbedData | null> {
  const endpoint = getProviderEndpoint(url);
  if (!endpoint) return null;

  const requestUrl = new URL(endpoint);
  requestUrl.searchParams.set('url', url);
  requestUrl.searchParams.set('format', 'json');

  const response = await fetch(requestUrl.toString(), {
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;
  return response.json() as Promise<OEmbedData>;
}
