import styles from "./Sort.module.css";

const Sort = () => {
  return (
    <>
      <select name="sort" id="sort" className={styles.sort}>
      <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="highestPrice">Hightest Price</option>
        <option value="lowestPrice">Lowest Price</option>
        <option value="year">Year</option>
        <option value="rating">Rating</option>
      </select>
    </>
  );
};

export default Sort;
