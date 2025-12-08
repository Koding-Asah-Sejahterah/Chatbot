import { writable } from 'svelte/store';
import { tick } from 'svelte';

const API_BASE_URL = '/api/chat';

function createChatStore() {
    const { subscribe, set, update } = writable({
        messages: [],
        inputValue: '',
        sidebarOpen: true,
        messagesContainer: null,
        sessionId: null,
        isLoading: false,
        error: null
    });

    function scrollToBottom() {
        tick().then(() => {
            let container;
            subscribe(state => {
                container = state.messagesContainer;
            })();
            
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        });
    }

    function sendMessage() {
        update(state => {
            if (state.inputValue.trim()) {
                state.messages = [...state.messages, { type: 'user', text: state.inputValue }];
                state.inputValue = '';
                state.isLoading = true;
                state.error = null;
                scrollToBottom();
            }
            return state;
        });

        let currentSessionId;
        subscribe(state => {
            currentSessionId = state.sessionId;
        })();

        let userMessage;
        subscribe(state => {
            userMessage = state.messages[state.messages.length - 1]?.text;
        })();

        if (!userMessage) return;

        (async () => {
            try {
                console.log('Sending message with session:', currentSessionId);
                const response = await fetch(`${API_BASE_URL}?action=sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        session_id: currentSessionId,
                        chat: userMessage
                    })
                });

                console.log('Response status:', response.status);

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();
                console.log('Response data:', data);
                const botReply = data.data?.reply || 'Maaf, terjadi kesalahan dalam memproses pesan Anda.';
                console.log('Bot reply:', botReply);

                // Add 1 second delay before showing response
                setTimeout(() => {
                    update(state => {
                        state.messages = [...state.messages, { type: 'bot', text: botReply }];
                        state.isLoading = false;
                        return state;
                    });
                    scrollToBottom();
                }, 1000);
            } catch (err) {
                update(state => {
                    state.isLoading = false;
                    state.error = err.message;
                    state.messages = [...state.messages, { type: 'bot', text: 'Maaf, terjadi kesalahan dalam menghubungi server. Silakan coba lagi.' }];
                    return state;
                });
                scrollToBottom();
            }
        })();
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function toggleSidebar() {
        update(state => {
            state.sidebarOpen = !state.sidebarOpen;
            return state;
        });
    }

    function sendSuggestion(text) {
        update(state => {
            state.messages = [...state.messages, { type: 'user', text }];
            state.isLoading = true;
            state.error = null;
            scrollToBottom();
            return state;
        });

        let currentSessionId;
        subscribe(state => {
            currentSessionId = state.sessionId;
        })();

        (async () => {
            try {
                const response = await fetch(`${API_BASE_URL}?action=sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        session_id: currentSessionId,
                        chat: text
                    })
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();
                const botReply = data.data?.reply || 'Maaf, terjadi kesalahan dalam memproses pesan Anda.';

                // Add 1 second delay before showing response
                setTimeout(() => {
                    update(state => {
                        state.messages = [...state.messages, { type: 'bot', text: botReply }];
                        state.isLoading = false;
                        return state;
                    });
                    scrollToBottom();
                }, 1000);
            } catch (err) {
                update(state => {
                    state.isLoading = false;
                    state.error = err.message;
                    state.messages = [...state.messages, { type: 'bot', text: 'Maaf, terjadi kesalahan dalam menghubungi server. Silakan coba lagi.' }];
                    return state;
                });
                scrollToBottom();
            }
        })();
    }

    function setMessagesContainer(el) {
        update(state => {
            state.messagesContainer = el;
            return state;
        });
    }

    function setInputValue(value) {
        update(state => {
            state.inputValue = value;
            return state;
        });
    }

    async function initializeSession() {
        try {
            console.log('Initializing chat session...');
            // Use a temporary session ID - the server will handle it
            const tempSessionId = 'session-' + Date.now();
            
            update(state => {
                state.sessionId = tempSessionId;
                state.isLoading = false;
                state.messages = [
                    { type: 'bot', text: 'Halo! Saya Yuki, asisten belajar Anda. Ada yang bisa saya bantu?' }
                ];
                return state;
            });
            scrollToBottom();
            console.log('Session initialized with ID:', tempSessionId);
        } catch (err) {
            console.error('Session initialization error:', err);
            update(state => {
                state.isLoading = false;
                state.error = err.message;
                state.messages = [{ type: 'bot', text: 'Siap membantu Anda! Silakan ketik pertanyaan Anda.' }];
                return state;
            });
        }
    }

    return {
        subscribe,
        sendMessage,
        handleKeyDown,
        toggleSidebar,
        sendSuggestion,
        setMessagesContainer,
        setInputValue,
        initializeSession
    };
}

export const chatStore = createChatStore();
