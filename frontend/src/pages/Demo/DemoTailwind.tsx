import React, { useState, useEffect } from "react";
import Typography from "tw-components/Typography";
import { Button, IconButton } from "tw-components/Buttons";
import Checkbox from "tw-components/Checkbox";

const DemoTailwind = () => {
  // Add a setDarkMode for testing dark mode styles
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-grey-light p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md transition-colors duration-300 dark:bg-[#030D2D]">
        <Typography.Title2 className="mb-4">Checkboxes</Typography.Title2>
        <Checkbox label="Enabled selected" defaultChecked />
        <Checkbox label="Enabled unselected" />
        <Checkbox label="Disabled selected" defaultChecked disabled />
        <Checkbox label="Disabled unselected" disabled />
        <Checkbox label="Enabled selected" defaultChecked labelHidden />
      </div>
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md transition-colors duration-300 dark:bg-[#030D2D]">
        <Typography.Title1 className="mb-4 text-blue-dark dark:text-white">
          Buttons
        </Typography.Title1>

        <Button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</Button>

        {/* Regular Buttons, active is the default state */}
        <Typography.Title3 className="mb-2 mt-4 text-blue-dark dark:text-white">
          Active
        </Typography.Title3>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <Button size="small">Small</Button>
          <Button size="small-long">Small-Long</Button>
          {/* Medium is the default*/}
          <Button>Medium</Button>
          <Button size="medium-long">Medium-Long</Button>
          <Button size="large">Large</Button>
          <Button size="large-long">Large-Long</Button>
        </div>

        {/* Disabled Buttons */}
        <Typography.Title3 className="mb-2 text-blue-dark dark:text-white">
          Disabled
        </Typography.Title3>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <Button disabled>Medium Disabled</Button>
          <Button size="large" disabled>
            Large Disabled
          </Button>
        </div>

        {/* Hover & Active/Focused States */}
        <Typography.Title3 className="mb-2 text-blue-dark dark:text-white">
          Hover, Focused and Active
        </Typography.Title3>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <Button>Hover</Button>
          <Button>Focus (tab)</Button>
          <Button>Active (click & hold)</Button>
        </div>

        {/* Icon Buttons */}
        <Typography.Title3 className="mb-2 text-blue-dark dark:text-white">
          Search Icon
        </Typography.Title3>
        <div className="flex flex-wrap items-center gap-4">
          <IconButton />
          <IconButton disabled />
        </div>
      </div>

      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <Typography.Title1 className="mb-4 text-blue-dark">
          Typography Demo (Title 1 - Roboto Bold 48/137% +0)
        </Typography.Title1>
        <Typography.Title2 className="mb-2 text-blue-dark">
          Title Styles (Title 2 - Roboto Bold 36/137% +0)
        </Typography.Title2>
        <Typography.Title3 className="mb-2">
          Title 3 - Roboto Bold 28/137% +0
        </Typography.Title3>
        <Typography.Title4 className="mb-2">
          Title 4 - Roboto Bold 24/30 +0
        </Typography.Title4>
        <Typography.Title5 className="mb-2">
          Title 5 - Roboto Bold 20/137% +0
        </Typography.Title5>
        <Typography.Title6 className="mb-2">
          Title 6 - Roboto Bold 16/137% +0
        </Typography.Title6>
        <Typography.Title7 className="mb-4">
          Title 7 - Roboto Bold 14/137% +0
        </Typography.Title7>

        <Typography.Title2 className="mb-2 text-blue-dark">
          Paragraph Styles
        </Typography.Title2>
        <Typography.Paragraph1 className="mb-2">
          Paragraph 1 - Roboto Regular 20/137% +0
        </Typography.Paragraph1>
        <Typography.Paragraph2 className="mb-2">
          Paragraph 2 - Roboto Regular 18/137% +0
        </Typography.Paragraph2>
        <Typography.Paragraph3 className="mb-2">
          Paragraph 3 - Roboto Regular 16/137% +0
        </Typography.Paragraph3>
        <Typography.Paragraph4 className="mb-2">
          Paragraph 4 - Roboto Regular 15/137% +0
        </Typography.Paragraph4>
        <Typography.Paragraph5 className="mb-4">
          Paragraph 5 - Roboto Regular 14/137% +0
        </Typography.Paragraph5>

        <Typography.Title2 className="mb-2 text-blue-dark">
          Hyperlink Styles
        </Typography.Title2>
        <Typography.HyperlinkBold href="#" className="mr-4 text-blue-link">
          Bold Hyperlink - Roboto Bold Underlined 16/137% +0
        </Typography.HyperlinkBold>
        <Typography.Hyperlink href="#" className="text-blue-link">
          Regular Hyperlink - Roboto Regular 14/137% +0
        </Typography.Hyperlink>
      </div>

      <h2>Tailwind Styled Components</h2>
      <a className="underline" href="https://tailwindcss.com/docs/installation">
        Docs
      </a>
      <br></br>
      <a
        className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
        href="https://v1.tailwindcss.com/components/buttons"
      >
        Buttons
      </a>
      <br />
      <div className="m-3 flex flex-wrap">
        <button className="h-8 rounded bg-blue-dark px-3  text-base font-bold leading-extra-tight text-white hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused ">
          Small
        </button>
        <button className="h-10 rounded bg-blue-dark px-5 text-base font-bold text-white hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused ">
          Medium-Long
        </button>
        <button className="h-10 rounded bg-blue-dark px-3 text-base font-bold text-white hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused ">
          Medium-Narrow
        </button>
        <button className="h-10 rounded bg-blue-dark px-4 text-base font-bold text-white hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused ">
          Medium
        </button>
        <button className="h-14 rounded-large bg-blue-dark px-6 text-xl font-bold text-white hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused ">
          Large
        </button>
        <button className="h-16 rounded-x-large bg-blue-dark px-6 text-2xl font-bold text-white hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused ">
          X-Large-Long
        </button>
      </div>

      <div className="max-w-sm overflow-hidden rounded shadow-lg">
        <img
          className="w-full"
          src="https://images.pexels.com/photos/17021500/pexels-photo-17021500/free-photo-of-cat-looking-up.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">Card</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pb-2 pt-4">
          <span className="bg-gray-200 font-semibold text-gray-700 mb-2 mr-2 inline-block rounded-full px-3 py-1 text-sm">
            #photography
          </span>
          <span className="bg-gray-200 font-semibold text-gray-700 mb-2 mr-2 inline-block rounded-full px-3 py-1 text-sm">
            #cat
          </span>
          <span className="bg-gray-200 font-semibold text-gray-700 mb-2 mr-2 inline-block rounded-full px-3 py-1 text-sm">
            #pet
          </span>
        </div>
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/128/1082/1082240.png"
        alt=""
      />
      <span>
        Testing whether img has display:block set by tailwind preflight
      </span>
    </div>
  );
};
export default DemoTailwind;
