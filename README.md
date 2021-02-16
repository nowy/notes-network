# 📝 Notes Network

An app to generate a data visualisation of my zettelkasten notes.

## Running

```
npm i && npm build && npm serve
```

## Expected note format

Note must be titled: `[timestamp] text.md` The format of the note must be as follows:
```
---
tags: [tag, another-tag]
---

content

## Links
- [[references-to-other-notes-wrapped-in-double-square-braces]]
```

