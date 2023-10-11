export class FirebaseDocument {
  /**
   * Object Create Timestamp
   */
  ctimestamp!: number;
  /**
   * Object Update Timestamp
   */
  utimestamp!: number;
  /**
   * Object Delete Timestamp
   */
  dtimestamp!: number;

  requestCount!: number;
  updateCount!: number;

  creatorId!: string;
  ownerId!: string;
  /**
   * FirebaseDocument Object
   * @param {boolean} isExample - Creates a example FirebaseDocument
   */
  constructor(example = false) {
    this.ctimestamp = Date.now();
    this.utimestamp = 0;
    this.dtimestamp = 0;

    this.requestCount = 0;
    this.updateCount = 0;

    this.creatorId = "";
    this.ownerId = "";
    if (example) {
      this.ctimestamp = Date.now();
      this.utimestamp = 0;
      this.dtimestamp = 0;

      this.requestCount = 0;
      this.updateCount = 0;

      this.creatorId = "_uID";
      this.ownerId = "_uID";
    }
  }
}

export class FirabasePagination {
  startDate!: number;
  count!: number;
  direction?: "desc" | "asc";
  /**
   * FirabasePagination Object
   * @param {boolean} isExample - Creates a example FirabasePagination
   */
  constructor(example = false) {
    this.startDate = Date.now();
    this.count = 0;
    this.direction = "desc";

    if (example) {
      this.count = 10;
    }
  }
}
