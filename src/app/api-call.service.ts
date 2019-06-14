import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // private pikachu: Pokemon = {name: 'Pikachu', id: 25, types: ['electric'],
  //   imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'};

  /**
   * method that returns pokemon object from API
   * @param pokemon the name of the desired pokemon
   */
  getPokemon(pokemon: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.apiUrl + '/' + pokemon)
      .pipe(
        catchError(this.handleError<Pokemon>('getPokemon()'))
      )
  }

  getAllPokemon(): Observable<Pokemon[]> {
    let pokemonArray: Pokemon[] = [];
    const numberOfPokemon = 807;
    for (let i = 1; i <= numberOfPokemon; i+= 1) {
      this.getPokemon(`${i}`).subscribe(
        pokemon => pokemonArray.push(pokemon)
      );
    }
    return of(pokemonArray);
  }

  /* GET heroes whose name contains search term */
  searchPokemon(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    console.log(`${this.apiUrl}/?name=${term}`);
    return this.http.get<Pokemon[]>(`${this.apiUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Pokemon[]>('searchPokemon()', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
