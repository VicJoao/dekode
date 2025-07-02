import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Palette, Download, Zap } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import {
  HomeContainer,
  Hero,
  Title,
  Subtitle,
  ButtonGroup,
  Features,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
} from './styles';

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Hero>
        <Title>dekode</Title>
        <Subtitle>
          Transform your code into beautiful, shareable images with VS Code themes and customizable window frames
        </Subtitle>
        <ButtonGroup>
          <Link to="/editor">
            <Button size="large">
              <Code size={20} />
              Start Creating
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="large">
              <Palette size={20} />
              View Gallery
            </Button>
          </Link>
        </ButtonGroup>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>
            <Code />
          </FeatureIcon>
          <FeatureTitle>Syntax Highlighting</FeatureTitle>
          <FeatureDescription>
            Support for multiple programming languages with accurate syntax highlighting using VS Code themes
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <Palette />
          </FeatureIcon>
          <FeatureTitle>Custom Themes</FeatureTitle>
          <FeatureDescription>
            Choose from popular VS Code themes or create your own custom color schemes for unique styling
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <Zap />
          </FeatureIcon>
          <FeatureTitle>Window Customization</FeatureTitle>
          <FeatureDescription>
            Customize window frames with macOS or Windows styles, custom icons, and personalized title bars
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <Download />
          </FeatureIcon>
          <FeatureTitle>High-Quality Export</FeatureTitle>
          <FeatureDescription>
            Export your code images in high resolution, perfect for presentations, documentation, or social media
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </HomeContainer>
  );
};

export default Home;