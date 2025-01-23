import { LocalStorageAdapter } from "@vsirotin/keeper-master-data";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { Subject } from "rxjs";

export class Chest {

    static instance: Chest = new Chest();
    static maxCapacity: number = 10;

    chestChanged$ = new Subject<number[]>();
    private logger: ILogger = LoggerFactory.getLogger("shared/classes/Chest");

    private adapter: LocalStorageAdapter<number[]> = new LocalStorageAdapter<number[]>("digital-chest", []);
    
    private items: Set<number> = new Set<number>([]);

    private constructor(){
        this.items = new Set<number>(this.adapter.readValue());
    }

    getItems(): number[] {
        return Array.from(this.items).sort((a, b) => a - b);
    }

    getFreeCapacity(): number {
        return Chest.maxCapacity - this.items.size;
    }

    addItems(items: number[]): void {
        if(this.getFreeCapacity() >= items.length) {
            items.forEach(item => this.items.add(item));
        } 
        this.saveAndNotifyNewState()
    }

    removeItems(items: number[]): void {
        items.forEach(item => this.items.delete(item));
        this.saveAndNotifyNewState();
    }

    replaceCurrentItemsWithNew(items: number[]): void {
        this.items.clear();
        this.addItems(items);
        this.saveAndNotifyNewState();

    }


    saveAndNotifyNewState() {
        const newState = Array.from(this.items).sort((a, b) => a - b);
        this.adapter.saveValue(newState);
        this.chestChanged$.next(newState);
        this.logger.log(`New chest state: ${Array.from(this.items)}`);
    }
}
