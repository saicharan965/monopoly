import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { User, AuthService } from '@auth0/auth0-angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user?: User
  unsubscribe$: Subject<void> = new Subject()
  constructor(private authService: AuthService) { }
  public ngOnInit(): void {
    this.authService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user =>
      this.user = user ? user : undefined)
  }
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
