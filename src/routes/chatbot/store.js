import { writable } from 'svelte/store';
import { tick } from 'svelte';

function createChatStore() {
    const { subscribe, set, update } = writable({
        messages: [
            { type: 'user', text: 'Halo, aku ingin bertanya tentang sesuatu' },
            { type: 'bot', text: 'Tentu, saya siap membantu!' }
        ],
        inputValue: '',
        sidebarOpen: true,
        messagesContainer: null
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
                scrollToBottom();
                
                setTimeout(() => {
                    update(s => {
                        s.messages = [...s.messages, { type: 'bot', text: 'Terima kasih atas pertanyaannya!' }];
                        return s;
                    });
                    scrollToBottom();
                }, 500);
            }
            return state;
        });
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
            scrollToBottom();
            
            setTimeout(() => {
                update(s => {
                    s.messages = [...s.messages, { type: 'bot', text: 'Terima kasih atas pertanyaannya!' }];
                    return s;
                });
                scrollToBottom();
            }, 500);
            return state;
        });
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

    return {
        subscribe,
        sendMessage,
        handleKeyDown,
        toggleSidebar,
        sendSuggestion,
        setMessagesContainer,
        setInputValue
    };
}

export const chatStore = createChatStore();
