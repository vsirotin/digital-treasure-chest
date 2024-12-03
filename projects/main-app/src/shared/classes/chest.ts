import { getMatFormFieldMissingControlError } from "@angular/material/form-field";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { BehaviorSubject, Observable } from "rxjs";

export class Chest {

    private static subject: BehaviorSubject<number[]>;
    static chestChanged$ : Observable<number[]>;
    private static logger: ILogger = LoggerFactory.getLogger("shared/classes/Chest");

    static maxCapacity: number = 10;
    static items: Set<number> = new Set<number>([2, 5]);

    private constructor(){}

    static getItems(): number[] {
        return Array.from(this.items);
    }

    static getFreeCapacity(): number {
        return this.maxCapacity - this.items.size;
    }

    static addItem(item: number): void {
        Chest.items.add(item);
    }

    static addItems(items: number[]): void {
        if(Chest.getFreeCapacity() >= items.length) {
            items.forEach(item => Chest.addItem(item));
        } 
    }

    static removeItem(item: number): void {
        this.items.delete(item);
    }

    static removeItems(items: number[]): void {
        items.forEach(item => this.items.delete(item));
    }

}
