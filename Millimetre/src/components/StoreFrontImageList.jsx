import React from "react";

export default function StoreFrontImageList() {
  const itemData = [
    {
      img: "https://images.herzindagi.info/image/2022/May/clothes-to-repeat-fashion-tips.jpg",
      title: "Mushrooms",
    },
    {
      img: "https://images.herzindagi.info/image/2022/May/clothes-to-repeat-fashion-tips.jpg",
      title: "Tomato basil",
    },
    {
      img: "https://images.herzindagi.info/image/2022/May/clothes-to-repeat-fashion-tips.jpg",
      title: "Sea star",
    },
    {
      img: "https://images.herzindagi.info/image/2022/May/clothes-to-repeat-fashion-tips.jpg",
      title: "Bike",
    },
  ];

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 gap-4 max-w-xs md:max-w-md lg:max-w-lg">
        {itemData.map((item) => (
          <div key={item.img} className="rounded-lg overflow-hidden">
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            {/* <div className="bg-black bg-opacity-50 text-white p-2 text-center">
              {item.title}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
