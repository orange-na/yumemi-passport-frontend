"use client";

import { useEffect } from "react";
import styles from "./error.module.css";
import LinkButton from "@/components/linkButton";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.container}>
      <h2 className={styles.heading}>500 Internal Server Error</h2>
      <p>
        一時的なエラーが発生しました。時間をおいて再度アクセスしてください。
      </p>
      <LinkButton href="/" variant="primary" marginTop={50}>
        トップページへ戻る
      </LinkButton>
    </main>
  );
}
