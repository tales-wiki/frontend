import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/Layout";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
import { store } from "./store";

const AppRoutes = lazy(() =>
  import("./routes").then((module) => ({ default: module.AppRoutes }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1분
      gcTime: 1000 * 60 * 60, // 1시간
      retry: 1, // 재시도 횟수 제한
      refetchOnWindowFocus: false, // 윈도우 포커스시 자동 리페치 비활성화
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Layout>
            <Suspense fallback={<Loading />}>
              <AppRoutes />
            </Suspense>
            <ScrollToTop />
          </Layout>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
