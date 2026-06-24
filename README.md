# PFM Retail Performance Scan — Customer Demo v30

Customer-facing demo version for retail conversations.

## Updated in v30

- Removed the visible internal iframe scrollbar in the Streamlit wrapper by increasing component height and disabling iframe scrolling.
- Updated ROI output styling:
  - Payback Time now uses a black card instead of red.
  - Realistic Extra Profit / Year now uses a purple card with white text.
  - Revenue Baseline / Year is shown in compact format for large values, e.g. €100K / €1M.
- Updated Summary styling:
  - Potential Payback is black with white text.
  - Indicative Extra Profit / Year is purple with white text.
- Expanded the Essential route contents with:
  - Portfolio-wide report
  - Sensor management
  - Remote support
  - Conversion rate
- Kept the existing Retail Chain customer-facing flow, calculations and package logic intact.

## Files changed

- `index.html`
- `pricing-config.js`
- `app.py`
- `README.md`

## Run locally

```bash
streamlit run app.py
```
