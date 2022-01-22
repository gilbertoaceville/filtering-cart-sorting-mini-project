import loadable from "@loadable/component";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useAjax } from "../../hooks/useAjax";
import useResize from "../../hooks/useResize";
import { FILTERS } from "../../utility/filters";
import { products as PRODUCTS } from "../../utility/json";
import { homeScreen } from "./homeScreen.module.css";

const ProductCategory = loadable(() =>
  import("../../components/productCategory")
);

const ProductDetails = loadable(() =>
  import("../../components/product_details")
);

export const DataContext = createContext(null);
function HomeScreen() {
  const { data } = useAjax(
    "https://bejamas-commerce-heroku.herokuapp.com/api/products"
  );

  const response = useMemo(() => (data === null ? [] : data), [data]);
  const products = response ? response : PRODUCTS;

  const [filters, setFilters] = useState(FILTERS);
  // exclusive for sorted items
  const [sortItems, setSortItems] = useState([]);
  // for mobile items
  const [mobileItems, setMobileItems] = useState([]);

  useEffect(() => {
    setMobileItems(products);
  }, [products]);

  //boolean to determine device is boolean
  const isMobile = useResize();

  const DATA_ITEMS = (sortItems.length ? sortItems : products).map((item) => ({
    ...item,
    category: sortItems.length ? item.category : item.category.split(","),
  }));

  // Split up the filters per category for one item to match
  const activeFiltersByCategory = useMemo(() => {
    const result = {};

    filters.forEach((filter) => {
      if (!filter.isActive) return;
      if (!result.hasOwnProperty(filter.category)) {
        result[filter.category] = [];
      }

      result[filter.category].push(filter);
    });

    // if by category, it returns e.g. -
    // {
    //   Category: ['people', 'food'],
    //   Price: ['Lower than $20]
    // }
    return result;
  }, [filters]);

  const filteredItems = useMemo(() => {
    // Go through each filter by category or through sorted items, and check that there's at least one match.
    return DATA_ITEMS.filter((item) => {
      for (const category of Object.keys(activeFiltersByCategory)) {
        const filtersForCategory = activeFiltersByCategory[category];
        const hasMatch = filtersForCategory.some((filter) =>
          filter.apply(item)
        );
        // If no matches for any of the filters in this category, item is not shown.
        if (!hasMatch) {
          return false;
        }
      }

      // else item === one match for every active filter category.
      return true;
    });
  }, [activeFiltersByCategory, DATA_ITEMS]);

  /**
   * one category has to be selected
   */
  const filterFromMobile = () => {
    if (activeFiltersByCategory) {
      setMobileItems(filteredItems);
    }
  };

  /**
   * clear input values and return items to original data
   * for mobile devices
   */
  const returnItemsToInit = () => {
    if (activeFiltersByCategory) return setMobileItems(products);
    return null;
  };

  return (
    <DataContext.Provider
      value={{
        items: isMobile ? mobileItems : filteredItems,
        filters,
        onFiltersChanged: setFilters,
        setSortItems,
        filterFromMobile,
        returnItemsToInit,
      }}
    >
      <div className={homeScreen}>
        {/* RETURN FEATURED DATA */}
        {products
          .filter((item) => item?.featured)
          .map((item, index) => {
            return <ProductDetails key={index} item={item} />;
          })}
        <ProductCategory />
      </div>
    </DataContext.Provider>
  );
}

export default HomeScreen;
