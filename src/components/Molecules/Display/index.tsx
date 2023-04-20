import { Audio } from "react-loader-spinner";
import FolderNode from "@/src/components/Molecules/FolderNode/index";
import Stats from "@/src/components/Molecules/Stats/index";
import { fileType } from "@/src/utils/client.d";

const Display = function({data}: {data: fileType[]}) {

  return (
    <div >
      {data.length === 0 ? (
        <div className="loader-container">
          <Audio height="80" width="80" color="black" ariaLabel="loading" />
        </div>
      ) : (
        <div className="content-container">
          <div className="explorer-container">
            {data.length !== 0 &&
              data
                .filter(
                  ({parent, type}) => parent === null && type === "folder"
                )
                .map((rootFolder, i) => {
                  return <FolderNode key={i} folder={rootFolder} data={data} margin={16} />;
                })}
          </div>
          <Stats data={data}/>
        </div>
      )}
    </div>
  );
};

export default Display;