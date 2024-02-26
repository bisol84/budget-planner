// Import functions
import { createAccountCard } from '../js/accounts.js';

// Test for the account card creation
describe('createAccountCard', () => {
  test('should create an account card with correct HTML structure', () => {
    // Account data
    const account = {
      name: 'Test Account',
      description: 'Test Description',
      type: 'Test Type'
    };

    // Create the card
    const accountCard = createAccountCard(account);

    // Vérifiez que la carte de compte a été créée avec la structure HTML attendue
    expect(accountCard.innerHTML).toContain('Test Account');
    expect(accountCard.innerHTML).toContain('Test Description');
    expect(accountCard.innerHTML).toContain('Test Type');
  });
});