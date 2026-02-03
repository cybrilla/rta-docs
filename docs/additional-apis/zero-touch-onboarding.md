---
sidebar_position: 2
sidebar_label: Zero Touch Onboarding APIs
title: Zero Touch Onboarding APIs
---

The Zero Touch Onboarding APIs lets a partner to attempt fetching certain details of the investor from a couple of third party sources. At present, bank account details and demographic information of the investor can be attempted to fetch using the below 2 APIs - 
1. Bank Account Lookup API
2. Investor Data Lookup API

## Obligations to partners using ZTO APIs
- To be compliant with Cybersecurity and Cyber Resilience Framework (CSCRF), partners using ZTO APIs shall shall use industry standard, strong encryption algorithms (e.g.,RSA, AES, etc.) to store PII fetched from ZTO Lookup APIs
- Partners should get an approval from sponsor AMC. If sponsor AMC decides not to sponsor a particular partner, Cybrilla shall disable access of ZTO Lookup APIs to such partners
- Partners have to fetch the data only for investors who are initiating a mutual fund transaction or doing a mutual fund KYC. Partners should not use this data for any other purpose
- Partners should not resell this data fetched from ZTO Lookup APIs
- Partners should not store this data on foreign servers
- Partners should not lookup data using ZTO APIs without obtaining explicit informed one time consent from investors
- Partners should ensure that the investor consent text used is the same as approved by Cybrilla and not alter it in any manner
	- Consent text for Bank account lookup - `I allow <partner> to fetch my bank account details using my phone number via Cybrilla and its partners.`
	- Consent text for Investor data lookup - `I allow <partner> to fetch my demographic details using my phone number and name from the credit bureau via Cybrilla and its partners.`
- Partners should only fetch bank account details once per phone number
- Partners should only fetch investor details once per phone number + name combination
- Partners should allow investors to review the fetched data and edit it as needed
- In case of data breach at partner's end, partners are obligated to (i) notify Cybrilla within 2 hours of any data breach; (ii) provide complete cooperation in Cybrilla's regulatory defense; (iii) bear all costs of investigation/forensics; (iv) not settle claims without Cybrilla's approval. Partner assumes sole responsibility for all communications with regulators/investors
- Partners shall indemnify, defend, and hold harmless Cybrilla, its affiliates, officers, and employees from and against ALL claims, damages, losses, liabilities, costs, and expenses (including attorneys' fees) arising out of or relating to: (i) Partner's breach of DPDP Act obligations; (ii) any data breach caused by Partner's systems/sub-processors; (iii) regulatory fines/penalties imposed on Partner; (iv) investor lawsuits against Partner. This indemnity survives bankruptcy, insolvency, or termination
- Partners shall not use robot/crawler or any other automated mechanism to use lookup APIs
- Cybrilla doesn't guarantee any SLAs for lookup APIs
- Cybrilla doesn't guarantee the quality of the data returned via lookup APIs
- Cybrilla may audit the partner’s implementation at any time, and the partner shall fully cooperate and provide necessary support for such audits

## Go-live checklist for ZTO APIs
- Get an approval from a sponsor AMC with which Cybrilla has signed an agreement for facilitating this sponsorship
- Sign a ZTO offering agreement/addendum with Cybrilla
- Cybrilla will review partners' implementations and sign-off on the below items -
	- ZTO APIs are not called before collecting explicit investor consents
	- Explicit investor consents is obtained separately for Bank Account Lookup and Investor Data Lookup
	- Cybrilla pre-approved text is used as consent text
	- Checkboxes are provided for investors for opting in (i.e. for providing consent) for data fetch and these checkboxes are not checked by default
	- The app or any other digital asset where lookup data is used is verifying the investor's phone number
	- The data fetched is used only for mutual fund transaction processing in the UI workflow
	- Investors have an option to review the data fetched and edit the same

> **NOTE:** Reach out to [Cybrilla's Customer Service Team](mailto:customerservice@cybrilla.com) for any queries regarding ZTO APIs go-live.

## Bank Account Lookup API

The Bank account lookup API lets a partner fetch the bank account details of the investor that is registered against the primary VPA / UPI ID.


### Bank account lookup object

```json
{
    "object": "bank_account_lookup",
    "id": "bal_32PUeQZKweX8ZBSXY22Iqq9u3yg",
    
    "status": "success",
    
    "source_ref_id": "1a478f56-54df-41aa-951a-b2c7edbada2",
    "phone_number": "9012390123",
    "phone_number_verified": true,

    "consent": {
        "acquisition_time": "2026-02-02T14:09:20+0530",
        "purpose": "mutual_fund_transction_processing",
        "mode": "checkbox",
        "validity_type": "onetime"
    },
    
    "data": {
        "account_holder_name": "Rakshith Agarwal",
        "account_number": "98123108291821",
        "ifsc_code": "utib0003076"
    }
}
```

|Attribute|Type|Comments|
|-|-|-|
|object|string|Value is `bank_account_lookup`. String representing the object type. Objects of the same type share the same value|
|id|string|Unique identifier of the `bank_account_lookup` object
|status|enum|The status of the `bank_account_lookup` object. Possible values are - `pending`, `successful`, `failed`|
|source_ref_id|string|A unique identifier that could be used as a an internal reference ID at the API request source|
|phone_number|string|Phone number of the investor against which the bank account lookup was attempted|
|phone_number_verified|boolean|Indicates the phone number verification status|
|consent|hash|Details regarding the investor consent collected to lookup the data|

#### `consent` hash 
|Attribute|Type|Comments|
|-|-|-|
|acquisition_time|timestamp|Date and time when the investor consent was collected to lookup the bank account data|
|purpose|enum|Indicates the purpose for which the looked up data can be used for|
|mode|enum|Mode through which the investor consent was collected|
|validity_type|enum|Validity of the investor consent collected| 

### Create Bank Account Lookup

`POST /v2/bank_account_lookups`

This API lets you create a bank account lookup object.
```json
curl --location '{{base_url}}/v2/bank_account_lookups' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data  '{
    "source_ref_id": "1a478f56-54df-41aa-951a-b2c7edbada2",
    "phone_number": "9012390123",
    "phone_number_verified": true,

    "consent": {
        "acquisition_time": "2026-02-02T14:09:20+0530",
        "purpose": "mutual_fund_transction_processing",
        "mode": "checkbox",
        "validity_type": "onetime"
    }
}
'
```

#### Request parameters

|Name|Mandatory|Type|Comments|
|-|-|-|-|
|source_ref_id|no|string|A unique identifier that could be used as a an internal reference ID at the API request source. If something is passed here, the same value would be used in the object. If nothing is passed here, Cybrilla will assign a random generated identifier as the value|
|phone_number|yes|string|Phone number of the investor against which the bank account lookup has to be attempted|
|phone_number_verified|yes|boolean|Indicates if the phone number is verified or not|
|consent|yes|hash|Details regarding the investor consent collected to lookup the data|

#### `consent` hash 
|Attribute|Type|Comments|
|-|-|-|
|acquisition_time|yes|timestamp|Date and time when the investor consent was collected to lookup the data|
|purpose|yes|enum|Indicates the purpose for which the looked up data can be used for|
|mode|yes|enum|Mode through which the investor consent was collected|
|validity_type|yes|enum|Validity of the investor consent collected|

> The `bank_account_lookup` object will be returned as the response.


### Fetch Bank Account Lookup

`GET /v2/bank_account_lookups/:id`

This API lets you fetch a bank account lookup object.
```json
curl --location '{{base_url}}/v2/bank_account_lookups/:id' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>'
```

#### Query parameters
|Name|Mandatory|Type|Comments|
|-|-|-|-|
|id|yes|string|ID of the `bank_account_lookup` object|

> The `bank_account_lookup` object will be returned as the response.


<br/>
---



## Investor Data Lookup API

The Investor data lookup API lets a partner fetch certain demographic information of the investor from certain third party sources.

### Investor data lookup object

```json
{
    "object": "investor_data_lookup",
    "id": "idl_32PUk5aUMxb7pLGdEGsyk9cRF9t",
    
    "status": "success",
    
    "source_ref_id": "910563db-deb1-44b3-9e34-5819c396de54",
    "name": "Rakshith",
    "phone_number": "9012390123",
    "phone_number_verified": true,

    "consent": {
        "acquisition_time": "2026-02-02T14:09:20+0530",
        "purpose": "mutual_fund_transction_processing",
        "mode": "checkbox",
        "validity_type": "onetime"
    },
    
    "data": {
        "name": "Rakshith Agarwal",
        "date_of_birth": "1992-03-15",
        "gender": "male",
        "pan": "jsdpr9021f",
        "aadhaar_number": null,
        "income_slab": "upto_1lakh",
        "occupation": null,
        "addresses": [
            {
                "line": "123 36th cross 24th main jayanagar 4th t block bangalore south",
                "state": "karnataka",
                "pincode": "560041",
                "reported_date": "2025-08-31"
            }
        ],
        "email_addresses": [
            {
                "email": "iamagarwalrakshith@gmail.com",
                "reported_date": "2025-06-30"
            }
        ]
    }
}
```

|Attribute|Type|Comments|
|-|-|-|
|object|string|Value is `investor_data_lookup`. String representing the object type. Objects of the same type share the same value|
|id|string|Unique identifier of the `investor_data_lookup` object
|status|enum|The status of the `investor_data_lookup` object. Possible values are - `pending`, `successful`, `failed`|
|source_ref_id|string|A unique identifier that could be used as a an internal reference ID at the API request source|
|name|string|Name of the investor|
|phone_number|string|Phone number of the investor against which the investor data lookup was attempted|
|phone_number_verified|boolean|Indicates the phone number verification status|
|consent|hash|Details regarding the investor consent collected to lookup the data|
|data|hash|Hash containing all the data of the investor. The `data` would be available only for 30 minutes since `investor_data_lookup.status` was marked `successful`|

#### `consent` hash 
|Attribute|Type|Comments|
|-|-|-|
|acquisition_time|timestamp|Date and time when the investor consent was collected to lookup the investor data|
|purpose|enum|Indicates the purpose for which the looked up data can be used for|
|mode|enum|Mode through which the investor consent was collected|
|validity_type|enum|Validity of the investor consent collected|

#### `data` hash
|Attribute|Type|Comments|
|-|-|-|
|name|string|Investor's name|
|date_of_birth|string|Investor's date of birth|
|gender|enum|Investor's gender. Possible values are - `male`, `female`, `transgender`|
|pan|string|Investor's PAN number|
|aadhaar_number|string|Last 4 digits of investor's Aadhaar number|
|income_slab|enum|Investor's income slab. Possible values are - `upto_1lakh`, `above_1lakh_upto_5lakh`, `above_5lakh_upto_10lakh`, `above_10lakh_upto_25lakh`, `above_25lakh_upto_1cr`, `above_1cr`|
|occupation|enum|Investor's occupation. Possible values are - `business`, `professional`, `retired`, `house_wife`, `student`, `public_sector_service`, `private_sector_service`, `government_service`, `others`, `agriculture`, `doctor`, `forex_dealer`, `service`|
|addresses|array of `address` hashes|List of investor's addresses|
|email_addresses|array of `email_address` hashes|List of investor's email addresses|

#### `address` hash
|Attribute|Type|Comments|
|-|-|-|
|line|string|Address line|
|state|string|State|
|pincode|string|Pincode|
|reported_date|string|Date as on which this address was reported by the investor|

#### `email_address` hash
|Attribute|Type|Comments|
|-|-|-|
|email|string|Email address of the investor|
|reported_date|string|Date as on which this email address was reported by the investor|

### Create Investor Data Lookup

`POST /v2/investor_data_lookups`

This API lets you create a investor data lookup object.
```json
curl --location '{{base_url}}/v2/investor_data_lookups' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data  '{
    "name": "Rakshith",
    "phone_number": "9012390123",
    "phone_number_verified": true,

    "consent": {
        "acquisition_time": "2026-02-02T14:09:20+0530",
        "purpose": "mutual_fund_transction_processing",
        "mode": "checkbox",
        "validity_type": "onetime"
    }
}
'
```

#### Request parameters

|Name|Mandatory|Type|Comments|
|-|-|-|-|
|source_ref_id|no|string|A unique identifier that could be used as a an internal reference ID at the API request source. If something is passed here, the same value would be used in the object. If nothing is passed here, Cybrilla will assign a random generated identifier as the value|
|name|yes|string|Investor's name|
|phone_number|yes|string|Investor's phone number|
|phone_number_verified|yes|boolean|Indicates if the phone number is verified or not|
|consent|yes|hash|Details regarding the investor consent collected to lookup the data|

#### `consent` hash 
|Attribute|Type|Comments|
|-|-|-|
|acquisition_time|yes|timestamp|Date and time when the investor consent was collected to lookup the data|
|purpose|yes|enum|Indicates the purpose for which the looked up data can be used for|
|mode|yes|enum|Mode through which the investor consent was collected|
|validity_type|yes|enum|Validity of the investor consent collected|

> The `investor_data_lookup` object will be returned as the response.


### Fetch Investor Data Lookup

`GET /v2/investor_data_lookups/:id`

This API lets you fetch a investor data lookup object.
```json
curl --location '{{base_url}}/v2/investor_data_lookups/:id' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>'
```

#### Query parameters
|Name|Mandatory|Type|Comments|
|-|-|-|-|
|id|yes|string|ID of the `investor_data_lookup` object|

> The `investor_data_lookup` object will be returned as the response.

<br/>
---

> **NOTES:** 
> - Both these APIs **attempt** to fetch data from third-party sources provided they are available
> - Once data is fetched, accuracy isn’t validated. We strongly advise you to share these fetched details with the investor and proceed only after their approval
> - You can only fetch these details once per phone number