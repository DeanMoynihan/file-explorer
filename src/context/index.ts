import { createContext } from "react";
import Data from "../utils/util";

const data = new Data();

export const storesContext = createContext({data});
