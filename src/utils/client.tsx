export interface fileType {
  id: string;
  type: string;
  parent: string;
  name: string;
  ext: string;
}

export interface statType {
  ext: string;
  percent: number;
  colour: string | undefined;
}

export const getColour = function(ext: string | undefined) {
  switch (ext) {
    case "svg":
      return "#F4A261";
    case "xls":
      return "#83c5be";
    case "doc":
      return "#e29578";
    case "webp":
      return "#FFDDD2";
    case "ts":
      return "#264653";
    case "js":
      return "#E9C46A";
    case "html":
      return "#E76F51";
    case "json":
      return "#2A9D8F";
    default:
      return undefined;
  }
}