// 5 scenes for Mechanism section (from PRD lines 167-181)
export const mechanismScenes = [
    {
        id: 'intake',
        order: 1,
        titleKey: 'mechanism.scenes.intake.title',
        descriptionKey: 'mechanism.scenes.intake.description',
        svgPath: '/mechanism/scene-1-intake.svg',
    },
    {
        id: 'conversion',
        order: 2,
        titleKey: 'mechanism.scenes.conversion.title',
        descriptionKey: 'mechanism.scenes.conversion.description',
        svgPath: '/mechanism/scene-2-conversion.svg',
    },
    {
        id: 'vessel',
        order: 3,
        titleKey: 'mechanism.scenes.vessel.title',
        descriptionKey: 'mechanism.scenes.vessel.description',
        svgPath: '/mechanism/scene-3-vessel.svg',
    },
    {
        id: 'flow',
        order: 4,
        titleKey: 'mechanism.scenes.flow.title',
        descriptionKey: 'mechanism.scenes.flow.description',
        svgPath: '/mechanism/scene-4-warmth.svg',
    },
    {
        id: 'sustain',
        order: 5,
        titleKey: 'mechanism.scenes.sustain.title',
        descriptionKey: 'mechanism.scenes.sustain.description',
        svgPath: '/mechanism/scene-5-sustain.svg',
    },
] as const;

export type MechanismScene = typeof mechanismScenes[number];
