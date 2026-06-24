# PFM Retail Performance Scan - Customer Demo v27

Customer-facing version for a commercial retail meeting.

## Updated files

- `index.html` — customer-facing copy, no visible n8n/Odoo/JSON/internal sales-submit screen.
- `README.md` — this note.

## Unchanged files

- `pricing-config.js`
- `app.py`
- `requirements.txt`
- `script.js`

## What changed

- Default company set to Nelson Schoenen and segment to Footwear Retail.
- Internal wording removed from visible UX, including n8n/Odoo/payload/JSON language.
- “Prepared by” changed to “PFM consultant”.
- Performance leak cards no longer show internal sales proof text.
- Final step is now a customer-facing conversation summary instead of a sales-only JSON/Odoo submit screen.
- Back-end/payload functions are still present in code for future internal use, but not exposed in the customer-facing flow.

## How to run

```bash
pip install -r requirements.txt
streamlit run app.py
```
