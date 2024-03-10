function insert(db) {
  // Account
  const sqlAccount = 'INSERT INTO accounts (name, description, amount, type) VALUES (?, ?, ?, ?)';

  // Insert demo account
  db.run(sqlAccount, ['Compte 01', '', '0', 'Compte bancaire'])

  // Add categories (1-999 = simple category / 1000+ = parent category)
  const categories = [
    { id: 1000, category: 'Ménage', description: '', color: 'rgba(67, 56, 202, 0.75)', icon: 'fa-solid fa-question' },
    { id: 1001, category: 'Transport', description: '', color: 'rgba(67, 56, 202, 0.75)', icon: 'fa-solid fa-question' },
    { id: 1002, category: 'Assurances', description: '', color: 'rgba(67, 56, 202, 0.75)', icon: 'fa-solid fa-question' },
    { id: 1003, category: 'Loisirs', description: '', color: 'rgba(67, 56, 202, 0.75)', icon: 'fa-solid fa-question' },
    { id: 1004, category: 'Taxes', description: '', color: 'rgba(67, 56, 202, 0.75)', icon: 'fa-solid fa-question' },
    { id: 1005, category: 'Santé', description: '', color: 'rgba(67, 56, 202, 0.75)', icon: 'fa-solid fa-question' },
    { id: 1006, category: 'Personnel', description: '', color: 'rgba(67, 56, 202, 0.75)', icon: 'fa-solid fa-question' },
    { id: 1007, category: 'A classer', description: '', color: 'rgba(67, 56, 202, 0.75)', icon: 'fa-solid fa-question' },
  
    { id: 1, category: 'A classer', description: '', color: 'rgba(67, 56, 202, 0.75)', icon: 'fa-solid fa-question', parent_category_id: 1007 },
    { id: 2, category: 'Assurance automobile', description: '', color: 'rgba(255, 87, 51, 0.75)', icon: 'fa-solid fa-car-burst fa-lg', parent_category_id: 1002 },
    { id: 3, category: 'Assurance santé', description: '', color: 'rgba(51, 255, 87, 0.75)', icon: 'fas fa-heartbeat fa-lg', parent_category_id: 1002 },
    { id: 4, category: 'Train', description: '', color: 'rgba(87, 51, 255, 0.75)', icon: 'fas fa-train fa-lg', parent_category_id: 1001 },
    { id: 5, category: 'Courses', description: '', color: 'rgba(51, 255, 189, 0.75)', icon: 'fas fa-carrot fa-lg', parent_category_id: 1000 },
    { id: 6, category: 'Restaurants', description: '', color: 'rgba(255, 199, 51, 0.75)', icon: 'fas fa-hamburger fa-lg', parent_category_id: 1003 },
    { id: 7, category: 'Parkings', description: '', color: 'rgba(51, 199, 255, 0.75)', icon: 'fas fa-map-marker-alt fa-lg', parent_category_id: 1002 },
    { id: 8, category: 'Impots', description: '', color: 'rgba(233, 51, 255, 0.75)', icon: 'fas fa-coins fa-lg', parent_category_id: 1004 },
    { id: 9, category: 'Loyer', description: '', color: 'rgba(255, 51, 133, 0.75)', icon: 'fas fa-paint-roller fa-lg', parent_category_id: 1000 },
    { id: 10, category: 'Eléctricité', description: '', color: 'rgba(162, 51, 255, 0.75)', icon: 'fa-solid fa-bolt fa-lg', parent_category_id: 1000 },
    { id: 11, category: 'Eau', description: '', color: 'rgba(51, 255, 237, 0.75)', icon: 'fa-solid fa-water fa-lg', parent_category_id: 1000 },
    { id: 12, category: 'Téléphone', description: '', color: 'rgba(255, 51, 180, 0.75)', icon: 'fa-solid fa-phone fa-lg', parent_category_id: 1006 },
    { id: 13, category: 'Internet', description: '', color: 'rgba(93, 51, 255, 0.75)', icon: 'fa-solid fa-globe fa-lg', parent_category_id: 1000 },
    { id: 14, category: 'Télévision', description: '', color: 'rgba(51, 255, 246, 0.75)', icon: 'fa-solid fa-tv fa-lg', parent_category_id: 1000 },
    { id: 15, category: 'Médicaments', description: '', color: 'rgba(255, 51, 108, 0.75)', icon: 'fa-solid fa-notes-medical fa-lg', parent_category_id: 1005 },
    { id: 17, category: 'Habits', description: '', color: 'rgba(255, 168, 51, 0.75)', icon: 'fa-solid fa-shirt fa-lg', parent_category_id: 1006 },
    { id: 19, category: 'Livres', description: '', color: 'rgba(255, 51, 228, 0.75)', icon: 'fa-solid fa-book fa-lg', parent_category_id: 1003 },
    { id: 20, category: 'Cinéma', description: '', color: 'rgba(51, 255, 114, 0.75)', icon: 'fa-solid fa-video fa-lg', parent_category_id: 1003 },
    { id: 21, category: 'Théâtre', description: '', color: 'rgba(255, 87, 51, 0.75)', icon: 'fa-solid fa-chalkboard-user fa-lg', parent_category_id: 1003 },
    { id: 23, category: 'Dons', description: '', color: 'rgba(243, 51, 255, 0.75)', icon: 'fa-solid fa-hand-holding-dollar fa-lg', parent_category_id: 1005 },
    { id: 24, category: 'Cadeaux', description: '', color: 'rgba(51, 231, 255, 0.75)', icon: 'fa-solid fa-gift fa-lg', parent_category_id: 1000 },
    { id: 25, category: 'Vacances', description: '', color: 'rgba(255, 51, 62, 0.75)', icon: 'fa-solid fa-umbrella-beach fa-lg', parent_category_id: 1003 },
    { id: 26, category: 'Voiture', description: '', color: 'rgba(51, 255, 156, 0.75)', icon: 'fa-solid fa-car fa-lg', parent_category_id: 1001},
    { id: 27, category: 'Jeux', description: '', color: 'rgba(67, 253, 156, 0.75)', icon: 'fa-solid fa-gamepad fa-lg', parent_category_id: 1003},
    { id: 28, category: 'Médecin', description: '', color: 'rgba(83, 253, 156, 0.75)', icon: 'fa-solid fa-user-doctor fa-lg', parent_category_id: 1005},
    { id: 31, category: 'Sport', description: '', color: 'rgba(83, 253, 156, 0.75)', icon: 'fa-solid fa-dumbbell fa-lg', parent_category_id: 1005}
  ];
  

  const sqlCategories = 'INSERT INTO categories (id, category, description, color, icon, parent_category_id) VALUES (?, ?, ?, ?, ?, ?)';

  // Insert each row using a loop
  categories.forEach(row => {
    db.run(sqlCategories, [row.id, row.category, row.description, row.color, row.icon, row.parent_category_id], function(err) {
        if (err) {
            console.error(err.message);
        } else {
          // Budgets : insertion des catégories
          const budgetBasicInformation = [
            { amount: 0, start_date: '1970-01-01', end_date: '9999-12-31' }
          ]

          const sqlBudget = 'INSERT INTO budgets (id_category, amount, start_date, end_date) VALUES (?, ?, ?, ?)';

          // Insert each row using a loop
          budgetBasicInformation.forEach(row => {
            db.run(sqlBudget, [this.lastID, row.amount, row.start_date, row.end_date], function(err) {
                if (err) {
                    console.error(err.message);
                }
            });
          });
        }
    });
  });
}

module.exports = { insert };