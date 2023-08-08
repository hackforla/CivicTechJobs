import React from "react";

const DemoTailwind = () => {
  return (
    <div className="container p-6">
      <h2>Tailwind Styled Components</h2>
      <a className="underline" href="https://tailwindcss.com/docs/installation">Docs</a>
      <br></br>
      <a
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href="https://v1.tailwindcss.com/components/buttons"
      >
        Buttons
      </a>
      <br />
      <div className="my-3 flex flex-col sm:flex-row">
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mr-3">
          Button
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download</span>
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
    </div>
  );
};
export default DemoTailwind;
