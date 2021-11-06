import { AppProps } from 'next/app';
import '../pretendard/pretendard.css';
import 'tailwindcss/tailwind.css';
import '../styles/post.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
