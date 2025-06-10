---
sidebar_position: 3
sidebar_label: Item
title: Item
---

# Item

Represents a scheme and a scheme plan

```json
{
    // ID of the scheme plan as represented in the `on_search` callback
    "id": "12391",

    // ID of the scheme as represented in the `on_search` callback
    "parent_item_id": "138",

    // Name of the scheme plan
    // Code represent whether this item is a `SCHEME` or a `SCHEME_PLAN`
    "descriptor": {"name": "ABC Mid Cap Fund - Regular - Growth", "code": "SCHEME_PLAN"},

    // Name of the Mutual Fund
    "creator": {"descriptor": {"name": "ABC Mutual Fund"}},

    // `selected` - Represents the order amount/units chosen by the investor.
    // `allocated` - Represents the actual units issued (for purchases), units redeemed (for redemptions/switches)
    // INR represent amount, MF_UNITS represent units
    "quantity": {
        "selected": {
            "measure": {
                "value": "3000",
                "unit": "INR" // can be `INR`, `MF_UNITS`
            }
        },
        "allocated": {
            "measure": {
                "value": "149.9925",
                "unit": "MF_UNITS" // can only be `MF_UNITS`
            }
        }
    },

    // ID of the corresponding fulfillment object
    "fulfillment_ids": ["ff_789"],

    // ID of the corresponding payment object
    "payment_ids": ["pmt_123"],

    // Price at which the order is processed. `listed_value` represent the NAV. `value` represent the actual price.
    "price": { "currency": "INR", "value": "20.0000", "listed_value": "20.2500" },

    // Date on which the order is processed.
    "time": { "label": "NAV Date", "timestamp": "2024-07-23T00:00:00+05:30" },

    // Represent additional details about the scheme plan
    "tags": [
        {
            "display": true,
            "descriptor": {"name": "Plan Information", "code": "PLAN_INFORMATION"},
            "list": [
                {
                    "descriptor": {"name": "Consumer Terms & Conditions", "code": "CONSUMER_TNC"},
                    "value": "https://sellerapp.com/legal/ondc:fis14/consumer_tnc.html"
                }
            ]
        },
        {
            "display": true,
            "descriptor": {"name": "Plan Identifiers", "code": "PLAN_IDENTIFIERS"},
            "list": [
                {
                    "descriptor": {"name": "ISIN", "code": "ISIN"},
                    "value": "IN123214324"
                },
                {
                    "descriptor": {"name": "RTA Identifier", "code": "RTA_IDENTIFIER"},
                    "value": "02BZ"
                },
                {
                    "descriptor": {"name": "AMFI Identifier", "code": "AMFI_IDENTIFIER"},
                    "value": "125487"
                }
            ]
        },
        {
            "display": true,
            "descriptor": {"name": "Plan Options", "code": "PLAN_OPTIONS"},
            "list": [
                {
                    "descriptor": {"name": "Plan", "code": "PLAN"},
                    "value": "REGULAR"
                },
                {
                    "descriptor": {"name": "Option", "code": "OPTION"},
                    "value": "IDCW"
                },
                {
                    "descriptor": {"name": "IDCW Option", "code": "IDCW_OPTION"},
                    "value": "PAYOUT"
                }
            ]
        }
    ]
}
```