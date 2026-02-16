# Expense Tracker

## Overview

This is a minimal full-stack Expense Tracker application built according to the assignment requirements.

The application allows users to:

- Create a new expense (amount, category, description, date)
- View a list of expenses
- Filter expenses by category
- Sort expenses by date (newest first)
- View the total of the currently visible expenses

The system is designed to behave correctly under real-world conditions such as retries, refreshes, and unreliable networks.

---

## Backend

### Endpoints

#### POST /expenses

Creates a new expense.

Request body:

- amount
- category
- description
- date

The API is implemented to behave correctly if the same request is retried due to:

- Network issues
- Page refresh
- Multiple submissions

Duplicate expense creation is prevented using a database-level `UNIQUE` constraint and `ON CONFLICT` handling.

---

#### GET /expenses

Returns a list of expenses.

Supports optional query parameters:

- `category` – filter by category
- `sort=date_desc` – sort by date (newest first)

---

### Data Model

Each expense contains:

- id
- amount
- category
- description
- date
- created_at

The `amount` field is stored using a proper decimal type to safely handle money values.

---

## Frontend

The frontend provides:

- A form to add a new expense
- A list/table of expenses
- Filter by category
- Sort by date (newest first)
- Display of total amount for the currently visible expenses

The UI handles:

- Multiple clicks on submit
- Refresh after submitting
- Slow or failed API responses (basic loading and error states)

---

## Key Design Decisions

- PostgreSQL was used to ensure data integrity and proper money handling.
- Idempotent behavior for POST /expenses is enforced at the database level.
- Backend supports filtering and sorting through query parameters.
- The frontend calculates totals based on the currently visible list.

---

## Trade-offs

- Authentication was not implemented.
- Automated tests were not added due to time constraints.
- Only core assignment features were prioritized.

---

## Deployment

Backend:
`<your-backend-url>`

Frontend:
`<your-frontend-url>`
