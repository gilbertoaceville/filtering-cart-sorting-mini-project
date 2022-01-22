import loadable from "@loadable/component";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import { useDispatch } from "react-redux";
import useResize from "../../hooks/useResize";
import { BackdropToggler } from "../../redux/actions/backdropActions";
import { DataContext } from "../../screens/HomeScreen";
import { products as Products } from "../../utility/json";
// import Product from "../product/product";
import classes from "./product-category.module.css";

const Pagination = loadable(() => import("../pagination/pagination.component"));
const Category = loadable(() => import("../category"));
const Product = loadable(() => import("../product/product"));

const itemsPerPage = 6;
const initialState = {
  currentItems: [],
  pageCount: 0,
  itemOffset: 0,
  currentPage: 0,
};
export function ProductCategory({
  products = Products,
  filters,
  onFiltersChanged,
  ...props
}) {
  const { items, setSortItems } = useContext(DataContext);
  const [selectValue, setSelectValue] = useState("");

  const [current, setCurrent] = useState(initialState);

  // toggle sort list card
  const [toggle, setToggle] = useReducer((state) => !state, true);

  const [text, setText] = useState("");

  // display text after 3 secs
  const checkData = () => {
    setTimeout(() => {
      setText("No Products Found");
    }, 3000);
  };

  //mobile screen
  let isMobile = useResize();

  const endOffset = current.itemOffset + itemsPerPage;
  useEffect(() => {
    setCurrent((prevState) => {
      return {
        ...prevState,
        currentItems: items.slice(current.itemOffset, endOffset),
        pageCount: Math.ceil(items.length / itemsPerPage),
      };
    });
  }, [current.itemOffset, endOffset, items, current.sortItems]);

  /**
   * @param e => selected page
   * switch between sliced items using pagination
   */
  const handlePageClick = useCallback(
    (event) => {
      const selectedPage = event.selected;
      const newOffset = (selectedPage * itemsPerPage) % items.length;
      setCurrent((prevState) => {
        return {
          ...prevState,
          itemOffset: newOffset,
          currentPage: selectedPage,
        };
      });
    },
    [items]
  );

  /**
   *
   * @param {*} e refers to option value
   * handles price sorting for the product array
   * returns sorted array by price
   */
  const onSortsHandler = (e) => {
    let sortedItems;
    if (e.target.value === "ascending") {
      sortedItems = items.sort((a, b) => a.price - b.price);
    } else if (e.target.value === "descending") {
      sortedItems = items.sort((a, b) => b.price - a.price);
    } else if (e.target.value === "Select an option") {
      sortedItems = [];
    }

    setSortItems(sortedItems);
    setCurrent((prevState) => {
      return {
        ...prevState,
        currentItems: sortedItems.slice(current.itemOffset, endOffset),
        pageCount: prevState.pageCount,
      };
    });
  };

  /**
   *
   * @param {*} e event
   * sets value of select tag
   * UI is updated with sorted array
   */
  const onSelectChangeHandler = (e) => {
    setSelectValue(e.target.value);
    onSortsHandler(e);
  };

  // destructured classes
  const {
    container,
    product_sort_container,
    price_sort,
    filter__icons,
    product_category,
    category,
    categories_media_header,
    product_list_wrap,
    product_list_wrapper,
    product_list,
    dragCategory,
    body_toggler,
    category_container
  } = classes;

  const dispatch = useDispatch();

  /**
   * @function handler hides categories for phone devices
   */
  const removeCategoryHandler = () => {
    document.body.classList.add(dragCategory);
    dispatch(BackdropToggler(false));
    document.body.classList.remove(body_toggler);
  };

  /**
   * @function handler displays categories for phone devices
   */
  const addCategoryHandler = () => {
    dispatch(BackdropToggler(true));
    document.body.classList.remove(dragCategory);
    document.body.classList.add(body_toggler);
  };

  useEffect(() => {
    if (toggle && isMobile) {
      document.body.classList.add(body_toggler);
    } else {
      document.body.classList.remove(body_toggler);
    }
  }, [toggle, body_toggler, isMobile]);

  useEffect(() => {
    checkData();
  }, []);

  return (
    <div className={container}>
      {/* Sorters */}
      <header>
        <h2>
          Photography / <span>Premium Photos</span>
        </h2>
        <div className={product_sort_container}>
          <ul onClick={setToggle} id="SORT">
            <li>
              <i className="fa fa-sort-alpha-asc"></i> Sort By
            </li>
            <li className={price_sort}>
              Price{" "}
              {selectValue === "ascending" ? (
                <i className="fa fa-chevron-up"></i>
              ) : (
                <i className="fa fa-chevron-down"></i>
              )}
            </li>
          </ul>
          <div onClick={addCategoryHandler} className={filter__icons}>
            <i className="fa fa-sliders"></i>
          </div>

          {toggle && (
            <select value={selectValue} onChange={onSelectChangeHandler}>
              <option>Select an option</option>
              <option value={"ascending"}>Price: Low to High</option>
              <option value={"descending"}>Price: High to Low</option>
            </select>
          )}
        </div>
      </header>

      {/* Category */}
      <div className={product_category}>
        <div className={category}>
          <div className={categories_media_header}>
            <h2>Filter</h2>
            <i onClick={removeCategoryHandler} className="fa fa-times"></i>
          </div>
          <div className={category_container}>
            <Category removeCategoryHandler={removeCategoryHandler} />
          </div>
        </div>

        {/* Product List */}
        <div className={product_list_wrap}>
          <div className={product_list_wrapper}>
            <ul className={product_list}>
              {current.currentItems && current.currentItems.length ? (
                current.currentItems.map((item) => (
                  <li key={Math.random().toString()}>
                    <Product item={item} />
                  </li>
                ))
              ) : (
                <li className={classes.feedback}>
                  <h2>{text}</h2>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <Pagination
        handlePageClick={handlePageClick}
        pageCount={current.pageCount}
        offset={current.itemOffset}
        currentPage={current.currentPage}
      />
    </div>
  );
}

export default ProductCategory;
