---
sidebar_position: 2
sidebar_label: Acknowledgement
title: Acknowledgement
---

# Acknowledgement

All api calls will respond with a http 200 status code with the following json

```json
{
    "status": "ACK" // can be `NACK`
}
```

`ACK` means the request is accepted by POA and you should expect an `on_action` callback. `NACK` means either the request validation failed or POA doesn't want to respond - you should not expect an `on_action` callback.

Similarly, on receiving `on_action` callbacks from POA, you should respond with an `ACK` as an acknowledgement for the receipt. If you are not able to consume the callback message due to incorrect format or for any other reasons, respond with `NACK` status.