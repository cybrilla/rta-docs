---
sidebar_position: 1
sidebar_label: Context
title: Context
---

# Context

Context contains an overview of the message being sent in the api call. Think of this as an equivalent to http headers.

```json
{
    // Currently dealing only with INDIA, so hardcode the location
    "location": {
        "country": {
            "code": "IND"
        },
        "city": {
            "code": "*"
        }
    },

    // FIS14 is for investments
    "domain": "ONDC:FIS14",
    
    // Time of the request generation
    // RFC3339 format
    "timestamp": "2025-05-25T05:23:03.443Z",

    // Distributor identifier in a fully qualified domain name (FQDN) format
    "bap_id": "api.buyerapp.com",
    // Distributor callback URL. Should contain the domain name used in the identifier
    "bap_uri": "https://api.buyerapp.com/ondc",

    // POA identifier in a fully qualified domain name (FQDN) format
    "bpp_id": "api.cybrilla.com",
    // POA callback URL. Should contain the domain name used in the identifier
    "bpp_uri": "https://api.cybrilla.com/ondc",

    // A correlation id to match multiple requests in a particular user session (eg. all messages from `select` to `confirm` calls)
    // Buyer app should generate a new transaction id for every new user session/transaction.
    // UUID format
    "transaction_id": "a9aaecca-10b7-4d19-b640-b047a7c62196",

    // A correlation id to match the `action` call and `on_action` callback
    // Buyer app should generate a new message id for every `action` call it is making. POA will use the same message id for the corresponding `on_action` callback.
    // For unsolicited `on_action` callbacks, POA will generate a new message id everytime.
    // UUID format
    "message_id": "bb579fb8-cb82-4824-be12-fcbc405b6608",

    // Version of the protocol
    "version": "2.1.0",

    // The duration from `timestamp` for which this message holds valid. Buyer app can set this value during `action` calls as an expectation to receive the corresponding `on_action` callback within this duration. If the `on_action` callback comes after this duration, buyer app can either choose to accept it or reject it
    // POA will send a NACK if it cannot adhere to this ttl expectation
    // ISO8601 format
    "ttl": "PT10M",

    // Protocol method
    "action": "confirm"
}
```
