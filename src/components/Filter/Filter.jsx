import styles from "./Filter.module.css";

const Filter = () => {
  return (
    <>
      <select name="filter" id="filter" className={styles.filter}>
        <option value="">Filter by</option>
        <option value="onSale">On sale</option>
        <option value="pc">PC</option>
        <option value="xbox">Xbox</option>
        <option value="playstation">Playstation</option>
      </select>
    </>
  );
};

export default Filter;
