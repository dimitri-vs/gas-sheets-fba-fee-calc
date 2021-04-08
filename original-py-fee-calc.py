from statistics import median
import arrow

def get_referral_fee_percentage(category, price):
    # https://sell.amazon.com/pricing.html?#referral-fees
    category = category.lower()
    if category == 'grocery':
        if price <= 15: return 0.08
        else: return 0.15
    elif category == 'health & personal care':
        if price <= 10: return 0.08
        else: return 0.15
    elif category == 'misc sdp': # TODO: not sure what this is, remove?
        if price <= 10: return 0.08
        else: return 0.15
    else:
        raise NotImplementedError(f"Unexpected category type '{category}'")

def get_product_size_tier(weight, l, w, h):
    # https://sellercentral.amazon.com/gp/help/G201105770
    max_dim = max(l, w, h)
    med_dim = median([l, w, h])
    min_dim = min(l, w, h)
    len_girth = max_dim + (med_dim + min_dim)*2
    if weight <= 12/16 and max_dim <= 15 and med_dim <= 12 and min_dim <= 0.75:
        return 'UsSmallStandardSize'
    elif weight <= 20 and max_dim <= 18 and med_dim <= 14 and min_dim <= 8:
        return 'UsLargeStandardSize'
    elif weight <= 70 and max_dim <= 60 and med_dim <= 30 and len_girth <= 130:
        return 'UsSmallOversize'
    else:
        raise NotImplementedError(f"Weight and/or dimention exceeds 'UsSmallOversize' "
                                  f"- weight, l, w, h: {[weight, l, w, h]}")

def est_monthly_inventory_storage_fee(size_tier, l, w, h):
    # https://sellercentral.amazon.com/gp/help/help.html?itemID=200612770
    # Fees vary by the product-size tier and the time of year. Although standard-size products are
    # smaller than oversize products, they require more complex and costly shelving, drawers, and
    # bins for storage. Fees are charged by cubic foot, so overall storage fees for standard-size
    # products may be less than those for oversize products, based on volume.
    # TODO: is it more accurate to return a years averaged monthly fee?
    now = arrow.now()
    if size_tier in ['UsSmallStandardSize', 'UsLargeStandardSize']: # if standard size
        if now < arrow.get(f'October 1, {now.year}', 'MMMM D, YYYY'): # if before oct
            cost_per_cubic_foot = 0.75
        else:
            cost_per_cubic_foot = 2.40
    else: # if oversize
        if now < arrow.get(f'October 1, {now.year}', 'MMMM D, YYYY'): # if before oct
            cost_per_cubic_foot = 0.48
        else:
            cost_per_cubic_foot = 1.20
    prod_cubic_feet = (l * w * h) / (12*12*12)
    return round(prod_cubic_feet * cost_per_cubic_foot, 3)
