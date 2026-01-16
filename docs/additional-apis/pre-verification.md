---
sidebar_position: 2
sidebar_label: Pre Verification API
title: Pre Verification API
---

The Pre Verification API lets a partner verify certain demographic information of the investor even before placing the order so that such verifications can be skipped during order processing. At present, the following investor information can be pre-verified. 
1. Readiness of investor to invest (i.e whether the investor is KRA compliant to invest in MF)
2. Bank Account 
3. PAN validation [PAN, Name and Date of birth]


## Workflow to verify investor's readiness to invest
1. Create a Pre Verification request using the investor's PAN number as the `investor_identifier`. The Pre Verification will be in `accepted` state which means this request has been accepted and the internally the readiness check is initiated. You can use the `status` attribute to check the state of Pre Verification.
2. Check the updated status using the Fetch Pre Verification API which would take the `id` or Pre Verification object.
3. If `status` is `completed`, it means there is a result available.
4. At this stage, if `readiness.status = verified`, it means the investor is ready to invest. You can go ahead and accept the investments from such investors.
5. Else if `readiness.status = failed`, it means the investor is not yet ready to invest. Refer to `readiness.code` to understand why the investor is not ready.
6. If `readiness.status = failed` and `readiness.code = kyc_unavailable`, then it means that there is no KYC record available for this investor, at any of the KRAs. In these cases, use `KYC Request` feature to submit a fresh KYC application.
7. If `readiness.status = failed` and `readiness.code = upstream_error`, then retry the request

## Workflow to verify investor's bank accounts
1. Create a Pre Verification request by providing `pan`, `name` and the list of `bank_accounts` that have to be verified. The Pre Verification will be in `accepted` state which means this request has been accepted and the internally the bank account verifications are attempted. You can use the `status` attribute to check the state of Pre Verification.
2. Check the updated status using the Fetch Pre Verification API which would take the `id` or Pre Verification object.
3. If `status` is `completed`, it means there is a result available.
4. At this stage, if `bank_accounts[i].status = verified`, it means that particular bank account is verified and can be used to invest. You can go ahead and accept the transactions using that bank accounts.
5. If `bank_accounts[i].status = failed` and `bank_accounts[i].code = bank_verification_failed`, it means that this particular bank account verification failed.  
	5.1. In these cases, you can either proceed with collecting another bank account from the investor and use that or retry the bank account verification again.
6. If `bank_accounts[i].status = failed` and `bank_accounts[i].code = low_confidence`, it means that given bank account details are not satisfactorily matching with the investor's details and this is not eligible to be used for transactional purposes.  
    6.1. You can check with the investor to collect the correct bank account details and retry with a new request.
7. If `bank_accounts[i].status = failed` and `bank_accounts[i].code = uncertain`, it means that the verification of this bank account was completed but the results are uncertain. These cases are eligible to be manually verified and you can reinitiate a new Pre Verification record for this and provide `verify_manually_if_required = true`.  
    7.1. These cases will be seen for bank accounts of type `savings` or `current`.  
    7.2. If you don't want this to be verified manually, you can collect a different bank account and attempt to verify the same.
8. If suppose `bank_accounts[i].status = failed` and `bank_accounts[i].code = bank_account_proof_required`, it means that you not provided any `bank_account_proof` as a supporting documen to pre verify the given bank account. In these case, provide the `bank_account_proof` and create a new Pre Verification record.  
    8.1. These cases will be seen if you are trying to verify `nre_savings` or `nro_savings` bank accounts.
9. If the Pre Verification request fails with the error message being `Approval is required when proof is provided`, it means that you have provided the `bank_account_proof` but you have not given the consent to manually verify the given bank account.  
    9.1. These cases will be seen for bank accounts of type `nre_savings` or `nro_savings`  
    9.2. Provide `verify_manually_if_required = true` and retry the request.
10. If suppose `bank_accounts[i].status = null` and `bank_accounts[i].code = null`, it means that the bank account verification is in progress and the results should be available soon.

### Good practices to verify bank accounts using Pre Verification APIs
1. Always attempt the bank account verifications WITHOUT giving the `bank_account_proof` and the consent - `verify_manually_if_required` as `true`. This is due to the reason that manual verification of bank acccount is costly and should be attempted only if Pre Verification suggests you to do it. 
2. Once Pre Verification indicates that the particular bank account has to be manually verified, you can continue to provide the `bank_account_proof` and `verify_manually_if_required` flag as `true` in a new Pre Verification request so that the manual verification would be internally triggered.

**NOTE:** Currently, `bank_account_proof` would be needed only in cases where you are attempting to verify `nre_savings` or `nro_savings` bank accounts.


## Workflow to complete investor's PAN validation [PAN, Name and Date of birth]
1. Create a Pre Verification request by providing investor's `pan`, `name` and `date_of_birth`. The Pre Verification will be in `accepted` state which means this request has been accepted and the internally the pan validation is initiated, which will verify investor's PAN number, name and date of birth as on PAN records. You can use the `status` attribute to check the state of Pre Verification.
2. Check the updated status using the Fetch Pre Verification API which would take the `id` or Pre Verification object.
3. If `status` is `completed`, it means there is a result available.
4. At this stage, if `pan.status = verified`, it means the investor's PAN number exists and it is valid.  
4.1. Else if `pan.status = failed`, it means the investor's PAN number is not suitable to be used. Refer to `pan.code` to understand more. 
4.2. If `pan.status = failed` and `pan.code = invalid`, it means that the PAN number is either non-existent or invalid
4.3. If `pan.status = failed` and `pan.code = aadhaar_not_linked`, it means investor's Aadhaar is not seeded with the PAN record.
5. At this stage, if `name.status = verified`, it means the investor's name matches with the PAN records at IT Department.  
5.1. Else if `name.status = failed`, it means the investor's does not match with the PAN records and hence not suitable to be used. Refer to `name.code` to understand more. Possible value for `name.code` is `mismatch`.
6. At this stage, if `date_of_birth.status = verified`, it means the investor's date-of-birth matches with the PAN records at IT Department.  
6.1. Else if `date_of_birth.status = failed`, it means the investor's date-of-birth does not match with the PAN records and hence not suitable to be used. Refer to `date_of_birth.code` to understand more. Possible value for `date_of_birth.code` is `mismatch`.
7. If `pan.status = failed and pan.code = upstream_error` or `name.status = failed and name.code = upstream_error` or `date_of_birth.status = failed and date_of_birth.code = upstream_error`, then retry the PAN validation again.

## Pre Verification Object

```json
{
    "object": "pre_verification",
    "id": "pv_8f6ed76d90ef43a2b4854717ac78d747",
    "status": "completed",
    "investor_identifier": "GYAPS3751D",
    "readiness": {
        "status": "verified",
        "code": null,
        "reason": null
    },
    "name": {
        "status": "verified",
        "code": null,
        "reason": null,
        "value": "Seetharam S"
    },
    "pan": {
        "status": "verified",
        "code": null,
        "reason": null,
        "value": "GYAPS3751D"
    },
    "date_of_birth": {
        "status": "verified",
        "code": null,
        "reason": null,
        "value": "1992-09-12"
    },
    "bank_accounts": [
        {
            "status": "verified",
            "code": null,
            "reason": null,
            "value": {
                "account_number": "92001091194",
                "ifsc_code": "UTIB0003093",
                "account_type": "nre_savings",
                "bank_account_proof": "file_e55ddbad95120si09153a7b1eb68fc01"
            }
        }
    ],
    "created_at": "2025-08-05T18:30:11+0530",
    "completed_at": "2025-08-05T18:34:48+0530",
    "updated_at": "2025-08-05T18:34:48+0530"
}
```


## Pre Verification Object parameters
|Attribute|Type|Remarks|
|---|---|---|
|object|string|Value will always be `pre_verification`. Objects of the same type share the same value|
|id|string|Unique identifier of the `pre_verification` object|
|status|string|Indicates the what status of pre verification<br/> 1. `accepted`: Pre verification request is accepted and is under progress<br/>2. `completed`: Pre verification completed. You can refer to other attributes like `readiness` to know more about the result|
|investor_identifier|string|Unique identifier identifying the investor|
|readiness|hash|The hash representing whether the investor is ready to invest in MF|
|name|hash|Name of the investor|
|pan|hash|Pan of the investor|
|date_of_birth|hash|Investor's date of birth|
|bank_accounts|array|Array of bank accounts|
|created_at|string|Preverification creation timestamp|
|completed_at|string|If preverification is completed, the completion timestamp.|
|updated_at|string|Last time when preverification was updated|

### Readiness hash
|Attribute|Type|Remarks|
|---|---|---|
|status|string|1. `verified`: Investor can proceed to invest <br/>2.`failed`:Investor cannot invest. Please check code for more details on failure|
|code|string|1. `kyc_unavailable`: Investor cannot invest because KYC is unavailable<br/>2.`kyc_incomplete`: Investor cannot investor because his KYC record is incomplete. There could be 3 possibilities here:<br/>- Aadhaar not linked with KYC record<br/>- PAN is not seeded with Aadhaar<br/>- Email address or phone number is not present<br/>3.`upstream_error`: There was an error contacting upstream to check readiness <br/>4.`unknown`: Investor is KYC Non compliant but the reason for non-compliance is not known|
|reason|string|Descriptive reason for the failure. Should be only relied for understanding the failure and not for programmatically interpreting the failure. For programmatic failure interpretation always use `code`|

**Handling different `readiness` scenarios**
- If `readiness.status = verified` or `readiness.status = failed` with `readiness.code = kyc_incomplete`, you can use [KYC Forms API](/additional-apis/kyc-forms.md) to update the investor details if required.
- If `readiness.status = failed` with `readiness.code = unavailable`, you need to initiate a fresh KYC for this investor and submit the same.

### Name hash
|Attribute|Type|Remarks|
|---|---|---|
|status|string|1. `verified`: Investor can proceed to invest <br/>2.`failed`:Investor cannot invest. Please check code for more details on failure|
|code|string|1. `mismatch`: Investor cannot invest because the name does not match with the PAN records at IT department<br/>2. `upstream_error`: There was an error contacting upstream to verify name|
|reason|string|Descriptive reason for the failure. Should be only relied for understanding the failure and not for programmatically interpreting the failure. For programmatic failure interpretation always use `code`|

### PAN hash
|Attribute|Type|Remarks|
|---|---|---|
|status|string|1. `verified`: Investor can proceed to invest <br/>2.`failed`:Investor cannot invest. Please check code for more details on failure|
|code|string|1. `invalid`: Investor cannot invest because the given PAN number is either invalid or non-existent<br/>2.`aadhaar_not_linked`: Investor cannot invest because investor's Aadhaar is not seeded with PAN record<br/>3. `upstream_error`: There was an error contacting upstream to verify PAN|
|reason|string|Descriptive reason for the failure. Should be only relied for understanding the failure and not for programmatically interpreting the failure. For programmatic failure interpretation always use `code`|

### Date of birth hash
|Attribute|Type|Remarks|
|---|---|---|
|status|string|1. `verified`: Investor can proceed to invest <br/>2.`failed`:Investor cannot invest. Please check code for more details on failure|
|code|string|1. `mismatch`: Investor cannot invest because the date of birth does not match with the PAN records at IT department<br/>2. `upstream_error`: There was an error contacting upstream to verify date of birth|
|reason|string|Descriptive reason for the failure. Should be only relied for understanding the failure and not for programmatically interpreting the failure. For programmatic failure interpretation always use `code`|

### Bank Accounts hash
|Attribute|Type|Remarks|
|---|---|---|
|status|string|1. `verified`: Investor can proceed to invest<br/>2.`failed`:Investor cannot invest. Please check code for more details on failure|
|code|string|1. `bank_verification_failed` - This bank account verification failed and you can either collect a new bank account from the investor or retry this in a new request<br/>2. `bank_account_proof_required` This bank account needs a manual verification and in order to initiate it, the bank account proof should be provided<br/>3. `low_confidence` - This means the given bank account details do not match with the investor details and hence this is not fit to be used for transactional purposes<br/>4. `uncertain` - This indicates that the result of the bank account verification is uncertain and this record is eligible for manual verification|
|value.account_number|string|Bank account number|
|value.ifsc_code|string|IFSC code associated with the bank account|
|value.account_type|string|Bank account type|
|value.bank_account_proof|string|File ID of the bank account proof associated|

## Create Pre Verification API

`POST /poa/pre_verifications`

This API lets you create a pre verification object.
```json
curl --location '{{base_url}}/poa/pre_verifications' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "investor_identifier": "GYAPS3751D",
    "pan": {
        "value": "GYAPS3751D"
    },
    "name": {
        "value": "Seetharam S"
    },
    "date_of_birth": {
        "value": "1992-09-12"
    },
    "bank_accounts": [       
        {
            "value": {
                "account_number": "92001091294",
                "ifsc_code": "UTIB0003093",
                "account_type": "nre_savings",
                "bank_account_proof":  "file_e55ddbad95891ihdjh7b1eb68fc01"                
            },
            "verify_manually_if_required": true
        }
    ]
}'
```

### Request parameters

|Name|Mandatory|Type|Comments|
|-|-|-|-|
|investor_identifier|no|string|Investor identifier. Currently only PAN number of the investor is supported<br/><br/>- Mandatory to check `Readiness of the investor to invest`|
|pan.value|no|hash|- Mandatory for PAN validation<br/>- Mandatory if `bank_accounts` is present with one of the `bank_account.account_type` being `savings` or `current`<br/>- Optional if `bank_accounts` is present with one of the `bank_account.account_type` as `nre_savings` or `nre_current`|
|name.value|no|hash|- Mandatory for PAN validation<br/>- Mandatory for bank account verification|
|date_of_birth.value|no|hash|- Mandatory for PAN validation|
|bank_accounts|no|array|Array of `bank_account` hashes<br/><br/>- Mandatory for bank account verification|

#### Bank account hash
|Name|Mandatory|Type|Comments|
|-|-|-|-|
|value.account_number|yes|string|Bank account number|
|value.ifsc_code|yes|string|IFSC code linked with the bank account|
|value.account_type|yes|string|Bank account type. Supported values are - `savings`, `current`, `nre_savings`, `nro_savings`<br/><br/>Note: This is case-sensitive|
|value.bank_account_proof|no|string|File ID of the associated bank account proof. Use [`POST /poa/files` API](files) to upload this file.<br/><br/>- Mandatory if you want this bank account to be manually verified in case the bank account verification demands it. Applicable for `nre_savings` and `nro_savings` bank account types|
|verify_manually_if_required|no|boolean|- If `true`, then it means you are approving the `pre_verification` object to manually verify the bank account if the need arises<br/>- If `false`, then it means you don't want `pre_verification` object to automatically verify the bank account even though there is a need of it. In these cases, you can choose to collect a different bank account from the investor and attempt verification again|

> The `pre_verification` object will be returned as the response.

### Note on RI bank account verifications
- As a first step, all bank account verifications of `savings` or `current` bank account types, will be performed digitally
- If suppose the result is unsatisfactory and this record is eligible to be verified manually, the same will be indicated via `code` being `uncertain`. In these cases, you can trigger a new Pre Verification with the same bank account details along with setting `verify_manually_if_required` flag to `true`

### Note on NRI bank account verifications
- Currently, you can only attempt Pre Verification of `nre_savings` and `nro_savings` bank accounts
- All the NRI bank accounts will be manually verified as of now
- `bank_account_proof` is mandatory for NRI bank account verifications

### Note on manual bank account verifications
- Manual bank account verifications are performed by Cybrilla's team
- Currently the TAT for any manual verification is 1 business day

### Note on PAN validation
- You need to provide `pan`, `name` and `date_of_birth` to trigger a PAN validation
- As a part of this process, investor's PAN, name and date of birth will be verified individually

### Note on Pre Verification object events 
- Events are triggered upon `status` changes that happen on `pre_verification` object.
- Types of events -
	- `pre_verification.accepted`
	- `pre_verification.completed`
- For more details, check [Webhook notifications](https://fintechprimitives.com/docs/api/#webhook-notifications) page.

## Fetch Pre Verifications API

`GET /poa/pre_verifications/:id`

This API lets you fetch a pre verification object.
```json
curl --location '{{base_url}}/poa/pre_verifications/:id' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>'
```


### Query parameters
|Name|Mandatory|Type|Comments|
|-|-|-|-|
|id|yes|string|ID of the `pre_verification` object|

> The `pre_verification` object will be returned as the response.

---

## Testing

In sandbox, simulation facility can be used to test pre verifications. This facility is only available in sandbox.

### Readiness and bank account verification
You can use the same testing scenarios present in KYC Check section. [Here](https://docs.fintechprimitives.com/identity/kyc-check/#testing) is the link to that.

### Bank account verification
You can use the same testing scenarios present in Verify bank account section. [Here](https://docs.fintechprimitives.com/identity/verification/perform-bank-account-verification/#testing) is the link to that.

### PAN validation

|Scenario|PAN format|Name|Date of birth|Description|
|-|-|-|-|-|
| Invalid PAN | XXXPINNNNX | _anything_ | _anything_ | PAN numbers that match `XXXPINNNNX` (replace `X` with any alphabet and `N` with any number) are considered to be invalid PANs. In these cases, the status for `name` and `date_of_birth` will be set as `false`|
| Aadhaar not seeded with PAN | XXXPANNNNX | _anything_ | _anything_ | PAN numbers that match `XXXPANNNNX` (replace `X` with any alphabet and `N` with any number) are cases where the Aadhaar is not seeded with the respective PANs. This could be given with any `name` and `date_of_birth`|
| Name mismatch | XXXPXNNNNX | Lord Voldemort | _anything_ | If the `name` matches this pattern and the associated PAN number matches the pattern `XXXPXNNNNX` (replace `X` with any alphabet and `N` with any number), this will result in a name mismatch at ITD database for the given PAN number|
| Date of birth mismatch | XXXPXNNNNX | _anything_ | 2000-01-01 | If the `date_of_birth` matches this pattern and the associated PAN number matches the pattern `XXXPXNNNNX` (replace `X` with any alphabet and `N` with any number), this will result in a date of birth mismatch at ITD database for the given PAN number|
| Aadhaar not seeded along with name and date of birth mismatches | XXXPANNNNX | Lord Voldemort | 2000-01-01 | If `name` and `date_of_birth` match these patterns along with PAN number matching the pattern `XXXPANNNNX` (replace `X` with any alphabet and `N` with any number), this will result in a combination of name and date of birth mismatches along with Aadhaar not being seeded with PAN number at ITD database|
| Valid PAN | XXXPXNNNNX | _anything_ | _anything_ | PAN numbers that match `XXXPXNNNNX` (replace `X` with any alphabet and `N` with any number) are considered to be existent and valid PANs. This could be given with any combination of `name` and `date_of_birth`|

> **NOTE:** While testing, you can use different variations of these PAN validation simulations to build your usecases as needed. 