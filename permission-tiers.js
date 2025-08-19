const EmailConfig = require('./email-config');

const PermissionTiers = {
    TIER_1: {
        level: 1,
        name: 'Minor',
        description: 'Routine operations, no system impact',
        approval: 'Automatic',
        examples: [
            'Code verification requests',
            'Security pattern scanning',
            'Performance analysis',
            'Daily report generation',
            'Log rotation and cleanup',
            'Cache management',
            'Health check monitoring'
        ],
        notification: 'Included in daily report',
        risk: 'None'
    },

    TIER_2: {
        level: 2,
        name: 'Low Impact',
        description: 'Minor improvements, minimal system changes',
        approval: 'Automatic with notification',
        examples: [
            'Adding new code patterns to registry',
            'Updating analysis rules',
            'Performance optimization suggestions',
            'Security recommendation updates',
            'Minor configuration adjustments',
            'Log level changes',
            'Cache size adjustments'
        ],
        notification: 'Immediate notification + daily report',
        risk: 'Minimal'
    },

    TIER_3: {
        level: 3,
        name: 'Moderate',
        description: 'Noticeable changes, some system impact',
        approval: 'Automatic with detailed notification',
        examples: [
            'New API endpoints for existing features',
            'Database query optimizations',
            'File access pattern changes',
            'Security policy updates',
            'Performance monitoring enhancements',
            'New analysis categories',
            'Bridge communication improvements'
        ],
        notification: 'Detailed notification + approval request for sensitive changes',
        risk: 'Low'
    },

    TIER_4: {
        level: 4,
        name: 'Significant',
        description: 'Major feature additions, substantial system changes',
        approval: 'Explicit approval required',
        examples: [
            'New database tables or schemas',
            'Major API restructuring',
            'New file system access methods',
            'Security framework changes',
            'Performance monitoring system overhaul',
            'New integration capabilities',
            'Major configuration changes'
        ],
        notification: 'Detailed proposal + approval workflow',
        risk: 'Medium'
    },

    TIER_5: {
        level: 5,
        name: 'Overhaul',
        description: 'System-wide changes, complete restructuring',
        approval: 'Explicit approval + testing period required',
        examples: [
            'Database architecture changes',
            'Complete API redesign',
            'File system access restructuring',
            'Security framework replacement',
            'Performance monitoring system replacement',
            'New programming language adoption',
            'Complete system migration'
        ],
        notification: 'Comprehensive proposal + testing plan + approval workflow',
        risk: 'High'
    }
};

class PermissionManager {
    constructor() {
        this.pendingApprovals = new Map();
        this.approvalHistory = new Map();
        this.emailConfig = new EmailConfig();
        this.dailyReportData = {
            tier1Count: 0,
            tier2Count: 0,
            tier3Count: 0,
            tier4Count: 0,
            tier5Count: 0,
            pendingApprovals: [],
            completedActions: [],
            systemHealth: 'operational'
        };
    }

    // Determine tier for an operation
    determineTier(operation) {
        const { action, scope, impact, risk } = operation;
        
        // Tier 5 - Overhaul
        if (scope === 'system-wide' || impact === 'complete-restructure' || risk === 'high') {
            return PermissionTiers.TIER_5;
        }
        
        // Tier 4 - Significant
        if (scope === 'major-feature' || impact === 'substantial-change' || risk === 'medium') {
            return PermissionTiers.TIER_4;
        }
        
        // Tier 3 - Moderate
        if (scope === 'noticeable-change' || impact === 'some-impact' || risk === 'low') {
            return PermissionTiers.TIER_3;
        }
        
        // Tier 2 - Low Impact
        if (scope === 'minor-improvement' || impact === 'minimal-change' || risk === 'minimal') {
            return PermissionTiers.TIER_2;
        }
        
        // Tier 1 - Minor (default)
        return PermissionTiers.TIER_1;
    }

    // Process an operation based on its tier
    async processOperation(operation) {
        const tier = this.determineTier(operation);
        const operationId = this.generateOperationId();
        
        console.log(`🔒 Processing ${operation.name} - Tier ${tier.level}: ${tier.name}`);
        
        switch (tier.level) {
            case 1:
                return await this.processTier1(operation, operationId);
            case 2:
                return await this.processTier2(operation, operationId);
            case 3:
                return await this.processTier3(operation, operationId);
            case 4:
                return await this.processTier4(operation, operationId);
            case 5:
                return await this.processTier5(operation, operationId);
            default:
                throw new Error(`Invalid tier level: ${tier.level}`);
        }
    }

    // Tier 1: Automatic processing
    async processTier1(operation, operationId) {
        this.dailyReportData.tier1Count++;
        
        // Execute immediately
        const result = await this.executeOperation(operation);
        
        // Log for daily report
        this.dailyReportData.completedActions.push({
            id: operationId,
            tier: 1,
            operation: operation.name,
            timestamp: new Date().toISOString(),
            result: 'completed',
            details: result
        });
        
        return {
            approved: true,
            tier: 1,
            message: 'Operation completed automatically (Tier 1)',
            operationId,
            result
        };
    }

    // Tier 2: Automatic with notification
    async processTier2(operation, operationId) {
        this.dailyReportData.tier2Count++;
        
        // Execute immediately
        const result = await this.executeOperation(operation);
        
        // Send immediate notification
        await this.sendNotification(operation, 2, 'completed');
        
        // Log for daily report
        this.dailyReportData.completedActions.push({
            id: operationId,
            tier: 2,
            operation: operation.name,
            timestamp: new Date().toISOString(),
            result: 'completed',
            details: result
        });
        
        return {
            approved: true,
            tier: 2,
            message: 'Operation completed with notification (Tier 2)',
            operationId,
            result
        };
    }

    // Tier 3: Automatic with detailed notification
    async processTier3(operation, operationId) {
        this.dailyReportData.tier3Count++;
        
        // Execute immediately
        const result = await this.executeOperation(operation);
        
        // Send detailed notification
        await this.sendDetailedNotification(operation, 3, 'completed');
        
        // Log for daily report
        this.dailyReportData.completedActions.push({
            id: operationId,
            tier: 3,
            operation: operation.name,
            timestamp: new Date().toISOString(),
            result: 'completed',
            details: result
        });
        
        return {
            approved: true,
            tier: 3,
            message: 'Operation completed with detailed notification (Tier 3)',
            operationId,
            result
        };
    }

    // Tier 4: Approval required
    async processTier4(operation, operationId) {
        this.dailyReportData.tier4Count++;
        
        // Create approval request
        const approvalRequest = {
            id: operationId,
            tier: 4,
            operation: operation.name,
            description: operation.description,
            impact: operation.impact,
            risk: operation.risk,
            proposedChanges: operation.changes,
            timestamp: new Date().toISOString(),
            status: 'pending_approval',
            urgency: operation.urgency || 'normal'
        };
        
        // Add to pending approvals
        this.pendingApprovals.set(operationId, approvalRequest);
        this.dailyReportData.pendingApprovals.push(approvalRequest);
        
        // Send approval request
        await this.sendApprovalRequest(approvalRequest);
        
        return {
            approved: false,
            tier: 4,
            message: 'Operation requires approval (Tier 4)',
            operationId,
            approvalRequest
        };
    }

    // Tier 5: Overhaul approval required
    async processTier5(operation, operationId) {
        this.dailyReportData.tier5Count++;
        
        // Create comprehensive approval request
        const approvalRequest = {
            id: operationId,
            tier: 5,
            operation: operation.name,
            description: operation.description,
            impact: operation.impact,
            risk: operation.risk,
            proposedChanges: operation.changes,
            testingPlan: operation.testingPlan,
            rollbackPlan: operation.rollbackPlan,
            timeline: operation.timeline,
            timestamp: new Date().toISOString(),
            status: 'pending_approval',
            urgency: operation.urgency || 'high'
        };
        
        // Add to pending approvals
        this.pendingApprovals.set(operationId, approvalRequest);
        this.dailyReportData.pendingApprovals.push(approvalRequest);
        
        // Send comprehensive approval request
        await this.sendComprehensiveApprovalRequest(approvalRequest);
        
        return {
            approved: false,
            tier: 5,
            message: 'Operation requires comprehensive approval (Tier 5)',
            operationId,
            approvalRequest
        };
    }

    // Execute an operation
    async executeOperation(operation) {
        try {
            console.log(`🚀 Executing operation: ${operation.name}`);
            
            // Simulate operation execution
            const result = await operation.execute();
            
            console.log(`✅ Operation completed: ${operation.name}`);
            return result;
            
        } catch (error) {
            console.error(`❌ Operation failed: ${operation.name}`, error);
            throw error;
        }
    }

    // Send notification for Tier 2
    async sendNotification(operation, tier, status) {
        try {
            // Send immediate email notification
            await this.emailConfig.sendImmediateNotification(operation, tier);
            
            const notification = {
                type: 'tier2_notification',
                tier,
                operation: operation.name,
                status,
                timestamp: new Date().toISOString(),
                message: `Tier ${tier} operation completed: ${operation.name}`
            };
            
            console.log(`📢 Tier ${tier} notification sent via email`);
            return notification;
            
        } catch (error) {
            console.error(`❌ Tier ${tier} notification failed:`, error);
            return null;
        }
    }

    // Send detailed notification for Tier 3
    async sendDetailedNotification(operation, tier, status) {
        try {
            // Send detailed email notification
            await this.emailConfig.sendImmediateNotification(operation, tier);
            
            const notification = {
                type: 'tier3_detailed_notification',
                tier,
                operation: operation.name,
                status,
                timestamp: new Date().toISOString(),
                message: `Tier ${tier} operation completed: ${operation.name}`,
                details: {
                    impact: operation.impact,
                    changes: operation.changes,
                    risk: operation.risk
                }
            };
            
            console.log(`📢 Tier ${tier} detailed notification sent via email`);
            return notification;
            
        } catch (error) {
            console.error(`❌ Tier ${tier} detailed notification failed:`, error);
            return null;
        }
    }

    // Send approval request for Tier 4
    async sendApprovalRequest(approvalRequest) {
        const request = {
            type: 'tier4_approval_request',
            ...approvalRequest,
            message: `Tier 4 approval required for: ${approvalRequest.operation}`,
            actionRequired: 'Please review and approve/reject this operation'
        };
        
        console.log(`🔐 Tier 4 approval request sent:`, request);
        // Here you would implement actual approval request sending
    }

    // Send comprehensive approval request for Tier 5
    async sendComprehensiveApprovalRequest(approvalRequest) {
        try {
            // Send comprehensive approval request email
            await this.emailConfig.sendApprovalRequest(approvalRequest);
            
            const request = {
                type: 'tier5_comprehensive_approval_request',
                ...approvalRequest,
                message: `Tier 5 comprehensive approval required for: ${approvalRequest.operation}`,
                actionRequired: 'This is a system overhaul - comprehensive review required',
                testingPlan: approvalRequest.testingPlan,
                rollbackPlan: approvalRequest.rollbackPlan,
                timeline: approvalRequest.timeline
            };
            
            console.log(`🔐 Tier 5 comprehensive approval request sent via email`);
            return request;
            
        } catch (error) {
            console.error(`❌ Tier 5 comprehensive approval request failed:`, error);
            return null;
        }
    }

    // Approve an operation
    async approveOperation(operationId, approver, comments = '') {
        const approvalRequest = this.pendingApprovals.get(operationId);
        
        if (!approvalRequest) {
            throw new Error(`Approval request not found: ${operationId}`);
        }
        
        // Update approval status
        approvalRequest.status = 'approved';
        approvalRequest.approvedBy = approver;
        approvalRequest.approvedAt = new Date().toISOString();
        approvalRequest.approvalComments = comments;
        
        // Remove from pending approvals
        this.pendingApprovals.delete(operationId);
        
        // Execute the operation
        const result = await this.executeOperation(approvalRequest.operation);
        
        // Log approval
        this.approvalHistory.set(operationId, {
            ...approvalRequest,
            result,
            executedAt: new Date().toISOString()
        });
        
        // Update daily report
        this.dailyReportData.completedActions.push({
            id: operationId,
            tier: approvalRequest.tier,
            operation: approvalRequest.operation.name,
            timestamp: new Date().toISOString(),
            result: 'approved_and_completed',
            approver,
            comments
        });
        
        return {
            approved: true,
            message: `Operation approved and executed by ${approver}`,
            result
        };
    }

    // Reject an operation
    async rejectOperation(operationId, rejector, reason = '') {
        const approvalRequest = this.pendingApprovals.get(operationId);
        
        if (!approvalRequest) {
            throw new Error(`Approval request not found: ${operationId}`);
        }
        
        // Update rejection status
        approvalRequest.status = 'rejected';
        approvalRequest.rejectedBy = rejector;
        approvalRequest.rejectedAt = new Date().toISOString();
        approvalRequest.rejectionReason = reason;
        
        // Remove from pending approvals
        this.pendingApprovals.delete(operationId);
        
        // Log rejection
        this.approvalHistory.set(operationId, {
            ...approvalRequest,
            result: 'rejected'
        });
        
        return {
            approved: false,
            message: `Operation rejected by ${rejector}`,
            reason
        };
    }

    // Generate daily report
    generateDailyReport() {
        const report = {
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString(),
            summary: {
                totalOperations: this.dailyReportData.tier1Count + this.dailyReportData.tier2Count + 
                                this.dailyReportData.tier3Count + this.dailyReportData.tier4Count + 
                                this.dailyReportData.tier5Count,
                tier1Count: this.dailyReportData.tier1Count,
                tier2Count: this.dailyReportData.tier2Count,
                tier3Count: this.dailyReportData.tier3Count,
                tier4Count: this.dailyReportData.tier4Count,
                tier5Count: this.dailyReportData.tier5Count
            },
            pendingApprovals: this.dailyReportData.pendingApprovals,
            completedActions: this.dailyReportData.completedActions,
            systemHealth: this.dailyReportData.systemHealth,
            recommendations: this.generateRecommendations()
        };
        
        return report;
    }

    // Generate recommendations based on daily data
    generateRecommendations() {
        const recommendations = [];
        
        if (this.dailyReportData.tier4Count > 0 || this.dailyReportData.tier5Count > 0) {
            recommendations.push('⚠️ High-tier operations pending approval - review required');
        }
        
        if (this.dailyReportData.tier1Count > 100) {
            recommendations.push('📊 High volume of minor operations - consider batching');
        }
        
        if (this.dailyReportData.pendingApprovals.length > 5) {
            recommendations.push('⏰ Multiple approvals pending - consider batch review');
        }
        
        return recommendations;
    }

    // Generate operation ID
    generateOperationId() {
        return `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Get pending approvals
    getPendingApprovals() {
        return Array.from(this.pendingApprovals.values());
    }

    // Get approval history
    getApprovalHistory() {
        return Array.from(this.approvalHistory.values());
    }

    // Reset daily report data
    resetDailyReport() {
        this.dailyReportData = {
            tier1Count: 0,
            tier2Count: 0,
            tier3Count: 0,
            tier4Count: 0,
            tier5Count: 0,
            pendingApprovals: [],
            completedActions: [],
            systemHealth: 'operational'
        };
    }
}

// Export the permission system
module.exports = {
    PermissionTiers,
    PermissionManager
};
