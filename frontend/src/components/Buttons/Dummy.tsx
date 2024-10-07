const CrappyComponent = () => {
    return (
      <div className="bg-blue-500 text-white p-4">
        {/* Using a nonexistent Tailwind class */}
        <h1 className="font-bold nonexistent-class">Hello, World!</h1>
  
        {/* Empty classname */}
        <div className=""></div>
  
        {/* Valid Tailwind class for demonstration */}
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Click Me
        </button>
  
        {/* Another nonexistent class */}
        <p className="text-lg another-nonexistent-class">This is a paragraph.</p>
      </div>
    );
  };
  
  export default CrappyComponent;
  