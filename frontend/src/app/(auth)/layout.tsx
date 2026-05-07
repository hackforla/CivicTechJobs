import AuthNav from "@/shared/components/nav/AuthNav";
import LoginIllustration from "@/shared/images/login-illustration.svg";
import LoginTanBg from "@/shared/images/login-tan-bg.svg";
import Dots from "@/shared/images/dots.svg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthNav />
      <div
        className="flex flex-row"
        style={{ height: "calc(100vh - 64px)", overflow: "hidden" }}
      >
        <div className="relative bg-tan-light max-lg:hidden lg:basis-1/2">
          <div className="absolute left-1/2 top-1/2 z-30 w-4/5 -translate-x-1/2 -translate-y-1/2 transform text-center">
            <p className="my-8 px-10 text-3xl font-bold md:text-4xl md:leading-snug">
              Together, we can create
              <br /> civic change.
            </p>
            <LoginIllustration
              aria-label="Team work Pana Illustration"
              className="mx-auto w-full"
            />
          </div>
          <LoginTanBg
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 w-full"
          />
          <Dots
            aria-hidden="true"
            className="absolute -right-4 -top-4 z-10 h-1/6 w-1/6 rotate-290 transform"
          />
          <Dots
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 z-10 h-1/6 w-1/6 rotate-345 transform"
          />
        </div>
        <div className="w-full bg-tan lg:basis-1/2">
          <div className="flex h-full flex-col items-center justify-center lg:bg-white">
            <div className="w-10/12 lg:w-[439px]">
              <div className="rounded-2xl bg-white max-lg:p-7 lg:bg-transparent">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
