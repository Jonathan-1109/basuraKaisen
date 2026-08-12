<script setup lang="ts">
import { ref } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import GradeBadge from '@/components/GradeBadge.vue'
import { characters } from '@/data/characters'
import type { Character, Grade } from '@/types'

const selected = ref<Character | null>(null)
const favorites = ref<Set<number>>(new Set())

const reports = ref<string[]>([])
const lastReport = ref('')

const selectCharacter = (character: Character) => {
  selected.value = character
  lastReport.value = `El padre recibió "select" → ${character.name} (${character.grade})`
  reports.value.unshift(lastReport.value)
}

const favoriteCharacter = (character: Character) => {
  if (favorites.value.has(character.id)) {
    favorites.value.delete(character.id)
  } else {
    favorites.value.add(character.id)
  }
  lastReport.value = `El padre recibió "favorite" → ${character.name} ${favorites.value.has(character.id) ? '♥' : '♡'}`
  reports.value.unshift(lastReport.value)
}

const filterByGrade = (grade: Grade) => {
  lastReport.value = `El padre recibió "select" del badge → filtrando Grado ${grade}`
  reports.value.unshift(lastReport.value)
}
</script>

<template>
  <main class="page">
    <header class="page__hero">
      <span class="page__tag">Jujutsu Kaisen</span>
      <h1 class="page__title">Registro de Hechiceros</h1>
      <p class="page__subtitle">
        Elige a tu hechicero favorito para convocarlo a tu equipo de maldición.
      </p>
      <div class="page__filters">
        <span class="page__filters-label">Filtrar by grado:</span>
        <GradeBadge
          v-for="grade in (['Especial', '1', '2', '3', '4'] as Grade[])"
          :key="grade"
          :grade="grade"
          @select="filterByGrade"
        />
      </div>
    </header>

    <section class="roster" aria-label="Roster de hechiceros">
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
        @select="selectCharacter"
        @favorite="favoriteCharacter"
      />

      <aside class="roster__details">
        <h2 class="roster__details-title">Panel del padre</h2>

        <dl class="roster__details-grid">
          <div>
            <dt>Seleccionado</dt>
            <dd v-if="selected">{{ selected.name }} · {{ selected.grade }}</dd>
            <dd v-else>Ninguno</dd>
          </div>
          <div>
            <dt>Favoritos</dt>
            <dd>{{ favorites.size }}</dd>
          </div>
        </dl>

        <div v-if="lastReport" class="roster__report">
          <span class="roster__report-dot"></span>
          {{ lastReport }}
        </div>

        <ol class="roster__log">
          <li v-for="(report, index) in reports" :key="index">{{ report }}</li>
        </ol>
      </aside>
    </section>
  </main>
</template>

<style scoped>
:global(:root) {
  --ink: #0b1020;
  --panel: #131a2e;
  --line: #26304a;
  --accent: #e03131;
  --accent-2: #ff8f00;
  --text: #e8ecf8;
  --muted: #9aa4c0;
  --muted-soft: #6b7698;
  --grade-special: #f2b13c;
  --grade-one: #e03131;
  --grade-two: #4c7dff;
  --grade-three: #2fbf71;
  --grade-four: #8a94ad;
  color-scheme: dark;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: var(--text);
  background: radial-gradient(120% 120% at 20% 0%, #1a2440 0%, var(--ink) 55%);
}

.page {
  max-width: 980px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
}

.page__hero {
  margin-bottom: 2rem;
}

.page__tag {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  border: 1px solid var(--accent);
  border-radius: 999px;
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.page__title {
  margin: 0.75rem 0 0.25rem;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
}

.page__subtitle {
  margin: 0 0 1.25rem;
  color: var(--muted);
}

.page__filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.page__filters-label {
  color: var(--muted);
  font-size: 0.82rem;
  margin-right: 0.25rem;
}

.roster {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

.roster__details {
  grid-column: 1 / -1;
  padding: 1.25rem;
  background: var(--panel);
  border: 1px dashed var(--line);
  border-radius: 14px;
}

.roster__details-title {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}

.roster__details-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 0 0 1rem;
  font-size: 0.85rem;
}

.roster__details-grid dt {
  color: var(--muted);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.roster__details-grid dd {
  margin: 0.15rem 0 0;
}

.roster__report {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--accent);
  border-radius: 9px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  font-size: 0.85rem;
}

.roster__report-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--accent);
}

.roster__log {
  margin: 0.75rem 0 0;
  padding-left: 1.25rem;
  color: var(--muted-soft);
  font-size: 0.78rem;
  max-height: 180px;
  overflow: auto;
}

@media (min-width: 760px) {
  .roster__details {
    grid-column: span 2;
  }
}
</style>