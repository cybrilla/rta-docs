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

## Workflow to perform investor's bank accounts
1. Create a Pre Verification request by providing `pan`, `name` and the list of `bank_accounts` that have to be verified. The Pre Verification will be in `accepted` state which means this request has been accepted and the internally the bank account verifications are attempted. You can use the `status` attribute to check the state of Pre Verification.
2. Check the updated status using the Fetch Pre Verification API which would take the `id` or Pre Verification object.
3. If `status` is `completed`, it means there is a result available.
4. At this stage, if `bank_accounts[i].status = verified`, it means that particular bank account is verified and can be used to invest. You can go ahead and accept the transactions using that bank accounts.
5. If `bank_accounts[i].status = failed` and `bank_accounts[i].code = bank_verification_failed`, it means that this particular bank account is not eligible to be used for transactional purposes. 
		5.1. In these cases, you can proceed with collecting another bank account from the investor and use that.
6. If `bank_accounts[i].status = failed` and `bank_accounts[i].code = awaiting_approval_for_manual_verification_with_proof`, it means that this particular bank account is eligible for manual verification and that you need to pass the bank account proof and also the consent to manually verify the bank account. 
		6.1. In these cases, you can go ahead and create a new Pre Verification record by providing the `bank_account_proof` and set `verify_manually_if_required` as `true`
		6.2. In this Pre Verification result, if `bank_accounts[i].status = verified`, you can go ahead and accept the transactions using that particular bank account.
		6.3. In this Pre Verification result, if `bank_accounts[i].status = failed` and `bank_accounts[i].code = bank_verification_failed`, it means that this particular bank account is not eligible to be used for transactional purposes.
7. If suppose `bank_accounts[i].status = failed` and `bank_accounts[i].code = bank_account_proof_required`, it means that you have given your consent to Pre Verification to initiate a manual verification if required; but have not provided any `bank_account_proof` as a supporting document. In these case, provide the `bank_account_proof` and create a new Pre Verification record
8. If suppose `bank_accounts[i].status = null` and `bank_accounts[i].code = null`, it means that the bank account verification is in progress and the results should be available soon.

### Good practices to verify bank accounts using Pre Verification APIs
1. Always attempt the bank account verifications WITHOUT giving the `bank_account_proof` and the consent - `verify_manually_if_required` as `true`. This is due to the reason that manual verification of bank acccount is costly and should be attempted only if Pre Verification suggests you to do it. 
2. Once Pre Verification lets you know that the particular bank account has to be manually verified, you can continue to provide the `bank_account_proof` and `verify_manually_if_required` flag as `true` in a new Pre Verification request so that the manual verification would be internally triggered.


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
|code|string|1. `kyc_unavailable`: Investor cannot invest because KYC is unavailable<br/>2.`upstream_error`: There was an error contacting upstream to check readiness <br/>3.`unknown`: Investor is KYC Non compliant but the reason for non-compliance is not known|
|reason|string|Descriptive reason for the failure. Should be only relied for understanding the failure and not for programmatically interpreting the failure. For programmatic failure interpretation always use `code`|

### Name hash
|Attribute|Type|Remarks|
|---|---|---|
|status|string|1. `verified`: Investor can proceed to invest <br/>2.`failed`:Investor cannot invest. Please check code for more details on failure|
|code|string|1. `mismatch`: Investor cannot invest because the name does not match with the PAN records at IT department|
|reason|string|Descriptive reason for the failure. Should be only relied for understanding the failure and not for programmatically interpreting the failure. For programmatic failure interpretation always use `code`|

### PAN hash
|Attribute|Type|Remarks|
|---|---|---|
|status|string|1. `verified`: Investor can proceed to invest <br/>2.`failed`:Investor cannot invest. Please check code for more details on failure|
|code|string|1. `invalid`: Investor cannot invest because the given PAN number is either invalid or non-existent<br/>2.`aadhaar_not_linked`: Investor cannot invest because investor's Aadhaar is not seeded with PAN record|
|reason|string|Descriptive reason for the failure. Should be only relied for understanding the failure and not for programmatically interpreting the failure. For programmatic failure interpretation always use `code`|

### Date of birth hash
|Attribute|Type|Remarks|
|---|---|---|
|status|string|1. `verified`: Investor can proceed to invest <br/>2.`failed`:Investor cannot invest. Please check code for more details on failure|
|code|string|1. `mismatch`: Investor cannot invest because the date of birth does not match with the PAN records at IT department|
|reason|string|Descriptive reason for the failure. Should be only relied for understanding the failure and not for programmatically interpreting the failure. For programmatic failure interpretation always use `code`|

### Bank Accounts hash
|Attribute|Type|Remarks|
|---|---|---|
|status|string|1. `verified`: Investor can proceed to invest<br/>2.`failed`:Investor cannot invest. Please check code for more details on failure|
|code|string|1.`awaiting_approval_for_manual_verification_with_proof` - This bank account needs a  manual verification along with an associated bank account proof along with the approval for manual verification<br/>2. `bank_account_proof_required` This bank account needs a manual verification and in order to initiate it, the bank account proof should be provided|
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
|value.bank_account_proof|no|string|File ID of the associated bank account proof. Use [`POST /poa/files` API](files) to upload this file.<br/><br/>- Mandatory if you want this bank account to be manually verified in case the bank account verification demands it<br/>- Optional if you don't want this bank account to be manually verified|
|verify_manually_if_required|no|boolean|- If `true`, then it means you are approving the `pre_verification` object to manually verify the bank account if the need arises<br/>- If `false`, then it means you don't want `pre_verification` object to automatically verify the bank account even though there is a need of it. In these cases, you can choose to collect a different bank account from the investor and attempt verification again|

> The `pre_verification` object will be returned as the response.

### Note on NRI bank account verifications
- Currently, you can only attempt Pre Verification of `nre_savings` and `nro_savings` bank accounts
- All the NRI bank accounts will be manually verified as of now

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
|Valid PAN|XXXPX3751X|_anything_|_anything_|PAN numbers that match XXXPX3751X (replace X with any alphabet) are considered to be existent and valid PANs. This could be given with any combination of `name` and `date_of_birth`|
|Aadhaar not seeded with PAN|XXXPX3752X|_anything_|_anything_|PAN numbers that match XXXPX3751X (replace X with any alphabet) are cases where the Aadhaar is not seeded with the respective PANs. This could be given with any combination of `name` and `date_of_birth`|
|Name mismatch|_anything_|Lord Voldemort|_anything_|If the given `name` matches this pattern, it would mean that the name is a mismatch with the name present on the ITD database for the given PAN number|
|Date of birth mismatch|_anything_|_anything_|2000-01-01|If the given `date_of_birth` matches this pattern, it would mean that the date of birth is a mismatch with the name present on the ITD database for the given PAN number|

> **NOTE:** While testing, you can use different variations of these PAN validation to build your usecases as needed.