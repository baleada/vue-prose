export default [
  {
    "name": "ProseArticle",
    "interface": {
      "classes": "string"
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
      "canTweet": "boolean",
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
      "lines": "number",
      "canCopy": "boolean",
      "hasLineNumbers": "boolean",
      "classes": "string"
    }
  },
  {
    "name": "ProseColumnheader",
    "interface": {
      "rowgroup": "number",
      "row": "number",
      "index": "number"
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
    "name": "ProseGrid",
    "interface": {
      "canFilterByQuery": "boolean",
      "filterIsCaseSensitive": "boolean",
      "canChangeFilterCaseSensitivity": "boolean",
      "classes": "string",
      "ariaLabel": "string",
      "rows": "array",
      "gridcells": "array"
    }
  },
  {
    "name": "ProseGridContents",
    "interface": {}
  },
  {
    "name": "ProseGridcell",
    "interface": {
      "rowgroup": "number",
      "row": "number",
      "index": "number"
    }
  },
  {
    "name": "ProseHeading",
    "interface": {
      "level": "number",
      "canCopy": "boolean",
      "classes": "string"
    }
  },
  {
    "name": "ProseList",
    "interface": {
      "canFilterByQuery": "boolean",
      "filterIsCaseSensitive": "boolean",
      "canChangeFilterCaseSensitivity": "boolean",
      "classes": "string",
      "listItems": "array"
    }
  },
  {
    "name": "ProseListContents",
    "interface": {
      "isOrdered": "boolean"
    }
  },
  {
    "name": "ProseListItem",
    "interface": {
      "index": "number"
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
    "name": "ProseRow",
    "interface": {
      "rowgroup": "number",
      "index": "number"
    }
  },
  {
    "name": "ProseRowgroup",
    "interface": {
      "index": "number"
    }
  },
  {
    "name": "ProseSection",
    "interface": {
      "classes": "string"
    }
  }
]