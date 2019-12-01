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
      "isTweetable": "boolean",
      "tweetText": "string",
      "tweetHashtags": "array",
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
      "ariaLabel": "string"
    }
  },
  {
    "name": "ProseGridContents",
    "interface": {}
  },
  {
    "name": "ProseGridcell",
    "interface": {
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
      "classes": "string",
      "canChangeFilterCaseSensitivity": "boolean"
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
    "name": "ProseRow",
    "interface": {
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