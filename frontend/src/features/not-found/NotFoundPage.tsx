"use client";
/* eslint-disable react/no-unescaped-entities */

import { useRouter } from "next/navigation";

import HeaderNav from "@/shared/components/nav/HeaderNav";
import FooterNav from "@/shared/components/nav/FooterNav";
import { Button } from "@/shared/components/Buttons";
import NotFoundPageImg from "@/shared/images/not-found-page.svg";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const router = useRouter();
  return (
    <>
      <HeaderNav />
      <main>
        <div className={styles.container}>
          <div className={styles.box}>
            <h1 className={styles.title}>Page not found</h1>
            <p className={styles.paragraph}>
              We can't seem to find the page you're looking for. Try going back
              to the previous page.
            </p>
            <Button size="large-long" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
          <div>
            <NotFoundPageImg className={styles.image} aria-hidden="true" />
          </div>
        </div>
      </main>
      <FooterNav />
    </>
  );
}

export { NotFoundPage };
