export default {
  "ProseArticle": {
    "name": "ProseArticle",
    "interface": {}
  },
  "ProseAside": {
    "name": "ProseAside",
    "interface": {
      "type": "string"
    }
  },
  "ProseBlockquote": {
    "name": "ProseBlockquote",
    "interface": {
      "isTweetable": "boolean",
      "tweetText": "string",
      "tweetHashtags": "array"
    }
  },
  "ProseCodeblock": {
    "name": "ProseCodeblock",
    "interface": {
      "lines": "number",
      "hasLineNumbers": "boolean"
    }
  },
  "ProseColumnheader": {
    "name": "ProseColumnheader",
    "interface": {
      "index": "number"
    }
  },
  "ProseDetails": {
    "name": "ProseDetails",
    "interface": {
      "summary": "string"
    }
  },
  "ProseGrid": {
    "name": "ProseGrid",
    "interface": {
      "canFilterByQuery": "boolean",
      "filterIsCaseSensitive": "boolean",
      "canChangeFilterIsCaseSensitive": "boolean",
      "ariaLabel": "string"
    }
  },
  "ProseGridContents": {
    "name": "ProseGridContents",
    "interface": {}
  },
  "ProseGridcell": {
    "name": "ProseGridcell",
    "interface": {
      "index": "number"
    }
  },
  "ProseHeading": {
    "name": "ProseHeading",
    "interface": {
      "level": "number"
    }
  },
  "ProseLayout": {
    "name": "ProseLayout",
    "interface": {
      "fullPath": "ref",
      "messages": "object"
    }
  },
  "ProseList": {
    "name": "ProseList",
    "interface": {
      "canFilterByQuery": "boolean",
      "filterIsCaseSensitive": "boolean",
      "canChangeFilterCaseSensitivity": "boolean"
    }
  },
  "ProseListContents": {
    "name": "ProseListContents",
    "interface": {
      "isOrdered": "boolean"
    }
  },
  "ProseListItem": {
    "name": "ProseListItem",
    "interface": {
      "index": "number"
    }
  },
  "ProseNav": {
    "name": "ProseNav",
    "interface": {}
  },
  "ProseRow": {
    "name": "ProseRow",
    "interface": {
      "index": "number"
    }
  },
  "ProseRowgroup": {
    "name": "ProseRowgroup",
    "interface": {
      "index": "number"
    }
  },
  "ProseSection": {
    "name": "ProseSection",
    "interface": {}
  },
  "ProseStats": {
    "name": "ProseStats",
    "interface": {
      "stats": "object"
    }
  },
  "ProseTableOfContents": {
    "name": "ProseTableOfContents",
    "interface": {
      "headings": "array"
    }
  }
}