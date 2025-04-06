document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.querySelector('.event-form');
    if (!eventForm) return;

    const rules = {
        title: {
            min: 3,
            max: 100,
            message: {
                required: '📝 Event title is required',
                length: '📏 Title must be between 3 and 100 characters'
            }
        },
        description: {
            min: 10,
            max: 1000,
            message: {
                required: '📝 Event description is required',
                length: '📏 Description must be between 10 and 1000 characters'
            }
        },
        date: {
            message: {
                required: '📅 Event date is required',
                future: '⏰ Event date must be in the future'
            }
        },
        location: {
            min: 3,
            max: 200,
            message: {
                required: '📍 Event location is required',
                length: '📏 Location must be between 3 and 200 characters'
            }
        }
    };

    const inputs = eventForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const field = input.name;
        const rule = rules[field];
        if (!rule) return;

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message hidden';
        input.parentNode.appendChild(errorDiv);

        input.addEventListener('input', () => {
            validateField(input, rule);
        });

        input.addEventListener('blur', () => {
            validateField(input, rule);
        });
    });

    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                const formData = new FormData(eventForm);
                const response = await fetch(eventForm.action, {
                    method: eventForm.method,
                    body: new URLSearchParams(formData),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    const data = await response.json();
                    showErrors(data.errors);
                    return;
                }

                window.location.href = '/events';
            } catch (error) {
                showFormError('❌ An error occurred while submitting the form. Please try again.');
            }
        }
    });

    function validateField(input, rule) {
        const value = input.value.trim();
        const errorDiv = input.parentNode.querySelector('.error-message');
        let error = '';

        if (!value) {
            error = rule.message.required;
        }
        else if (rule.min && rule.max && (value.length < rule.min || value.length > rule.max)) {
            error = rule.message.length;
        }
        else if (input.name === 'date') {
            const eventDate = new Date(value);
            const now = new Date();
            if (eventDate < now) {
                error = rule.message.future;
            }
        }

        if (error) {
            showError(input, error);
        } else {
            hideError(input);
        }

        return !error;
    }

    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            const rule = rules[input.name];
            if (rule && !validateField(input, rule)) {
                isValid = false;
            }
        });
        return isValid;
    }

    function showError(input, message) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        input.classList.add('error');
    }

    function hideError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        errorDiv.classList.add('hidden');
        input.classList.remove('error');
    }

    function showErrors(errors) {
        errors.forEach(error => {
            const input = eventForm.querySelector(`[name="${error.param}"]`);
            if (input) {
                showError(input, `❌ ${error.msg}`);
            }
        });
    }

    function showFormError(message) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container';
        errorContainer.innerHTML = `
            <div class="error-message">
                <span>${message}</span>
            </div>
        `;
        eventForm.insertBefore(errorContainer, eventForm.firstChild);
    }
}); 