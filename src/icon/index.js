import React from "react";

import About from "./About";
import Bold from "./Bold";
import Code from "./Code";
import Copy from "./Copy";
import Del from "./Del";
import Down from "./Down";
import Environment from "./Environment";
import Font from "./Font";
import FullScreen from "./FullScreen";
import GitHub from "./GitHub";
import Inbox from "./Inbox";
import Image from "./Image";
import Italic from "./Italic";
import Link from "./Link";
import More from "./More";
import Rabbit from "./Rabbit";
import Reset from "./Reset";
import Setting from "./Setting";
import Smile from "./Smile";
import Mobile from "./Mobile";
import PC from "./PC";

export default (props) => {
  switch (props.name) {
    case "about":
      return <About {...props} />;
    case "bold":
      return <Bold {...props} />;
    case "code":
      return <Code {...props} />;
    case "copy":
      return <Copy {...props} />;
    case "del":
      return <Del {...props} />;
    case "down":
      return <Down {...props} />;
    case "environment":
      return <Environment {...props} />;
    case "font":
      return <Font {...props} />;
    case "fullscreen":
      return <FullScreen {...props} />;
    case "github":
      return <GitHub {...props} />;
    case "inbox":
      return <Inbox {...props} />;
    case "image":
      return <Image {...props} />;
    case "italic":
      return <Italic {...props} />;
    case "link":
      return <Link {...props} />;
    case "more":
      return <More {...props} />;
    case "rabbit":
      return <Rabbit {...props} />;
    case "reset":
      return <Reset {...props} />;
    case "setting":
      return <Setting {...props} />;
    case "smile":
      return <Smile {...props} />;
    case "pc":
      return <PC {...props} />;
    case "mobile":
      return <Mobile {...props} />;
    default:
      return <svg />;
  }
};
