import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';

import { NgFor } from '@angular/common';
import { Movie } from '../services/movie';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {heart} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule, NgFor,IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonButtons, IonIcon, RouterLink],
})
export class HomePage {
  constructor(private movieService:Movie, private router: Router) {
    addIcons({heart});
  }

  movies: any[] = [];
  searchQuery: string = '';
  readonly studentNumber: string = 'G00474397';
  
  async ngOnInit() {
    await this.loadTrendingMovies();
  }

  async loadTrendingMovies() {
    const data = await this.movieService.getTrendingMovies();
    this.movies = data.results;
  }

  async search() {
    console.log('Search query:', this.searchQuery);
    if (this.searchQuery.trim() === '') {
      await this.loadTrendingMovies();
    } else {
      const data = await this.movieService.searchMovies(this.searchQuery);
      this.movies = data.results;
    }
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie-details'],
      { queryParams: { id: movieId } });
  }
}

