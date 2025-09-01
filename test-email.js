const EmailConfig = require('./email-config');

// Test email configuration
async function testEmailSystem() {
    console.log('🧪 Testing Email System...\n');
    
    try {
        // Initialize email config
        const emailConfig = new EmailConfig();
        
        // Test connection
        console.log('📡 Testing email connection...');
        const connectionTest = await emailConfig.testConnection();
        
        if (connectionTest.success) {
            console.log('✅ Email connection successful!\n');
            
            // Test with sample report
            console.log('📧 Testing daily report email...');
            
            const sampleReport = {
                reportId: 'test_report_001',
                date: new Date().toISOString().split('T')[0],
                timestamp: new Date().toISOString(),
                title: 'AI-Synthia Bridge Daily Report',
                executiveSummary: 'This is a test report to verify email functionality.',
                detailedAnalysis: {
                    operations: {
                        tier1: { count: 5, description: 'Test operations' },
                        tier2: { count: 3, description: 'Test operations' },
                        tier3: { count: 2, description: 'Test operations' },
                        tier4: { count: 1, description: 'Test operations' },
                        tier5: { count: 0, description: 'Test operations' }
                    }
                },
                actionItems: [
                    {
                        priority: 'high',
                        type: 'test',
                        description: 'Verify email system is working',
                        deadline: 'immediate'
                    }
                ],
                metrics: {
                    operations: {
                        total: 11,
                        byTier: {
                            tier1: 5,
                            tier2: 3,
                            tier3: 2,
                            tier4: 1,
                            tier5: 0
                        },
                        successRate: 100,
                        averageProcessingTime: '1.2 seconds'
                    },
                    system: {
                        health: 'operational',
                        uptime: '99.9%',
                        responseTime: '120ms'
                    },
                    quality: {
                        securityScore: 95,
                        performanceScore: 92,
                        overallQuality: 94
                    }
                },
                recommendations: [
                    'Email system is functioning correctly',
                    'Daily reports will be sent automatically'
                ],
                nextSteps: [
                    {
                        immediate: 'Monitor email delivery',
                        timeline: 'Daily at 9 AM',
                        priority: 'low'
                    }
                ]
            };
            
            const emailResult = await emailConfig.sendDailyReport(sampleReport);
            
            if (emailResult.success) {
                console.log('✅ Test email sent successfully!');
                console.log(`   Message ID: ${emailResult.messageId}`);
                console.log(`   Recipients: ${emailResult.recipients}`);
                console.log(`   Timestamp: ${emailResult.timestamp}`);
            } else {
                console.log('❌ Test email failed:', emailResult.error);
            }
            
        } else {
            console.log('❌ Email connection failed:', connectionTest.error);
            console.log('\n🔧 Troubleshooting tips:');
            console.log('1. Check your EMAIL_USER and EMAIL_PASS environment variables');
            console.log('2. Verify your Gmail app password is correct');
            console.log('3. Ensure 2-factor authentication is enabled on your Gmail account');
            console.log('4. Check your network/firewall settings');
        }
        
    } catch (error) {
        console.error('❌ Email test failed:', error.message);
        console.log('\n🔧 Common solutions:');
        console.log('1. Install dependencies: npm install');
        console.log('2. Set environment variables for email credentials');
        console.log('3. Check the email-setup.md file for detailed instructions');
    }
}

// Test notification email
async function testNotificationEmail() {
    console.log('\n🔔 Testing notification email...');
    
    try {
        const emailConfig = new EmailConfig();
        
        const testOperation = {
            name: 'Test Operation',
            description: 'This is a test operation to verify notification emails work correctly.'
        };
        
        const notificationResult = await emailConfig.sendImmediateNotification(testOperation, 2);
        
        if (notificationResult.success) {
            console.log('✅ Notification email sent successfully!');
            console.log(`   Message ID: ${notificationResult.messageId}`);
        } else {
            console.log('❌ Notification email failed:', notificationResult.error);
        }
        
    } catch (error) {
        console.error('❌ Notification test failed:', error.message);
    }
}

// Test approval request email
async function testApprovalEmail() {
    console.log('\n🔐 Testing approval request email...');
    
    try {
        const emailConfig = new EmailConfig();
        
        const testApproval = {
            operation: 'Test Approval Operation',
            description: 'This is a test approval request to verify the email system.',
            impact: 'Low impact test operation',
            risk: 'Minimal risk for testing purposes',
            urgency: 'normal',
            timestamp: new Date().toISOString()
        };
        
        const approvalResult = await emailConfig.sendApprovalRequest(testApproval);
        
        if (approvalResult.success) {
            console.log('✅ Approval request email sent successfully!');
            console.log(`   Message ID: ${approvalResult.messageId}`);
        } else {
            console.log('❌ Approval request email failed:', approvalResult.error);
        }
        
    } catch (error) {
        console.error('❌ Approval test failed:', error.message);
    }
}

// Main test function
async function runAllTests() {
    console.log('🚀 ESQs Platform Email System Test');
    console.log('=====================================\n');
    
    // Check environment variables
    console.log('🔍 Checking environment variables...');
    const requiredVars = ['EMAIL_USER', 'EMAIL_PASS', 'PRIMARY_EMAIL'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        console.log('❌ Missing required environment variables:');
        missingVars.forEach(varName => console.log(`   - ${varName}`));
        console.log('\n🔧 Please set these variables before running tests:');
        console.log('   set EMAIL_USER=your-email@gmail.com');
        console.log('   set EMAIL_PASS=your-app-password');
        console.log('   set PRIMARY_EMAIL=your-email@gmail.com');
        console.log('\n📖 See email-setup.md for detailed instructions.\n');
        return;
    }
    
    console.log('✅ All required environment variables are set\n');
    
    // Run tests
    await testEmailSystem();
    await testNotificationEmail();
    await testApprovalEmail();
    
    console.log('\n🎉 Email system test completed!');
    console.log('\n📧 If all tests passed, you should receive:');
    console.log('   1. A daily report email');
    console.log('   2. A notification email');
    console.log('   3. An approval request email');
    console.log('\n📖 Check your email inbox and spam folder.');
}

// Run tests if this file is executed directly
if (require.main === module) {
    runAllTests().catch(console.error);
}

module.exports = {
    testEmailSystem,
    testNotificationEmail,
    testApprovalEmail,
    runAllTests
};
