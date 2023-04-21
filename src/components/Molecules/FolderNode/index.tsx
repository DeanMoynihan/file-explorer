import React, { useState } from "react";
import { Folder, ChevronRight, ChevronDown } from "react-feather";
import { fileType } from "@/src/utils/client";
import FileNode from "@/src/components/Atoms/FileNode";

const FolderNode = ({
  folder,
  margin,
  data,
  searchFilter,
}: {
  folder: fileType;
  margin: number;
  data: fileType[];
  searchFilter: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverState, setHoverState] = useState(false);

  const getTotalChildren = function (parent: string) {
    return data.filter((file) => file.parent === parent).length;
  };

  return (
    <div>
      <div
        className="folder-node"
        onMouseOver={() => setHoverState(true)}
        onMouseOut={() => setHoverState(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDown strokeWidth={2} size={24} color={"#264653"} />
        ) : (
          <ChevronRight strokeWidth={2} size={24} color={"#264653"} />
        )}
        <Folder
          fill={hoverState ? "#41778D" : "#264653"}
          size={24}
          color={hoverState ? "#41778D" : "#264653"}
        />
        {folder.name}
        <span>{getTotalChildren(folder.id)}</span>
      </div>
      {isOpen && (
        <div className="folder-node-container">
          {data
            .filter(({ parent }) => parent === folder.id)
            .sort((a: fileType, b: fileType) =>
              a.type === "folder" || a.ext < b.ext ? -1 : 1
            )
            .map((file: fileType) => (
              <div
                key={file.id}
                style={{ marginLeft: margin }}
                className="file-node-container"
              >
                {file.type === "folder" ? (
                  <FolderNode
                    folder={file}
                    margin={margin + 16}
                    data={data}
                    searchFilter={searchFilter}
                  />
                ) : (
                  <FileNode
                    title={file.name}
                    ext={file.ext}
                    id={file.id}
                    hide={
                      !(
                        file.name.includes(searchFilter) ||
                        searchFilter === "" ||
                        file.ext.includes(searchFilter)
                      )
                    }
                  />
                )}
              </div>
            ))}
          {data.filter(({ parent }) => parent === folder.id).length === 0 && (
            <div style={{ marginLeft: margin }} className="file-node-container">
              <FileNode
                title={"empty"}
                ext={undefined}
                id={undefined}
                hide={false}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FolderNode;
