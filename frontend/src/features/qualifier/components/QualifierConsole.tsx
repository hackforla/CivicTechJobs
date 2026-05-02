/**
 * Qualifier flow shell - dispatches to the active step component.
 *
 * Reads the `[page]` segment from the URL via `useParams`, then
 * renders the matching step component (`QualifierPage1`,
 * `QualifierPage2`, `QualifierPageCalendar`). Wraps everything in
 * `QualifiersProvider` so step components can read and update the
 * shared answer state.
 *
 * The `Content` switch throws on an unknown page id; Next.js's
 * error boundary catches and surfaces the not-found state. Adding
 * a new step means: add a case here, add the page component, add
 * an entry to the step list in `Stepper`.
 */

"use client";

import { useParams } from "next/navigation";
import React from "react";

import { Stepper } from "./Stepper";
import { QualifiersProvider } from "../QualifiersContext";
import styles from "./QualifierConsole.module.css";
import { QualifierPage1 } from "./QualifierPage1";
import { QualifierPage2 } from "./QualifierPage2";
import { QualifierPageCalendar } from "./QualifierPageCalendar";

function Content({ page }: { page: string }) {
  switch (page) {
    case "1":
      return <QualifierPage1 />;
    case "2":
      return <QualifierPage2 />;
    case "3":
      return <QualifierPageCalendar />;
    default:
      throw new Error("Page not found");
  }
}

function QualifierConsole() {
  const params = useParams<{ page?: string }>();
  const page = params.page ?? "1";

  return (
    <QualifiersProvider>
      <main>
        <div className={styles.container}>
          <h1 className={styles.heading}>Qualifier Page</h1>
          <Stepper />
          <div className={styles.contentSlot}>
            <Content page={page} />
          </div>
        </div>
      </main>
    </QualifiersProvider>
  );
}

export { QualifierConsole };
