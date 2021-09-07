type Options = {
  text?: string,
  url?: string,
  hashtags?: string[],
  via?: string,
}

const defaultOptions: Options = {
  text: '',
  url: '',
  hashtags: [],
  via: '',
}

export function toTweetIntent (options: Options = {}): `https://twitter.com/intent/tweet?${string}` {
  const { text, url, hashtags, via } = { ...defaultOptions, ...options },
        encodedText = text ? encodeURIComponent(text) : text,
        encodedHashtags = hashtags.join(','),
        params = [
          encodedText ? `text=${encodedText}&` : '',
          url ? `url=${url}&` : '',
          encodedHashtags ? `hashtags=${encodedHashtags}&` : '',
          via ? `via=${via}` : ''
        ],
        encodedParams = params
          .filter(param => param)
          .join('&')

  return `https://twitter.com/intent/tweet?${encodedParams}`
}
