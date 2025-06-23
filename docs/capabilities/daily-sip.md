---
sidebar_position: 2
sidebar_label: Daily SIP
title: Daily SIP
---

import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";

## Registration

T = day of registration  
T+2c = start of instalments

## Debit Schedule

SIP debit happens on the following days:  

**Business Day Daily SIP:** Mon, Tue, Wed, Thu, Fri (currently available)  
**Calendar Day Daily SIP:** Mon, Tue, Wed, Thu, Fri, Sat, Sun (Coming soon)

## Process (w/ UPI Autopay)

T = day of sip instalment  

<ThemedImage
  alt="Daily SIP Process"
  sources={{
    light: useBaseUrl("/img/daily-sip.svg"),
    dark: useBaseUrl("/img/daily-sip-dark.svg"),
  }}
/>

- on `T-1c` day: Notification about the next day debit will be sent to the investor by his bank, at around 5am
- on `T` day: Actual debit happens, at around 8am
- on `T+1b` day: Units are allotted on that day's NAV
- on `T+1b+1c` day: Unit allotment details are available. SMS notification is sent to the investor by the AMC.
