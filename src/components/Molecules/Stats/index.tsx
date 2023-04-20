import { observer } from "mobx-react";
import { useStores } from "@/src/hooks/useStores";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export interface statType {
  ext: string;
  percent: number;
  colour: string | undefined;
}

const Stats = observer(() => {
  const { data } = useStores();
  ChartJS.register(ArcElement, Tooltip);

  const getPercentages = function () {
    const percentages = data.files.reduce((acc: statType[], {type, ext}) => {
      if (type === "folder") {
        return acc;
      }

      const item = acc.find((p: statType) => p.ext === ext);
      const percent = (data.getTotalOfFileType(ext) * 100) / data.getTotalFiles;
      item ? (item.percent = Math.round(percent * 10) / 10) : acc.push({ext, percent, colour: data.getColour(ext)});

      return acc;
    }, []);

    return {
      labels: percentages.map(({ext}) => ext),
      datasets: [
        {
          label: "%",
          data: percentages.map(({percent}) => percent),
          backgroundColor: percentages.map(({colour}) => colour),
        }
      ],      
    };
  };

  return (
    <div className="stats-container">
      <h2 style={{marginTop: 0}}>Stats</h2>
      <Doughnut data={getPercentages()} />
      <p>Total files: {data.getTotalFiles}</p>
    </div>
  );
});

export default Stats;
