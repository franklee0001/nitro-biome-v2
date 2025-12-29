// Chat message types

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface ChatState {
    messages: ChatMessage[];
    isTyping: boolean;
    isOpen: boolean;
}

// Adapter interface for future Vertex AI integration
export interface ChatAdapter {
    sendMessage: (message: string) => Promise<string>;
}

// Quick reply chip type
export interface QuickReply {
    id: string;
    label: string;
    message: string;
}
