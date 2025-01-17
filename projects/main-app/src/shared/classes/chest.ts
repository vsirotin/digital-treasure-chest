import { getMatFormFieldMissingControlError } from "@angular/material/form-field";
import { LocalStorageAdapter } from "@vsirotin/keeper-master-data";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export class Chest {

    static instance: Chest = new Chest();
    static maxCapacity: number = 10;

    chestChanged$ = new Subject<number[]>();
    private logger: ILogger = LoggerFactory.getLogger("shared/classes/Chest");

    private adapter: LocalStorageAdapter<number[]> = new LocalStorageAdapter<number[]>("chest", []);
    
    private items: Set<number> = new Set<number>([]);

    private constructor(){

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
        this.notifyNewState()
    }

    removeItems(items: number[]): void {
        items.forEach(item => this.items.delete(item));
        this.notifyNewState();
    }

    replaceCurrentItemsWithNew(items: number[]): void {
        this.items.clear();
        this.addItems(items);
        this.notifyNewState();

    }


    notifyNewState() {
        const newState = Array.from(this.items).sort((a, b) => a - b);
        this.chestChanged$.next(newState);
        this.logger.log(`New chest state: ${Array.from(this.items)}`);
    }
}
