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

## v28 fix

Customer-facing retail demo fix:
- Retail Chain no longer preselects Capture Rate / Street Potential by default.
- The Street Potential / Capture Rate Layer only appears in the Impact Model when a capture-related performance leak is selected.
- Setting Capture stores in scope to 0 now keeps CAPEX/OPEX/TCO at 0 for that component instead of falling back to 10.
- No changes to pricing-config.js, app.py, requirements.txt or script.js.

## v29 customer demo update

Updated files:
- `index.html`
- `pricing-config.js`
- `README.md`

No changes were made to:
- `app.py`
- `requirements.txt`
- `script.js`

Changes:
- Retail route naming updated to `Essential`, `Professional`, and `Enterprise`.
- Route recommendation is now automatic:
  - `Essential` = trusted baseline / footfall only.
  - `Professional` = visitor profile add-ons such as age, gender, group, adults/kids, or capture-rate insight.
  - `Enterprise` = in-store analytics, zoning, journey, dwell, Re-ID/heatmapping style needs.
- The monthly price shown on the Route page now comes from the current Impact Model OPEX/month (`commercialTotals().monthlyServiceTotal`) instead of fixed package placeholder pricing.
- Route package names in `pricing-config.js` are aligned with the customer-facing names.
