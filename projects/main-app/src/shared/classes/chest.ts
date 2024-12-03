export class Chest {

    static instance: Chest = new Chest();

    maxCapacity: number = 10;
    items: number[] = [1,33,789];

    private constructor(){}

}
