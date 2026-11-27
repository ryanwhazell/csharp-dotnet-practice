import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextTransform } from './services/text-transform';

type TransformMode = 'uppercase' | 'titlecase' | 'slug' | 'reverse';

@Component({
  selector: 'app-text-modifier',
  imports: [FormsModule],
  templateUrl: './text-modifier.html',
  styleUrl: './text-modifier.less',
})

export class TextModifier {
  private readonly transformService = inject(TextTransform);

  readonly rawInput = signal('');
  readonly mode = signal<TransformMode>('titlecase');
  readonly transformedText = computed(() => {
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
  readonly charCount = computed(() => this.transformedText().length);
  readonly wordCount = computed(() => {
    const trimmed = this.transformedText().trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  });

  readonly serverResult = signal<string | null>(null);
  readonly isSending = signal(false);

  clearInput(): void {
    this.rawInput.set('');
  }

  sendToApi(): void {
    this.isSending.set(true);
    this.serverResult.set(null);

    this.transformService.transformText(this.rawInput(), this.mode()).subscribe({
      next: (response) => {
        this.serverResult.set(
          `${response.transformedText} (${response.length} chars from .NET)`
        );
        this.isSending.set(false);
      },
      error: (error: Error) => {
        this.serverResult.set(`API error: ${error.message}`);
        this.isSending.set(false);
      },
    });
  }
}
