import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  FormGroup,
  TabContainer,
  Tab,
  ErrorMessage,
  SuccessMessage,
} from './styles';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (activeTab === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          onClose();
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Check your email for the confirmation link!');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setSuccess('');
  };

  const handleTabChange = (tab: 'signin' | 'signup') => {
    setActiveTab(tab);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <TabContainer>
            <Tab
              active={activeTab === 'signin'}
              onClick={() => handleTabChange('signin')}
            >
              Sign In
            </Tab>
            <Tab
              active={activeTab === 'signup'}
              onClick={() => handleTabChange('signup')}
            >
              Sign Up
            </Tab>
          </TabContainer>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              {activeTab === 'signup' && (
                <Input
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              )}

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

              {error && <ErrorMessage>{error}</ErrorMessage>}
              {success && <SuccessMessage>{success}</SuccessMessage>}

              <Button type="submit" disabled={loading}>
                {loading
                  ? 'Loading...'
                  : activeTab === 'signin'
                  ? 'Sign In'
                  : 'Create Account'}
              </Button>
            </FormGroup>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;