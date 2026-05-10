import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonButton,  IonIcon } from '@ionic/angular/standalone';
import { Movie } from '../services/movie';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon]
})

export class DetailsPage implements OnInit {

  personId: number = 0;
  name: string = '';
  profilePath: string = '';
  biography: string = '';
  birthday: string = '';
  deathday: string = '';
  placeOfBirth: string = '';
  alsoKnownAs: any[] = [];
  movies: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private movieService: Movie) { 
    addIcons({ home, heart });
  }

  ngOnInit() {
    
    this.route.queryParams.subscribe(async params => {
      this.personId = params['id'];
      await this.loadPersonDetails();
    });
  }

  async loadPersonDetails() {
    const details = await this.movieService.getPersonDetails(this.personId);
    this.name = details.name;
    this.profilePath = details.profile_path;
    this.biography = details.biography;
    this.birthday = details.birthday;
    this.deathday = details.deathday;
    this.placeOfBirth = details.place_of_birth;
    this.alsoKnownAs = details.also_known_as;

    const credits = await this.movieService.getPersonCredits(this.personId);
    this.movies = credits.cast;
  }

  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie-details'],
      { queryParams: { id: movieId } });
  }
}
