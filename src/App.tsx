import { Button } from "./components/ui/button";
import { MainLayout } from "./layouts/MainLayout";

const App = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center gap-3 py-20">
        <h1 className="text-4xl font-bold text-blue-600">
          Tailwind CSS is working!
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button>This is Shadcn button </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default App;
