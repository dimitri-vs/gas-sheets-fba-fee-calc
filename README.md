## Introduction

Calculate Referral and Storage fee for amazon packages/produts

!Important
Before using the script provide Data URL at the top of script

```
const CATEGORY_PERCENTAGE_MAP_URL = '<URL>';
```

### REFERRAL FEE PERCENTAGE

To calculate referral fee in Google Excel Sheet:
```
=REFERRALFEEPERCENTAGE(<CATEGORY>, <PRICE>)
```

Category and Price are references to sheet cells.

## Categories
Category could be one of the following:
- grocery
- health & personal care
- jewelry

### PRODUCT SIZE TIER

This return based on weight and dimensions that if the product is of one of the following sizes:
- UsSmallStandardSize
- UsLargeStandardSize
- UsSmallOversize

to use this function

```
=PRODUCTSIZETIER(<WEIGHT>, <LENGTH>, <WIDTH>, <HEIGHT>)
```

Weight, Length, Width and Height is refernce to a cell in sheet.

OR

```
=PRODUCTSIZETIER(<WEIGHT>, <DIMENSION>)
```

Dimension is LENGTHxWIDTHxHEIGHT separated by an 'x' if you have dimension with another separator such as a '-' use following:

```
=PRODUCTSIZETIER(<WEIGHT>, <DIMENSION>, <DELIM>)
```

## MONTHLY INVENTORY STORAGE FEE

This function tells how much storage fee would you be paying based on package size.
to use this function

```
=MONTHLYSTORAGEFEE(<WEIGHT>, <LENGTH>, <WIDTH>, <HEIGHT>)
```

Weight, Length, Width and Height is refernce to a cell in sheet.

OR

```
=MONTHLYSTORAGEFEE(<WEIGHT>, <DIMENSION>)
```

Dimension is LENGTHxWIDTHxHEIGHT separated by an 'x' if you have dimension with another separator such as a '-' use following:

```
=MONTHLYSTORAGEFEE(<WEIGHT>, <DIMENSION>, <DELIM>)
```