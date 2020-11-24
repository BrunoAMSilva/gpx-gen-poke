import { Component, OnInit } from "@angular/core";
import { POKEMONS } from "../pokemon";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-discord-commands",
  templateUrl: "./discord-commands.component.html",
  styleUrls: ["./discord-commands.component.scss"]
})
export class DiscordCommandsComponent implements OnInit {
  public pokemons = Object.keys(POKEMONS).map(key => POKEMONS[key]);
  public myControl = new FormControl();
  public filteredOptions: Observable<any[]>;

  constructor() {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.pokemons.slice()))
    );
  }

  public displayFn(user: any): string {
    return user && user.names ? user.names.en : "";
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.pokemons.filter(
      option => option.names.en.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
