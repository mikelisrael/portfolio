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
} from "react-share";

const SocialShare = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const url = window.location.href;
    setUrl(url);
  }, []);

  return (
    <aside className="lg:right:10 fixed right-4 top-52 flex flex-col gap-2 opacity-90 xl:right-60">
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
    </aside>
  );
};

export default SocialShare;
