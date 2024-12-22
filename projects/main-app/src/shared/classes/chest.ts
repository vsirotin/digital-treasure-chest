import { getMatFormFieldMissingControlError } from "@angular/material/form-field";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export class Chest {

    static chestChanged$ = new Subject<number[]>();
    private static logger: ILogger = LoggerFactory.getLogger("shared/classes/Chest");

    static maxCapacity: number = 10;
    private static items: Set<number> = new Set<number>([]);

    private constructor(){}

    static getItems(): number[] {
        return Array.from(this.items).sort((a, b) => a - b);
    }

    static getFreeCapacity(): number {
        return this.maxCapacity - this.items.size;
    }

    static addItems(items: number[]): void {
        if(Chest.getFreeCapacity() >= items.length) {
            items.forEach(item => Chest.items.add(item));
        } 
        Chest.notifyNewState()
    }

    static removeItems(items: number[]): void {
        items.forEach(item => Chest.items.delete(item));
        Chest.notifyNewState();
    }

    static replaceCurrentItemsWithNew(items: number[]): void {
        Chest.items.clear();
        Chest.addItems(items);
        Chest.notifyNewState();

    }


    private static notifyNewState() {
        const newState = Array.from(this.items).sort((a, b) => a - b);
        Chest.chestChanged$.next(newState);
        Chest.logger.log(`New chest state: ${Array.from(this.items)}`);
    }



}
