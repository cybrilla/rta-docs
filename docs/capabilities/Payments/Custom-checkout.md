---
sidebar_position: 5
sidebar_label: UPI URI Usage
title: UPI URI Usage
---

# UPI URI Usage

To build a seamless checkout experience for **UPI Lumpsum Payments** and **UPI Autopay Authorizations**, your custom checkout page should support the following modes for investors:

1. **Collect Flow** – Collect UPI ID from the investor and send a payment request to their UPI app.  
2. **Intent Flow** – Open supported UPI apps directly using the UPI Intent URI.  
3. **QR Flow** – Display a scannable QR code for payments on desktop or laptop.

For **Intent** and **QR** options, use the **UPI URI** returned in the API response.


## 1. UPI Intent Flow

### Android Default Behaviour 

When the URI (e.g., `upi://pay?...`) is opened on Android:
- The OS automatically shows a list of installed UPI-supported apps.
- The investor can select the desired app to complete the transaction.

### iOS Default Behaviour 

- The URI behavior may vary across iOS versions; some devices or browsers may route the URI differently.  
- For best experience, use **app-specific URIs** to directly open a target app when possible.  
- Always test behavior on iOS versions your investors commonly use.

### App-Specific UPI URI Formats

You can modify the base UPI URI to open a specific app directly. Below are example schemes for reference — please test and verify before using in production.

App URI schemes may change over time. Confirm the latest schemes from app developer docs and test on real devices.

| App Name | Example URI |
| --- | --- |
| **PhonePe** | phonepe://mandate?pa=cybrillatechpl.bdsi@icici&pn=CYBRILLA&am=99.00&cu=INR&tr=EZM2025102411135602145429&... |
| **Google Pay** | tez://upi/mandate?pa=cybrillatechpl.bdsi@icici&pn=CYBRILLA&am=99.00&cu=INR&tr=EZM2025102411135602145429&... |
| **Paytm** | paytmmp://mandate?pa=cybrillatechpl.bdsi@icici&pn=CYBRILLA&am=99.00&cu=INR&tr=EZM2025102411135602145429&... |
| **Navi** | navipay://mandate?pa=cybrillatechpl.bdsi@icici&pn=CYBRILLA&am=99.00&cu=INR&tr=EZM2025102411135602145429&... |
| **Super.money** | super://mandate?pa=cybrillatechpl.bdsi@icici&pn=CYBRILLA&am=99.00&cu=INR&tr=EZM2025102411135602145429&... |
| **CRED** | credpay://upi/mandate?pa=cybrillatechpl.bdsi@icici&pn=CYBRILLA&am=99.00&cu=INR&tr=EZM2025102411135602145429&... |
| **BHIM** | bhim://mandate?pa=cybrillatechpl.bdsi@icici&pn=CYBRILLA&am=99.00&cu=INR&tr=EZM2025102411135602145429&... |
| **Others (default)** | upi://mandate?pa=cybrillatechpl.bdsi@icici&pn=CYBRILLA&am=99.00&cu=INR&tr=EZM2025102411135602145429&... |



## 2. UPI QR Flow

For web-based or desktop checkout:
- Convert the UPI URI into a QR code and display it prominently on the payment screen.  
- Investors scan it using any UPI app on their mobile phone.


