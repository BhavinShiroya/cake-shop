import React from "react";
import Carousel from "components/carousel/carousel";

const data = [
  {
    id: 1,
    image: "/images/fast-delivery.png",
    link: "#",
    title: "Fast delivery",
  },
  {
    id: 2,
    image: "/images/12.png",
    link: "#",
    title: "Coupon savings",
  },
  {
    id: 3,
    image: "/images/custom-order.png",
    link: "#",
    title: "Custom order",
  },
  {
    id: 4,
    image: "/images/female-care.png",
    link: "#",
    title: "Female care",
  },
  {
    id: 1,
    image: "/images/rose-cake.png",
    link: "#",
    title: "Fast delivery",
  },
  {
    id: 2,
    image: "/images/drink.png",
    link: "#",
    title: "Coupon savings",
  },
  {
    id: 3,
    image: "/images/berry.png",
    link: "#",
    title: "Custom order",
  },
  {
    id: 4,
    image: "/images/white.png",
    link: "#",
    title: "Female care",
  },
];

export default function HeroBlock() {
  return (
    <div className="w-full relative my-35px">
      <Carousel data={data} itemClass="px-5px" />
    </div>
  );
}
