import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, IonButtons, IonIcon  } from '@ionic/angular/standalone';
import { Movie } from '../services/movie';
import { addIcons } from 'ionicons';
import { heart, home, heartOutline } from 'ionicons/icons';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [NgFor, NgIf, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel,IonButtons, IonIcon, RouterLink]
})
export class MovieDetailsPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private movieService: Movie) { 
    addIcons({ heart, home, heartOutline });
  }

  movieId: number = 0;
  overview: string = '';
  cast: any[] = [];
  crew: any[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      this.movieId = params['id'];
      await this.loadMovieDetails();
    });
  }

  async loadMovieDetails() {
    const details = await this.movieService.getMovieDetails(this.movieId);
    this.overview = details.overview;
  
    const credits = await this.movieService.getMovieCredits(this.movieId);
    this.cast = credits.cast;
    this.crew = credits.crew;
  }

  goToPersonDetails(personId: number) {
    this.router.navigate(['/details'],
      { queryParams: { id: personId } });
  }

  isFavourite: boolean = false;

async addToFavourites() {
  // We'll implement this in Sprint 6
  // For now just toggle the boolean
  this.isFavourite = true;
}

async removeFromFavourites() {
  // We'll implement this in Sprint 6
  // For now just toggle the boolean
  this.isFavourite = false;
}
}
