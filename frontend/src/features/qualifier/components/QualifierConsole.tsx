"use client";

import React from "react";
import { useParams } from "next/navigation";

import { Stepper } from "./Stepper";
import { QualifiersProvider } from "../QualifiersContext";
import { QualifierPageCalendar } from "./QualifierPageCalendar";
import { QualifierPage1 } from "./QualifierPage1";
import { QualifierPage2 } from "./QualifierPage2";
import styles from "./QualifierConsole.module.css";

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
