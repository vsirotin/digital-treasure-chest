import { getMatFormFieldMissingControlError } from "@angular/material/form-field";
import { ILogger, LoggerFactory } from "@vsirotin/log4ts";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export class Chest {

    private static subject: Subject<number[]> = new Subject<number[]>();
    static chestChanged$: Observable<number[]> =Chest.subject.asObservable();
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

    private static notifyNewState() {
        const newState = Array.from(this.items);
        Chest.subject.next(newState);
        Chest.logger.log(`New chest state: ${Array.from(this.items)}`);
    }



}
