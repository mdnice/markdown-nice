import React from "react";
import {storiesOf} from "@storybook/react";
import Demo from "./demo";

storiesOf("MarkdownNice", module)
  .add("demo", () => (
    <Demo/>
  ));