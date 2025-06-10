---
sidebar_position: 6
sidebar_label: Quote
title: Quote
---

# Quote

Contains details about total transaction value and the breakup (eg. stamp_duty)

```json
{
    // ID of the quote object, set by the POA
    "id": "q1",

    // Represents the total money movement.
    // Purchase value for purchase transaction, Redemption payout for redemption transaction
    "price": { "currency": "INR", "value": "3000" },

    // Contains details about stamp duty, STT etc., relevant to the transaction
    "breakup": [
        {
            "item": { "id": "12391", "fulfillment_ids": ["ff_008"] },
            "title": "INVESTMENT",
            "price": { "currency": "INR", "value": "2999.85" }
        },
        {
            "item": { "id": "12391", "fulfillment_ids": ["ff_008"] },
            "title": "STAMP_DUTY",
            "price": { "currency": "INR", "value": "0.15" }
        }
    ]
}
```
