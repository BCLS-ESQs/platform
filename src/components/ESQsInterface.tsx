'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
    SparklesIcon, 
    DocumentTextIcon, 
    UserGroupIcon, 
    ChartBarIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    BeakerIcon,
    BookOpenIcon,
    GlobeAltIcon,
    CpuChipIcon,
    LightBulbIcon
} from '@heroicons/react/24/outline';

interface SystemStatus {
    systemName: string;
    version: string;
    status: string;
    integrations: {
        practicePanther: boolean;
        lawMatrix: boolean;
        synthiaAI: boolean;
        officeIntelligence: boolean;
    };
    performance: {
        totalQueries: number;
        averageResponseTime: string;
        accuracyRate: string;
        clientSatisfaction: string;
        costSavings: string;
    };
}

interface ESQsResponse {
    synthesized: string;
    confidenceScore: number;
    modelContributions: {
        [key: string]: string;
    };
    officeSpecificRecommendations: string[];
    estimatedBillingTime: {
        actualESQsTime: number;
        reasonableLawyerTime: number;
        billingRecommendation: number;
        ethicalCheck: string;
    };
    nextSteps: string[];
}

export default function ESQsInterface() {
    const [query, setQuery] = useState('');
    const [selectedTeamMember, setSelectedTeamMember] = useState('JWA');
    const [isProcessing, setIsProcessing] = useState(false);
    const [response, setResponse] = useState<ESQsResponse | null>(null);
    const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);

    const teamMembers = useMemo(() => [
        { code: 'JWA', name: 'John W Adams', role: 'Attorney', color: 'bg-blue-500' },
        { code: 'TRC', name: 'Travis R. Christiansen', role: 'Principal Attorney', color: 'bg-green-500' },
        { code: 'JM', name: 'Josephine Millar', role: 'Paralegal', color: 'bg-purple-500' },
        { code: 'JG', name: 'Jordan Gubler', role: 'Administrative', color: 'bg-orange-500' },
        { code: 'JB', name: 'Jessica Byergo', role: 'Client Relations', color: 'bg-pink-500' }
    ], []);

    const handleTeamMemberChange = (newTeamMember: string) => {
        setSelectedTeamMember(newTeamMember);
        // Save to localStorage for persistence
        localStorage.setItem('esqs-selected-team-member', newTeamMember);
    };

    // Mock ESQs integration
    useEffect(() => {
        // Load saved team member preference from localStorage
        const savedTeamMember = localStorage.getItem('esqs-selected-team-member');
        if (savedTeamMember && teamMembers.find(tm => tm.code === savedTeamMember)) {
            setSelectedTeamMember(savedTeamMember);
        }

        // Simulate system initialization
        setTimeout(() => {
            setSystemStatus({
                systemName: "ESQs - Enhanced Synthesized Quintessential System",
                version: "4.5.2",
                status: "fully_operational",
                integrations: {
                    practicePanther: true,
                    lawMatrix: true,
                    synthiaAI: true,
                    officeIntelligence: true
                },
                performance: {
                    totalQueries: 15847,
                    averageResponseTime: "1.2 seconds",
                    accuracyRate: "97.8%",
                    clientSatisfaction: "94.2%",
                    costSavings: "60% vs traditional methods"
                }
            });
        }, 1000);
    }, [teamMembers]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsProcessing(true);
        
        // Simulate ESQs processing
        setTimeout(() => {
            const mockResponse: ESQsResponse = {
                synthesized: `Enhanced multi-model analysis for: "${query}"`,
                confidenceScore: 0.94,
                modelContributions: {
                    claude: "Complex legal reasoning and document structure",
                    xai: "Creative problem-solving and alternative approaches", 
                    perplexity: "Legal research and current case law citations"
                },
                officeSpecificRecommendations: [
                    `Consider ${teamMembers.find(tm => tm.code === selectedTeamMember)?.name}'s specialization`,
                    "Utilize LAW Matrix for similar case precedents",
                    "Review PracticePanther for client history and billing rates"
                ],
                estimatedBillingTime: {
                    actualESQsTime: 15,
                    reasonableLawyerTime: 33,
                    billingRecommendation: 0.55,
                    ethicalCheck: "Within 1.5x actual time limit"
                },
                nextSteps: [
                    "Save response to client folder in Dropbox archive",
                    "Log billing time in PracticePanther",
                    "Schedule follow-up if client consultation needed"
                ]
            };
            
            setResponse(mockResponse);
            setIsProcessing(false);
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <SparklesIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900">ESQs Platform</h1>
                                <p className="text-sm text-slate-600">Enhanced Synthesized Quintessential System</p>
                            </div>
                        </div>
                        
                        {systemStatus && (
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-900">v{systemStatus.version}</p>
                                    <p className="text-xs text-green-600 flex items-center">
                                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                                        {systemStatus.status.replace('_', ' ')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* System Status Dashboard */}
                {systemStatus && (
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Total Queries</p>
                                    <p className="text-2xl font-bold text-slate-900">{systemStatus.performance.totalQueries.toLocaleString()}</p>
                                </div>
                                <ChartBarIcon className="w-8 h-8 text-blue-500" />
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Accuracy Rate</p>
                                    <p className="text-2xl font-bold text-green-600">{systemStatus.performance.accuracyRate}</p>
                                </div>
                                <CheckCircleIcon className="w-8 h-8 text-green-500" />
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Response Time</p>
                                    <p className="text-2xl font-bold text-purple-600">{systemStatus.performance.averageResponseTime}</p>
                                </div>
                                <ClockIcon className="w-8 h-8 text-purple-500" />
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-600">Cost Savings</p>
                                    <p className="text-2xl font-bold text-orange-600">{systemStatus.performance.costSavings}</p>
                                </div>
                                <LightBulbIcon className="w-8 h-8 text-orange-500" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Query Interface */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <BeakerIcon className="w-6 h-6 mr-2" />
                                    ESQs AI Assistant
                                </h2>
                                <p className="text-blue-100 mt-1">Multi-model legal intelligence for John W Adams Law Office</p>
                            </div>
                            
                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Team Member Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-3">Select Team Member</label>
                                        <div className="relative">
                                            <select
                                                value={selectedTeamMember}
                                                onChange={(e) => handleTeamMemberChange(e.target.value)}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 appearance-none"
                                                title="Select team member for ESQs query"
                                                aria-label="Select team member"
                                            >
                                                {teamMembers.map((member) => (
                                                    <option key={member.code} value={member.code}>
                                                        {member.code} - {member.name} ({member.role})
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">
                                            Your selection will be remembered for future sessions
                                        </p>
                                    </div>

                                    {/* Query Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Legal Query</label>
                                        <textarea
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Enter your legal question, request for document drafting, case analysis, or research query..."
                                            className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            disabled={isProcessing}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={!query.trim() || isProcessing}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Processing with AI Models...
                                            </>
                                        ) : (
                                            <>
                                                <SparklesIcon className="w-5 h-5 mr-2" />
                                                Generate ESQs Response
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Response Display */}
                                {response && (
                                    <div className="mt-8 space-y-6">
                                        <div className="border-t border-slate-200 pt-6">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                                <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                                                ESQs Analysis Result
                                            </h3>
                                            
                                            {/* Confidence Score */}
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-green-800">Confidence Score</span>
                                                    <span className="text-lg font-bold text-green-600">{(response.confidenceScore * 100).toFixed(1)}%</span>
                                                </div>
                                                <div className="mt-2 bg-green-200 rounded-full h-2">
                                                    <div 
                                                        className={`bg-green-600 h-2 rounded-full transition-all duration-500`}
                                                        data-width={`${response.confidenceScore * 100}%`}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Synthesized Response */}
                                            <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                                <h4 className="font-medium text-slate-900 mb-2">Multi-Model Analysis</h4>
                                                <p className="text-slate-700">{response.synthesized}</p>
                                            </div>

                                            {/* Model Contributions */}
                                            <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                                <h4 className="font-medium text-slate-900 mb-3 flex items-center">
                                                    <CpuChipIcon className="w-4 h-4 mr-2" />
                                                    AI Model Contributions
                                                </h4>
                                                <div className="space-y-2">
                                                    {Object.entries(response.modelContributions).map(([model, contribution]) => (
                                                        <div key={model} className="flex items-start space-x-3">
                                                            <span className="inline-block w-16 text-xs font-medium text-blue-600 uppercase">{model}</span>
                                                            <span className="text-sm text-slate-700">{contribution}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Office Recommendations */}
                                            <div className="bg-purple-50 rounded-lg p-4 mb-4">
                                                <h4 className="font-medium text-slate-900 mb-3">Office-Specific Recommendations</h4>
                                                <ul className="space-y-1">
                                                    {response.officeSpecificRecommendations.map((rec, index) => (
                                                        <li key={index} className="text-sm text-slate-700 flex items-start">
                                                            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                            {rec}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Billing Information */}
                                            <div className="bg-orange-50 rounded-lg p-4 mb-4">
                                                <h4 className="font-medium text-slate-900 mb-3">Billing Analysis</h4>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-slate-600">ESQs Time:</span>
                                                        <span className="font-medium text-slate-900 ml-2">{response.estimatedBillingTime.actualESQsTime} min</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-600">Billing Time:</span>
                                                        <span className="font-medium text-slate-900 ml-2">{response.estimatedBillingTime.reasonableLawyerTime} min</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-600">Billing Hours:</span>
                                                        <span className="font-medium text-slate-900 ml-2">{response.estimatedBillingTime.billingRecommendation}h</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-slate-600">Ethics Check:</span>
                                                        <span className="font-medium text-green-600 ml-2">✓ Compliant</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Next Steps */}
                                            <div className="bg-slate-50 rounded-lg p-4">
                                                <h4 className="font-medium text-slate-900 mb-3">Recommended Next Steps</h4>
                                                <ul className="space-y-1">
                                                    {response.nextSteps.map((step, index) => (
                                                        <li key={index} className="text-sm text-slate-700 flex items-start">
                                                            <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-medium flex items-center justify-center mr-2 mt-0.5">
                                                                {index + 1}
                                                            </span>
                                                            {step}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Team Members */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                <UserGroupIcon className="w-5 h-5 mr-2 text-blue-600" />
                                Team Members
                            </h3>
                            <div className="space-y-3">
                                {teamMembers.map((member) => (
                                    <div key={member.code} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                        <div className={`w-3 h-3 rounded-full ${member.color}`}></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900">{member.name}</p>
                                            <p className="text-xs text-slate-600">{member.role}</p>
                                        </div>
                                        <span className="text-xs text-slate-500 font-mono">{member.code}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System Integrations */}
                        {systemStatus && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                    <GlobeAltIcon className="w-5 h-5 mr-2 text-blue-600" />
                                    System Integrations
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(systemStatus.integrations).map(([system, status]) => (
                                        <div key={system} className="flex items-center justify-between">
                                            <span className="text-sm text-slate-700 capitalize">{system.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            {status ? (
                                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                                <BookOpenIcon className="w-5 h-5 mr-2 text-blue-600" />
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-700">
                                    Draft Contract Template
                                </button>
                                <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-700">
                                    Research Case Law
                                </button>
                                <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-700">
                                    Client Communication
                                </button>
                                <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-700">
                                    Billing Analysis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
