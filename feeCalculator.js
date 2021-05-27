function dimensions(dimension) {
    const delim = arguments[1] || 'x';

    let length, width, height;

    if (arguments.length < 3) {

      if (!dimension.includes(delim)) {
        throw Error('Invalid dimernsion format.');
      }

      const dimensions = dimension.split(delim);

      length = dimensions[0];
      width = dimensions[1];
      height = dimensions[2];
    } else {

      length = arguments[0];
      width = arguments[1];
      height = arguments[2];

    }

    return {length: Number(length), height: Number(height), width: Number(width)};
  }

const utils = {
  median: (values) => {
    if(values.length === 0) return 0;

    values.sort((a,b) => {
      return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
      return values[half];

    return (values[half - 1] + values[half]) / 2.0;
  },
  dimensions
};

// expand this to support more categories
const categoryPercentageMap = {
  'grocery': (price) => price <= 15 ? 0.08 : 0.15,
  'health & personal care': (price) => price <= 10 ? 0.08 : 0.15,
  'jewelry': (price) => price <= 250 ? 0.20 : 0.05
}

function REFERRALFEEPERCENTAGE(category, price) {
  
  if (categoryPercentageMap[category]) {
    return categoryPercentageMap[category](price);
  }

  console.log('Wrong category provided.');

  return null;

}

function PRODUCTSIZETIER (weight) {

  const args = [...arguments];

  args.shift();
  
  const {length, width, height} = utils.dimensions(...args);
  const values = [length, width, height].sort();
  const maximumDimension = values[values.length - 1];
  const medianDimension = utils.median(values);
  const minimumDimension = values[0];
  const lengthGirth = maximumDimension + (medianDimension + minimumDimension) * 2;

  if (weight <= 12/16 && maximumDimension <= 15 && medianDimension <= 12 && minimumDimension <= 0.75) return 'UsSmallStandardSize';
  if (weight <= 20 && maximumDimension <= 18 && medianDimension <= 14 && minimumDimension <= 8) return 'UsLargeStandardSize';
  if (weight <= 70 && maximumDimension <= 60 && medianDimension <= 30 && lengthGirth <= 130) return 'UsSmallOversize';

  return 'Weight and/or dimensions exceeds UsSmallOversize';

}

function MONTHLYSTORAGEFEE() {

    const october = 9;
    const now = new Date();
    const month = now.getMonth();

    const args = [...arguments];

    args.shift();

    const sizeTier = PRODUCTSIZETIER(...arguments);
    const {length, width, height} = utils.dimensions(...args);
    const productCubicFeet = (length * width * height) / 36;

    let costPerCubitFoot = 0;
    
    if (['UsSmallStandardSize', 'UsLargeStandardSize'].includes(sizeTier)){
      costPerCubitFoot = month < october ? 0.75 : 2.40;
    } else if (['UsSmallOversize'].includes(sizeTier)) {
      costPerCubitFoot = month < october ? 0.48 : 1.20;
    } else {
      return 'Invalid size tier.';
    }

    return Number(productCubicFeet * costPerCubitFoot).toFixed(3);

}