"use client";
/* eslint-disable react/no-unescaped-entities */

import { useRouter } from "next/navigation";

import HeaderNav from "@/shared/components/nav/HeaderNav";
import FooterNav from "@/shared/components/nav/FooterNav";
import { Button } from "@/shared/components/Buttons";
import NotFoundPageImg from "@/shared/images/not-found-page.svg";
import "./_NotFoundPage.scss";

function NotFoundPage() {
  const router = useRouter();
  return (
    <>
      <HeaderNav />
      <main>
        <div className="not-found-container flex-container align-center justify-between gap-3">
          <div className="not-found-box">
            <h1 className="not-found-title mb-3 mt-0">Page not found</h1>
            <p className="not-found-paragraph mb-3">
              We can't seem to find the page you're looking for. Try going back
              to the previous page.
            </p>
            <Button size="large-long" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
          <div>
            <NotFoundPageImg className="h-auto w-80" aria-hidden="true" />
          </div>
        </div>
      </main>
      <FooterNav />
    </>
  );
}

export { NotFoundPage };
