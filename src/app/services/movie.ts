import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class Movie {

  private readonly apiKey = '6bb6d5209b524c1da732c79c5ad5d126';
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  async getTrendingMovies(){
    const response: HttpResponse = await CapacitorHttp.get({
      url: `${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`
    });
    return response.data;
  }
  async searchMovies(query: string){
    const response: HttpResponse = await CapacitorHttp.get({
      url: `${this.baseUrl}/search/movie?query=${query}&api_key=${this.apiKey}`
    })
    return response.data;
  } 

  async getMovieDetails(id: number) {
    const response: HttpResponse = await CapacitorHttp.get({
      url: `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
    });
    return response.data;
  }

  async getMovieCredits(id: number){
    const response: HttpResponse = await CapacitorHttp.get({
      url: `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    })
    return response.data;
  }
  async getPersonDetails(id: number){
    const response: HttpResponse = await CapacitorHttp.get({
      url: `${this.baseUrl}/person/${id}?api_key=${this.apiKey}`
    })
    return response.data;
  }
  
  async getPersonCredits(id: number){
    const response: HttpResponse = await CapacitorHttp.get({
      url: `${this.baseUrl}/person/${id}/movie_credits?api_key=${this.apiKey}`
    })
    return response.data;
  }
}
