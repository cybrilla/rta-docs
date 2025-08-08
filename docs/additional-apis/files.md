---
sidebar_position: 3
sidebar_label: Files API
title: Files API
---

**Endpoints**  

`POST /poa/files`

This API lets you upload a file to POA. 

```json
curl --location '{{base_url}}/poa/files' \
--header 'Authorization: Bearer <token>' \
--form 'purpose="bank account proof"' \
--form 'file=@"/Users/guessMyName/Downloads/cancelled_cheque_file.png"'
```

### Form-data parameters
|Name|Mandatory|Type|Comments|
|-|-|-|-|
|purpose|yes|string|Purpose of this file upload|
|file|yes|file|File that has to be uploaded. Supported file types are - `pdf`, `jpeg`, `jpg`, `png`<br/>The file size should not be greater than 10MB.|

### Response
```json
{
    "id": "file_e55ddbad95120si09153a7b1eb68fc01",
    "created_at": "2025-08-05T19:48:15+0530"
}
```
