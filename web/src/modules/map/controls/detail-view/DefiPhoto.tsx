import { useEffect, useState } from 'react';

const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

interface WikimediaPhoto {
  thumbUrl: string;
  descriptionUrl: string;
  credit: string;
}

function extractFilename(tag: string): string | null {
  if (!tag) return null;
  const urlMatch = tag.match(/wiki\/(File:[^#?]+)/i);
  if (urlMatch) return decodeURIComponent(urlMatch[1]);
  if (/^file:/i.test(tag)) return tag;
  if (/\.(jpe?g|png|gif|webp|svg)$/i.test(tag)) return `File:${tag}`;
  return null;
}

async function fetchWikimediaPhoto(
  wikimediaTag?: string,
  imageTag?: string
): Promise<WikimediaPhoto | null> {
  const filename = extractFilename(wikimediaTag ?? imageTag ?? '');
  if (!filename) return null;

  const params = new URLSearchParams({
    action: 'query',
    titles: filename,
    prop: 'imageinfo',
    iiprop: 'url|extmetadata',
    iiurlwidth: '400',
    format: 'json',
    origin: '*',
  });

  try {
    const res = await fetch(`${COMMONS_API}?${params}`);
    if (!res.ok) return null;
    const data = await res.json();
    const page = Object.values(data?.query?.pages ?? {})[0] as any;
    if (!page || page.missing !== undefined) return null;
    const info = page?.imageinfo?.[0];
    if (!info?.thumburl) return null;
    const credit =
      info.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, '') ?? 'Wikimedia Commons';
    return {
      thumbUrl: info.thumburl,
      descriptionUrl: info.descriptionurl ?? `https://commons.wikimedia.org/wiki/${encodeURIComponent(filename)}`,
      credit,
    };
  } catch {
    return null;
  }
}

type DefiPhotoProps = {
  wikimediaCommons?: string;
  image?: string;
};

export const DefiPhoto = ({ wikimediaCommons, image }: DefiPhotoProps) => {
  const [photo, setPhoto] = useState<WikimediaPhoto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!wikimediaCommons && !image) return;
    setLoading(true);
    fetchWikimediaPhoto(wikimediaCommons, image).then((result) => {
      setPhoto(result);
      setLoading(false);
    });
  }, [wikimediaCommons, image]);

  if (!wikimediaCommons && !image) return null;

  if (loading) {
    return (
      <div className="w-full h-16 flex items-center justify-center">
        <p className="text-xs text-primary-100-green-04 opacity-50">Foto wird geladen…</p>
      </div>
    );
  }

  if (!photo) return null;

  return (
    <div className="flex flex-col gap-1">
      <a href={photo.descriptionUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={photo.thumbUrl}
          alt="Foto des Defibrillators"
          className="w-full rounded-lg object-cover"
          loading="lazy"
        />
      </a>
      <p className="text-xs font-normal text-primary-100-green-04 opacity-60 leading-[150%]">
        📷{' '}
        
          href={photo.descriptionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {photo.credit} · Wikimedia Commons
        </a>
      </p>
    </div>
  );
};