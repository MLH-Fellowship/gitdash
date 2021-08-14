import { Repository } from "./Repository";

export interface Favourite {
    userId: string;
    repositories: Repository[];
  }