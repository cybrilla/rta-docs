---
sidebar_position: 2
sidebar_label: API
title: API
---

# API

POA endpoints, for `action` calls: `/search`, `/select`, `/init`, `/confirm`, `/status`, `/update`  
Your endpoints for `on_action` callbacks: `/on_search`, `/on_select`, `/on_init`, `/on_confirm`, `/on_status`, `/on_update`

The api has following stages

1. Discovery
2. Order placement
3. Order processing

---
## Discovery

You have to make a `/search` action call to receive the list of available fund schemes (along with allowed transaction types [eg. lumpsum, sip etc.] and their respective thresholds [eg. min investment amount, allowed frequencies etc.]) in the `/on_search` callback.

Sample json

```json
{
    "intent": {
        "category": {
            "descriptor": {
                "code": "MUTUAL_FUNDS"
            }
        },
        "fulfillment": {
            "agent": {
                "organization": {
                    "creds": [
                        {
                            "id": "ARN-125784",
                            "type": "ARN" // can be `ARN` or `RIA`
                        }
                    ]
                }
            }
        },
        "tags": [
            {
                "display": false,
                "descriptor": {"name": "BAP Terms of Engagement", "code": "BAP_TERMS"},
                "list": [
                    {
                        // TODO: Is static terms mandatory? We should remove that
                        "descriptor": {"name": "Static Terms (Transaction Level)", "code": "STATIC_TERMS"},
                        "value": "https://buyerapp.com/legal/ondc:fis14/static_terms?v=0.1"
                    },
                    {
                        "descriptor": {"name": "Offline Contract", "code": "OFFLINE_CONTRACT"},
                        "value": "true"
                    }
                ]
            }
        ]
    }
}
```

---
## Order Placement

- `/select`: Use this to check the readiness and prepare the investor for placing an order. Typically all selections are made here.  

- `/init`: Initialize the order  
**Input**: All order details along with investor consent (2FA, IP address)  
**Output**: Order ID with Order in `CREATED` state

- `/confirm`: Confirm the order  
**Input**: All order details along with the Order ID  
**Output**: Order in `ACCEPTED` state

Detailed description and sequence diagrams: https://github.com/ONDC-Official/ONDC-FIS-Specifications/blob/draft-FIS14-2.1.0/api/components/docs/stage-order.md

### Testing in Sandbox
#### Orders
- To simulate a successful order scenario, place the order with amount ending in `0`
- To simulate a failed order scenario, place the order with amount ending in `1`

#### KYC Compliant
- To simulate a KYC compliant investor flow, use any PAN number in the format: `XXXPX3751X` (replace `X` with any alphabet)
- To simulate a KYC non-compliant investor flow, use any PAN number in the format: `XXXPX3753X` (replace `X` with any alphabet)

#### Bank account verification
- To simulate a successful verification, use bank account with number ending in `1193`
- To simulate a failed verification, use bank account with number ending in `1515`

---
## Order Processing
Once the order is accepted, and pre fulfillment conditions are met (eg. payment collection in case of purchase orders) POA starts the order processing. Processing states are represented in `fulfillment` object.

Detailed description: https://github.com/ONDC-Official/ONDC-FIS-Specifications/blob/draft-FIS14-2.1.0/api/components/docs/stage-fulfillment.md
