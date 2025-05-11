import Filter from "../../components/Filter/Filter";
import GameItem from "../../components/gameItem/GameItem";
import Sort from "../../components/Sort/Sort";
import { useFetchGames } from "../../hooks/useFetchGames";
import styles from "./GamesList.module.css";

const GamesList = () => {
  const games = useFetchGames();

  return (
    <div className={styles.gamesWrapper}>
      <div className={styles.sortFilterContainer}>
        <Sort />
        <Filter />
      </div>
      {/* ----------- */}
      <ul className={styles.gamesContainer}>
        {games.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </ul>
    </div>
  );
};

export default GamesList;
