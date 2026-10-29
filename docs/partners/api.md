# The partner API

All calls go to the API address we give you at onboarding, over HTTPS, and send and receive JSON. This page lists everything a partner key can do.

## Authentication

Send your key as a bearer token:

```http
Authorization: Bearer sgp_1a2b3c4d_…
```

Keys are shown once when we create them and can be revoked at any time. A key sees only your own customers and invoices.

Requests are limited per key (120 a minute by default). When you go over, the answer is `429` with a `retry-after` header. Repeated wrong keys from one address are refused for a minute.

## Errors

Every error has the same shape and a short code. The text is for programmers, not customers.

```json
{ "error": "email_in_use" }
```

| Status | Code                    | Meaning                                                                                                                                                                                |
| ------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 422    | `invalid_request`       | A field is missing or not valid. `fields` names which, never the values                                                                                                                |
| 401    | `unauthorized`          | The key is missing, wrong, revoked or expired                                                                                                                                          |
| 403    | `partner_suspended`     | Your partner account is suspended. Existing customers stay covered and billed                                                                                                          |
| 404    | `not_found`             | No such customer or invoice for you                                                                                                                                                    |
| 422    | `plan_not_offered`      | Your agreement has no price for that plan (Business needs one), so you cannot cover a customer on it                                                                                   |
| 409    | `email_in_use`          | That address already has a ServerGuardian account. Repeated attempts of this kind from one key are limited (`429 rate_limited`), because the answer says which addresses have accounts |
| 409    | `external_ref_conflict` | That reference exists with a different email address                                                                                                                                   |
| 409    | `invalid_state`         | The action does not fit the customer's state, for example ending cover that has ended                                                                                                  |
| 429    | `daily_limit`           | You reached your daily limit for new customers                                                                                                                                         |
| 429    | `invite_too_soon`       | That customer was invited less than an hour ago. An invitation is sent at most once an hour per customer, including when cover is restarted                                            |
| 429    | `rate_limited`          | Too many requests. Wait for `retry-after`                                                                                                                                              |

## Customers

A customer is identified by your own reference (`externalRef`, up to 100 characters) and by our `id`.

Customer fields:

| Field                                                      |                                                                       |
| ---------------------------------------------------------- | --------------------------------------------------------------------- |
| `id`                                                       | Our identifier                                                        |
| `externalRef`                                              | Your reference                                                        |
| `status`                                                   | `invited` (waiting for them to accept), `active` (covered) or `ended` |
| `plan`                                                     | `pro` or `business`: the plan you cover them on                       |
| `createdAt`, `inviteSentAt`, `inviteAcceptedAt`, `endedAt` | Timestamps, or `null`                                                 |

### Create a customer

`POST /v1/partner/customers`

```json
{
  "externalRef": "order-10442",
  "email": "owner@example.com",
  "operatorName": "Example Racing Club",
  "servers": [{ "name": "Example Server 1", "platform": "beammp" }],
  "plan": "pro"
}
```

`servers` is optional (up to 5; `platform` is `beammp`, `fivem` or `minecraft`). `plan` is optional and is `pro` unless you say `business`, which works only if your agreement has a Business price (otherwise `422 plan_not_offered`). The customer still creates their API keys and rules themselves.

If the customer already exists, the answer is the customer as it is now, including its current `plan`; use the plan call below to change it.

Answers `201` with the customer, `"created": true` and `inviteExpiresAt`. **Creating the same `externalRef` again with the same email is safe**: it answers `200` with `"created": false` and sends nothing. With a different email it is a `409 external_ref_conflict`.

### Look a customer up

- `GET /v1/partner/customers?limit=50&after=<id>` lists your customers, newest first, with `next` to continue.
- `GET /v1/partner/customers/{id}` and `GET /v1/partner/customers/by-ref/{externalRef}` return one.

### Send the invitation again

`POST /v1/partner/customers/{id}/resend-invite` answers `202` with a new `inviteExpiresAt`. It only works while the customer has not accepted, at most once an hour per customer, and not while your partner account is suspended. Earlier links stop working.

### Change the plan

`POST /v1/partner/customers/{id}/plan` with `{ "plan": "business" }` or `{ "plan": "pro" }` moves the customer to that plan **from now** and returns the customer. It works for an upgrade and a downgrade. Asking for the plan they are already on changes nothing. It is refused for a customer whose cover has ended (`409 invalid_state`) and for a plan your agreement does not include (`422 plan_not_offered`). A customer who has not accepted yet starts on the new plan.

A downgrade is billed from the next day, but the customer's plan changes at once. It can leave the customer with more servers than the lower plan allows. The newest are paused, as for any plan that gets smaller, and the customer is told.

### End and restart cover

- `POST /v1/partner/customers/{id}/end` stops your cover from now. The customer keeps their account on the Free plan and is emailed. Billing for them stops from that moment.
- `POST /v1/partner/customers/{id}/reactivate` starts cover again, if the customer's account still exists, on the plan they were last on (or on Pro, if your agreement no longer has a Business price). It is billed from now.

Both return the customer.

## Usage

`GET /v1/partner/usage` shows the current month so far:

```json
{
  "month": "2026-11",
  "currency": "gbp",
  "coveredCustomers": 12,
  "customerDays": 214,
  "pricePerCustomerMinor": 250,
  "priceBusinessPerCustomerMinor": null,
  "accruedMinor": 1783,
  "byPlan": {
    "pro": { "coveredCustomers": 12, "customerDays": 214, "accruedMinor": 1783 },
    "business": { "coveredCustomers": 0, "customerDays": 0, "accruedMinor": 0 }
  }
}
```

Amounts are in the smallest unit of the currency (pence, cents). `accruedMinor` is what the month would cost if it ended now. `priceBusinessPerCustomerMinor` is `null` if your agreement has no Business price.

## Invoices

We invoice each month, per customer, for the days the customer was covered: the monthly price times days covered over days in the month, rounded per customer. A day counts once if cover held at any point in it, and at one plan: the highest plan the customer held at any moment of that day. So on the day a customer is upgraded the whole day is charged at the new plan, and a downgrade takes effect from the next day. A customer who was on two plans in a month has a line for each.

- `GET /v1/partner/invoices` lists invoices that have been issued.
- `GET /v1/partner/invoices/{id}` returns one with a line for each customer and plan (your reference, plan, days covered, amount).
- `GET /v1/partner/invoices/{id}/csv` returns the same as a spreadsheet.

Invoice fields: `id`, `number` (for example `SGP-FAST-202611`), `period` (`2026-11`), `currency`, `amountMinor`, `status` (`issued`, `paid` or `void`), `overdue`, `issuedAt`, `dueAt`, `paidAt` and `paymentUrl`. When we issue through Stripe, `paymentUrl` is the page where you pay by card or bank debit. Otherwise we send the invoice by email and mark it paid when the money arrives.

## What the customer experiences

1. They receive an email from ServerGuardian saying you set the account up and that it costs them nothing while you cover them.
2. They choose a password. This confirms their address, and their account is ready.
3. They set up two-step sign-in, accept our data agreement, add their servers and create the keys for the plugins. See [Getting started](/guide/getting-started).
4. Their billing page shows that the plan is provided by you.
