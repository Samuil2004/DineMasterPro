import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import { AdvancedVideo } from "@cloudinary/react";

const getImageForItemBoxMenu = (
  itemId,
  itemImageVersion,
  itemImageUrl,
  width,
  height
) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dcwcvn160" } });
  const img = cld
    .image(`${itemImageVersion}/${itemImageUrl}`)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(width).height(height));
  return (
    <AdvancedImage
      cldImg={img}
      alt={`Item ID: ${itemId}`}
      width={width}
      height={height}
    />
  );
};

const getImageForItemView = (itemId, itemImageVersion, itemImageUrl) => {
  const cld = new Cloudinary({ cloud: { cloudName: "dcwcvn160" } });
  const img = cld
    .image(`${itemImageVersion}/${itemImageUrl}`)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(300).height(300));
  return <AdvancedImage cldImg={img} alt={`Item ID: ${itemId}`} />;
};

const getVideoForMainPage = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "dcwcvn160" } });

  const video = cld
    .video(
      "invideo-ai-1080_Canim__Where_Flavors_Ignite_Moments_Del_2024-10-02_qhi0ms"
    )
    .format("mp4")
    .quality("auto");

  return <AdvancedVideo cldVid={video} controls autoPlay loop muted />;
};

export { getImageForItemBoxMenu, getImageForItemView, getVideoForMainPage };
