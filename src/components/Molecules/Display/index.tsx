import { Audio } from "react-loader-spinner";
import { observer } from "mobx-react";
import { useStores } from "@/src/hooks/useStores";
import FolderNode from "@/src/components/Molecules/FolderNode/index";
import Stats from "@/src/components/Molecules/Stats/index";

const Display = observer(() => {
  const { data } = useStores();

  return (
    <div className="content-container">
      {data.isLoading ? (
        <Audio height="80" width="80" color="black" ariaLabel="loading" />
      ) : (
        <>
          <div className="explorer-container">
            {data.files.length !== 0 &&
              data.files
                .filter(
                  ({parent, type}) => parent === null && type === "folder"
                )
                .map((rootFolder, i) => {
                  return <FolderNode key={i} folder={rootFolder} margin={16} />;
                })}
          </div>
          <Stats />
        </>
      )}
    </div>
  );
});

export default Display;
