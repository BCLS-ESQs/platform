"""
Document Processing Module for ESQs Legal Research Integration
Enhances existing LAW Matrix capabilities with external legal database analysis
"""

import re
import json
import asyncio
from typing import Dict, List, Any, Optional
from datetime import datetime
import hashlib

class DocumentProcessor:
    """
    Enhanced document processor that integrates with existing LAW Matrix intelligence
    while adding external legal database analysis capabilities
    """
    
    def __init__(self, esqs_client):
        self.esqs_client = esqs_client
        self.document_types = {
            'pleading': ['complaint', 'answer', 'motion', 'brief'],
            'discovery': ['interrogatories', 'deposition', 'request for production'],
            'correspondence': ['letter', 'email', 'memo'],
            'contract': ['agreement', 'contract', 'lease', 'deed'],
            'court_order': ['order', 'judgment', 'decree'],
            'evidence': ['exhibit', 'affidavit', 'declaration']
        }
        
    async def analyze_document_enhanced(self, content: str, filename: str, law_matrix_analysis: Dict) -> Dict[str, Any]:
        """
        Enhanced document analysis combining LAW Matrix with external analysis
        """
        try:
            # Basic document classification
            doc_classification = self._classify_document(content, filename)
            
            # Extract entities and legal concepts
            entities = self._extract_legal_entities(content)
            
            # Identify legal issues
            legal_issues = self._identify_legal_issues(content)
            
            # Extract key dates and deadlines
            dates_deadlines = self._extract_dates_deadlines(content)
            
            # Analyze for practice area specifics
            practice_insights = self._analyze_practice_area_specifics(content, doc_classification)
            
            # Combine with LAW Matrix analysis if available
            enhanced_analysis = {
                "classification": doc_classification,
                "entities": entities,
                "legal_issues": legal_issues,
                "dates_deadlines": dates_deadlines,
                "practice_insights": practice_insights,
                "law_matrix_integration": law_matrix_analysis,
                "confidence": self._calculate_confidence(content, entities, legal_issues),
                "recommendations": self._generate_recommendations(doc_classification, legal_issues),
                "processing_timestamp": datetime.now().isoformat()
            }
            
            return enhanced_analysis
            
        except Exception as e:
            return {
                "error": f"Document analysis failed: {str(e)}",
                "classification": "unknown",
                "confidence": 0.0
            }
    
    def _classify_document(self, content: str, filename: str) -> Dict[str, Any]:
        """Classify document type based on content and filename"""
        content_lower = content.lower()
        filename_lower = filename.lower()
        
        classification_scores = {}
        
        for doc_type, keywords in self.document_types.items():
            score = 0
            for keyword in keywords:
                # Check filename
                if keyword in filename_lower:
                    score += 3
                # Check content (first 500 characters for header info)
                if keyword in content_lower[:500]:
                    score += 2
                # Check full content
                score += content_lower.count(keyword) * 0.5
            
            classification_scores[doc_type] = score
        
        # Determine primary classification
        primary_type = max(classification_scores, key=classification_scores.get)
        confidence = classification_scores[primary_type] / (sum(classification_scores.values()) + 1)
        
        return {
            "primary_type": primary_type,
            "confidence": min(confidence, 1.0),
            "all_scores": classification_scores,
            "filename_analyzed": filename
        }
    
    def _extract_legal_entities(self, content: str) -> List[Dict[str, Any]]:
        """Extract legal entities like parties, courts, case numbers"""
        entities = []
        
        # Extract case numbers (various formats)
        case_patterns = [
            r'\b\d{2,4}-\d{2,6}\b',  # 2021-123456
            r'\bCase No\.?\s*\d+[A-Z]*\d*\b',  # Case No. 12345
            r'\bCivil No\.?\s*\d+[A-Z]*\d*\b'  # Civil No. 12345
        ]
        
        for pattern in case_patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            for match in matches:
                entities.append({
                    "type": "case_number",
                    "value": match,
                    "confidence": 0.9
                })
        
        # Extract party names (simplified - between "Plaintiff" and "v." or "Defendant")
        party_pattern = r'Plaintiff[:\s]+([A-Z][a-zA-Z\s,\.]+?)(?:\s+v\.|\s+Defendant)'
        party_matches = re.findall(party_pattern, content, re.IGNORECASE)
        for match in party_matches:
            entities.append({
                "type": "party",
                "role": "plaintiff",
                "value": match.strip(),
                "confidence": 0.8
            })
        
        # Extract courts
        court_patterns = [
            r'(?:United States|U\.S\.) District Court',
            r'(?:Utah|State) Supreme Court',
            r'District Court.*(?:Utah|Washington County)',
            r'Court of Appeals'
        ]
        
        for pattern in court_patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            for match in matches:
                entities.append({
                    "type": "court",
                    "value": match,
                    "confidence": 0.85
                })
        
        return entities
    
    def _identify_legal_issues(self, content: str) -> List[Dict[str, Any]]:
        """Identify legal issues and practice areas mentioned"""
        legal_issues = []
        content_lower = content.lower()
        
        # Practice area indicators
        practice_indicators = {
            "family_law": ["divorce", "custody", "alimony", "child support", "marriage", "adoption"],
            "personal_injury": ["negligence", "accident", "injury", "damages", "medical malpractice"],
            "criminal_defense": ["criminal", "felony", "misdemeanor", "prosecution", "defense"],
            "contract_law": ["breach", "contract", "agreement", "performance", "consideration"],
            "real_estate": ["property", "deed", "mortgage", "easement", "title"],
            "estate_planning": ["will", "trust", "estate", "probate", "inheritance"]
        }
        
        for practice_area, keywords in practice_indicators.items():
            issue_score = sum(content_lower.count(keyword) for keyword in keywords)
            if issue_score > 0:
                legal_issues.append({
                    "practice_area": practice_area,
                    "keywords_found": [kw for kw in keywords if kw in content_lower],
                    "relevance_score": min(issue_score / 10, 1.0),
                    "confidence": min(issue_score / 20, 0.9)
                })
        
        # Sort by relevance
        legal_issues.sort(key=lambda x: x["relevance_score"], reverse=True)
        
        return legal_issues
    
    def _extract_dates_deadlines(self, content: str) -> List[Dict[str, Any]]:
        """Extract important dates and deadlines"""
        dates = []
        
        # Date patterns
        date_patterns = [
            r'\b\d{1,2}/\d{1,2}/\d{4}\b',  # MM/DD/YYYY
            r'\b\d{1,2}-\d{1,2}-\d{4}\b',  # MM-DD-YYYY
            r'\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b'
        ]
        
        for pattern in date_patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            for match in matches:
                # Try to determine if it's a deadline
                context_start = max(0, content.find(match) - 50)
                context_end = min(len(content), content.find(match) + len(match) + 50)
                context = content[context_start:context_end].lower()
                
                is_deadline = any(keyword in context for keyword in 
                                ["deadline", "due", "filing", "response", "answer", "reply"])
                
                dates.append({
                    "date": match,
                    "type": "deadline" if is_deadline else "reference_date",
                    "context": context,
                    "confidence": 0.8 if is_deadline else 0.6
                })
        
        return dates
    
    def _analyze_practice_area_specifics(self, content: str, classification: Dict) -> Dict[str, Any]:
        """Analyze document for practice area specific insights"""
        insights = {}
        
        if classification["primary_type"] == "pleading":
            # Look for specific pleading types
            content_lower = content.lower()
            if "motion" in content_lower:
                insights["pleading_type"] = "motion"
                if "summary judgment" in content_lower:
                    insights["motion_type"] = "summary_judgment"
                elif "dismiss" in content_lower:
                    insights["motion_type"] = "motion_to_dismiss"
            elif "complaint" in content_lower:
                insights["pleading_type"] = "complaint"
            elif "answer" in content_lower:
                insights["pleading_type"] = "answer"
        
        elif classification["primary_type"] == "contract":
            # Analyze contract specifics
            content_lower = content.lower()
            if "lease" in content_lower:
                insights["contract_type"] = "lease"
            elif "employment" in content_lower:
                insights["contract_type"] = "employment"
            elif "service" in content_lower:
                insights["contract_type"] = "service_agreement"
        
        return insights
    
    def _calculate_confidence(self, content: str, entities: List, legal_issues: List) -> float:
        """Calculate overall confidence score for the analysis"""
        base_confidence = 0.5
        
        # Boost confidence based on entities found
        entity_boost = min(len(entities) * 0.1, 0.3)
        
        # Boost confidence based on legal issues identified
        issue_boost = min(len(legal_issues) * 0.1, 0.2)
        
        # Boost confidence based on content length (more content = better analysis)
        length_boost = min(len(content) / 10000, 0.2)
        
        total_confidence = base_confidence + entity_boost + issue_boost + length_boost
        return min(total_confidence, 0.95)  # Cap at 95%
    
    def _generate_recommendations(self, classification: Dict, legal_issues: List) -> List[str]:
        """Generate recommendations based on document analysis"""
        recommendations = []
        
        if classification["confidence"] < 0.5:
            recommendations.append("Document classification uncertain - manual review recommended")
        
        if classification["primary_type"] == "pleading":
            recommendations.append("Review filing deadlines and court requirements")
            recommendations.append("Ensure proper service of process")
        
        elif classification["primary_type"] == "contract":
            recommendations.append("Review for compliance with applicable state laws")
            recommendations.append("Check for required disclosures")
        
        elif classification["primary_type"] == "discovery":
            recommendations.append("Verify discovery deadline compliance")
            recommendations.append("Review privilege assertions")
        
        # Practice area specific recommendations
        for issue in legal_issues:
            if issue["practice_area"] == "family_law":
                recommendations.append("Consider Utah family law requirements")
                recommendations.append("Review child custody standards")
            elif issue["practice_area"] == "personal_injury":
                recommendations.append("Verify statute of limitations compliance")
                recommendations.append("Review damages calculations")
        
        return recommendations
