---
sidebar_position: 6
sidebar_label: BAV
title: Bank Account Verification (BAV)
---

Bank account verification is a necessary step in mutual fund investments as it helps verify whether a bank account actually belongs to an investor. To do this, we match the name given by the investor with the name fetched from the bank. A few points to note:

1. To fetch the name from the bank, we currently offer penny-drop based BAV. 
2. For name matching, we use our proprietary algorithm that is a mix of deterministic rules and fuzzy logic.
   a. For resident Indians, in cases where the algorithm results are inconclusive, the name match is referred for manual verification.  
   b. For non-resident Indians, manual verification is the only method available for name matching.  

   *The TAT for manual verification is 24 working hours.*

3. Typically, BAV is triggered during order placement. However, to ensure the investor is ready to invest and prevent order failures, you can use our pre-verification APIs to trigger BAV during onboarding.
