import { RootState } from "../store.ts"
import { IPortfolio } from "./portfolio.types.ts"
export const selectorPortfolio = (state: RootState): IPortfolio => state.portfolio