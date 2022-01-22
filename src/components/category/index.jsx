import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../screens/HomeScreen";
import CustomButton from "../button/customButton";
import classes from "./category.module.css";

const FilterComponent = ({ content, type, onChange, filter }) => {
  const { form_wrap, form_input_container } = classes;
  const handleChange = () => onChange(filter, !filter.isActive);
  // console.log("filter", filter);

  return (
    <div className={form_wrap}>
      <div className={form_input_container}>
        <label htmlFor={filter.label}></label>
        <input
          onChange={handleChange}
          value={filter.label}
          type={type}
          draggable={false}
          id={content}
          checked={filter.isActive}
        />
        <p>{filter.label}</p>
      </div>
    </div>
  );
};

const Category = ({ removeCategoryHandler }) => {
  const { filters, onFiltersChanged, filterFromMobile, returnItemsToInit } =
    useContext(DataContext);

  const [filterObj, setFilteredObj] = useState([]);

  useEffect(() => {
    setFilteredObj(filters);
  }, [filters]);

  const handleFilterChange = (filterToChange, isActive) => {
    const nextFilters = filterObj.map((existing) => {
      // Replace this filter if it's the one that was changed
      if (existing === filterToChange) {
        return {
          ...existing,
          isActive,
        };
      }

      // If the user has changed an "exclusive" filter, then switch off all
      // other filters of the same category.
      if (
        filterToChange.isExclusive &&
        isActive &&
        existing.isActive &&
        existing.category === filterToChange.category
      ) {
        return {
          ...existing,
          isActive: false,
        };
      }

      // No changes to the existing filter.
      return existing;
    });

    onFiltersChanged(nextFilters);
  };

  const filtersByCategory = filterObj.reduce((map, filter) => {
    const filtersForCategory = map.get(filter.category) || [];
    filtersForCategory.push(filter);

    return map.set(filter.category, filtersForCategory);
  }, new Map());

  //clear filter values
  const clearFormValues = () => {
    const spreadFilters = [...filters];
    const copiedFilters = spreadFilters.map((v) => {
      return { ...v, isActive: false };
    });
    setFilteredObj(copiedFilters);
    returnItemsToInit();
    removeCategoryHandler();
  };

  /**
   * returns two functions
   * @function filterFromMobile is a callback filters items on mobile devices only
   * @function removeCategoryHandler unmounts modal nesting form inputs
   */
  const saveForMobile = () => {
    filterFromMobile();
    removeCategoryHandler();
  };

  const { categories, category_wrapper, categories_container, category_btn } =
    classes;

  return (
    <>
      {[...filtersByCategory?.entries()].map(
        ([category, filtersForCategory]) => (
          <section key={category} className={categories}>
            <div className={category_wrapper}>
              <header>
                <h4>{category}</h4>
              </header>
              <div className={categories_container}>
                {filtersForCategory.map((filter) => (
                  <FilterComponent
                    key={filter.label}
                    filter={filter}
                    onChange={handleFilterChange}
                    type={filter.type}
                  />
                ))}
              </div>
            </div>
          </section>
        )
      )}
      <div className={category_btn}>
        <CustomButton
          onclick={clearFormValues}
          label="clear"
          styleChanger={false}
        />
        <CustomButton
          onclick={saveForMobile}
          label="save"
          styleChanger={true}
        />
      </div>
    </>
  );
};

export default Category;
