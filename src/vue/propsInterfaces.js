export default [
  {
    "name": "ProseArticle",
    "interface": {}
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
      "hashtags": "array",
      "classes": "string"
    }
  },
  {
    "name": "ProseCodeblock",
    "interface": {
      "lines": "number",
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
      "src": "string"
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