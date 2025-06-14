---
sidebar_position: 4
sidebar_label: Fulfillment
title: Fulfillment
---

# Fulfillment

Fulfillment represents a particular type of transaction (eg. lumpsum). Each item will have a corresponding fulfillment.

```json
{
    // ID of the fulfillment object as represented in the `on_search` callback
    "id": "ff_789",

    // Type of the transaction. Could be
    // `LUMPSUM`, `SIP`, `SIP_INSTALMENT`
    // `REDEMPTION`, `SWP`, `SWP_INSTALMENT`
    // `SWITCH_OUT`, `STP_OUT`, `STP_OUT_INSTALMENT`
    // `SWITCH_IN`, `STP_IN`, `STP_IN_INSTALMENT`
    "type": "LUMPSUM",

    // Details of the investor
    "customer": {
        "person": {
            // PAN is a unique identifier of the investor
            "id": "pan:arrpp7771n",
            "creds": [
                {
                    // Folio number for additional purchase, redemption, switch transactions
                    "id": "78953432/32",
                    "type": "FOLIO"
                },
                {
                    // IP address of the investor from where the transaction is confirmed by him
                    "id": "115.245.207.90",
                    "type": "IP_ADDRESS"
                }
            ]
        },
        // Details of the investor where the 2nd factor authentication via OTP is done. Could be phone or email or both
        "contact": {
            "phone": "9916599123",
            "email": "investor@gmail.com"
        }
    },

    // Details of the distributor
    "agent": {
        "person": {
            "id": "euin:E52432"
        },
        "organization": {
            "creds": [
                {
                    "id": "ARN-124567",
                    "type": "ARN"
                },
                {
                    "id": "ARN-123456",
                    "type": "SUB_BROKER_ARN"
                }
            ]
        }
    },

    // Represents the current state of fulfillment
    "state": {
        "descriptor": {"name": "Successful", "code": "SUCCESSFUL"}
    },
    "tags": [
        {
            "display": true,
            "descriptor": {"name": "Folio", "code": "FOLIO_INFORMATION"},
            "list": [
                {
                    "descriptor": {"name": "Folio Number", "code": "FOLIO_NUMBER"},
                    "value": "123213432/32"
                },
                {
                    "descriptor": {"name": "Holding Pattern", "code": "HOLDING_PATTERN"},
                    "value": "SINGLE"
                },
                {
                    "descriptor": {"name": "Holder Name", "code": "HOLDER_NAME"},
                    "value": "Satish K Perala"
                },
                {
                    "descriptor": {"name": "Created On", "code": "CREATED_ON"},
                    "value": "25/11/2019"
                },
                {
                    "descriptor": {"name": "Email Address for 2FA", "code": "2FA_EMAIL_ADDRESS_MASKED"},
                    "value": "****sha@gmail.com"
                },
                {
                    "descriptor": {"name": "Mobile Number for 2FA", "code": "2FA_MOBILE_NUMBER_MASKED"},
                    "value": "***9345"
                }
            ]
        },
        {
            "display": true,
            "descriptor": {"name": "Thresholds", "code": "THRESHOLDS"},
            "list": [
                {
                    "descriptor": {"name": "Amount Minimum", "code": "AMOUNT_MIN"},
                    "value": "1000"
                },
                {
                    "descriptor": {"name": "Amount Maximum", "code": "AMOUNT_MAX"},
                    "value": "10000"
                },
                {
                    "descriptor": {"name": "Amount Multiples", "code": "AMOUNT_MULTIPLES"},
                    "value": "1"
                }
            ]
        },
        {
            "display": true,
            "descriptor": {"name": "External Refs", "code": "EXTERNAL_REFS"},
            "list": [
                {
                    "descriptor": {"name": "RTA Source Ref", "code": "RTA_SOURCE_REF"},
                    "value": "21432432"
                }
            ]
        }
    ]
}
```

### States
For state flow refer: https://github.com/ONDC-Official/ONDC-FIS-Specifications/blob/release-FIS14-2.1.0/api/components/docs/lifecycle-and-states.md#fulfillment
