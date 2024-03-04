const dashboardMonth = document.getElementById('dashboard-month')

// Display the expenses / income for the current month by default
window.addEventListener('DOMContentLoaded', function() {

  // Set actual month 
  dashboardMonth.valueAsDate = new Date();
})

// Refresh the dashboard
dashboardMonth.addEventListener('change', function() {
  const selectedDate = new Date(dashboardMonth.value)
})

/**
 * Return the first day of month
 * @param {*} date 
 * @returns string
 */
function firstDayOfMonth(date = new Date()) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const fullYear = date.getFullYear();
  const formattedDate = `${fullYear}-${month}-01`;
  return formattedDate
}

