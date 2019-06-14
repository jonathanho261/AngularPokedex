import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Location } from '@angular/common';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-screen',
  templateUrl: './display-screen.component.html',
  styleUrls: ['./display-screen.component.css']
})
export class DisplayScreenComponent implements OnInit {

  private pokemon: Pokemon;

  constructor(
      private route: ActivatedRoute,
      private location: Location,
      private apiCallService: ApiCallService
    ) { }

  ngOnInit() {
    this.getPokemon();
  }

  /**
   * Gets Pokemon from API
   * @param name name of the pokemon
   */
  getPokemon(): void {
    const pokemonName = this.route.snapshot.paramMap.get('name');
    this.apiCallService.getPokemon(pokemonName)
      .subscribe(pokemon => this.pokemon = pokemon);
  }

  goBack(): void {
    this.location.back();
  }

  log() {
    console.log(this.pokemon.sprites.front_default);
  }

}
