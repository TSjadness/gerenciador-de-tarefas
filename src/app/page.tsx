
import { Header } from "@/components/Cabecalho";
import TaskList from "../components/gerenciadorList";
import "../styles/globals.scss";

export default function Home() {
  return (
    <main>
      <Header />
      <TaskList />
    </main>
  );
}
