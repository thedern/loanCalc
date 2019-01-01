// listen for submit within entire document
document.querySelector('#loan-form').addEventListener('submit', function(e) {
    // hide results (hidden by default on-load via css but ensuring hidden here in-case of double-click)
    document.querySelector('#results').style.display = 'none';
    // show loader
    document.querySelector('#loading').style.display = 'block';
    // show results after 2 seconds
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Math Function
function calculateResults() {
    
    // capture input fields from form groups
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    // calculations
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPaments = parseFloat(years.value) * 12;

    // compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPaments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    // check to see if monthly is finite number
    if (isFinite(monthly)) {
        // toFixed(2) created a 2 decimal number result
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPaments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPaments) - principal).toFixed(2);
        // display results
        document.querySelector('#results').style.display = 'block';
        // hide loader gif
        document.querySelector('#loading').style.display = 'none';
    } else {
        // create an error element and show it on screen
        showError('Please Check Your Numbers');
    }
}


// Errors Function
function showError (error) {
    // hide loader and results when in error condition and show alert
    document.querySelector('#loading').style.display = 'none';
    document.querySelector('#results').style.display = 'none';
    // create error div
    const errorDiv = document.createElement('div');
    // add classes to error div
    errorDiv.className = 'alert alert-danger';
    // create a text node and add to error div
    errorDiv.appendChild(document.createTextNode(error));
    // get card elements
    const card = document.querySelector('.card');
    // get card's heading
    const heading = document.querySelector('.heading');
    // insert the error div in the card but before the card's heading
    card.insertBefore(errorDiv, heading);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear Errorx Function
function clearError() {
    document.querySelector('.alert').remove();
}
