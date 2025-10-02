
/* ================================================================
                    ESQs INFO BUTTON SYSTEM
================================================================ */

// Add this script to the end of index.html before </body>

const ESQsInfoSystem = {
    initialized: false,
    
    init() {
        if (this.initialized) return;
        this.addStyles();
        this.createInfoButtons();
        this.setupEventListeners();
        this.initialized = true;
        console.log(' ESQs Info System Initialized');
    },

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
        .esqs-info-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #667eea;
            color: white;
            border: 2px solid white;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            margin-left: 8px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            position: relative;
            z-index: 100;
        }

        .esqs-info-btn:hover {
            background: #5a67d8;
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .esqs-info-tooltip {
            position: absolute;
            background: #2d3748;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            max-width: 280px;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            pointer-events: none;
            box-shadow: 0 8px 24px rgba(0,0,0,0.4);
            top: 100%;
            left: 50%;
            margin-left: -140px;
            margin-top: 8px;
        }

        .esqs-info-tooltip.show {
            opacity: 1;
            transform: translateY(0);
        }

        .esqs-info-tooltip::before {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            margin-left: -6px;
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent #2d3748 transparent;
        }

        .esqs-help-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .esqs-help-modal.show {
            opacity: 1;
            visibility: visible;
        }

        .esqs-help-content {
            background: white;
            padding: 30px;
            border-radius: 16px;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        }

        .esqs-help-modal.show .esqs-help-content {
            transform: scale(1);
        }

        .esqs-help-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 3px solid #e2e8f0;
        }

        .esqs-help-title {
            font-size: 28px;
            font-weight: bold;
            color: #667eea;
            margin: 0;
        }

        .esqs-help-close {
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #a0aec0;
            padding: 0;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .esqs-help-close:hover {
            background: #edf2f7;
            color: #4a5568;
        }

        .esqs-info-section {
            margin-bottom: 25px;
        }

        .esqs-info-section h3 {
            color: #4a5568;
            margin-bottom: 12px;
            font-size: 20px;
            display: flex;
            align-items: center;
        }

        .esqs-info-section p {
            color: #718096;
            line-height: 1.7;
            margin-bottom: 12px;
            font-size: 16px;
        }

        .esqs-info-list {
            color: #718096;
            padding-left: 20px;
        }

        .esqs-info-list li {
            margin-bottom: 10px;
            line-height: 1.6;
        }

        .esqs-info-list strong {
            color: #667eea;
        }

        .esqs-feature-badge {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-left: 10px;
        }
        `;
        document.head.appendChild(style);
    },

    infoData: {
        'team-selection': {
            title: ' Smart Team Selection',
            tooltip: 'Choose your legal team member for personalized AI assistance',
            content: `
                <div class="esqs-info-section">
                    <h3> Personalized Legal AI <span class="esqs-feature-badge">NEW</span></h3>
                    <p>Each team member has customized AI assistance based on their practice areas and expertise:</p>
                    <ul class="esqs-info-list">
                        <li><strong>Jessica:</strong> Family Law & Divorce specialization</li>
                        <li><strong>John:</strong> Personal Injury & Criminal Defense</li>
                        <li><strong>Jordan:</strong> Business Law & Contract drafting</li>
                        <li><strong>Travis:</strong> Estate Planning & Probate</li>
                        <li><strong>Jo:</strong> General Practice & Legal Research</li>
                    </ul>
                </div>
                <div class="esqs-info-section">
                    <h3> AI Capabilities Per Attorney</h3>
                    <ul class="esqs-info-list">
                        <li><strong>Custom Document Templates:</strong> Practice-area specific forms</li>
                        <li><strong>Smart Case Intake:</strong> Automated screening and qualification</li>
                        <li><strong>Legal Research Assistant:</strong> Jurisdiction-specific research</li>
                        <li><strong>Client Communication:</strong> Automated updates and correspondence</li>
                    </ul>
                </div>
            `
        },
        'ai-features': {
            title: ' AI-Powered Legal Tools',
            tooltip: 'Advanced AI features that save time and improve accuracy',
            content: `
                <div class="esqs-info-section">
                    <h3> AI Document Drafting <span class="esqs-feature-badge">85% TIME SAVINGS</span></h3>
                    <p>Generate legal documents in minutes, not hours:</p>
                    <ul class="esqs-info-list">
                        <li><strong>Contract Generation:</strong> AI-powered contract creation</li>
                        <li><strong>Template Library:</strong> 500+ legal document templates</li>
                        <li><strong>Real-time Assistance:</strong> Writing suggestions and improvements</li>
                        <li><strong>Compliance Checking:</strong> Automatic jurisdiction validation</li>
                    </ul>
                </div>
                <div class="esqs-info-section">
                    <h3> Smart Case Intake <span class="esqs-feature-badge">3X CONVERSION</span></h3>
                    <ul class="esqs-info-list">
                        <li><strong>AI Screening:</strong> Automatic case viability assessment</li>
                        <li><strong>Lead Qualification:</strong> 15 minutes  2 minutes</li>
                        <li><strong>24/7 Availability:</strong> Capture leads anytime</li>
                        <li><strong>Smart Routing:</strong> Direct to appropriate attorney</li>
                    </ul>
                </div>
                <div class="esqs-info-section">
                    <h3> Mobile AI Features <span class="esqs-feature-badge">INDUSTRY FIRST</span></h3>
                    <ul class="esqs-info-list">
                        <li><strong>Court Prep Mobile:</strong> Prepare arguments on-the-go</li>
                        <li><strong>Voice-to-Text:</strong> AI-enhanced dictation</li>
                        <li><strong>Mobile Research:</strong> Legal research from anywhere</li>
                        <li><strong>Offline Capable:</strong> Core features work without internet</li>
                    </ul>
                </div>
            `
        },
        'competitive-advantage': {
            title: ' Competitive Advantages',
            tooltip: 'Why ESQs Platform beats the competition',
            content: `
                <div class="esqs-info-section">
                    <h3> Cost Comparison <span class="esqs-feature-badge">60% SAVINGS</span></h3>
                    <p>All-inclusive pricing that saves money:</p>
                    <ul class="esqs-info-list">
                        <li><strong>ESQs Platform:</strong> $200/month (everything included)</li>
                        <li><strong>Competitors:</strong> $300-500/month + AI addon fees</li>
                        <li><strong>No Hidden Fees:</strong> AI, storage, support all included</li>
                        <li><strong>Cancel Anytime:</strong> No long-term contracts</li>
                    </ul>
                </div>
                <div class="esqs-info-section">
                    <h3> Speed Advantages</h3>
                    <ul class="esqs-info-list">
                        <li><strong>Document Drafting:</strong> 50% faster than competitors</li>
                        <li><strong>Case Intake:</strong> 87% time reduction vs manual</li>
                        <li><strong>Client Communication:</strong> 70% efficiency improvement</li>
                        <li><strong>Mobile Access:</strong> Features competitors don't have</li>
                    </ul>
                </div>
                <div class="esqs-info-section">
                    <h3> Small Firm Focused</h3>
                    <ul class="esqs-info-list">
                        <li><strong>Built for <10 Attorney Firms:</strong> Not enterprise bloat</li>
                        <li><strong>AI-First Design:</strong> Not bolted-on AI features</li>
                        <li><strong>Simple Setup:</strong> Working in minutes, not weeks</li>
                        <li><strong>Personal Support:</strong> Direct access to development team</li>
                    </ul>
                </div>
            `
        }
    },

    createInfoButtons() {
        // Add info button to team selection
        const teamSelection = document.querySelector('.team-selection h2');
        if (teamSelection && !teamSelection.querySelector('.esqs-info-btn')) {
            this.addInfoButton(teamSelection, 'team-selection');
        }

        // Add info button for AI features (create section if needed)
        if (!document.querySelector('.ai-features-info')) {
            const container = document.querySelector('.container');
            const aiSection = document.createElement('div');
            aiSection.className = 'team-selection ai-features-info';
            aiSection.innerHTML = `
                <h2> AI-Powered Legal Tools</h2>
                <p style="text-align: center; color: #718096; margin-bottom: 20px;">
                    Advanced artificial intelligence designed specifically for small law firms
                </p>
            `;
            container.insertBefore(aiSection, document.querySelector('.team-selection'));
            this.addInfoButton(aiSection.querySelector('h2'), 'ai-features');
        }

        // Add competitive advantage section
        if (!document.querySelector('.competitive-info')) {
            const container = document.querySelector('.container');
            const compSection = document.createElement('div');
            compSection.className = 'team-selection competitive-info';
            compSection.innerHTML = `
                <h2> Why Choose ESQs Platform</h2>
                <p style="text-align: center; color: #718096;">
                    60% cost savings, 50% faster workflows, AI-first design for small firms
                </p>
            `;
            container.appendChild(compSection);
            this.addInfoButton(compSection.querySelector('h2'), 'competitive-advantage');
        }
    },

    addInfoButton(element, infoKey) {
        const button = document.createElement('button');
        button.className = 'esqs-info-btn';
        button.innerHTML = 'i';
        button.setAttribute('data-info', infoKey);
        button.setAttribute('title', this.infoData[infoKey].tooltip);
        element.appendChild(button);
    },

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('esqs-info-btn')) {
                const infoKey = e.target.getAttribute('data-info');
                this.showModal(infoKey);
            }
            if (e.target.classList.contains('esqs-help-modal') || 
                e.target.classList.contains('esqs-help-close')) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    },

    showModal(infoKey) {
        const data = this.infoData[infoKey];
        if (!data) return;

        const modal = document.createElement('div');
        modal.className = 'esqs-help-modal';
        modal.innerHTML = `
            <div class="esqs-help-content">
                <div class="esqs-help-header">
                    <h2 class="esqs-help-title">${data.title}</h2>
                    <button class="esqs-help-close"></button>
                </div>
                ${data.content}
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    },

    closeModal() {
        const modal = document.querySelector('.esqs-help-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ESQsInfoSystem.init());
} else {
    ESQsInfoSystem.init();
}

