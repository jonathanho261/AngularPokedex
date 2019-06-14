
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ApiCallService } from '../api-call.service';
import { Observable, Subject ,of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { all } from 'q';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

 private pikachu: Pokemon = {name: 'Pikachu', id: 25,
    sprites: {front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'}};
  allPokemon: Pokemon[] = [];
  matchingPokemon: Pokemon[] = [];

  constructor(private apiCallService: ApiCallService) { }

  // Push a search term into the observable stream.
  search(term: string) {
    this.matchingPokemon = [];
    if (term != '') {
      this.matchingPokemon = this.allPokemon.filter(pokemon => pokemon.name.startsWith(term))
    }
    if (this.matchingPokemon.length >= 5) {
      this.matchingPokemon = this.matchingPokemon.slice(0, 4);
    }
  }

  submitForm(search: string) {
    console.log(search);
  }

  ngOnInit() {
    this.apiCallService.getAllPokemon().subscribe(
      allPokemon => this.allPokemon = allPokemon
    );
   }
  

}
