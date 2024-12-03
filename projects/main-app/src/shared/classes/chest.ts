import { getMatFormFieldMissingControlError } from "@angular/material/form-field";

export class Chest {

    static instance: Chest = new Chest();

    maxCapacity: number = 10;
    items: Set<number> = new Set<number>();

    private constructor(){}

    getItems(): number[] {
        return Array.from(this.items);
    }

    getFreeCapacity(): number {
        return this.maxCapacity - this.items.size;
    }

    addItems(items: number[]): void {
        if(this.getFreeCapacity() >= items.length) {
            items.forEach(item => this.items.add(item));
        } 
    }

    removeItem(item: number): void {
        this.items.delete(item);
    }

    removeItems(items: number[]): void {
        items.forEach(item => this.items.delete(item));
    }

}
