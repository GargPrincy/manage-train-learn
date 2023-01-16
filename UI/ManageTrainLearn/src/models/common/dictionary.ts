
export class Dictionary<T>{
    
    constructor(){
        this.keyValuePair = {} as {[key: string]:T};
        this.count = 0;
        
    }

    private keyValuePair:{[key: string]:T};

    private count: number;

    get Count(): number{
        return this.count;
    }

    get Keys(): string[]{
        let keys = new Array();

        for(let key in this.keyValuePair){
            keys.push(key);
        }

        return keys;
    }

    public containesKey(key: string): boolean{
        return this.keyValuePair.hasOwnProperty(key);
    }
    
    public add(key: string, value: T): void{
        if (!this.containesKey(key)){
            this.count++;
        }

        this.keyValuePair[key] = value;
    }

    public getValue(key: string){

        if (this.containesKey(key)){
            return this.keyValuePair[key];
        }

        return "";
    }

}