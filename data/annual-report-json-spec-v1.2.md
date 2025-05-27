# Annual Report JSON Specification — **v 1.2**

_Last update: 2025‑05‑23_

**What’s new (v 1.2)**  

* **`card.variant`** – extra CSS class on the inner `.card` (repeatable).  
* **`containerVariant`** – replaces default wrapper class when you need
  a solo card container (e.g. `card__standAlone2`).  
* Rows always render in a wrapper; solo‑card rows set `gallery` to `null`.

---

## 1 Top‑Level Shape

```jsonc
{
  "header":   { … },
  "sections": [ { "type": "cards", … } ]
}
```

---

## 2 Header Block

| Key      | Type / required | Notes                                 |
|----------|-----------------|---------------------------------------|
| `title`  | string ✓        | inline formatting allowed             |
| `image`  | string ✓        | path relative to MEDIA_ROOT           |
| `height` | string •        | e.g. `"60vh"` (optional override)     |

---

## 3 Cards Section (`"type": "cards"`)

### 3.1 CardRow

| Key                | Req | Description                                              |
|--------------------|-----|----------------------------------------------------------|
| `alternate`        | ✓   | `true` → gallery left, `false` → gallery right/none     |
| `id`               | ✓   | unique anchor id                                         |
| `containerVariant` | •   | substitute wrapper class (e.g. `card__standAlone2`)      |
| `card`             | ✓   | content object                                           |
| `gallery`          | •   | `null` or Gallery object                                 |

### 3.2 Gallery

```jsonc
"gallery": {
  "type"  : "" | "b" | "c",
  "images": ["file1.jpg", "file2.jpg"]
}
```

CSS sees `.gallery--b` + `.gallery__item--1b`, …  

### 3.3 Card

| Key       | Req | Notes                                       |
|-----------|-----|---------------------------------------------|
| `title`   | ✓   | rendered as `<h2>`                          |
| `variant` | •   | extra class on `.card` (`"highlights"`, …)  |
| `blocks`  | ✓   | array of text or heading blocks             |

#### Block forms

```jsonc
{ "p": "Inline {{span:red__highlight}}90%{{/span}}" }         // short
{ "p": { "text": "Citation", "class": "source" } }            // long
{ "h3": "Subtitle" }
```

Allowed keys: `h2`, `h3`, `h4`, `p`.

---

## 4 Inline Mark‑up

| Syntax                                    | Output                                   |
|-------------------------------------------|------------------------------------------|
| `{{span:red__highlight}}…{{/span}}`       | `<span class="red__highlight">…</span>`  |
| `**bold**`                                | `<strong>`                               |
| `_italic_`                                | `<em>`                                   |
| `\n`                                      | `<br>`                                   |

Close tag must be `{{/span}}` _or_ `{{/span:<variant>}}`.

---

## 5 Dropdown Values for the Editor

| Field                | Options                              |
|----------------------|--------------------------------------|
| `containerVariant`   | _(blank)_ / `card__standAlone2`      |
| `card.variant`       | _(blank)_ / `highlights` / `greenCard` / `summary` |
| `gallery.type`       | `a` / `b` / `c`                      |

---

## 6 Mini Examples

### Solo card with custom wrapper

```jsonc
{
  "alternate": false,
  "id": "highlights",
  "containerVariant": "card__standAlone2",
  "card": {
    "title": "Highlights",
    "variant": "highlights",
    "blocks": [ { "p": "Some text" } ]
  },
  "gallery": null
}
```

### Card + gallery type `b` (gallery left)

```jsonc
{
  "alternate": true,
  "id": "sample",
  "card": { "title": "Sample", "blocks": [ … ] },
  "gallery": {
            "type": "b",
            "images": [
              "impact_media/1.jpg",
              "impact_media/2.jpg",
              "impact_media/3.jpg"
            ]
          }
}
```

---

## 7 Do / Don’t Checklist

| Do ✅ | Don’t ❌ |
|------|---------|
| keep every `alternate`, `id`, `card.title` | invent new tag keys (`div`, `ul`) |
| choose a gallery type only when images exist | leave `gallery.images` empty |
| close span tags with `:variant` or nothing | use `{{/span-red}}` (hyphen) |

---



Happy editing!  
Ping **@frontend** for questions.
