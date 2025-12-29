import type { ChatAdapter } from './types';

// ============================================
// MOCK CHAT RESPONSES
// Simple intent-based response matching
// ============================================

interface IntentPattern {
    keywords: string[];
    response: string;
    followUp?: string;
}

const intentPatterns: IntentPattern[] = [
    // B2B / Wholesale inquiries
    {
        keywords: ['wholesale', 'distributor', 'distribution', 'moq', 'bulk', 'b2b', 'business', 'partner', 'partnership', 'resell', 'reseller'],
        response: "Thank you for your interest in becoming a NitroBiome partner! We'd love to learn more about your business.",
        followUp: "Could you tell us which country you're based in and your estimated monthly volume? Our team will reach out with pricing and partnership details.",
    },
    // Dosage / How to take
    {
        keywords: ['dosage', 'dose', 'how to take', 'how much', 'timing', 'when to take', 'how often', 'frequency'],
        response: "For optimal results, take 1 sachet mixed with 300ml+ of water, 1-3 times daily. Best taken in the morning or before physical activity.",
    },
    // Storage
    {
        keywords: ['storage', 'store', 'keep', 'refrigerate', 'temperature', 'expire', 'expiry', 'shelf life'],
        response: "Store NitroBiome in a cool, dry place away from direct sunlight. No refrigeration needed. Shelf life is 24 months from manufacturing date.",
    },
    // Shipping
    {
        keywords: ['shipping', 'delivery', 'ship', 'deliver', 'track', 'tracking', 'order status'],
        response: "We offer worldwide shipping! Orders are typically processed within 1-2 business days. Delivery times vary by region: Korea (1-3 days), Asia (5-7 days), US/EU (7-14 days).",
    },
    // Ingredients
    {
        keywords: ['ingredient', 'ingredients', 'what\'s in', 'contain', 'contents', 'made of', 'composition'],
        response: "NitroBiome contains fermented vegetable and grain extracts: Fermented Cabbage, Beet, Spinach, Brown Rice, Barley, and natural flavoring. All ingredients are plant-based and naturally fermented.",
    },
    // Price / Cost
    {
        keywords: ['price', 'cost', 'how much', 'pricing', 'buy', 'purchase', 'order'],
        response: "Each box contains 30 sachets (1 month supply). For current pricing and special offers, please visit our shop or contact us directly. We offer volume discounts for subscriptions!",
    },
    // Benefits / Effects
    {
        keywords: ['benefit', 'effect', 'work', 'does it work', 'results', 'what does', 'help with'],
        response: "NitroBiome supports nitric oxide production through fermented metabolites. This may help with cardiovascular health, blood flow, and overall vitality. Results typically appear within 15 minutes of intake.",
    },
    // Safety / Side effects
    {
        keywords: ['safe', 'safety', 'side effect', 'side effects', 'pregnant', 'medication', 'allergy', 'allergic'],
        response: "NitroBiome is made from naturally fermented plant ingredients. However, please consult your physician if you're pregnant, nursing, or taking medication. Review ingredients if you have allergies. Excessive intake may cause temporary headache or dizziness.",
    },
    // Contact
    {
        keywords: ['contact', 'email', 'phone', 'reach', 'talk to', 'speak', 'human', 'support', 'help'],
        response: "You can reach our team through the contact form on this page, or email us directly at support@nitrobiome.com. We typically respond within 24 hours!",
    },
    // Greeting
    {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
        response: "Hello! Welcome to NitroBiome. I'm here to help you with any questions about our fermented nitric oxide supplement. What would you like to know?",
    },
    // Thanks
    {
        keywords: ['thank', 'thanks', 'appreciate'],
        response: "You're welcome! If you have any other questions, feel free to ask. We're here to help!",
    },
];

// Default response when no intent matches
const defaultResponse = "I'd be happy to help! You can ask me about our product, dosage, ingredients, shipping, or business inquiries. Or feel free to use the contact form for detailed questions.";

// Welcome message for new conversations
export const welcomeMessage = "Hi! I'm the NitroBiome Assistant. How can I help you today?";

// Quick reply suggestions
export const quickReplies = [
    { id: 'dosage', label: 'How to take?', message: 'How should I take NitroBiome?' },
    { id: 'shipping', label: 'Shipping info', message: 'What are the shipping options?' },
    { id: 'wholesale', label: 'Wholesale', message: 'I\'m interested in wholesale partnership' },
];

/**
 * Mock chat reply function
 * Matches user message against intent patterns
 */
function mockChatReply(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    for (const intent of intentPatterns) {
        const matched = intent.keywords.some(keyword =>
            lowerMessage.includes(keyword.toLowerCase())
        );

        if (matched) {
            return intent.followUp
                ? `${intent.response}\n\n${intent.followUp}`
                : intent.response;
        }
    }

    return defaultResponse;
}

/**
 * Simulates network delay for realistic typing feel
 */
function simulateDelay(minMs: number = 500, maxMs: number = 1500): Promise<void> {
    const delay = Math.random() * (maxMs - minMs) + minMs;
    return new Promise(resolve => setTimeout(resolve, delay));
}

// ============================================
// MOCK ADAPTER IMPLEMENTATION
// ============================================

/**
 * Creates a mock chat adapter for local development
 *
 * To integrate with Vertex AI later:
 * 1. Create a new adapter file (e.g., vertexAdapter.ts)
 * 2. Implement the ChatAdapter interface
 * 3. Call your /api/chat endpoint or Cloud Run service
 * 4. Replace createMockAdapter() with createVertexAdapter() in ChatWidget
 */
export function createMockAdapter(): ChatAdapter {
    return {
        async sendMessage(message: string): Promise<string> {
            // Simulate network delay
            await simulateDelay(800, 1800);

            // Get mock response
            return mockChatReply(message);
        },
    };
}

// ============================================
// FUTURE: VERTEX AI ADAPTER (NOT IMPLEMENTED)
// ============================================
//
// Example structure for when you're ready to integrate:
//
// export function createVertexAdapter(apiEndpoint: string): ChatAdapter {
//     return {
//         async sendMessage(message: string): Promise<string> {
//             const response = await fetch(apiEndpoint, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ message }),
//             });
//
//             if (!response.ok) {
//                 throw new Error('Chat API error');
//             }
//
//             const data = await response.json();
//             return data.reply;
//         },
//     };
// }
