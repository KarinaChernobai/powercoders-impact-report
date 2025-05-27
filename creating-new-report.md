# Publishing a New Impact Report

_Applies to JSON spec v 1.2 (2025‑05‑23)_

Follow these eight steps whenever a new annual report is ready.

---

## 0 · Folder map

```
/
├─ data/
│   ├─ reports/            # every report JSON + index.json
│   └─ impact_media/       # images used by the reports
├─ index.html              # landing page (tiles)
├─ report_template.html    # viewer (empty <main>)
└─ js/ (scripts)
```

---

## 1 · Duplicate last year’s JSON

```bash
cp data/reports/impact-2024.json data/reports/impact-2026.json
```

Change every `2024` → `2026` inside the new file.

---

## 2 · Extract content from the PDF

| PDF element | Where to put it |
|-------------|-----------------|
| cover image | `header.image` |
| report title| `header.title` |
| each spread | one **CardRow** |
| footnotes   | long‑form blocks (`"class":"source"`) |

**Tip:** give ChatGPT the PDF page + spec and ask it to output a `CardRow`.

---

## 3 · Fill mandatory JSON fields

| Key                 | Example value |
|---------------------|---------------|
| `header.title`      | `Impact {{span:red__highlight}}2026{{/span}}` |
| `header.image`      | `data/impact_media/impact2026-hero.jpg` |
| `row.id`            | `workIntegration` (slug, unique) |
| `alternate`         | `true` if gallery left |
| `gallery.type`      | `a`, `b`, or `c` |
| `containerVariant`  | `card__standAlone2` (optional) |
| `card.variant`      | `highlights`, `greenCard`, … (optional) |

Validate:

```bash
npx ajv-cli validate -s docs/report-schema.json -d data/reports/impact-2026.json
```

---

## 4 · Copy all images

Put every referenced picture into `/data/impact_media/`.

---

## 5 · Update the manifest (`data/reports/index.json`)

```json
{
  "filename": "impact-2026.json",
  "title":    "Impact Report 2026",
  "img":      "data/impact_media/impact2026-thumb.jpg"
}
```

Make the thumb 16:9 (≈ 400×225 px).

---

## 6 · Adjust CSS if required

* New gallery layout → add `.gallery--d`, `.gallery__item--1d`, …  
* New card colour → add `.card.greenCard { … }`

_No JavaScript edits are needed._

---

## 7 · Test locally

```bash
npx http-server .
# open http://localhost:8080
# click the new tile
```

---

## 8 · Deploy

Commit the new JSON, images, CSS. Push to `main` – static host updates automatically.

---

### ChatGPT Prompt Template

> “Here is the JSON spec v 1.2 and page 5 of our PDF.  
> Convert it into a CardRow (`id:"futureJobs"`, `gallery.type:"b"`).  
> Mark numbers in red (`red__highlight2`).  
> Use long‑form blocks for citations.”
