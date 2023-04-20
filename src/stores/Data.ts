import { computed, makeAutoObservable, observable } from "mobx";
import mockData from "../pages/api/mock.json";

export interface fileType {
  id: string;
  type: string;
  parent: string;
  name: string;
  ext: string;
}

class Data {
  isLoading: boolean = false;
  files: fileType[] = [];

  constructor() {
    makeAutoObservable(this, {
      files: observable,
      getTotalFiles: computed,
      getColour: observable,
      getTotalOfFileType: observable,
    });

    //this.updateData(mockData as fileType[]);
    this.loadData();
  }

  async loadData() {
    //DO THIS EVERY 30 SECONDS
    this.isLoading = true;
    try {
      if (process.env.NEXT_PUBLIC_API_TOKEN === undefined) {
        throw new Error("No API Key");
      }

      const response = await fetch("https://dev.test.sega.co.uk/api/list", {
        headers: {
          "x-secret-api-key": process.env.NEXT_PUBLIC_API_TOKEN,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      this.updateData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  get getTotalFiles() {
    return this.files.filter((file) => file.type !== "folder").length;
  }

  getTotalOfFileType(ext: string) {
    return this.files.filter((file) => file.ext === ext).length;
  }

  getTotalChildren(parent: string) {
    return this.files.filter((file) => file.parent === parent).length;
  }

  getColour(ext: string | undefined) {
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

  updateData(data: fileType[]) {
    this.files = data;
    this.isLoading = false;
  }
}
export default Data;
