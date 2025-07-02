import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Download, Copy, Save } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useAuth } from '../../contexts/AuthContext';
import { useCodeSnippets } from '../../hooks/useCodeSnippets';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Window from '../../components/common/Window/Window';
import {
  EditorContainer,
  EditorHeader,
  EditorTitle,
  EditorSubtitle,
  EditorContent,
  EditorPanel,
  PanelTitle,
  FormGroup,
  FormRow,
  Select,
  PreviewPanel,
  PreviewContainer,
  ExportActions,
} from './styles';

const Editor: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { snippets, createSnippet, updateSnippet } = useCodeSnippets();
  
  const editingId = searchParams.get('id');
  const editingSnippet = editingId ? snippets.find(s => s.id === editingId) : null;

  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);
  
  const [title, setTitle] = useState('fibonacci.js');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('dark-plus');
  const [windowStyle, setWindowStyle] = useState('mac');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);

  // Load snippet data when editing
  useEffect(() => {
    if (editingSnippet) {
      setCode(editingSnippet.code);
      setTitle(editingSnippet.title);
      setLanguage(editingSnippet.language);
      setTheme(editingSnippet.theme);
      setWindowStyle(editingSnippet.window_style);
      setShowLineNumbers(editingSnippet.show_line_numbers);
    }
  }, [editingSnippet]);

  const handleSave = async () => {
    if (!user) {
      alert('Please sign in to save your code snippets');
      return;
    }

    setSaving(true);
    try {
      const snippetData = {
        title,
        language,
        code,
        theme,
        window_style: windowStyle,
        show_line_numbers: showLineNumbers,
      };

      if (editingId && editingSnippet) {
        await updateSnippet(editingId, snippetData);
        alert('Code snippet updated successfully!');
      } else {
        await createSnippet(snippetData);
        alert('Code snippet saved successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Failed to save code snippet');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        
        const link = document.createElement('a');
        link.download = `${title || 'code'}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Export failed:', error);
      }
    }
  };

  const handleCopyToClipboard = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            alert('Image copied to clipboard!');
          }
        });
      } catch (error) {
        console.error('Copy failed:', error);
      }
    }
  };

  const formatCodeWithLineNumbers = (code: string) => {
    if (!showLineNumbers) return code;
    
    const lines = code.split('\n');
    return lines.map((line, index) => (
      <div key={index} style={{ display: 'flex' }}>
        <span style={{ 
          color: '#858585', 
          marginRight: '1rem', 
          minWidth: '2rem',
          textAlign: 'right',
          userSelect: 'none'
        }}>
          {index + 1}
        </span>
        <span>{line || ' '}</span>
      </div>
    ));
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <EditorTitle>
          {editingSnippet ? 'Edit Code' : 'Code Editor'}
        </EditorTitle>
        <EditorSubtitle>
          Create beautiful code images with custom themes and styling
        </EditorSubtitle>
      </EditorHeader>

      <EditorContent>
        <EditorPanel>
          <PanelTitle>Code & Settings</PanelTitle>
          
          <FormGroup>
            <Input
              label="Window Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter filename..."
            />
            
            <FormRow>
              <div>
                <label style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
                  Language
                </label>
                <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="json">JSON</option>
                </Select>
              </div>
              
              <div>
                <label style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
                  Theme
                </label>
                <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <option value="dark-plus">Dark+ (VS Code)</option>
                  <option value="monokai">Monokai</option>
                  <option value="github-light">GitHub Light</option>
                  <option value="dracula">Dracula</option>
                </Select>
              </div>
            </FormRow>
            
            <FormRow>
              <div>
                <label style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>
                  Window Style
                </label>
                <Select value={windowStyle} onChange={(e) => setWindowStyle(e.target.value)}>
                  <option value="mac">macOS</option>
                  <option value="windows">Windows</option>
                </Select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'end' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showLineNumbers}
                    onChange={(e) => setShowLineNumbers(e.target.checked)}
                  />
                  Show line numbers
                </label>
              </div>
            </FormRow>
            
            <Input
              label="Your Code"
              multiline
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              rows={15}
            />

            {user && (
              <Button onClick={handleSave} disabled={saving}>
                <Save size={20} />
                {saving ? 'Saving...' : editingSnippet ? 'Update' : 'Save'}
              </Button>
            )}
          </FormGroup>
        </EditorPanel>

        <PreviewPanel>
          <PanelTitle>Preview</PanelTitle>
          
          <PreviewContainer>
            <div ref={previewRef}>
              <Window 
                title={title} 
                controlsStyle={windowStyle as 'mac' | 'windows'}
              >
                <pre style={{ margin: 0, fontFamily: 'inherit' }}>
                  {formatCodeWithLineNumbers(code)}
                </pre>
              </Window>
            </div>
          </PreviewContainer>
          
          <ExportActions>
            <Button onClick={handleExport}>
              <Download size={20} />
              Export PNG
            </Button>
            <Button variant="secondary" onClick={handleCopyToClipboard}>
              <Copy size={20} />
              Copy to Clipboard
            </Button>
          </ExportActions>
        </PreviewPanel>
      </EditorContent>
    </EditorContainer>
  );
};

export default Editor;