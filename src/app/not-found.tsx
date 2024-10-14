import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <h2 className={styles.heading}>404 Not Found</h2>
      <p>
        お探しのページが見つかりませんでした。URLをご確認の上、再度アクセスしてください。
      </p>
      <Link href="/" className={styles.link}>
        トップページへ戻る
      </Link>
    </main>
  );
}
