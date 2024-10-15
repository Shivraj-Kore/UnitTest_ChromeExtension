// Store the selected options and their values
let inputPreferences = {
    text: { mode: 'random', value: '', range: 0 },
    pass: { mode: 'random', value: '', range: 0 }, // Changed from password to pass
    date: { mode: 'random', value: '', rangeStart: '', rangeEnd: '' },
    time: { mode: 'random', value: '', rangeStart: '', rangeEnd: '' },
    email: { mode: 'random', value: '' }
};

// Constants for colors
const COLORS = {
    optionDefault: '#444444',
    optionSelected: '#242424'
};

// Handle visibility of option fields
function handleVisibility(type, mode) {
    const rangedOptionsId = `${type}RangedOptions`;
    const fixedOptionsId = `${type}FixedOptions`;
    
    const rangedOptions = document.getElementById(rangedOptionsId);
    const fixedOptions = document.getElementById(fixedOptionsId);
    
    if (rangedOptions) {
        rangedOptions.style.display = mode === 'range' ? 'flex' : 'none';
    }
    if (fixedOptions) {
        fixedOptions.style.display = mode === 'fixed' ? 'flex' : 'none';
    }
}

// Update preferences and handle visibility when options are selected
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        const type = this.dataset.type;
        const mode = this.dataset.option;
        
        // Update preferences
        inputPreferences[type] = {
            ...inputPreferences[type],
            mode: mode
        };

        // Update the selected option's appearance
        const optionsContainer = this.closest('.fieldsets');
        if (optionsContainer) {
            // Reset all options in this container
            optionsContainer.querySelectorAll('.option').forEach(opt => {
                opt.style.backgroundColor = COLORS.optionDefault;
            });
            // Highlight selected option
            this.style.backgroundColor = COLORS.optionSelected;
        }

        // Handle visibility of additional fields
        handleVisibility(type, mode);
    });
});

// Text input event listeners
document.getElementById('textFixedInput')?.addEventListener('input', (e) => {
    inputPreferences.text.value = e.target.value;
});

document.getElementById('textRangedNum')?.addEventListener('input', (e) => {
    inputPreferences.text.range = parseInt(e.target.value) || 0;
});

// Password input event listeners
document.getElementById('passFixedInput')?.addEventListener('input', (e) => {
    inputPreferences.pass.value = e.target.value;
});

document.getElementById('passRangedNum')?.addEventListener('input', (e) => {
    inputPreferences.pass.range = parseInt(e.target.value) || 0;
});

// Email input event listeners
document.getElementById('emailFixedInput')?.addEventListener('input', (e) => {
    inputPreferences.email.value = e.target.value;
});

// Date range listeners
document.getElementById('dateStart')?.addEventListener('input', (e) => {
    inputPreferences.date.rangeStart = e.target.value;
});

document.getElementById('dateEnd')?.addEventListener('input', (e) => {
    inputPreferences.date.rangeEnd = e.target.value;
});

document.getElementById('dateFixedInput')?.addEventListener('input', (e) => {
    inputPreferences.date.value = e.target.value;
});

// Time range listeners
document.getElementById('timeStart')?.addEventListener('input', (e) => {
    inputPreferences.time.rangeStart = e.target.value;
});

document.getElementById('timeEnd')?.addEventListener('input', (e) => {
    inputPreferences.time.rangeEnd = e.target.value;
});

document.getElementById('timeFixedInput')?.addEventListener('input', (e) => {
    inputPreferences.time.value = e.target.value;
});

// Initialize visibility states on page load
document.addEventListener('DOMContentLoaded', () => {
    const types = ['text', 'pass', 'date', 'time', 'email'];
    types.forEach(type => {
        // Hide all additional fields initially
        handleVisibility(type, 'random');
        
        // Reset all option backgrounds
        document.querySelectorAll(`#${type}Options .option`).forEach(option => {
            option.style.backgroundColor = COLORS.optionDefault;
        });
        
        // Highlight the random option for each type
        const randomOption = document.querySelector(`#${type}Options .option[data-option="random"]`);
        if (randomOption) {
            randomOption.style.backgroundColor = COLORS.optionSelected;
        }
    });
});

// Export the preferences for use in popup.js
window.getInputPreferences = () => inputPreferences;