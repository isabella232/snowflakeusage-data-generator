import DataRow from "./DataRow";
import TYPES from "./Types";
import { randomFromArray } from "../helpers";

/**
 * WAREHOUSE_METERING_HISTORY View
 *
 * https://docs.snowflake.net/manuals/sql-reference/account-usage/warehouse_metering_history.html
 */
export default class WarehouseMeteringHistory extends DataRow {
  constructor(date) {
    super();
    this.setStartAndEnd(date);
    this.WAREHOUSE_NAME = randomFromArray(["BIG_WH", "SMALL_WH"]);
    this.CREDITS_USED = Math.random() * 100;
    if (this.WAREHOUSE_NAME == "SMALL_WH") {
      this.CREDITS_USED *= 0.3;
    }
    this.CREDITS_USED.toFixed(2);
  }

  setStartAndEnd(date) {
    this.START_TIME = date.toISOString();
    const end = new Date(date);
    end.setHours(date.getHours() + 1);
    this.END_TIME = end;
  }

  static types() {
    return [
      {
        name: "START_TIME",
        type: TYPES.timestamp
      },
      {
        name: "END_TIME",
        type: TYPES.timestamp
      },
      {
        name: "WAREHOUSE_NAME",
        type: TYPES.string
      },
      {
        name: "CREDITS_USED",
        type: TYPES.float
      }
    ];
  }
}
