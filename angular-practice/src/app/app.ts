import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextTransform } from './services/text-transform';

type TransformMode = 'uppercase' | 'titlecase' | 'slug' | 'reverse';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  private transformService = inject(TextTransform);

  rawInput = signal('');
  mode = signal<TransformMode>('titlecase');

  transformedText = computed(() => {
    const text = this.rawInput();
    switch (this.mode()) {
      case 'uppercase':
        return text.toUpperCase();
      case 'titlecase':
        return text.replace(/\w\S*/g, (word) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
      case 'slug':
        return text
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');
      case 'reverse':
        return [...text].reverse().join('');
    }
  });

  charCount = computed(() => this.transformedText().length);
  wordCount = computed(() => {
    const trimmed = this.transformedText().trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  });

  serverResult = signal<string | null>(null);
  isSending = signal(false);

  clearInput(): void {
    this.rawInput.set('');
  }

  sendToApi(): void {
    this.isSending.set(true);
    this.serverResult.set(null);

    this.transformService.transformText(this.rawInput(), this.mode()).subscribe({
      next: (res) => {
        this.serverResult.set(`${res.transformedText} (${res.length} chars from .NET)`);
        this.isSending.set(false);
      },
      error: (err) => {
        this.serverResult.set(`API error: ${err.message}`);
        this.isSending.set(false);
      },
    });
  }
}