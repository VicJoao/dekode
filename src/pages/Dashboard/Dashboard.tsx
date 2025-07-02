import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Code, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCodeSnippets } from '../../hooks/useCodeSnippets';
import Button from '../../components/common/Button/Button';
import Window from '../../components/common/Window/Window';
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  Gallery,
  CodeCard,
  CodePreview,
  CodeInfo,
  CodeTitle,
  CodeLanguage,
  CodeActions,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  LoadingState,
} from './styles';

const Dashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { snippets, loading, deleteSnippet } = useCodeSnippets();

  if (authLoading) {
    return (
      <DashboardContainer>
        <LoadingState>Loading...</LoadingState>
      </DashboardContainer>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this code snippet?')) {
      try {
        await deleteSnippet(id);
      } catch (error) {
        alert('Failed to delete snippet');
      }
    }
  };

  const formatCodePreview = (code: string, showLineNumbers: boolean) => {
    if (!showLineNumbers) return code;
    
    const lines = code.split('\n').slice(0, 10); // Show only first 10 lines
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

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingState>Loading your code snippets...</LoadingState>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Your Code Gallery</DashboardTitle>
        <DashboardSubtitle>
          Manage and view all your beautiful code images
        </DashboardSubtitle>
        <Link to="/editor">
          <Button>
            <Plus size={20} />
            Create New
          </Button>
        </Link>
      </DashboardHeader>

      {snippets.length > 0 ? (
        <Gallery>
          {snippets.map((snippet) => (
            <CodeCard key={snippet.id}>
              <CodePreview>
                <Window 
                  title={snippet.title}
                  controlsStyle={snippet.window_style as 'mac' | 'windows'}
                >
                  <pre style={{ margin: 0, fontSize: '12px' }}>
                    {formatCodePreview(snippet.code, snippet.show_line_numbers)}
                  </pre>
                </Window>
              </CodePreview>
              <CodeInfo>
                <div>
                  <CodeTitle>{snippet.title}</CodeTitle>
                  <CodeLanguage>{snippet.language}</CodeLanguage>
                </div>
                <CodeActions>
                  <Link to={`/editor?id=${snippet.id}`}>
                    <Button variant="secondary" size="small">
                      <Edit size={16} />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={() => handleDelete(snippet.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </CodeActions>
              </CodeInfo>
            </CodeCard>
          ))}
        </Gallery>
      ) : (
        <EmptyState>
          <EmptyIcon>
            <Code />
          </EmptyIcon>
          <EmptyTitle>No code snippets yet</EmptyTitle>
          <EmptyDescription>
            Create your first beautiful code image to get started
          </EmptyDescription>
          <Link to="/editor">
            <Button>
              <Plus size={20} />
              Create Your First Image
            </Button>
          </Link>
        </EmptyState>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;