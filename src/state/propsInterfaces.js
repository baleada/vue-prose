export default [
  {
    "name": "ProseArticle",
    "interface": {
      "classes": "string",
      "getScrollableContainer": "function"
    }
  },
  {
    "name": "ProseAside",
    "interface": {
      "type": "string",
      "classes": "string"
    }
  },
  {
    "name": "ProseBlockquote",
    "interface": {
      "readerCanTweet": "boolean",
      "tweetText": "string",
      "tweetUrl": "string",
      "tweetVia": "string",
      "tweetHashtags": "array",
      "classes": "string"
    }
  },
  {
    "name": "ProseCodeblock",
    "interface": {
      "totalLines": "number",
      "lang": "string",
      "readerCanCopy": "boolean",
      "codeblockHasLang": "boolean",
      "codeblockHasLineNumbers": "boolean",
      "classes": "string"
    }
  },
  {
    "name": "ProseDetails",
    "interface": {
      "summary": "string",
      "classes": "string"
    }
  },
  {
    "name": "ProseHeading",
    "interface": {
      "level": "number",
      "readerCanCopy": "boolean",
      "classes": "string",
      "contentsClasses": "string",
      "interfaceClasses": "string",
      "interfaceContentsClasses": "string"
    }
  },
  {
    "name": "ProseList",
    "interface": {
      "tag": "string",
      "totalItems": "number",
      "readerCanSearch": "boolean",
      "searchIgnoresQueryCase": "boolean",
      "readerCanChangeSearchCaseSensitivity": "boolean",
      "classes": "string"
    }
  },
  {
    "name": "ProseMedia",
    "interface": {
      "type": "string",
      "src": "string",
      "classes": "string"
    }
  },
  {
    "name": "ProseSection",
    "interface": {
      "classes": "string"
    }
  },
  {
    "name": "ProseTable",
    "interface": {
      "totalBodyRows": "number",
      "totalColumns": "number",
      "readerCanSearchByQuery": "boolean",
      "searchIgnoresQueryCase": "boolean",
      "minimumSearchScore": "number",
      "readerCanChangeSearchCaseSensitivity": "boolean",
      "classes": "string",
      "ariaLabel": "string"
    }
  }
]