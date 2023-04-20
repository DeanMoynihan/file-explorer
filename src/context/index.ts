import { createContext } from "react";
import Data from "../stores/Data";

const data = new Data();

export const storesContext = createContext({data});
