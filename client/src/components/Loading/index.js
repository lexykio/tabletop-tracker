import styles from "./Loading.module.scss";
export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loadingRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
