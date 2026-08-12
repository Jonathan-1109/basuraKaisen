<script setup lang="ts">
import GradeBadge from './GradeBadge.vue'
import type { Character, CharacterCardProps } from '@/types'

const props = defineProps<CharacterCardProps>()

const emit = defineEmits<{
  select: [character: Character]
  favorite: [character: Character]
}>()
</script>

<template>
  <article class="character-card">
    <header class="character-card__header">
      <span class="character-card__avatar">{{ props.character.emoji }}</span>
      <GradeBadge
        :grade="props.character.grade"
        @select="emit('select', props.character)"
      />
    </header>

    <h3 class="character-card__name">{{ props.character.name }}</h3>
    <p class="character-card__alias">{{ props.character.alias }}</p>

    <dl class="character-card__stats">
      <div class="character-card__stat">
        <dt>Técnica</dt>
        <dd>{{ props.character.technique }}</dd>
      </div>
      <div class="character-card__stat">
        <dt>Afiliación</dt>
        <dd>{{ props.character.affiliation }}</dd>
      </div>
    </dl>

    <p class="character-card__desc">{{ props.character.description }}</p>

    <footer class="character-card__footer">
      <button
        class="character-card__action"
        type="button"
        @click="emit('select', props.character)"
      >
        Convocar
      </button>
      <button
        class="character-card__favorite"
        type="button"
        aria-label="Marcar como favorito"
        title="Marcar como favorito"
        @click="emit('favorite', props.character)"
      >
        ♥
      </button>
    </footer>
  </article>
</template>

<style scoped>
.character-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.35);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.character-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 14px 32px rgb(224 49 49 / 0.18);
}

.character-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.character-card__avatar {
  display: grid;
  place-items: center;
  width: 2.9rem;
  height: 2.9rem;
  border-radius: 12px;
  font-size: 1.6rem;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}

.character-card__name {
  margin: 0;
  font-size: 1.05rem;
  color: var(--text);
}

.character-card__alias {
  margin: -0.5rem 0 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.character-card__stats {
  display: grid;
  gap: 0.35rem;
  margin: 0;
}

.character-card__stat {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.78rem;
  padding: 0.35rem 0.5rem;
  background: color-mix(in srgb, var(--ink) 60%, transparent);
  border-radius: 8px;
}

.character-card__stat dt {
  color: var(--muted);
}

.character-card__stat dd {
  margin: 0;
  color: var(--text);
  text-align: right;
}

.character-card__desc {
  flex: 1;
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--muted-soft);
}

.character-card__footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.character-card__action {
  flex: 1;
  padding: 0.55rem 0.6rem;
  border: 1px solid var(--accent);
  border-radius: 9px;
  background: var(--accent);
  color: #fff;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.15s ease;
}

.character-card__action:hover {
  background: color-mix(in srgb, var(--accent) 85%, black);
  transform: translateY(-1px);
}

.character-card__favorite {
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: transparent;
  color: var(--accent);
  font-size: 1.05rem;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.15s ease;
}

.character-card__favorite:hover {
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  transform: scale(1.08);
}
</style>