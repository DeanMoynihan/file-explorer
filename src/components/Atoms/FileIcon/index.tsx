import React from "react";
import { File, FileText, Code, List, Table, Image, Video } from "react-feather";
import { useStores } from "@/src/hooks/useStores";

const FileIcon = ({ ext, hover }: { ext: string | undefined, hover: boolean }) => {
  const { data } = useStores();

  const GetExtIcon = function (ext: string | undefined) {
    const style = {
      strokeWidth: "1.5px",
      size: 24,
      color: data.getColour(ext),
    };

    switch (ext) {
      case "svg":
        return <Image style={style} />;
      case "xls":
        return <Table style={style} />;
      case "doc":
        return <FileText style={style} />;
      case "webp":
        return <Video style={style} />;
      case "ts":
        return <Code style={style} />;
      case "js":
        return <Code style={style} />;
      case "html":
        return <Code style={style} />;
      case "json":
        return <List style={style} />;
      default:
        return <File strokeWidth={1} size={style.size} />;
    }
  };

  return (
    <div className="file-icon" style={{background: hover ? "#FEFAE0" : "#FAEDCD"}}>
      {GetExtIcon(ext)}
    </div>
  );
};

export default FileIcon;
