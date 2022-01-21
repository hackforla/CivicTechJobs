// External Imports
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState, Fragment } from "react";

// Internal Imports
import { combineClasses } from "../Utility/utils";
import "./_Carousel.scss";

function H1(props) {
  return <h1 className="high1">{props.children}</h1>;
}

function Relative(props) {
  return <div className="relative">{props.children}</div>;
}

const Flex = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={combineClasses("flex", props.addClass)}
      onScroll={props.onScroll}
    >
      {props.children}
    </div>
  );
});

function HorizontalCenter(props) {
  return <Flex addClass="hcenter">{props.children}</Flex>;
}

function Container(props) {
  return <div className="container">{props.children}</div>;
}

function Item(props) {
  return (
    <div className="item" style={props.style}>
      {props.children}
    </div>
  );
}

function CarouserContainer(props) {
  return <Container>{props.children}</Container>;
}

function CarouserContainerInner(props) {
  const [num, setNum] = useState(0);

  const ref = useRef(null);

  useEffect;

  function handleScroll(e) {
    const position = e.target.scrollLeft;
    var atSnappingPoint = position % e.target.offsetWidth === 0;
    var timeOut = atSnappingPoint ? 0 : 150; //see notes

    if (position > 1201) {
      clearTimeout(e.target.scrollTimeout);
      e.target.scrollLeft = 0;
    } else if (position < 10) {
      e.target.scrollLeft = 1201;
    }

    setNum(e.target.scrollLeft);
  }

  return (
    <Fragment>
      <Flex
        ref={ref}
        addClass="carousel-inner"
        onScroll={(e) => handleScroll(e)}
        position={num}
      >
        {props.children}
      </Flex>
      <div>{num}</div>
    </Fragment>
  );
}

function Carousel(props) {
  return (
    <CarouserContainer>
      <CarouserContainerInner>{props.children}</CarouserContainerInner>
    </CarouserContainer>
  );
}

const colors = [
  "#f1c40f",
  "#f39c12",
  "#e74c3c",
  "#16a085",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#95a5a6",
];

function FullComponent(props) {
  const colorsArray = colors.map((color) => (
    <Item
      size={20}
      style={{ background: color, borderRadius: "20px", opacity: 0.9 }}
      key={color}
    >
      {color}
    </Item>
  ));

  return (
    <Container>
      <H1>Easy Carousel</H1>
      <HorizontalCenter>
        <Carousel>
          {colorsArray}
          {colorsArray}
        </Carousel>
      </HorizontalCenter>
    </Container>
  );
}

export { FullComponent };
