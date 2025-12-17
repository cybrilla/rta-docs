---
sidebar_position: 3
sidebar_label: KYC Forms API
title: KYC Forms API (Early access)
---

The KYC Forms API lets a partner submit or modify KYC details of their investors. Currently, Cybrilla POA supports only modification of existing KYC records. The modification of KYC record will be supported if the investors' KYC status at the KRA is one of the below -
- `validated`
- `verified` or `registered`
- `onhold`

## Workflow to Modify a particular KYC Record
1. As a good practice, first check the KYC status of the investor using the PAN number. If the KYC status is one of the above mentioned ones, only then intiate a KYC Form with `type = modify`
2. Create a KYC Form with `type = modify` by giving `pan`, `name`, `date_of_birth`, `proof_details_callback_url` and `esign_callback_url`. At this stage, `kyc_form` object will be created with `under_review` state. Internally Cybrilla will decide if the particular KYC record linked against the given PAN is eligible for KYC Modification or not. If not eligible, `kyc_form` will move into `failed` state with `reason = ineligible_for_kyc_modification` 
    - `proof_details_callback_url` will take in the URL where you want the investor to redirect back after the Digilocker journey
    - `esign_callback_url` will take in the URL where you want the investor to redirect back after the esign journey
    - Please note that `pan`, `name` and `date_of_birth` should be as per ITD / PAN records
3. If the KYC record is eligible to be modified, then `kyc_form` will move into `created` state. Now, you need to provide all the details needed to complete the form. You can refer to `requirements.fields_needed` array to figure out the pending details.
4. You will also see a redirection URL present in the `proof_details.fetch_url` attribute. Use this URL to redirect your investor into the Digilocker page and the investor has to complete the journey to fetch Aadhaar details. Once Aadhaar details are fetched, the same will be used as both Identity and Address proofs.  
    4.1. In case the proof details fetch fails due to some reason, you can retry the same using `Retry proof details fetch` API.  
    4.2. Note that you can use this Retry proof details fetch API only if `proof_details.status = failed`.  
5. You also need to collect a photocopy of the investor's wet signature to complete the workflow. Once you have the same, you need to use the `Upload Signature to KYC Form` API to upload the signature file to Cybrilla.
6. Once you have provided all the details to Cybrilla, `requirements.fields_needed` in the `kyc_form` object will be `null`. Now, `kyc_form` will move into `awaiting_esign` state.
7. Refer to `esign_details.esign_url` attribute to get the esign redirection link where the investor should complete the esign journey. Once this is completed successfully, `kyc_form` will move into `awaiting_submission` state.  
    7.1. `kyc_form` can move into `awaiting_submission` state only if `esign_details.status` is in `successful` state.  
    7.2. You can retry this URL as long as the investor can make a successful esign.
8. Internally Cybrilla will attempt to submit this KYC Form to the KRA and based on this, `kyc_form` will move into either `submitted` or `failed` state. If it moves into a `failed` state, you can refer to the `reason` attribute for more details.
9. If suppose investor is not taking any action to complete the KYC Form within 7 days since its creation, `kyc_form` will move into `expired` state. You can refer to `expires_at` attribute to get to know the expiry date and time. If the investor wants to modify the KYC record at a later date, a new `kyc_form` has to be created and this same workflow has to be followed.

> **NOTE:** You can create a `kyc_form` object only if there is no on-going `kyc_form` for the given PAN. 

## KYC Form object
```json
{
    "object": "kyc_form",
    "id": "kycf_2de2a1df94614d048000dd101a566925",

    "type": "modify",

    "status": "created",
    "reason": null,
    
    "pan": "AAAPA3751A",
    "name": "John Doe",
    "date_of_birth": "2000-01-02",
    "email_address": "joyboy@myself.com",
    "phone_number": "9876543210",
    "residential_status": "resident",
    "gender": "male",
    "marital_status": "unmarried",
    "father_name": "Davy Johns",
    "spouse_name": null,
    "occupation_type": "private_sector_service",
    "aadhaar_number": "1210",
    "country_of_birth": "in",
    "place_of_birth": "in",
    "income_slab": "above_10lakh_upto_25lakh",
    "pep_details": "no_exposure",
    "citizenship_countries": [
        "in"
    ],
    "nationality_country": "in",
    "tax_residency_other_than_india": false,
    "non_indian_tax_residency_1": null,
    "non_indian_tax_residency_2": null,
    "non_indian_tax_residency_3": null,
    
    "signature_provided": false,

    "proof_details": {
        "fetch_url": "https://s.finprim.com/identity_documents/fetch_my_proof",
        "status": "pending"
    },
    "proof_details_callback_url": "https://myapp.com/proof_details_callback",
    "identity": {
        "proof_type": null
    },
    "address": {
        "proof_type": null
    },

    "geolocation": {
        "latitude": 9.354,
        "longitude": 77.453
    },

    "esign_details": {
        "esign_url": null,
        "status": null
    },
    "esign_callback_url": "https://myapp.com/esign_callback",
    
    "requirements": {
        "fields_needed": [
            "identity_proof",
            "address",
            "signature"
        ]
    },

    "created_at": "2025-12-23T12:41:06.649Z",
    "updated_at": null,
    "under_review_at": "2025-12-23T12:41:06.649Z",
    "created_state_at": "2025-12-23T12:41:07.649Z",
    "awaiting_esign_at" : null,
    "awaiting_submission_at": null,
    "submitted_at": null,
    "failed_at": null,
    "expires_at": "2025-12-30T12:41:06.649Z"
}
```

## KYC Form Object parameters
|Attribute|Type|Remarks|
|---|---|---|
|object|string|Value will always be `kyc_form`. Objects of the same type share the same value|
|id|string|Unique identifier of the `kyc_form` object|
|type|enum|Type of the KYC Form. Possible values are - `modify`|
|status|string|Indicates the what status of pre verification<br/>- `under_review` - Cybrilla is internally checking the eligibility for the type of KYC form initiated<br/>- `created` - KYC form is created and the data can be provided as indicated in `requirements.fields_needed` array<br/>- `awaiting_esign` - The KYC form is completely filled up and the invesor has to esign the same in-order to submit it to the processing entity<br/>- `awaiting_submission` - Cybrilla is attempting to submit the esigned KYC form to the processing entity<br/>- `submitted` - The esigned KYC form is submitted to the processing entity<br/>- `failed` - KYC form failed to successfully reach an end state. Refer to `reason` for more details<br/>- `expired` - KYC form is expired since investor did not take any action on it|
|reason|string|The reason why `kyc_form` is in a `failed` state|
|pan|string|PAN number of the investor|
|name|string|Name of the investor|
|date_of_birth|String|Date of birth of the investor|
|email_address|string|Email address of the investor|
|phone_number|string|Phone number of the investor|
|residential_status|enum|Investor's residential status. Possible values are - `resident`|
|gender|enum|Investor's gender. Possible values are - `male`, `female` and `transgender`|
|marital_status|enum|Marital status of the investor. Possible values are `married`, `unmarried` and `others`|
|father_name|string|Investor's father's name. Needed only if `marital_status` is `umarried` or `others`|
|spouse_name|string|Investor's spouse's name. Needed only if `marital_status` is `married`|
|occupation_type|enum|Investor's occupation. Possible values are - `business`, `professional`, `retired`, `housewife`, `student`, `public_sector_service`, `private_sector_service`, `government_service`, `agriculture`, `doctor`, `forex_dealer`, `service`, `others`|
|aadhaar_number|string|Last 4 digits of investor's Aadhaar number|
|country_of_birth|string|Investor's country of birth. ISO country code will be present|
|place_of_birth|string|Investor's place of birth|
|income_slab|enum|Investor's income slab. Possible values are - `upto_1lakh`, `above_1lakh_upto_5lakh`, `above_5lakh_upto_10lakh`, `above_10lakh_upto_25lakh`, `above_25lakh_upto_1cr`, `above_1cr`|
|pep_details|string|Investor's political exposure details. Possible values are<br/>- `pep` - Politically exposed<br/>- `related_pep` - Related to a politically exposed person<br/>- `no_exposure` - No political exposure|
|citizenship_countries|array|List of countries where the investor has a citizenship|
|nationality_country|string|ANSI code of investor's country of nationality|
|tax_residency_other_than_india|boolean|If investor is a tax payer in any country other than India, such details will be indicated here. Possible values are `true` or `false`|
|non_indian_tax_residency_1|hash|If investor is a tax payer in any country other than India, such details will be mentioned here|
|non_indian_tax_residency_2|hash|If investor is a tax payer in any country other than India, such details will be mentioned here|
|non_indian_tax_residency_3|hash|If investor is a tax payer in any country other than India, such details will be mentioned here|
|signature_provided|boolean|Indicates if the photocopy of the signature has been uploaded against this `kyc_form` or not. Possbile values are `true` or `false`|
|proof_details|hash|This will give the details on the status of fetching proof details that will be submitted against the `kyc_form`|
|proof_details_callback_url|string|The callback URL where the investor will be redirected to post proof fetch workflow|
|identity|hash|Identity proof details. This will have the `proof_type` that was captured. Possible values are `aadhaar`|
|address|hash|Address proof details. This will have the `proof_type` that was captured. Possible values are `aadhaar`|
|geo_location|hash|Geo-location of the investor from where this KYC form is being filled up and submitted|
|esign_details|hash|This will give the details on the status of the esign workflow|
|esign_callback_url|string|The callback URL where the investor will be redirected to post esign workflow|
|requirements|hash|Feedback on the data requirements. It contains `fields_needed` array which represent the list of fields that are required for procesing the KYC Form|
|created_at|string|The timestamp at which the `kyc_form` object was created with `under_review` state|
|updated_at|string|The timestamp at which the `kyc_form` object was updated with any value|
|review_completed_at|string|The timestamp at which the `kyc_form` object moved into `created` state from `under_review` state|
|awaiting_esign_at|string|The timestamp at which the `kyc_form` object moved into `awaiting_esign` state|
|awaiting_submission_at|string|The timestamp at which the `kyc_form` object moved into `awaiting_submission` state|
|submitted_at|string|The timestamp at which the `kyc_form` object moved into `submitted` state|
|failed_at|string|The timestamp at which the `kyc_form` object moved into `failed` state|
|expires_at|string|The timestamp at which the `kyc_form` object will move into `expired` state|

### Non Indian Tax Residency hash
|Attribute|Type|Comments|
|-|-|-|
|country|string|ANSI code of investor's country of tax residency|
|taxid_number|string|Valid Tax Identification number issued in the above mentioned country|

### Proof details hash
|Attribute|Type|Comments|
|-|-|-|
|fetch_url|string|URL to redirect your investor into the Digilocker page|
|status|string|Status of the proof fetch. Possible values are - `pending`, `fetched` and `failed`|

### Geo-location hash
|Attribute|Type|Comments|
|-|-|-|
|latitude|float|Value of the Latitude|
|longitude|float|Value of the Longitude|

### Esign details hash
|Attribute|Type|Comments|
|-|-|-|
|esign_url|string|URL to redirect your investor to complete esign workflow|
|status|string|Status of the proof fetch. Possible values are - `pending`, and `successful`|

## Create KYC Form API

`POST /poa/kyc_forms`

This API lets you create a KYC form object.

```json
curl --location --request POST '{{base_url}}/poa/kyc_forms' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "type": "modify",

    "pan": "AAAPA3751A",
    "name": "John Doe",
    "date_of_birth": "2000-01-02",

    "proof_details_callback_url": "https://myapp.com/proof_details_callback",
    "esign_callback_url": "https://myapp.com/esign_callback"
}'
```

### Request parameters

|Name|Mandatory to create `kyc_form` object|Mandatory to submit `kyc_form` details|Type|Comments|
|-|-|-|-|-|
|type|yes|yes|enum|Type of the KYC Form. Allowed values are - `modify`|
|pan|yes|yes|string|PAN number of the investor. This should be in the format `AAAPANNNNA` where `A` can be any alphabet and `N` can be any number|
|name|yes|yes|string|Name of the investor. This should not contain any special characters|
|date_of_birth|yes|yes|string|Date of birth of the investor in the format `yyyy-mm-dd`|
|proof_details_callback_url|yes|yes|string|The callback URL where the investor will be redirected to post proof fetch workflow|
|esign_callback_url|yes|yes|string|The callback URL where the investor will be redirected to post esign workflow|
|email_address|no|yes|string|Email address of the investor|
|phone_number|no|yes|string|Phone number of the investor|
|residential_status|no|yes|enum|Investor's residential status. Allowed values are - `resident`|
|gender|no|yes|enum|Investor's gender. Allowed values are - `male`, `female` and `transgender`|
|marital_status|no|yes|enum|Marital status of the investor. Allowed values are `married`, `unmarried` and `others`|
|father_name|no|conditional|string|Investor's father's name. Needed only if `marital_status` is `umarried` or `others`|
|spouse_name|no|conditional|string|Investor's spouse's name. Needed only if `marital_status` is `married`|
|occupation_type|no|yes|enum|Investor's occupation. Allowed values are - `business`, `professional`, `retired`, `housewife`, `student`, `public_sector_service`, `private_sector_service`, `government_service`, `agriculture`, `doctor`, `forex_dealer`, `service`, `others`|
|aadhaar_number|no|yes|string|Last 4 digits of investor's Aadhaar number|
|country_of_birth|no|yes|string|Investor's country of birth. ISO country code should be provided|
|place_of_birth|no|yes|string|Investor's place of birth. Length is allowed upto 60 characters|
|income_slab|no|yes|enum|Investor's income slab. Allowed values are - `upto_1lakh`, `above_1lakh_upto_5lakh`, `above_5lakh_upto_10lakh`, `above_10lakh_upto_25lakh`, `above_25lakh_upto_1cr`, `above_1cr`|
|pep_details|no|yes|string|Investor's political exposure details. Allowed values are<br/>- `pep` - Politically exposed<br/>- `related_pep` - Related to a politically exposed person<br/>- `no_exposure` - No political exposure|
|citizenship_countries|no|yes|array|List of countries where the investor has a citizenship. Currently only one value is supported. You need to pass the ANSI code of the citizenship country|
|nationality_country|no|yes|string|ANSI code of investor's country of nationality|
|tax_residency_other_than_india|no|yes|boolean|If investor is a tax payer in any country other than India, such details will be indicated here. Possible values are `true` or `false`|
|non_indian_tax_residency_1|no|yes|hash|If investor is a tax payer in any country other than India, such details will be mentioned here. Mandatory if `tax_residency_other_than_india` is `true`|
|non_indian_tax_residency_2|no|yes|hash|If investor is a tax payer in any country other than India, such details will be mentioned here|
|non_indian_tax_residency_3|no|yes|hash|If investor is a tax payer in any country other than India, such details will be mentioned here|
|geo_location|no|yes|hash|Geo-location of the investor from where this KYC form is being filled up and submitted. Ensure that this in within India|

### Non Indian Tax Residency hash
|Attribute|Mandatory|Type|Comments|
|-|-|-|-|
|country|yes|string|ANSI code of investor's country of tax residency|
|taxid_number|yes|string|Valid Tax Identification number issued in the above mentioned country|

### Geo-location hash
|Attribute|Mandatory|Type|Comments|
|-|-|-|-|
|latitude|yes|float|Value of the Latitude|
|longitude|yes|float|Value of the Longitude|

**NOTE:** Even though some of the above parameters are marked as non-mandatory for the `kyc_form` object creation, all those are needed to submit the `kyc_form` to the KRA.

> The `kyc_form` object will be returned as the response.

## Update KYC Form API

`PATCH /poa/kyc_forms`

This API lets you update a KYC form object.

```json
curl --location --request PATCH '{{base_url}}/poa/kyc_forms' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data '{
    "id": "{{kyc_form_id}}",

    "gender": "male",
    "marital_status": "unmarried"
}'
```

### Request parameters

|Name|Mandatory|Type|Comments|
|-|-|-|-|
|id|yes|string|ID of the `kyc_form` object which has to be updated|

**NOTE:** Other parameters are same as `Create KYC Form API` request parameters. Ensure that all the listed fields in `requirements.fields_needed` array are updated.

> The `kyc_form` object will be returned as the response.


## Fetch KYC Form API

This API lets you fetch a KYC Form object.

```json
curl --location --request GET '{{base_url}}/poa/kyc_forms/{{kyc_form_id}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
```

### Query parameters

|Name|Mandatory|Type|Comments|
|-|-|-|-|
|id|yes|string|ID of the `kyc_form` object which has to be updated|

> The `kyc_form` object will be returned as the response.


## Upload Signature to KYC Form API

This API lets you update a signature file to the KYC Form object.

```json
curl --location --request POST '{{base_url}}/poa/kyc_forms/{{kyc_form_id}}/signature' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--form 'file=@"/Users/guessmyname/Downloads/WhiteAndBlackSignature.jpg"'
```

**NOTE:** 
- Once you have uploaded the signature to `kyc_form` object, `signature_provided` will be marked as `true`.
- Supported file formats: `png`, `jpg`, `jpeg` and `pdf`
- Supported file size: Upto 5 MB

> The `kyc_form` object will be returned as the response.


## Retry proof details fetch API

This API lets you get a new URL to fetch `proof_details`. You can use this API only if `proof_details.status` is in a `failed` state.

```json
curl --location --request POST '{{base_url}}/poa/kyc_forms/{{kyc_form_id}}/retry_proof_details_fetch' \
--header 'Content-Type: application/json' \
--header 'x-tenant-id: cybrillarta' \
--header 'Authorization: Bearer <token>'
```

> The `kyc_form` object will be returned as the response.