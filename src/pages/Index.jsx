import { EmailForm } from '../components/EmailForm';

const Index = ({ onEmailSubmit }) => {
  return <EmailForm onSubmit={onEmailSubmit} />;
};

export default Index;