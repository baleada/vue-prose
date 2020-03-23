export default function toTweetIntent (options = {}) {
  options = {
    text: '',
    url: '',
    hashtags: [],
    via: '',
    ...options
  }

  const { text, url, hashtags, via } = options,
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

  return 'https://twitter.com/intent/tweet?' + encodedParams
}
