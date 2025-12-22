// Evidence cards data (from PRD lines 200-202)
export const evidenceCards = [
    {
        id: 'bloodPressure',
        order: 1,
        titleKey: 'evidence.cards.bloodPressure.title',
        valueKey: 'evidence.cards.bloodPressure.value',
        unitKey: 'evidence.cards.bloodPressure.unit',
        descriptionKey: 'evidence.cards.bloodPressure.description',
        noteKey: 'evidence.cards.bloodPressure.note',
    },
    {
        id: 'temperature',
        order: 2,
        titleKey: 'evidence.cards.temperature.title',
        valueKey: 'evidence.cards.temperature.value',
        unitKey: 'evidence.cards.temperature.unit',
        descriptionKey: 'evidence.cards.temperature.description',
        noteKey: 'evidence.cards.temperature.note',
    },
    {
        id: 'concentration',
        order: 3,
        titleKey: 'evidence.cards.concentration.title',
        valueKey: 'evidence.cards.concentration.value',
        unitKey: 'evidence.cards.concentration.unit',
        descriptionKey: 'evidence.cards.concentration.description',
        noteKey: 'evidence.cards.concentration.note',
    },
] as const;

export type EvidenceCard = typeof evidenceCards[number];
