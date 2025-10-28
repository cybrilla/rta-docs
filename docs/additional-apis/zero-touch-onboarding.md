---
sidebar_position: 2
sidebar_label: Zero Touch Onboarding APIs
title: Zero Touch Onboarding APIs
---

The Zero Touch Onboarding APIs lets a partner to attempt fetching certain details of the investor from a couple of third party sources. At present, bank account details and demographic information of the investor can be attempted to fetch using the below 2 APIs - 
1. Bank Account Lookup API
2. Customer Data Lookup API

## Bank Account Lookup API

The Bank account lookup API lets a partner fetch the bank account details of the investor that is registered against the primary VPA / UPI ID.


### Bank account lookup object

```json
{
    "object": "bank_account_lookup",
    "id": "bal_32PUeQZKweX8ZBSXY22Iqq9u3yg",
    
    "status": "success",
    
    "source_ref_id": "1a478f56-54df-41aa-951a-b2c7edbada2",
    "mobile_number": "9012390123",
    
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
|mobile_number|string|Mobile number of the customer against which the bank account lookup was attempted|

### Create Bank Account Lookup

`POST /v2/bank_account_lookups`

This API lets you create a bank account lookup object.
```json
curl --location '{{base_url}}/v2/bank_account_lookups' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data  '{
"mobile_number": "9012390123"
}
'
```

#### Request parameters

|Name|Mandatory|Type|Comments|
|-|-|-|-|
|mobile_number|yes|string|Customer's mobile number|
|source_ref_id|no|string|A unique identifier that could be used as a an internal reference ID at the API request source. If something is passed here, the same value would be used in the object. If nothing is passed here, Cybrilla will assign a random generated identifier as the value|

> **NOTE:** The `bank_account_lookup` object will be returned as the response.


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

> **NOTE:** The `bank_account_lookup` object will be returned as the response.


<br/>
---



## Customer Data Lookup API

The Customer data lookup API lets a partner fetch certain demographic information of the investor from certain third party sources.

### Customer data lookup object

```json
{
    "object": "customer_data_lookup",
    "id": "cdl_32PUk5aUMxb7pLGdEGsyk9cRF9t",
    
    "status": "success",
    
    "source_ref_id": "910563db-deb1-44b3-9e34-5819c396de54",
    "mobile_number": "9012390123",
    "name": "Rakshith",
    
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
|object|string|Value is `customer_data_lookup`. String representing the object type. Objects of the same type share the same value|
|id|string|Unique identifier of the `customer_data_lookup` object
|status|enum|The status of the `customer_data_lookup` object. Possible values are - `pending`, `successful`, `failed`|
|source_ref_id|string|A unique identifier that could be used as a an internal reference ID at the API request source|
|mobile_number|string|Mobile number of the customer against which the data lookup was attempted|
|name|string|Name of the customer|
|data|hash|Hash containing all the data of the customer. The `data` would be available only for 30 minutes since `customer_data_lookup.status` was marked `successful`|

#### `data` hash
|Attribute|Type|Comments|
|-|-|-|
|name|string|Customer's name|
|date_of_birth|string|Customer's date of birth|
|gender|enum|Customer's gender. Possible values are - `male`, `female`, `transgender`|
|pan|string|Customer's PAN number|
|aadhaar_number|string|Last 4 digits of customer's Aadhaar number|
|income_slab|enum|Customer's income slab. Possible values are - `upto_1lakh`, `above_1lakh_upto_5lakh`, `above_5lakh_upto_10lakh`, `above_10lakh_upto_25lakh`, `above_25lakh_upto_1cr`, `above_1cr`|
|occupation|enum|Customer's occupation. Possible values are - `business`, `professional`, `retired`, `house_wife`, `student`, `public_sector_service`, `private_sector_service`, `government_service`, `others`, `agriculture`, `doctor`, `forex_dealer`, `service`|
|addresses|array of `address` hashes|List of customer's addresses|
|email_addresses|array of `email_address` hashes|List of customer's email addresses|

#### `address` hash
|Attribute|Type|Comments|
|-|-|-|
|line|string|Address line|
|state|string|State|
|pincode|string|Pincode|
|reported_date|string|Date as on which this address was reported by the customer|

#### `email_address` hash
|Attribute|Type|Comments|
|-|-|-|
|email|string|Email address of the customer|
|reported_date|string|Date as on which this email address was reported by the customer|

### Create Customer Data Lookup

`POST /v2/customer_data_lookups`

This API lets you create a customer data lookup object.
```json
curl --location '{{base_url}}/v2/customer_data_lookups' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data  '{
"name": "Rakshith",
"mobile_number": "9012390123"
}
'
```

#### Request parameters

|Name|Mandatory|Type|Comments|
|-|-|-|-|
|name|yes|string|Customer's name|
|mobile_number|yes|string|Customer's mobile number|
|source_ref_id|no|string|A unique identifier that could be used as a an internal reference ID at the API request source. If something is passed here, the same value would be used in the object. If nothing is passed here, Cybrilla will assign a random generated identifier as the value|

> **NOTE:** The `customer_data_lookup` object will be returned as the response.


### Fetch Customer Data Lookup

`GET /v2/customer_data_lookups/:id`

This API lets you fetch a customer data lookup object.
```json
curl --location '{{base_url}}/v2/customer_data_lookups/:id' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>'
```

#### Query parameters
|Name|Mandatory|Type|Comments|
|-|-|-|-|
|id|yes|string|ID of the `customer_data_lookup` object|

> **NOTE:** The `customer_data_lookup` object will be returned as the response.

<br/>
---

> **NOTE:** Both these APIs **attempt** to fetch data from third-party sources provided they are available. Once data is fetched, accuracy isn’t validated. We strongly advise you to share the information with the investor and proceed only after their approval.