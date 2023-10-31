import { connect } from "@planetscale/database";
import {DATABASE_URL} from "./config.js"

const config = {
  url: DATABASE_URL,
};


export const conn = connect(config);
