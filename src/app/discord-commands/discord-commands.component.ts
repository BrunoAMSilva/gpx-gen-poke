import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-discord-commands',
  templateUrl: './discord-commands.component.html',
  styleUrls: ['./discord-commands.component.scss']
})
export class DiscordCommandsComponent implements OnInit {
  public pokemons = Object.keys(POKEMONS).map((key) => [key, POKEMONS[key]]);

  constructor() { }

  ngOnInit() {
  }

}