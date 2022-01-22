const createCategoryFilter = (label, matchText, type = "checkbox") => {
  // const matchTextLower = matchText.toLowerCase()

  const apply = (item) =>
    item.category.some((category) => category === matchText);

  return {
    category: "Category",
    label,
    type,
    isActive: false,
    isExclusive: false,
    apply,
  };
};

const createPriceFilter = (
  label,
  minValue = null,
  maxValue = null,
  type = "radio"
) => {
  const apply = (item) => {
    if (minValue !== null && item.price < minValue) return false;
    if (maxValue !== null && item.price > maxValue) return false;
    return true;
  };

  return {
    category: "Price",
    label,
    type,
    isActive: false,
    isExclusive: true,
    apply,
  };
};

export const FILTERS = [
  createCategoryFilter("People", "people"),
  createCategoryFilter("Pets", "pets"),
  createCategoryFilter("Food", "food"),
  createCategoryFilter("Landmarks", "landmarks"),
  createCategoryFilter("Premium", "premium"),
  createCategoryFilter("Cities", "cities"),
  createCategoryFilter("Nature", "nature"),
  createPriceFilter("Lower than 20", null, 20),
  createPriceFilter("$20 - $100", 20, 100),
  createPriceFilter("$100 - $200", 100, 200),
  createPriceFilter("More than $200", 200, null),
];
