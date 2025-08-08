import { Terminal } from '@/components/Terminal';

const Index = () => {
  console.log('Index page rendering');
  return (
    <div>
      <h1 style={{color: 'red', fontSize: '50px', background: 'white', padding: '20px'}}>
        TEST - Can you see this red text?
      </h1>
      <Terminal />
    </div>
  );
};

export default Index;
