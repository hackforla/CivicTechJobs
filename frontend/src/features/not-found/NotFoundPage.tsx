/**
 * 404 not-found page.
 *
 * Mounted by `src/app/not-found.tsx` (Next.js wires this
 * automatically when no route matches). Renders the standard
 * site chrome (HeaderNav + FooterNav) plus a "Page not found"
 * message and a "Go Back" button that calls `router.back()`.
 *
 * Distinct from the `(with-nav)` route group's pages because it's
 * a Next-special boundary file (`not-found.tsx` at the app root)
 * and renders its own chrome rather than composing into the
 * route-group layout.
 */

"use client";
/* eslint-disable react/no-unescaped-entities */

import { useRouter } from "next/navigation";

import { Button } from "@/shared/components/Buttons";
import FooterNav from "@/shared/components/nav/FooterNav";
import HeaderNav from "@/shared/components/nav/HeaderNav";
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
