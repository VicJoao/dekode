import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Plus } from 'lucide-react';
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
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
} from './styles';

const Dashboard: React.FC = () => {
  // Sample code snippets for demonstration
  const codeSnippets = [
    {
      id: 1,
      title: 'React Component',
      language: 'TypeScript',
      code: `function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}`,
    },
    {
      id: 2,
      title: 'Python Function',
      language: 'Python',
      code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
    },
  ];

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

      {codeSnippets.length > 0 ? (
        <Gallery>
          {codeSnippets.map((snippet) => (
            <CodeCard key={snippet.id}>
              <CodePreview>
                <Window title={`${snippet.title}.${snippet.language.toLowerCase()}`}>
                  <pre>{snippet.code}</pre>
                </Window>
              </CodePreview>
              <CodeInfo>
                <CodeTitle>{snippet.title}</CodeTitle>
                <CodeLanguage>{snippet.language}</CodeLanguage>
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