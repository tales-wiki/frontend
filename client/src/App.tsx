import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import { AppRoutes } from "./routes";
import { store } from "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1분
      gcTime: 1000 * 60 * 30, // 30분
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Layout>
            <AppRoutes />
            <ScrollToTop />
          </Layout>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
