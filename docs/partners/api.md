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
| `createdAt`, `inviteSentAt`, `inviteAcceptedAt`, `endedAt` | Timestamps, or `null`                                                 |

### Create a customer

`POST /v1/partner/customers`

```json
{
  "externalRef": "order-10442",
  "email": "owner@example.com",
  "operatorName": "Example Racing Club",
  "servers": [{ "name": "Example Server 1", "platform": "beammp" }]
}
```

`servers` is optional (up to 5; `platform` is `beammp`, `fivem` or `minecraft`). The customer still creates their API keys and rules themselves.

Answers `201` with the customer, `"created": true` and `inviteExpiresAt`. **Creating the same `externalRef` again with the same email is safe**: it answers `200` with `"created": false` and sends nothing. With a different email it is a `409 external_ref_conflict`.

### Look a customer up

- `GET /v1/partner/customers?limit=50&after=<id>` lists your customers, newest first, with `next` to continue.
- `GET /v1/partner/customers/{id}` and `GET /v1/partner/customers/by-ref/{externalRef}` return one.

### Send the invitation again

`POST /v1/partner/customers/{id}/resend-invite` answers `202` with a new `inviteExpiresAt`. It only works while the customer has not accepted, at most once an hour per customer, and not while your partner account is suspended. Earlier links stop working.

### End and restart cover

- `POST /v1/partner/customers/{id}/end` stops your cover from now. The customer keeps their account on the Free plan and is emailed. Billing for them stops from that moment.
- `POST /v1/partner/customers/{id}/reactivate` starts cover again, if the customer's account still exists. It is billed from now.

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
  "accruedMinor": 1783
}
```

Amounts are in the smallest unit of the currency (pence, cents). `accruedMinor` is what the month would cost if it ended now.

## Invoices

We invoice each month, per customer, for the days the customer was covered: the monthly price times days covered over days in the month, rounded per customer. A day counts once if cover held at any point in it.

- `GET /v1/partner/invoices` lists invoices that have been issued.
- `GET /v1/partner/invoices/{id}` returns one with a line for each customer (your reference, days covered, amount).
- `GET /v1/partner/invoices/{id}/csv` returns the same as a spreadsheet.

Invoice fields: `id`, `number` (for example `SGP-FAST-202611`), `period` (`2026-11`), `currency`, `amountMinor`, `status` (`issued`, `paid` or `void`), `overdue`, `issuedAt`, `dueAt`, `paidAt` and `paymentUrl`. When we issue through Stripe, `paymentUrl` is the page where you pay by card or bank debit. Otherwise we send the invoice by email and mark it paid when the money arrives.

## What the customer experiences

1. They receive an email from ServerGuardian saying you set the account up and that it costs them nothing while you cover them.
2. They choose a password. This confirms their address, and their account is ready.
3. They set up two-step sign-in, accept our data agreement, add their servers and create the keys for the plugins. See [Getting started](/guide/getting-started).
4. Their billing page shows that the plan is provided by you.
