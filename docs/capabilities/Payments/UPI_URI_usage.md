---
sidebar_position: 5
sidebar_label: UPI URI Usage
title: UPI URI Usage
---

# UPI URI Usage

To build a seamless checkout experience for **UPI Lumpsum Payments** and **UPI Autopay Authorizations**, your custom checkout page should support the following modes for investors:
 
1. **Intent Flow** – Open supported UPI apps directly using the UPI Intent URI.  
2. **QR Flow** – Display a scannable QR code for payments on desktop or laptop.

For **Intent** and **QR** options, use the **UPI URI** returned in the API response.


## 1. UPI Intent Flow for lumpsum

### Android Default Behaviour 

When the URI (e.g., `upi://pay?...`) is opened on Android:
- The OS automatically shows a list of installed UPI-supported apps.
- The investor can select the desired app to complete the transaction.

#### App-Specific UPI URI Formats for lumpsum:

You can modify the base UPI URI to open a specific app directly. Below are example schemes for reference. Please test and verify before using in production.

App URI schemes may change over time. Confirm the latest schemes from app developer docs and test on real devices.

| App Name             | Scheme Prefix Change                  | Final Prefix Used      | What Changed?                                                 |
| -------------------- | ------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| **PhonePe**          | `upi://pay?` → `phonepe://pay?`       | `phonepe://pay?`       | Replace `upi` with `phonepe`                                  |
| **Google Pay**       | `upi://pay?` → `tez://upi/pay?`       | `tez://upi/pay?`       | Change scheme to `tez://` and add `/upi` path before `pay?`   |
| **Paytm**            | `upi://pay?` → `paytmmp://pay?`       | `paytmmp://pay?`       | Replace `upi` with `paytmmp`                                  |
| **Navi**             | `upi://pay?` → `navipay://pay?`       | `navipay://pay?`       | Replace `upi` with `navipay`                                  |
| **Super.money**      | `upi://pay?` → `super://pay?`         | `super://pay?`         | Replace `upi` with `super`                                    |
| **CRED**             | `upi://pay?` → `credpay://upi/pay?`   | `credpay://upi/pay?`   | Change scheme to `credpay://` and insert `/upi` before `pay?` |
| **BHIM**             | `upi://pay?` → `bhim://pay?`          | `bhim://pay?`          | Replace `upi` with `bhim`                                     |
| **Amazon Pay**       | `upi://pay?` → `amazonpay://upi/pay?` | `amazonpay://upi/pay?` | Change scheme to `amazonpay://` and add `/upi` before `pay?`  |
| **Others (Default)** | No change                             | `upi://pay?`           | Generic UPI scheme                                            |

#### App-Specific UPI URI Formats for Autopay authorisation:
Similarly you can modify the UPI URI for UPI Autopay as well to open a specific app directly. Below are example schemes for reference. Please test and verify before using in production.

| App Name             | Scheme Prefix Change                        | Final Prefix Used        | What Changed?                                                     |
| -------------------- | ------------------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| **PhonePe**          | `upi://mandate?` → `phonepe://mandate?`     | `phonepe://mandate?`     | Replace `upi` with `phonepe`                                      |
| **Google Pay**       | `upi://mandate?` → `tez://upi/mandate?`     | `tez://upi/mandate?`     | Change scheme to `tez://` and insert `/upi` before `mandate?`     |
| **Paytm**            | `upi://mandate?` → `paytmmp://mandate?`     | `paytmmp://mandate?`     | Replace `upi` with `paytmmp`                                      |
| **Navi**             | `upi://mandate?` → `navipay://mandate?`     | `navipay://mandate?`     | Replace `upi` with `navipay`                                      |
| **Super.money**      | `upi://mandate?` → `super://mandate?`       | `super://mandate?`       | Replace `upi` with `super`                                        |
| **CRED**             | `upi://mandate?` → `credpay://upi/mandate?` | `credpay://upi/mandate?` | Change scheme to `credpay://` and insert `/upi` before `mandate?` |
| **BHIM**             | `upi://mandate?` → `bhim://mandate?`        | `bhim://mandate?`        | Replace `upi` with `bhim`                                         |
| **Others (Default)** | No change                                   | `upi://mandate?`         | Generic UPI scheme                                                |


### iOS Default Behaviour 

- The URI behavior may vary across iOS versions; some devices or browsers may route the URI differently.  
- For best experience, use **app-specific URIs** to directly open a target app when possible.  
- Always test behavior on iOS versions your investors commonly use.

### App-Specific UPI URI Formats

You can modify the base UPI URI to open a specific app directly. Below are example schemes for reference — please test and verify before using in production.

App URI schemes may change over time. Confirm the latest schemes from app developer docs and test on real devices.

| App Name             | Scheme Prefix Change                  | Final Prefix Used      | What Changed?                                                 |
| -------------------- | ------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| **PhonePe**          | `upi://pay?` → `phonepe://pay?`       | `phonepe://pay?`       | Replace `upi` with `phonepe`                                  |
| **Google Pay**       | `upi://pay?` → `tez://upi/pay?`       | `tez://upi/pay?`       | Change scheme to `tez://` and add `/upi` path before `pay?`   |
| **Paytm**            | `upi://pay?` → `paytmmp://pay?`       | `paytmmp://pay?`       | Replace `upi` with `paytmmp`                                  |
| **Super.money**      | `upi://pay?` → `super://pay?`         | `super://pay?`         | Replace `upi` with `super`                                    |
| **CRED**             | `upi://pay?` → `credpay://upi/pay?`   | `credpay://upi/pay?`   | Change scheme to `credpay://` and insert `/upi` before `pay?` |
| **BHIM**             | `upi://pay?` → `bhim://pay?`          | `bhim://pay?`          | Replace `upi` with `bhim`                                     |
| **Amazon Pay**       | `upi://pay?` → `amazonpay://upi/pay?` | `amazonpay://upi/pay?` | Change scheme to `amazonpay://` and add `/upi` before `pay?`  |
                                        |

#### App-Specific UPI URI Formats for Autopay authorisation:
Similarly you can modify the UPI URI for UPI Autopay as well to open a specific app directly. Below are example schemes for reference. Please test and verify before using in production.

| App Name             | Scheme Prefix Change                        | Final Prefix Used        | What Changed?                                                     |
| -------------------- | ------------------------------------------- | ------------------------ | ----------------------------------------------------------------- |
| **PhonePe**          | `upi://mandate?` → `phonepe://mandate?`     | `phonepe://mandate?`     | Replace `upi` with `phonepe`                                      |
| **Google Pay**       | `upi://mandate?` → `tez://upi/mandate?`     | `tez://upi/mandate?`     | Change scheme to `tez://` and insert `/upi` before `mandate?`     |
| **Paytm**            | `upi://mandate?` → `paytmmp://mandate?`     | `paytmmp://mandate?`     | Replace `upi` with `paytmmp`                                      |
| **Navi**             | `upi://mandate?` → `navipay://mandate?`     | `navipay://mandate?`     | Replace `upi` with `navipay`                                      |
| **Super.money**      | `upi://mandate?` → `super://mandate?`       | `super://mandate?`       | Replace `upi` with `super`                                        |
| **CRED**             | `upi://mandate?` → `credpay://upi/mandate?` | `credpay://upi/mandate?` | Change scheme to `credpay://` and insert `/upi` before `mandate?` |
| **BHIM**             | `upi://mandate?` → `bhim://mandate?`        | `bhim://mandate?`        | Replace `upi` with `bhim`                                         |




## 2. UPI QR Flow

For web-based or desktop checkout:
- Convert the UPI URI into a QR code and display it prominently on the payment screen.  
- Investors scan it using any UPI app on their mobile phone.


