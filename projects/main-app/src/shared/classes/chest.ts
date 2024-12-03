import { getMatFormFieldMissingControlError } from "@angular/material/form-field";

export class Chest {

    static maxCapacity: number = 10;
    static items: Set<number> = new Set<number>();

    private constructor(){}

    static getItems(): number[] {
        return Array.from(this.items);
    }

    static getFreeCapacity(): number {
        return this.maxCapacity - this.items.size;
    }

    static addItems(items: number[]): void {
        if(this.getFreeCapacity() >= items.length) {
            items.forEach(item => this.items.add(item));
        } 
    }

    static removeItem(item: number): void {
        this.items.delete(item);
    }

    static removeItems(items: number[]): void {
        items.forEach(item => this.items.delete(item));
    }

}
