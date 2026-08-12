<script setup lang="ts">
import type { Grade, GradeBadgeProps } from '@/types'

const props = defineProps<GradeBadgeProps>()

const emit = defineEmits<{
  select: [grade: Grade]
}>()

const palette: Record<Grade, string> = {
  Especial: 'var(--grade-special)',
  '1': 'var(--grade-one)',
  '2': 'var(--grade-two)',
  '3': 'var(--grade-three)',
  '4': 'var(--grade-four)',
}

const badgeColor = (grade: Grade) => palette[grade] ?? 'var(--grade-four)'
</script>

<template>
  <button
    class="grade-badge"
    :style="{ '--badge-color': badgeColor(props.grade) }"
    type="button"
    :title="`Grado ${props.grade}`"
    @click="emit('select', props.grade)"
  >
    <span class="grade-badge__label">Grado</span>
    <span class="grade-badge__value">{{ props.grade }}</span>
  </button>
</template>

<style scoped>
.grade-badge {
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--badge-color);
  border-radius: 999px;
  background: color-mix(in srgb, var(--badge-color) 14%, transparent);
  color: var(--badge-color);
  font-family: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.grade-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--badge-color) 25%, transparent);
}

.grade-badge__value {
  font-size: 0.95rem;
}
</style>