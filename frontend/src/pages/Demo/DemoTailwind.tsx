import React from "react";

const DemoTailwind = () => {
  return (
    <div className="container p-6">
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
