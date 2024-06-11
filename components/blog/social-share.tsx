"use client";

import { useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
  RedditIcon,
  RedditShareButton,
} from "react-share";

const SocialShare = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const url = window.location.href;
    setUrl(url);
  }, []);

  if (process.env.NODE_ENV === "development") {
    return null;
  }

  return (
    <div className="mb-7 flex gap-2">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <TwitterShareButton url={url}>
        <XIcon size={32} round />
      </TwitterShareButton>
      <RedditShareButton url={url}>
        <RedditIcon size={32} round />
      </RedditShareButton>
    </div>
  );
};

export default SocialShare;
