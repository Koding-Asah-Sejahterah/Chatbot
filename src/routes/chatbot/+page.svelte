<script>
    import { chatStore } from './store.js';

    let messages;
    let inputValue;
    let sidebarOpen;
    let messagesContainer;

    const unsubscribe = chatStore.subscribe(state => {
        messages = state.messages;
        inputValue = state.inputValue;
        sidebarOpen = state.sidebarOpen;
        messagesContainer = state.messagesContainer;
    });

    function handleInputChange(e) {
        chatStore.setInputValue(e.target.value);
    }

    $: if (messagesContainer) {
        chatStore.setMessagesContainer(messagesContainer);
    }
</script>

<div class="flex h-screen bg-[#020202] text-white">
    <!-- Main Container -->
    <div class="flex-1 flex flex-col">
        <!-- Header/Navbar -->
        <header class="bg-[#020202] px-8 py-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold bg-linear-to-r from-[#2350F7] to-[#7259FF] bg-clip-text text-transparent">Selamat datang kembali, Bayu</h1>
            </div>
            <button
                type="button"
                on:click={chatStore.toggleSidebar}
                class="p-2 hover:bg-gray-800 rounded-lg transition"
                title="Toggle menu"
                aria-label="Toggle menu"
            >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </header>

        <!-- Chat Container -->
        <div class="flex flex-1 gap-6 px-12 py-6 overflow-hidden">
            <!-- Messages Area with Border -->
            <div class="flex-1 flex flex-col bg-[#020202] border border-gray-800 rounded-3xl p-6 overflow-hidden">
                <!-- Messages Scroll Area -->
                <div bind:this={messagesContainer} class="flex-1 overflow-y-auto space-y-4 mb-4 hide-scrollbar">
                    {#each messages as message, i (i)}
                        {#if message.type === 'user'}
                            <div class="flex justify-end">
                                <div class="bg-linear-to-r from-[#2350F7] to-[#7259FF] rounded-3xl px-6 py-3 max-w-sm shadow-lg">
                                    <p class="text-white text-sm">{message.text}</p>
                                </div>
                            </div>
                        {:else}
                            <div class="flex justify-start">
                                <div class="bg-white rounded-3xl px-6 py-3 max-w-sm shadow-lg">
                                    <p class="text-black text-sm">{message.text}</p>
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>

                <!-- Input Area inside Card -->
                <div class="flex gap-3 pt-4 border-t border-gray-700">
                    <input
                        type="text"
                        value={inputValue}
                        on:input={handleInputChange}
                        on:keydown={chatStore.handleKeyDown}
                        placeholder="Tanyakan apa saja tentang progres belajar kamu..."
                        class="flex-1 bg-gray-800 text-white rounded-full px-5 py-3 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        aria-label="Chat input"
                    />
                    <button
                        type="button"
                        on:click={chatStore.sendMessage}
                        class="bg-linear-to-r from-[#2350F7] to-[#7259FF] text-white rounded-lg p-3 flex items-center justify-center transition shadow-lg shrink-0 hover:shadow-2xl hover:scale-110 active:scale-95"
                        aria-label="Send message"
                    >
                        <svg class="w-5 h-5 -rotate-45" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.9702544,11.6889879 22.9702544,11.6889879 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99021575 L3.03521743,10.4310088 C3.03521743,10.5881061 3.19218622,10.7452035 3.50612381,10.7452035 L16.6915026,11.5306905 C16.6915026,11.5306905 17.1624089,11.5306905 17.1624089,11.0593983 L17.1624089,12.0019827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Sidebar - Suggestions -->
            <div class="w-72 bg-[#020202] border border-gray-800 rounded-2xl p-6 flex flex-col backdrop-blur transition-all duration-300 overflow-hidden"
                 class:flex={sidebarOpen}
                 class:hidden={!sidebarOpen}
            >
                <h2 class="text-lg font-semibold bg-linear-to-r from-[#2350F7] to-[#7259FF] bg-clip-text text-transparent mb-6 flex items-center gap-3">
                    <svg class="w-5 h-5" viewBox="0 0 32 32" fill="none" stroke="url(#sparkleGradient)" stroke-width="2">
                        <!-- Main sparkle/star outline -->
                        <path d="M16 2L20 12L30 16L20 20L16 30L12 20L2 16L12 12Z"/>
                        <!-- Small sparkles -->
                        <circle cx="24" cy="8" r="3"/>
                        <circle cx="8" cy="24" r="2.5"/>
                        <defs>
                            <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#2350F7;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#7259FF;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                    </svg>
                    Coba Tanyakan ke Yuki!
                </h2>

                <div class="space-y-3 flex-1 overflow-y-auto hide-scrollbar">
                    <button type="button" on:click={() => chatStore.sendSuggestion('Apa saja materi yang sudah dipelajari?')} class="w-full bg-gray-800/60 hover:bg-gray-700 text-gray-300 rounded-lg px-4 py-3 text-left text-sm transition">
                        Apa saja materi yang sudah dipelajari?
                    </button>
                    <button type="button" on:click={() => chatStore.sendSuggestion('Topik mana yang paling sulit?')} class="w-full bg-gray-800/60 hover:bg-gray-700 text-gray-300 rounded-lg px-4 py-3 text-left text-sm transition">
                        Topik mana yang paling sulit?
                    </button>
                    <button type="button" on:click={() => chatStore.sendSuggestion('Berapa lama waktu belajar ideal?')} class="w-full bg-gray-800/60 hover:bg-gray-700 text-gray-300 rounded-lg px-4 py-3 text-left text-sm transition">
                        Berapa lama waktu belajar ideal?
                    </button>
                    <button type="button" on:click={() => chatStore.sendSuggestion('Butuh bantuan dengan masalah ini')} class="w-full bg-gray-800/60 hover:bg-gray-700 text-gray-300 rounded-lg px-4 py-3 text-left text-sm transition">
                        Butuh bantuan dengan masalah ini
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }

    :global(.hide-scrollbar) {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    :global(.hide-scrollbar::-webkit-scrollbar) {
        display: none;
    }
</style>