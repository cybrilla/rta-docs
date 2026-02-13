---
sidebar_position: 1
sidebar_label: Authentication
title: Authentication
---

# Authentication

## Getting Started
1. Write an email to poa.support@cybrilla.com and register yourself as OAuth 2.0 client for partner authentication purposes. At present, access to POA additional APIs is provided only to AMC partners i.e. distributors and advisors. 
2. We will share the `client_id` and `client_secret`
3. Use `POST /v2/auth/cybrillarta/token` endpoint and provide `client_id` and `client_secret` to generate token object.
4. Use the generated token object's `access_token` to access additional POA APIs.
5. Every token object will have an expiry time. Ensure that you are creating a new token object if the existing token object is expired.

## Getting partner token
For partner tokens, we are using Client Credentials flow. This flow is recommended for server-side (aka confidential) client applications with no end-user, which normally describes server-to-server communication. The application needs to securely store its client ID and secret and pass them in exchange for an access token.

`POST /v2/auth/cybrillarta/token`

### Headers

|Parameter|Mandatory|Default|Value|
|---|---|---|---|
|accept|yes|-|application/json|
|content-type|yes|-|application/x-www-form-urlencoded|

### Request Parameters

|Parameter|Mandatory|Default|Description|
|---|---|---|---|
|client_id|yes|-|`client_id` provided by POA|
|client_secret|yes|-|`client_secret` provided by POA|
|grant_type|yes|-|Must be `client_credentials`|

### Sample Request
```
curl --location '{{base_url}}/v2/auth/cybrillarta/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=<client_id>' \
--data-urlencode 'client_secret=<client_secret>' \
--data-urlencode 'grant_type=client_credentials'
```

### Sample Response
```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyUVVoVl9aaGVyQmRHMjVQMl83cmdVaDYxcS1WXzZ0NzNmO",
    "expires_in": 1800,
    "refresh_expires_in": 0,
    "token_type": "Bearer",
    "not-before-policy": 0,
    "scope": "partner"
}
```