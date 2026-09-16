import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  hidePassword = true;

  @ViewChild('notesLayer') notesLayerRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }
  }

  ngAfterViewInit(): void {
    const notes = ['♩', '♪', '♫', '♬', '𝄞'];
    const layer = this.notesLayerRef?.nativeElement;
    if (!layer) return;
    const positions = [
      { x: 6,  y: 14, size: 80, delay: 0, color: 'var(--terra)',      op: 0.18 },
      { x: 88, y: 72, size: 64, delay: 4, color: 'var(--ochre-deep)', op: 0.22 },
      { x: 92, y: 8,  size: 48, delay: 2, color: 'var(--terra-deep)', op: 0.18 },
      { x: 8,  y: 80, size: 96, delay: 6, color: 'var(--ochre-deep)', op: 0.18 },
      { x: 70, y: 4,  size: 36, delay: 8, color: 'var(--terra)',      op: 0.20 },
      { x: 4,  y: 50, size: 56, delay: 5, color: 'var(--ochre-deep)', op: 0.22 },
    ];
    positions.forEach((p, i) => {
      const el = document.createElement('div');
      el.className = 'note-float';
      el.textContent = notes[i % notes.length];
      el.style.left = p.x + '%';
      el.style.top = p.y + '%';
      el.style.fontSize = p.size + 'px';
      el.style.color = p.color;
      el.style.opacity = String(p.op);
      el.style.animationDelay = (-p.delay) + 's';
      layer.appendChild(el);
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }
}
