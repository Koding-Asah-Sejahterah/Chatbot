const API_BASE_URL = 'https://yuki.daffahmad.my.id/api';

export async function POST({ request, url }) {
    const action = url.searchParams.get('action');
    
    console.log('Chat API Proxy - Action:', action);
    
    if (!action) {
        return new Response(JSON.stringify({ error: 'Missing action parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const body = await request.json();
        console.log('Request body:', body);
        
        let endpoint;

        if (action === 'initChat') {
            endpoint = `${API_BASE_URL}/chat/init`;
        } else if (action === 'sendMessage') {
            endpoint = `${API_BASE_URL}/chat/send-message`;
        } else {
            return new Response(JSON.stringify({ error: 'Unknown action' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('Forwarding to:', endpoint);

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log('API Response:', data);

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('API Proxy Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
