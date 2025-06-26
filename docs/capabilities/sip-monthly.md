---
sidebar_position: 2
sidebar_label: Monthly SIP
title: Monthly SIP
---

import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Registration

`T` = day of registration  

While registering a monthly SIP, you need to provide the following inputs:
1. First instalment date. It has to be any day on or after `T + 2c`
2. Number of instalments. min/max?

## Debit Schedule

SIP debit happens on the instalment day, every month as per the provided schedule. If for some reason, POA is not able to debit on the instalment day, it attempts to debit on the following day. Debit will never be attempted before the instalment day.

- If the instalment day is a market holiday?

### Process

T = day of sip instalment  

<Tabs>
    <TabItem value="upi-autopay" label="UPI Autopay" default>
        <ThemedImage
        alt="SIP Debit process with UPI Autopay Mandate"
        sources={{
            light: useBaseUrl("/img/sip-debits-upiautopay.svg"),
            dark: useBaseUrl("/img/sip-debits-upiautopay-dark.svg"),
        }}
        />

        - on `T-1c` day: Notification about the next day debit will be sent to the investor by his bank, at around 5am
        - on `T` day: Actual debit happens, at around 8am
        - on `T+1b` day: Units are allotted on that day's NAV
        - on `T+1b+1c` day: Unit allotment details are available. SMS notification is sent to the investor by the AMC.
    </TabItem>

    <TabItem value="nach-mandate" label="NACH Mandate">
        <ThemedImage
        alt="SIP Debit process with NACH Mandate"
        sources={{
            light: useBaseUrl("/img/sip-debits-nach.svg")
        }}
        />

        - on `T` day: Actual debit happens, at around 8am?
        - on `T+1b` day: Units are allotted on that day's NAV
        - on `T+1b+1c` day: Unit allotment details are available. SMS notification is sent to the investor by the AMC.    
    </TabItem>
</Tabs>

## API

In the `on_search` callback, scheme plans supporting monthly sip will have a fulfillment of type = `SIP` and `THRESHOLDS.FREQUENCY` tag = `P1M`. 

While making a `select` call, use that fulfillment id and provide the schedule as shown in the example below.

```json
"fulfillments": [
    {
        "id": "34023",
        // ... other attributes
        "stops": [
            {
                "time": {
                    "schedule": {
                        "frequency": "R6/2025-05-15/P1M" // 6 instalments, starting 15th May and recurring every month on 15th
                    }
                }
            }
        ]
    }
]
```