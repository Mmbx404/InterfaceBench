export class Sites {
  id: number;
  name: string;
  roActionPrimaire: number;
  roActionSecondaire: number;
  roTotal: number;

  constructor(id: number, name: string, roActionPrimaire: number, roActionSecondaire: number, roTotal: number) {
    this.id = id;
    this.name = name;
    this.roActionPrimaire = roActionPrimaire;
    this.roActionSecondaire = roActionSecondaire;
    this.roTotal = roTotal;
  }
}
