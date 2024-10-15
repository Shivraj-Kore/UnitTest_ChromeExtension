// Function to fill inputs with values based on preferences
function fillInputs(preferences) {
    function generateRandomText(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({length}, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }

    function generateRandomDate(start, end) {
        start = start ? new Date(start) : new Date(2020, 0, 1);
        end = end ? new Date(end) : new Date(2025, 11, 31);
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
            .toISOString().split('T')[0];
    }

    function generateRandomTime(start, end) {
        const convertTimeToMinutes = (time) => {
            if (!time) return null;
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const startMinutes = convertTimeToMinutes(start) || 0;
        const endMinutes = convertTimeToMinutes(end) || 24 * 60;

        const randomMinutes = Math.floor(Math.random() * (endMinutes - startMinutes)) + startMinutes;

        const hours = Math.floor(randomMinutes / 60);
        const minutes = randomMinutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    function generateValue(input, preferences) {
        // Map input types to preference keys
        const typeMap = {
            'text': 'text',
            'password': 'pass', // Changed to match data-type in HTML
            'email': 'email',
            'date': 'date',
            'time': 'time'
        };

        const prefKey = typeMap[input.type] || input.type;
        const pref = preferences[prefKey] || { mode: 'random' };

        switch(input.type) {
            case 'text':
                if (pref.mode === 'fixed') return pref.value;
                if (pref.mode === 'range') return generateRandomText(pref.range);
                return generateRandomText(10);

            case 'password':
                if (pref.mode === 'fixed') return pref.value;
                if (pref.mode === 'range') return generateRandomText(pref.range);
                return generateRandomText(12);

            case 'email':
                if (pref.mode === 'fixed') return pref.value;
                return `test${generateRandomText(5)}@example.com`;

            case 'date':
                if (pref.mode === 'fixed') return pref.value;
                if (pref.mode === 'range') {
                    return generateRandomDate(pref.rangeStart, pref.rangeEnd);
                }
                return generateRandomDate();

            case 'time':
                if (pref.mode === 'fixed') return pref.value;
                if (pref.mode === 'range') {
                    return generateRandomTime(pref.rangeStart, pref.rangeEnd);
                }
                return generateRandomTime();

            default:
                return 'random';
        }
    }

    // Get all input elements
    const inputs = document.querySelectorAll('input');

    // Fill each input
    inputs.forEach((input) => {
        const value = generateValue(input, preferences);
        input.value = value;

        // Trigger both input and change events
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    return true;
}

// Button click handler
document.getElementById('fillInputsBtn').addEventListener('click', async () => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        const preferences = window.getInputPreferences();
        
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: fillInputs,
            args: [preferences]
        });

        const statusMessage = document.getElementById('statusMessage');
        statusMessage.classList.remove('hidden');
        statusMessage.textContent = 'Input fields filled successfully!';

        setTimeout(() => {
            statusMessage.classList.add('hidden');
        }, 3000);

    } catch (error) {
        console.error('Error:', error);
        const statusMessage = document.getElementById('statusMessage');
        statusMessage.classList.remove('hidden');
        statusMessage.textContent = 'Error: ' + error.message;
        statusMessage.style.color = 'red';
    }
});