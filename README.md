This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Zadanie rekrutacyjne - opis
Całość zajęła około 2h 20min, musiałem dokładniej sprawdzić jak działa API i dopisać testy, bo zauważyłem problemy (opisane na końcu)

## Decyzje techniczne

### Mantine Table zamiast TanStack Table
Implementacja zajęłaby dodatkowy czas, natomiast produkcyjnie rekomendowałbym TanStack Table, ze względu na funkcjonalności np. virtualizację dużej ilości elementów, wbudowane sortowanie itp.

### useSearchParams zamiast nuqs
Podobna sytuacja. Natywne useSearchParams wystarczy dla prostego zadania, w bardziej skomplikowanych dobrze byłoby wprowadzić type-safe URL

### Struktura projektu
```
src
  - api // fetch + types
  - app // routing
  - components
    - primitives // reużywalne, proste komponenty np. <Button>
    - ui // reużywalne, złożone komponenty np. <Table>
  - domain // wszystko co dotyczy danego widoku np. products z lokalną konfiguracją komponentów z ui, typami, hookami itp.
  - lib // miejsce na współdzielone pliki np. config.ts
tests // mirror path dla testów
```

W raz z rozwojem projektu można wydzielić w lib foldery per funkcjonalność np. lib/auth, lib/utils/browser itp.

Gdybym miał w pełni poprawnie wykonać zadanie, wykraczając poza czas to wydzieliłbym tabelę do ui, aby w domain/products była tylko konfiguracja reużywalnej tabeli. Inne podstrony mogłyby wywoływać tabelę z własnym configiem DRY

---

## TODO (Out of Scope)

### Debounce w search
Obecnie search wykonuje się po każdej zmianie, dlatego trzeba poprawić performance (plik do lib/utils/debounce.ts)

### Performance
Można zastosować prefetchQuery, dla obecnego zadania overkill

### Virtualizacja dla dużej ilości danych
TanStack wspiera takie rozwiązanie, ale tak jak wyżej pisałem, wymaga to szerszej implementacji

### Loading placeholder && spiner ładowania
Dobry UX dla użytkownika, który czeka na załadowanie danych

### Error Boundary i retry logic
TanStack Query wspiera retry logic, a error bundary zabezpiecza crashe

### i18n
Tłumaczenia

### WCAG, A11y
Dla produkcji potrzebne, dla zadania testowego overkill

### Integration Tests
Przydałoby się sprawdzić zachowanie API w realnym zastosowaniu, ale wykracza to czasowo poza zakres zadania

### React compilet
React 19 wspiera react compiler, który zastępuje ręcznie dodane memo. Jest to nowość, dlatego pominąłem.

---

### API Bugs (Platzi Fake Store)
Przetestowano API (weryfikacja czy dane są rzeczywiście przefiltrowane):

Sortowanie: API nie obsługuje. Client-side jako jedyne rozwiązanie.

Paginacja: `limit` wymaga `offset` (bug API - bez offset zwraca wszystkie 815 produktów). Implementacja zawsze oblicza offset.

Filtr ceny: `price_min` lub `price_max` same nie działają - wymagają obu parametrów. Implementacja pozwala ustawić oba osobno (UX), ale API ignoruje pojedyncze.
