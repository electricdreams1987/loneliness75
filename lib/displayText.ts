export function compactText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const firstSentence = text.split(/[。！？]/)[0];
  if (firstSentence && firstSentence.length <= maxLength) {
    return `${firstSentence}。`;
  }

  return `${text.slice(0, Math.max(0, maxLength - 1))}…`;
}

export function compactTitle(title: string): string {
  const normalized = title.replace(/：.+$/, '').replace(/[「」]/g, '');
  return compactText(normalized, 24);
}

export function compactChoiceLabel(label: string): string {
  return compactText(label.replace(/（.+?）/g, ''), 22);
}

