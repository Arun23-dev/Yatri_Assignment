const axios = require('axios');

const BASE_URL = 'http://localhost:3002';

async function testWalletEndpoints() {
  console.log('🧪 Testing Wallet Endpoints...\n');

  try {
    // Test 1: Add funds using the simple endpoint (no authentication required)
    console.log('1️⃣ Testing add-funds-simple endpoint...');
    const addFundsResponse = await axios.post(`${BASE_URL}/customer/add-funds-simple`, {
      amount: 100.50,
      paymentMethod: 'credit_card',
      reference: 'test_payment_12345',
      description: 'Test payment for development'
    });

    console.log('✅ Add funds response:', JSON.stringify(addFundsResponse.data, null, 2));

    // Test 2: Get wallet balance
    console.log('\n2️⃣ Testing wallet balance endpoint...');
    const balanceResponse = await axios.get(`${BASE_URL}/customer/wallet/balance`, {
      params: { userId: '68b80a5adfa2e1443088d757' }
    });

    console.log('✅ Wallet balance response:', JSON.stringify(balanceResponse.data, null, 2));

    // Test 3: Get wallet transactions
    console.log('\n3️⃣ Testing wallet transactions endpoint...');
    const transactionsResponse = await axios.get(`${BASE_URL}/customer/wallet/transactions`, {
      params: { 
        userId: '68b80a5adfa2e1443088d757',
        page: 1,
        limit: 5
      }
    });

    console.log('✅ Wallet transactions response:', JSON.stringify(transactionsResponse.data, null, 2));

    // Test 4: Get wallet summary
    console.log('\n4️⃣ Testing wallet summary endpoint...');
    const summaryResponse = await axios.get(`${BASE_URL}/customer/wallet/summary`, {
      params: { userId: '68b80a5adfa2e1443088d757' }
    });

    console.log('✅ Wallet summary response:', JSON.stringify(summaryResponse.data, null, 2));

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Error during testing:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 Tip: The original /customer/add-funds endpoint requires JWT authentication.');
      console.log('   Use /customer/add-funds-simple for testing without authentication.');
    }
  }
}

// Run the test
testWalletEndpoints();
