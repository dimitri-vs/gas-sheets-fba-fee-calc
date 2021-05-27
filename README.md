## Introduction

Calculate Referral and Storage fee for amazon packages/produts

### REFERRAL FEE PERCENTAGE

To calculate referral fee in Google Excel Sheet:
```
=REFERRALFEEPERCENTAGE(<WEIGHT>, <LENGTH>, <WIDTH>, <HEIGHT>)
```

Weight, Length, Width and Height is refernce to a cell in sheet.

OR

```
=REFERRALFEEPERCENTAGE(<WEIGHT>, <DIMENSION>)
```
Dimension is LENGTHxWIDTHxHEIGHT separated by an 'x' if you have dimension with another separator such as a '-' use following:

```
=REFERRALFEEPERCENTAGE(<WEIGHT>, <DIMENSION>, <DELIM>)
```