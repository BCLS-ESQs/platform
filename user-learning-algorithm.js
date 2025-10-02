// USER ADAPTIVE LEARNING ENGINE
// Collects pertinent data and develops personalized improvements

class UserAdaptiveLearning {
    constructor(userId) {
        this.userId = userId;
        this.learningData = {
            preferences: {},
            patterns: {},
            efficiency: {},
            improvements: []
        };
        this.initializeUserProfile();
    }

    // CORE LEARNING FUNCTIONS
    
    trackUserInteraction(action, context = {}) {
        const timestamp = new Date().toISOString();
        const interaction = {
            action,
            timestamp,
            context,
            sessionId: this.getCurrentSession()
        };
        
        // Store interaction
        this.storeInteraction(interaction);
        
        // Analyze patterns
        this.analyzeUserPatterns(interaction);
        
        // Generate improvements
        this.generateImprovements();
        
        console.log(` User Learning: ${action} tracked`);
    }

    analyzeUserPatterns(interaction) {
        const { action, timestamp, context } = interaction;
        const hour = new Date(timestamp).getHours();
        const day = new Date(timestamp).getDay();
        
        // Time-based patterns
        this.learningData.patterns.timePreferences = this.learningData.patterns.timePreferences || {};
        this.learningData.patterns.timePreferences[hour] = (this.learningData.patterns.timePreferences[hour] || 0) + 1;
        
        // Feature usage patterns
        this.learningData.patterns.featureUsage = this.learningData.patterns.featureUsage || {};
        this.learningData.patterns.featureUsage[action] = (this.learningData.patterns.featureUsage[action] || 0) + 1;
        
        // Workflow sequences
        this.trackWorkflowSequence(action);
        
        // Efficiency tracking
        this.trackEfficiency(action, context);
    }

    trackWorkflowSequence(action) {
        if (!this.learningData.patterns.workflows) {
            this.learningData.patterns.workflows = [];
        }
        
        // Add to current workflow
        const currentWorkflow = this.learningData.patterns.workflows[this.learningData.patterns.workflows.length - 1] || [];
        currentWorkflow.push({
            action,
            timestamp: Date.now()
        });
        
        // Detect common sequences
        this.detectCommonSequences();
    }

    detectCommonSequences() {
        const workflows = this.learningData.patterns.workflows;
        const sequences = {};
        
        workflows.forEach(workflow => {
            for (let i = 0; i < workflow.length - 1; i++) {
                const sequence = `${workflow[i].action} -> ${workflow[i + 1].action}`;
                sequences[sequence] = (sequences[sequence] || 0) + 1;
            }
        });
        
        // Store most common sequences
        this.learningData.patterns.commonSequences = Object.entries(sequences)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
    }

    trackEfficiency(action, context) {
        const startTime = context.startTime || Date.now();
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        if (!this.learningData.efficiency[action]) {
            this.learningData.efficiency[action] = {
                totalTime: 0,
                completions: 0,
                averageTime: 0
            };
        }
        
        const eff = this.learningData.efficiency[action];
        eff.totalTime += duration;
        eff.completions += 1;
        eff.averageTime = eff.totalTime / eff.completions;
    }

    generateImprovements() {
        const improvements = [];
        
        // Time-based improvements
        const bestHours = this.getBestPerformanceHours();
        if (bestHours.length > 0) {
            improvements.push({
                type: 'schedule',
                suggestion: `You're most productive between ${bestHours.join(' and ')}. Consider scheduling important tasks during these times.`,
                priority: 'high',
                data: bestHours
            });
        }
        
        // Workflow improvements
        const commonSequences = this.learningData.patterns.commonSequences || [];
        if (commonSequences.length > 0) {
            improvements.push({
                type: 'workflow',
                suggestion: `You frequently do: ${commonSequences[0][0]}. We can create a shortcut for this workflow.`,
                priority: 'medium',
                data: commonSequences[0]
            });
        }
        
        // Efficiency improvements
        const slowActions = this.getSlowActions();
        slowActions.forEach(action => {
            improvements.push({
                type: 'efficiency',
                suggestion: `${action.name} takes longer than average. We can provide automation or training to speed this up.`,
                priority: 'medium',
                data: action
            });
        });
        
        // Feature recommendations
        const underusedFeatures = this.getUnderusedFeatures();
        underusedFeatures.forEach(feature => {
            improvements.push({
                type: 'feature',
                suggestion: `Try ${feature.name} - it could save you time based on your current workflow.`,
                priority: 'low',
                data: feature
            });
        });
        
        this.learningData.improvements = improvements;
        return improvements;
    }

    getBestPerformanceHours() {
        const timePrefs = this.learningData.patterns.timePreferences || {};
        return Object.entries(timePrefs)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2)
            .map(([hour]) => {
                const h = parseInt(hour);
                return h < 12 ? `${h}:00 AM` : `${h-12 || 12}:00 PM`;
            });
    }

    getSlowActions() {
        const efficiency = this.learningData.efficiency;
        const avgTimes = Object.entries(efficiency)
            .map(([action, data]) => ({
                name: action,
                avgTime: data.averageTime,
                completions: data.completions
            }))
            .filter(item => item.completions > 3)
            .sort((a, b) => b.avgTime - a.avgTime);
        
        return avgTimes.slice(0, 3);
    }

    getUnderusedFeatures() {
        const allFeatures = ['analytics', 'automation', 'collaboration', 'reporting', 'shortcuts'];
        const usedFeatures = Object.keys(this.learningData.patterns.featureUsage || {});
        
        return allFeatures
            .filter(feature => !usedFeatures.includes(feature))
            .map(feature => ({
                name: feature,
                benefit: this.getFeatureBenefit(feature)
            }));
    }

    getFeatureBenefit(feature) {
        const benefits = {
            analytics: 'Provides insights into your productivity patterns',
            automation: 'Automates repetitive tasks to save time',
            collaboration: 'Improves team communication efficiency',
            reporting: 'Generates automatic progress reports',
            shortcuts: 'Quick access to your most-used functions'
        };
        
        return benefits[feature] || 'Enhances your workflow';
    }

    // PERSONALIZATION FUNCTIONS
    
    getPersonalizedDashboard() {
        const mostUsed = Object.entries(this.learningData.patterns.featureUsage || {})
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4);
        
        const bestTime = this.getBestPerformanceHours()[0];
        const improvements = this.learningData.improvements.filter(imp => imp.priority === 'high');
        
        return {
            welcomeMessage: this.generateWelcomeMessage(),
            quickActions: mostUsed.map(([action]) => action),
            suggestions: improvements.slice(0, 3),
            bestWorkTime: bestTime,
            efficiencyScore: this.calculateEfficiencyScore()
        };
    }

    generateWelcomeMessage() {
        const hour = new Date().getHours();
        const efficiency = this.calculateEfficiencyScore();
        const taskCount = Object.values(this.learningData.patterns.featureUsage || {}).reduce((a, b) => a + b, 0);
        
        let message = '';
        if (hour < 12) message = 'Good morning! ';
        else if (hour < 17) message = 'Good afternoon! ';
        else message = 'Good evening! ';
        
        if (efficiency > 90) {
            message += "You're on fire today! ";
        } else if (efficiency > 70) {
            message += "Great productivity flow! ";
        } else {
            message += "Let's make today productive! ";
        }
        
        if (taskCount > 10) {
            message += " You've been very active.";
        }
        
        return message;
    }

    calculateEfficiencyScore() {
        const efficiency = this.learningData.efficiency;
        const actions = Object.values(efficiency);
        
        if (actions.length === 0) return 85; // Default score
        
        const avgTime = actions.reduce((sum, action) => sum + action.averageTime, 0) / actions.length;
        const completions = actions.reduce((sum, action) => sum + action.completions, 0);
        
        // Calculate score based on completion rate and speed
        const score = Math.min(100, Math.max(0, 100 - (avgTime / 1000) + (completions * 2)));
        
        return Math.round(score);
    }

    // DATA PERSISTENCE
    
    storeInteraction(interaction) {
        // In a real app, this would save to a database
        const stored = JSON.parse(localStorage.getItem(`userLearning_${this.userId}`) || '{"interactions": []}');
        stored.interactions.push(interaction);
        stored.interactions = stored.interactions.slice(-100); // Keep last 100 interactions
        
        localStorage.setItem(`userLearning_${this.userId}`, JSON.stringify(stored));
    }

    getCurrentSession() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    exportLearningData() {
        return {
            userId: this.userId,
            learningData: this.learningData,
            dashboard: this.getPersonalizedDashboard(),
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize for current user
const userLearning = new UserAdaptiveLearning('user_' + Date.now());

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserAdaptiveLearning;
}

console.log(' User Adaptive Learning Engine Initialized');
