import LogoHorizontal from "@/shared/images/logos/logo-horizontal.svg";
import IconArrowLeft from "@/shared/icons/icon-arrow-left.svg";

function AuthNav() {
  return (
    <header className="flex h-16 w-full items-center justify-center px-3 py-1 shadow-[-1px_1px_2px_rgb(51,51,51,0.2)]">
      <div className="flex grow justify-center">
        <a href="/" aria-label="Back to home">
          <IconArrowLeft className="w-5" aria-hidden="true" />
        </a>
      </div>
      <div>
        <a href="/" rel="noopener noreferrer" aria-label="Civic Tech Jobs - Home">
          <LogoHorizontal
            className="h-p3 w-auto md:h-p4"
            aria-hidden="true"
          />
        </a>
      </div>
      <div className="grow"></div>
    </header>
  );
}

export default AuthNav;
