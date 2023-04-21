import React, { useState } from "react";
import FileIcon from "@/src/components/Atoms/FileIcon";

const FileNode = ({
  title,
  ext,
  id,
  hide
}: {
  title: string;
  ext: string | undefined;
  id: string | undefined;
  hide: boolean;
}) => {
  const [hoverState, setHoverState] = useState(false);

  return (
    <div
      className="file-node"
      style={{
        background: hoverState ? "#FAEDCD" : "transparent",
        opacity: hide ? ".25" : "1",
      }}
      onMouseOver={() => id && setHoverState(true)}
      onMouseOut={() => id && setHoverState(false)}
      onClick={() => id && console.log(id)}
    >
      <FileIcon ext={ext} hover={hoverState} />
      <div>
        {title}.{ext}
      </div>
    </div>
  );
};

export default FileNode;
