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
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href="https://v1.tailwindcss.com/components/buttons"
      >
        Buttons
      </a>
      <br />
      <div className="m-3 flex flex-wrap">
        <button className="h-8 px-3 rounded text-base  font-bold leading-extra-tight bg-blue-dark hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused text-white ">
          Small
        </button>
        <button className="h-10 px-5 rounded text-base font-bold bg-blue-dark hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused text-white ">
          Medium-Long
        </button>
        <button className="h-10 px-3 rounded text-base font-bold bg-blue-dark hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused text-white ">
          Medium-Narrow
        </button>
        <button className="h-10 px-4 rounded text-base font-bold bg-blue-dark hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused text-white ">
          Medium
        </button>
        <button className="h-14 px-6 rounded-large text-xl font-bold bg-blue-dark hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused text-white ">
          Large
        </button>
        <button className="h-16 px-6 rounded-x-large text-2xl font-bold bg-blue-dark hover:bg-blue-dark-hover hover:shadow-lg focus:bg-blue-dark-focused text-white ">
          X-Large-Long
        </button>
      </div>

      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src="https://images.pexels.com/photos/17021500/pexels-photo-17021500/free-photo-of-cat-looking-up.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Card</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #cat
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
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
