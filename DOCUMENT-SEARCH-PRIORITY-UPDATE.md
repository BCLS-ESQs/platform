# 📁 DOCUMENT SEARCH PRIORITY UPDATE - LAW MATRIX v2.0

## 🎯 CRITICAL UPDATE: ANY DOCUMENT REFERENCE → CLIENT'S F: FOLDER FIRST

### ✅ NEW BEHAVIOR FOR CLAUDE:

When user mentions **ANY document** in relation to a client project:

1. **IMMEDIATELY search the client's F: folder** (Practice Panther folder)
2. **NEVER search Google Drive first** for client documents
3. **Search ALL subfolders recursively** in client's Practice Panther directory
4. **Use project name** to identify correct client folder

### 📋 EXAMPLES:

#### ❌ OLD BEHAVIOR (WRONG):
```
User: "show me [client]'s [document type] folder"
Claude: *searches Google Drive* → 0 results found
```

#### ✅ NEW BEHAVIOR (CORRECT):
```
User: "show me [client]'s [document type] folder"  
Claude: *searches F:\Dropbox\Dropbox\PracticePanther\[ClientFolder]\*
Result: Found documents in proper Practice Panther folder structure
```

### 🔍 SEARCH PROTOCOL:

#### For Any Client Project:
- **Search Location:** `F:\Dropbox\Dropbox\PracticePanther\[ClientFolder]\`
- **Search Method:** Recursive through ALL subfolders
- **Document Types:** Any file type (.pdf, .docx, .jpg, folders, etc.)
- **Avoid:** Google Drive, OneDrive, Cloud Storage

#### For Any Client Project:
1. **Identify project name** from user's request
2. **Map to client folder** in Practice Panther directory
3. **Search recursively** through all case folders and subfolders
4. **Return results** from F: drive location only

### 🏛️ LAW MATRIX v2.0 INTEGRATION:

#### JavaScript Functions Added:
- `handleDocumentReference(projectName, documentKeywords)` - Main search handler
- `findDocumentInClientFolder(projectName, documentName)` - Specific document finder
- `getDocumentPath(projectName, documentType)` - Path resolution

#### Backend API Enhanced:
- Document search endpoints prioritize Practice Panther
- Client folder mapping for project names
- Recursive folder search capabilities

### 📁 FOLDER STRUCTURE EXAMPLE:

```
F:\Dropbox\Dropbox\PracticePanther\Stears, Julie P (JWA)\
├── 244501169\                          # Case number folder
│   ├── Financial Dec docs\             # Financial declarations
│   ├── Motions\                        # Court motions
│   ├── Pleadings\                      # Legal pleadings
│   ├── email communication\            # Client emails
│   └── intake docs\                    # Initial documents
├── Agreement to Mediate.pdf
├── Moving into mediation.docx
└── Questions for Travis and John.docx
```

### 🚫 WHAT CLAUDE SHOULD NEVER DO:

1. **Don't search Google Drive** for client documents first
2. **Don't assume cloud storage** when document not found in F: folder
3. **Don't give up** after one search - check all subfolders
4. **Don't use generic folder names** - use project-specific client folders

### ✅ IMPLEMENTATION STATUS:

- **JavaScript Updated:** `lm-project-instructions-updated.js`
- **Backend Enhanced:** Document search API endpoints
- **Search Priority:** F: Drive Practice Panther FIRST
- **Fallback:** Ask user for clarification if not found in F: folder

---

**EFFECTIVE IMMEDIATELY:** Claude will search client's F: folder FIRST for ANY document referenced by user, using project name to locate correct client directory.

**Example Success:** All client documents found in F: Practice Panther folders, not Google Drive.