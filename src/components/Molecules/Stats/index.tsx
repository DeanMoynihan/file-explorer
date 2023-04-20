import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getColour, fileType, statType } from "@/src/utils/client";

const Stats = function ({ data }: { data: fileType[] }) {
  ChartJS.register(ArcElement, Tooltip);

  const getTotalFiles = function () {
    return data.filter((file) => file.type !== "folder").length;
  };

  const getTotalOfFileType = function (ext: string) {
    return data.filter((file) => file.ext === ext).length;
  };

  const getPercentages = function () {
    const percentages = data.reduce((acc: statType[], { type, ext }) => {
      if (type === "folder") {
        return acc;
      }

      const item = acc.find((p: statType) => p.ext === ext);
      const percent = (getTotalOfFileType(ext) * 100) / getTotalFiles();
      item
        ? (item.percent = Math.round(percent * 10) / 10)
        : acc.push({ ext, percent, colour: getColour(ext) });

      return acc;
    }, []);

    return {
      labels: percentages.map(({ ext }) => ext),
      datasets: [
        {
          label: "%",
          data: percentages.map(({ percent }) => percent),
          backgroundColor: percentages.map(({ colour }) => colour),
        },
      ],
    };
  };

  return (
    <div className="stats-container">
      <h2 style={{ marginTop: 0 }}>Stats</h2>
      <Doughnut data={getPercentages()} />
      <p>Total files: {getTotalFiles()}</p>
    </div>
  );
};

export default Stats;
