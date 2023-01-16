export class PagedDataModel<T> {

    public data: T | undefined;

    public currentPage: number;

    public pageSize: number;

    public totalRecords: number;
    
    public constructor(){
        this.currentPage = 0;
        this.pageSize = 0;
        this.totalRecords = 0;
    }
}