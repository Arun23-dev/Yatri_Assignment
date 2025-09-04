const axios = require('axios');

const BASE_URL = 'http://localhost:3002';

async function testCustomerWalletAPIs() {
  console.log('🧪 Testing Customer Wallet APIs...\n');

  try {
    // Test 1: Add funds to wallet
    console.log('1️⃣ Adding funds to wallet...');
    const addFundsResponse = await axios.post(`${BASE_URL}/customer/add-funds-simple`, {
      amount: 200.00,
      paymentMethod: 'credit_card',
      reference: 'test_payment_001',
      description: 'Test payment for wallet'
    });

    console.log('✅ Add funds response:', JSON.stringify(addFundsResponse.data, null, 2));

    // Test 2: Get current balance
    console.log('\n2️⃣ Getting current balance...');
    const balanceResponse = await axios.get(`${BASE_URL}/customer/get-balance-simple`);

    console.log('✅ Balance response:', JSON.stringify(balanceResponse.data, null, 2));

    // Test 3: Get transaction history
    console.log('\n3️⃣ Getting transaction history...');
    const transactionsResponse = await axios.get(`${BASE_URL}/customer/get-transactions-simple?page=1&limit=5`);

    console.log('✅ Transactions response:', JSON.stringify(transactionsResponse.data, null, 2));

    // Test 4: Get wallet summary
    console.log('\n4️⃣ Getting wallet summary...');
    const summaryResponse = await axios.get(`${BASE_URL}/customer/get-wallet-summary-simple`);

    console.log('✅ Wallet summary response:', JSON.stringify(summaryResponse.data, null, 2));

    // Test 5: Get recent activity
    console.log('\n5️⃣ Getting recent activity...');
    const activityResponse = await axios.get(`${BASE_URL}/customer/get-recent-activity-simple`);

    console.log('✅ Recent activity response:', JSON.stringify(activityResponse.data, null, 2));

    // Test 6: Add more funds to see balance accumulation
    console.log('\n6️⃣ Adding more funds to test balance accumulation...');
    const addMoreFundsResponse = await axios.post(`${BASE_URL}/customer/add-funds-simple`, {
      amount: 150.50,
      paymentMethod: 'bank_transfer',
      reference: 'test_payment_002',
      description: 'Second test payment'
    });

    console.log('✅ Add more funds response:', JSON.stringify(addMoreFundsResponse.data, null, 2));

    // Test 7: Get updated balance
    console.log('\n7️⃣ Getting updated balance...');
    const updatedBalanceResponse = await axios.get(`${BASE_URL}/customer/get-balance-simple`);

    console.log('✅ Updated balance response:', JSON.stringify(updatedBalanceResponse.data, null, 2));

    console.log('\n🎉 All customer wallet APIs tested successfully!');

  } catch (error) {
    console.error('❌ Error during testing:', error.response?.data || error.message);
  }
}

// Run the test
testCustomerWalletAPIs();
