document.addEventListener("DOMContentLoaded", (event) => {
  if (screen.width > 991) {
    openDropdown();
  }
});

function openDropdown() {
  const dropdowns = document.getElementsByClassName("dropdown");
  for (const dropdown of dropdowns) {
    const children = dropdown.children;

    // too buggy, as hover is sensitive to where the mouse moves, and also it is hard to have it disappear on hover

    dropdown.addEventListener("mouseenter", () => {
      for (const i of dropdowns) {
        const item = i.children;
        i.classList.remove("show");
        item[0].removeAttribute("aria-expanded");
        item[1].classList.remove("show");
      }

      dropdown.classList.add("show");
      children[0].setAttribute("aria-expanded", true); // item
      children[1].classList.add("show");
    });
    dropdown.addEventListener("mouseleave", () => {
      dropdown.classList.remove("show");
      children[0].removeAttribute("aria-expanded");
      children[1].classList.remove("show");
    });

    const submenulist = children[1].children;
    for (const submenu of submenulist) {
      const children = submenu.children;

      //might not be the best way to detect whether there is a submenu
      if (children.length < 2) {
        break;
      }
      submenu.addEventListener("mouseenter", () => {
        for (const i of submenulist) {
          const item = i.children;
          item[0].classList.remove("open");
          item[1].classList.remove("show"); // will not exist if a sub menu does not exist, need to error catch
        }

        children[0].classList.add("open");
        children[1].classList.add("show"); // same as above

        var bounds = children[0].getBoundingClientRect();
        var popupMargin = 10;
        var maxBottom = screen.height - popupMargin;

        children[1].style.left = bounds.right + "px";
        if (
          bounds.top + children[0].offsetHeight > maxBottom &&
          bounds.top > screen.height / 2
        ) {
          children[1].style.top =
            bounds.bottom - children[0].offsetHeight + "px";
          children[1].style.maxHeight = bounds.bottom - popupMargin + "px";
        } else {
          children[1].style.top = bounds.top + "px";
          children[1].style.maxHeight = maxBottom - bounds.top + "px";
        }
      });

      //beta
      submenu.addEventListener("mouseleave", () => {
        children[0].classList.remove("open");
        children[1].classList.remove("show");
      });
    }
  }
}
