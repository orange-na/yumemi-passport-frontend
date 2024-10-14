import styles from "./not-found.module.css";
import LinkButton from "@/components/linkButton";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <h2 className={styles.heading}>404 Not Found</h2>
      <p>
        お探しのページが見つかりませんでした。URLをご確認の上、再度アクセスしてください。
      </p>
      <LinkButton href="/" variant="primary" marginTop={50}>
        トップページへ戻る
      </LinkButton>
    </main>
  );
}
