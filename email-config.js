const nodemailer = require('nodemailer');

class EmailConfig {
    constructor() {
        this.transporter = null;
        this.config = {
            host: 'smtp.gmail.com', // Default to Gmail
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER || 'your-email@gmail.com',
                pass: process.env.EMAIL_PASS || 'your-app-password'
            }
        };
        
        this.recipients = {
            primary: process.env.PRIMARY_EMAIL || 'your-email@gmail.com',
            backup: process.env.BACKUP_EMAIL || '',
            team: process.env.TEAM_EMAILS || []
        };
        
        this.initTransporter();
    }

    initTransporter() {
        try {
            this.transporter = nodemailer.createTransporter(this.config);
            console.log('📧 Email transporter initialized');
        } catch (error) {
            console.error('❌ Email transporter initialization failed:', error);
        }
    }

    // Update email configuration
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.initTransporter();
    }

    // Update recipients
    updateRecipients(newRecipients) {
        this.recipients = { ...this.recipients, ...newRecipients };
    }

    // Test email connection
    async testConnection() {
        try {
            await this.transporter.verify();
            console.log('✅ Email connection verified');
            return { success: true, message: 'Email connection successful' };
        } catch (error) {
            console.error('❌ Email connection failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Send daily report email
    async sendDailyReport(report, recipients = null) {
        try {
            const emailRecipients = recipients || this.recipients.primary;
            
            const mailOptions = {
                from: `"ESQs Platform AI-Synthia Bridge" <${this.config.auth.user}>`,
                to: emailRecipients,
                subject: `📊 ${report.title} - ${report.date}`,
                html: this.generateEmailHTML(report),
                text: this.generateEmailText(report),
                attachments: this.generateAttachments(report)
            };

            const result = await this.transporter.sendMail(mailOptions);
            console.log('📧 Daily report email sent successfully');
            
            return {
                success: true,
                messageId: result.messageId,
                recipients: emailRecipients,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Daily report email failed:', error);
            return {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    // Send immediate notification for high-tier operations
    async sendImmediateNotification(operation, tier, recipients = null) {
        try {
            const emailRecipients = recipients || this.recipients.primary;
            
            const mailOptions = {
                from: `"ESQs Platform AI-Synthia Bridge" <${this.config.auth.user}>`,
                to: emailRecipients,
                subject: `🔔 ${tier === 4 ? 'Approval Required' : 'System Update'} - ${operation.name}`,
                html: this.generateNotificationHTML(operation, tier),
                text: this.generateNotificationText(operation, tier)
            };

            const result = await this.transporter.sendMail(mailOptions);
            console.log(`📧 ${tier === 4 ? 'Approval' : 'Notification'} email sent successfully`);
            
            return {
                success: true,
                messageId: result.messageId,
                recipients: emailRecipients,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Notification email failed:', error);
            return {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    // Send approval request email
    async sendApprovalRequest(approvalRequest, recipients = null) {
        try {
            const emailRecipients = recipients || this.recipients.primary;
            
            const mailOptions = {
                from: `"ESQs Platform AI-Synthia Bridge" <${this.config.auth.user}>`,
                to: emailRecipients,
                subject: `🔐 Approval Required - Tier ${approvalRequest.tier} Operation: ${approvalRequest.operation}`,
                html: this.generateApprovalRequestHTML(approvalRequest),
                text: this.generateApprovalRequestText(approvalRequest)
            };

            const result = await this.transporter.sendMail(mailOptions);
            console.log('📧 Approval request email sent successfully');
            
            return {
                success: true,
                messageId: result.messageId,
                recipients: emailRecipients,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('❌ Approval request email failed:', error);
            return {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    // Generate HTML email for daily report
    generateEmailHTML(report) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${report.title}</title>
                <style>
                    body { 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                        line-height: 1.6; 
                        color: #333; 
                        max-width: 800px; 
                        margin: 0 auto; 
                        padding: 20px; 
                        background-color: #f9f9f9; 
                    }
                    .email-container { 
                        background: white; 
                        border-radius: 10px; 
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
                        overflow: hidden; 
                    }
                    .header { 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 30px; 
                        text-align: center; 
                    }
                    .header h1 { 
                        margin: 0; 
                        font-size: 28px; 
                        font-weight: 300; 
                    }
                    .header .date { 
                        margin-top: 10px; 
                        opacity: 0.9; 
                        font-size: 16px; 
                    }
                    .content { 
                        padding: 30px; 
                    }
                    .section { 
                        margin-bottom: 30px; 
                        padding: 20px; 
                        border-left: 4px solid #667eea; 
                        background: #f8f9fa; 
                        border-radius: 5px; 
                    }
                    .section h2 { 
                        margin-top: 0; 
                        color: #495057; 
                        font-size: 20px; 
                    }
                    .metrics-grid { 
                        display: grid; 
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
                        gap: 15px; 
                        margin: 20px 0; 
                    }
                    .metric-card { 
                        background: white; 
                        padding: 15px; 
                        border-radius: 8px; 
                        border: 1px solid #e9ecef; 
                        text-align: center; 
                    }
                    .metric-value { 
                        font-size: 24px; 
                        font-weight: bold; 
                        color: #667eea; 
                    }
                    .metric-label { 
                        font-size: 14px; 
                        color: #6c757d; 
                        margin-top: 5px; 
                    }
                    .action-item { 
                        background: white; 
                        padding: 15px; 
                        margin: 10px 0; 
                        border-radius: 8px; 
                        border-left: 4px solid #ffc107; 
                    }
                    .action-item.high { 
                        border-left-color: #dc3545; 
                        background: #fff5f5; 
                    }
                    .action-item.medium { 
                        border-left-color: #fd7e14; 
                        background: #fff8f0; 
                    }
                    .action-item.low { 
                        border-left-color: #28a745; 
                        background: #f0fff4; 
                    }
                    .priority-badge { 
                        display: inline-block; 
                        padding: 4px 8px; 
                        border-radius: 12px; 
                        font-size: 12px; 
                        font-weight: bold; 
                        text-transform: uppercase; 
                    }
                    .priority-high { 
                        background: #dc3545; 
                        color: white; 
                    }
                    .priority-medium { 
                        background: #fd7e14; 
                        color: white; 
                    }
                    .priority-low { 
                        background: #28a745; 
                        color: white; 
                    }
                    .footer { 
                        background: #f8f9fa; 
                        padding: 20px; 
                        text-align: center; 
                        color: #6c757d; 
                        font-size: 14px; 
                    }
                    .tier-breakdown { 
                        display: grid; 
                        grid-template-columns: repeat(5, 1fr); 
                        gap: 10px; 
                        margin: 20px 0; 
                    }
                    .tier-card { 
                        background: white; 
                        padding: 15px; 
                        border-radius: 8px; 
                        text-align: center; 
                        border: 2px solid #e9ecef; 
                    }
                    .tier-card.tier1 { border-color: #28a745; }
                    .tier-card.tier2 { border-color: #17a2b8; }
                    .tier-card.tier3 { border-color: #ffc107; }
                    .tier-card.tier4 { border-color: #fd7e14; }
                    .tier-card.tier5 { border-color: #dc3545; }
                    .tier-number { 
                        font-size: 20px; 
                        font-weight: bold; 
                        margin-bottom: 5px; 
                    }
                    .tier-label { 
                        font-size: 12px; 
                        color: #6c757d; 
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <h1>🤖 AI-Synthia Bridge Daily Report</h1>
                        <div class="date">${new Date(report.timestamp).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</div>
                    </div>
                    
                    <div class="content">
                        <div class="section">
                            <h2>📋 Executive Summary</h2>
                            <p>${report.executiveSummary}</p>
                        </div>
                        
                        <div class="section">
                            <h2>📊 Key Metrics</h2>
                            <div class="metrics-grid">
                                <div class="metric-card">
                                    <div class="metric-value">${report.metrics.operations.total}</div>
                                    <div class="metric-label">Total Operations</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-value">${report.metrics.operations.successRate}%</div>
                                    <div class="metric-label">Success Rate</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-value">${report.metrics.system.health}</div>
                                    <div class="metric-label">System Health</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-value">${report.metrics.quality.overallQuality}/100</div>
                                    <div class="metric-label">Overall Quality</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="section">
                            <h2>🏷️ Operations by Tier</h2>
                            <div class="tier-breakdown">
                                <div class="tier-card tier1">
                                    <div class="tier-number">${report.metrics.operations.byTier.tier1}</div>
                                    <div class="tier-label">Tier 1<br>Minor</div>
                                </div>
                                <div class="tier-card tier2">
                                    <div class="tier-number">${report.metrics.operations.byTier.tier2}</div>
                                    <div class="tier-label">Tier 2<br>Low Impact</div>
                                </div>
                                <div class="tier-card tier3">
                                    <div class="tier-number">${report.metrics.operations.byTier.tier3}</div>
                                    <div class="tier-label">Tier 3<br>Moderate</div>
                                </div>
                                <div class="tier-card tier4">
                                    <div class="tier-number">${report.metrics.operations.byTier.tier4}</div>
                                    <div class="tier-label">Tier 4<br>Significant</div>
                                </div>
                                <div class="tier-card tier5">
                                    <div class="tier-number">${report.metrics.operations.byTier.tier5}</div>
                                    <div class="tier-label">Tier 5<br>Overhaul</div>
                                </div>
                            </div>
                        </div>
                        
                        ${report.actionItems.length > 0 ? `
                        <div class="section">
                            <h2>⚡ Action Items</h2>
                            ${report.actionItems.map(item => `
                                <div class="action-item ${item.priority}">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <strong>${item.type.toUpperCase()}:</strong> ${item.description}
                                            <br><small>Deadline: ${item.deadline}</small>
                                        </div>
                                        <span class="priority-badge priority-${item.priority}">${item.priority}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        ` : ''}
                        
                        <div class="section">
                            <h2>🎯 Next Steps</h2>
                            ${report.nextSteps.map(step => `
                                <div style="margin: 15px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #667eea;">
                                    <strong>${step.immediate}</strong><br>
                                    <small>Timeline: ${step.timeline} | Priority: ${step.priority}</small>
                                </div>
                            `).join('')}
                        </div>
                        
                        ${report.recommendations.length > 0 ? `
                        <div class="section">
                            <h2>💡 Recommendations</h2>
                            ${report.recommendations.map(rec => `
                                <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 5px;">
                                    ${rec}
                                </div>
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="footer">
                        <p>This report was automatically generated by the ESQs Platform AI-Synthia Bridge System</p>
                        <p>Generated at: ${new Date(report.timestamp).toLocaleString()}</p>
                        <p>Report ID: ${report.reportId}</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    // Generate text email for daily report
    generateEmailText(report) {
        return `
AI-SYNTHIA BRIDGE DAILY REPORT
==============================

Date: ${report.date}
Generated: ${new Date(report.timestamp).toLocaleString()}
Report ID: ${report.reportId}

EXECUTIVE SUMMARY
----------------
${report.executiveSummary}

KEY METRICS
-----------
Total Operations: ${report.metrics.operations.total}
Success Rate: ${report.metrics.operations.successRate}%
System Health: ${report.metrics.system.health}
Overall Quality: ${report.metrics.quality.overallQuality}/100

OPERATIONS BY TIER
------------------
Tier 1 (Minor): ${report.metrics.operations.byTier.tier1}
Tier 2 (Low Impact): ${report.metrics.operations.byTier.tier2}
Tier 3 (Moderate): ${report.metrics.operations.byTier.tier3}
Tier 4 (Significant): ${report.metrics.operations.byTier.tier4}
Tier 5 (Overhaul): ${report.metrics.operations.byTier.tier5}

${report.actionItems.length > 0 ? `
ACTION ITEMS
------------
${report.actionItems.map(item => `${item.type.toUpperCase()}: ${item.description} (Priority: ${item.priority}, Deadline: ${item.deadline})`).join('\n')}
` : ''}

NEXT STEPS
----------
${report.nextSteps.map(step => `${step.immediate} - Timeline: ${step.timeline}, Priority: ${step.priority}`).join('\n')}

${report.recommendations.length > 0 ? `
RECOMMENDATIONS
---------------
${report.recommendations.join('\n')}
` : ''}

---
This report was automatically generated by the ESQs Platform AI-Synthia Bridge System
        `;
    }

    // Generate notification HTML
    generateNotificationHTML(operation, tier) {
        const tierInfo = this.getTierInfo(tier);
        
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .notification { padding: 20px; border-radius: 8px; background: #f8f9fa; }
                    .tier-${tier} { border-left: 4px solid ${tierInfo.color}; }
                    .header { color: ${tierInfo.color}; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="notification tier-${tier}">
                    <h2 class="header">${tierInfo.title}</h2>
                    <p><strong>Operation:</strong> ${operation.name}</p>
                    <p><strong>Tier:</strong> ${tier} - ${tierInfo.name}</p>
                    <p><strong>Description:</strong> ${operation.description || 'No description provided'}</p>
                    <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                </div>
            </body>
            </html>
        `;
    }

    // Generate notification text
    generateNotificationText(operation, tier) {
        const tierInfo = this.getTierInfo(tier);
        
        return `
${tierInfo.title}
================

Operation: ${operation.name}
Tier: ${tier} - ${tierInfo.name}
Description: ${operation.description || 'No description provided'}
Timestamp: ${new Date().toLocaleString()}
        `;
    }

    // Generate approval request HTML
    generateApprovalRequestHTML(approvalRequest) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .approval-request { padding: 20px; border-radius: 8px; background: #fff3cd; border: 1px solid #ffeaa7; }
                    .urgent { background: #f8d7da; border-color: #f5c6cb; }
                    .header { color: #856404; font-weight: bold; }
                    .details { margin: 15px 0; }
                </style>
            </head>
            <body>
                <div class="approval-request ${approvalRequest.urgency === 'high' ? 'urgent' : ''}">
                    <h2 class="header">🔐 Approval Required</h2>
                    <div class="details">
                        <p><strong>Operation:</strong> ${approvalRequest.operation}</p>
                        <p><strong>Tier:</strong> ${approvalRequest.tier} - ${this.getTierInfo(approvalRequest.tier).name}</p>
                        <p><strong>Description:</strong> ${approvalRequest.description}</p>
                        <p><strong>Impact:</strong> ${approvalRequest.impact}</p>
                        <p><strong>Risk:</strong> ${approvalRequest.risk}</p>
                        <p><strong>Urgency:</strong> ${approvalRequest.urgency}</p>
                        <p><strong>Timestamp:</strong> ${new Date(approvalRequest.timestamp).toLocaleString()}</p>
                    </div>
                    <p><strong>Action Required:</strong> Please review and approve/reject this operation.</p>
                </div>
            </body>
            </html>
        `;
    }

    // Generate approval request text
    generateApprovalRequestText(approvalRequest) {
        return `
APPROVAL REQUIRED
================

Operation: ${approvalRequest.operation}
Tier: ${approvalRequest.tier} - ${this.getTierInfo(approvalRequest.tier).name}
Description: ${approvalRequest.description}
Impact: ${approvalRequest.impact}
Risk: ${approvalRequest.risk}
Urgency: ${approvalRequest.urgency}
Timestamp: ${new Date(approvalRequest.timestamp).toLocaleString()}

Action Required: Please review and approve/reject this operation.
        `;
    }

    // Get tier information
    getTierInfo(tier) {
        const tierInfo = {
            1: { name: 'Minor', title: 'Operation Completed', color: '#28a745' },
            2: { name: 'Low Impact', title: 'Operation Completed with Notification', color: '#17a2b8' },
            3: { name: 'Moderate', title: 'Operation Completed with Detailed Notification', color: '#ffc107' },
            4: { name: 'Significant', title: 'Approval Required', color: '#fd7e14' },
            5: { name: 'Overhaul', title: 'Comprehensive Approval Required', color: '#dc3545' }
        };
        
        return tierInfo[tier] || tierInfo[1];
    }

    // Generate email attachments
    generateAttachments(report) {
        const attachments = [];
        
        // Add JSON report as attachment
        attachments.push({
            filename: `ai-synthia-report-${report.date}.json`,
            content: JSON.stringify(report, null, 2),
            contentType: 'application/json'
        });
        
        // Add CSV summary as attachment
        const csvContent = this.generateCSVSummary(report);
        attachments.push({
            filename: `ai-synthia-summary-${report.date}.csv`,
            content: csvContent,
            contentType: 'text/csv'
        });
        
        return attachments;
    }

    // Generate CSV summary
    generateCSVSummary(report) {
        const headers = ['Metric', 'Value'];
        const rows = [
            ['Date', report.date],
            ['Total Operations', report.metrics.operations.total],
            ['Success Rate', `${report.metrics.operations.successRate}%`],
            ['System Health', report.metrics.system.health],
            ['Overall Quality', report.metrics.quality.overallQuality],
            ['Tier 1 Operations', report.metrics.operations.byTier.tier1],
            ['Tier 2 Operations', report.metrics.operations.byTier.tier2],
            ['Tier 3 Operations', report.metrics.operations.byTier.tier3],
            ['Tier 4 Operations', report.metrics.operations.byTier.tier4],
            ['Tier 5 Operations', report.metrics.operations.byTier.tier5],
            ['Pending Approvals', report.actionItems.filter(item => item.type === 'approval').length]
        ];
        
        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
}

// Export the email configuration
module.exports = EmailConfig;
