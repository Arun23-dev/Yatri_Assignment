const axios = require('axios');

const BASE_URL = 'http://localhost:3002';

// Test data
const testUserId = 'user123';
const testAmount = 100.50;

async function testCustomerAPI() {
  console.log('🧪 Testing Customer API...\n');

  try {
    // Test 1: Add funds to wallet
    console.log('1️⃣ Testing Add Funds...');
    const addFundsResponse = await axios.post(`${BASE_URL}/customer/add-funds`, {
      userId: testUserId,
      amount: testAmount,
      paymentMethod: 'credit_card',
      reference: 'test_payment_123',
      description: 'Test payment via credit card'
    });
    console.log('✅ Add Funds Response:', JSON.stringify(addFundsResponse.data, null, 2));

    // Test 2: Get wallet balance
    console.log('\n2️⃣ Testing Get Wallet Balance...');
    const balanceResponse = await axios.get(`${BASE_URL}/customer/wallet/${testUserId}/balance`);
    console.log('✅ Wallet Balance Response:', JSON.stringify(balanceResponse.data, null, 2));

    // Test 3: Get transaction history
    console.log('\n3️⃣ Testing Get Transaction History...');
    const transactionsResponse = await axios.get(`${BASE_URL}/customer/wallet/${testUserId}/transactions?page=1&limit=5`);
    console.log('✅ Transaction History Response:', JSON.stringify(transactionsResponse.data, null, 2));

    // Test 4: Get wallet summary
    console.log('\n4️⃣ Testing Get Wallet Summary...');
    const summaryResponse = await axios.get(`${BASE_URL}/customer/wallet/${testUserId}/summary`);
    console.log('✅ Wallet Summary Response:', JSON.stringify(summaryResponse.data, null, 2));

    // Test 5: Get wallet details
    console.log('\n5️⃣ Testing Get Wallet Details...');
    const walletResponse = await axios.get(`${BASE_URL}/customer/wallet/${testUserId}`);
    console.log('✅ Wallet Details Response:', JSON.stringify(walletResponse.data, null, 2));

    // Test 6: Add more funds with different payment method
    console.log('\n6️⃣ Testing Add Funds with Different Payment Method...');
    const addFundsResponse2 = await axios.post(`${BASE_URL}/customer/add-funds`, {
      userId: testUserId,
      amount: 50.25,
      paymentMethod: 'bank_transfer',
      description: 'Test bank transfer'
    });
    console.log('✅ Add Funds Response 2:', JSON.stringify(addFundsResponse2.data, null, 2));

    // Test 7: Get updated balance
    console.log('\n7️⃣ Testing Get Updated Balance...');
    const updatedBalanceResponse = await axios.get(`${BASE_URL}/customer/wallet/${testUserId}/balance`);
    console.log('✅ Updated Balance Response:', JSON.stringify(updatedBalanceResponse.data, null, 2));

    // Test 8: Get filtered transactions (credits only)
    console.log('\n8️⃣ Testing Get Filtered Transactions (Credits Only)...');
    const filteredTransactionsResponse = await axios.get(`${BASE_URL}/customer/wallet/${testUserId}/transactions?type=credit`);
    console.log('✅ Filtered Transactions Response:', JSON.stringify(filteredTransactionsResponse.data, null, 2));

    console.log('\n🎉 All Customer API tests completed successfully!');

  } catch (error) {
    console.error('❌ Error testing Customer API:', error.response?.data || error.message);
  }
}

// Test error scenarios
async function testErrorScenarios() {
  console.log('\n🚨 Testing Error Scenarios...\n');

  try {
    // Test 1: Add funds with invalid amount
    console.log('1️⃣ Testing Add Funds with Invalid Amount...');
    try {
      await axios.post(`${BASE_URL}/customer/add-funds`, {
        userId: testUserId,
        amount: -10,
        paymentMethod: 'credit_card'
      });
    } catch (error) {
      console.log('✅ Expected Error (Invalid Amount):', error.response?.data?.message || error.message);
    }

    // Test 2: Add funds to non-existent wallet
    console.log('\n2️⃣ Testing Add Funds to Non-existent Wallet...');
    try {
      await axios.post(`${BASE_URL}/customer/add-funds`, {
        userId: 'non_existent_user',
        amount: 100,
        paymentMethod: 'credit_card'
      });
    } catch (error) {
      console.log('✅ Expected Error (Wallet Not Found):', error.response?.data?.message || error.message);
    }

    // Test 3: Get balance for non-existent wallet
    console.log('\n3️⃣ Testing Get Balance for Non-existent Wallet...');
    try {
      await axios.get(`${BASE_URL}/customer/wallet/non_existent_user/balance`);
    } catch (error) {
      console.log('✅ Expected Error (Wallet Not Found):', error.response?.data?.message || error.message);
    }

    console.log('\n🎉 All Error Scenario tests completed!');

  } catch (error) {
    console.error('❌ Error testing error scenarios:', error.message);
  }
}

// Run tests
async function runAllTests() {
  console.log('🏦 Customer API Test Suite');
  console.log('========================\n');

  await testCustomerAPI();
  await testErrorScenarios();

  console.log('\n✨ Test suite completed!');
}

// Run the tests
runAllTests().catch(console.error);
