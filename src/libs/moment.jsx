class Moment extends Date {
  constructor(date = Date.now( )) {
    super(date);
  };

  getNextMonth( ) {
    return new Moment(new Date(this.year, this.month + 1, this.day));
  };

  getPreviousMonth( ) {
    return new Moment(new Date(this.year, this.month - 1, this.day));
  };

  getNextYear( ) {
    return new Moment(new Date(this.year + 1, this.month, this.day));
  };

  getPreviousYear( ) {
    return new Moment(new Date(this.year - 1, this.month, this.day));
  };

  getTomorrow( ) {
    return new Moment(new Date(this.year, this.month, this.day + 1));
  };

  getYesterday( ) {
    return new Moment(new Date(this.year, this.month, this.day - 1));
  };

  getLastDay( ) {
    return new Moment(new Date(this.year, this.month + 1, 0));
  };

  getFirstDay( ) {
    return new Moment(new Date(this.year, this.month, 1));
  };

  getAfterDays(n) {
    n = typeof n !== "number" ? 0 : n;
    return new Moment(new Date(this.year, this.month, this.day + n));
  };

  getBeforeDays(n) {
    n = typeof n !== "number" ? 0 : n;
    return new Moment(new Date(this.year, this.month, this.day - n));
  };

  getAfterMonths(n) {
    n = typeof n !== "number" ? 0 : n;
    return new Moment(new Date(this.year, this.month + n, this.day));
  };

  getBeforeMonths(n) {
    n = typeof n !== "number" ? 0 : n;
    return new Moment(new Date(this.year, this.month - n, this.day));
  };

  resetTimestamp( ) {
    this.setHours(0);
    this.setSeconds(0);
    this.setMinutes(0);
    this.setMilliseconds(0);
  };

  get lastDay( ) {
    return this.getLastDay( ).day;
  };

  get firstDay( ) {
    return this.getFirstDay( ).day;
  };

  get year( ) {
    return this.getFullYear( );
  };

  get day( ) {
    return this.getDate( );
  };

  get month( ) {
    return this.getMonth( );
  };
};

export default Moment;