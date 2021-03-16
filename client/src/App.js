import './App.css';
import BookList from './components/BookList';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import  AddBook  from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AddBook/>
        <BookList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
