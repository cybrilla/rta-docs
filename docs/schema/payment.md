---
sidebar_position: 5
sidebar_label: Payment
title: Payment
---

# Payment

Payment object represents
1. Payment by the investor for purchase transactions
2. Payout by the AMC for redemption transactions

```json
{
    // ID of the payment option chosen for the order. This ID is set by the POA
    "id": "pmt_123",

    // `BPP` if the payment is collected by the POA
    // `BAP` if the payment is collected by the Distributor
    // `CONSUMER` for redemption payouts
    "collected_by": "BPP",

    // Current status of the payment
    "status": "PAID",

    // `PRE_FULFILLMENT` means the fulfillment starts only after the payment is done (used for purchase payments)
    // `ON_FULFILLMENT` means the payment is done along with the fulfillment (used for redemption payouts)
    "type": "PRE_FULFILLMENT",

    // Details of the payment
    "params": {
        "amount": "3000",
        "currency": "INR",

        // For purchases - Source bank represents investor's bank a/c from where the payment is being made
        // For redemption payouts - Source bank represents the AMC's bank a/c from where the payout is being made
        "source_bank_code": "icic0000047",
        "source_bank_account_number": "004701563111",
        "source_bank_account_name": "harish gupta",

        // unique transaction reference (UTR) number to identify the payment in banking channels/statements
        "transaction_id": "243423324"
    },
    "tags": [
        {
            "descriptor": { "name": "Source bank account", "code": "SOURCE_BANK_ACCOUNT" },
            "list": [
                {
                    "descriptor": { "name": "Account Type", "code": "ACCOUNT_TYPE" },
                    "value": "SAVINGS"
                }
            ]
        },
        {
            "descriptor": { "name": "Payment Method", "code": "PAYMENT_METHOD" },
            "list": [
                {
                    "descriptor": { "code": "MODE" },
                    "value": "NETBANKING"
                }
            ]
        }
    ]
}
```

### States
For available payment methods and state flow refer: https://github.com/ONDC-Official/ONDC-FIS-Specifications/blob/release-FIS14-2.1.0/api/components/docs/lifecycle-and-states.md#fulfillment

