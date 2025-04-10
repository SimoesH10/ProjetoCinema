import { useState } from "react";
import api from "../Servicos/api";
import estilo from "./home.module.css";

export default function Home() {
  const [filmes, setFilmes] = useState([]); // Lista de filmes retornada pela pesquisa
  const [busca, setBusca] = useState(""); // Texto digitado pelo usuário
  const [loading, setLoading] = useState(false); // Estado para exibir carregamento

  // Função para buscar filmes na API TMDb
  async function pesquisarFilmes(e) {
    e.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

    if (busca.trim() === "") {
      alert("Digite algo para pesquisar!");
      return;
    }

    setLoading(true); // Exibe o estado de carregamento

    try {
      const response = await api.get("search/movie", {
        params: {
          api_key: "d9d6756e2940718b77c270c50318447a",
          language: "pt-BR",
          query: busca, // Palavra-chave digitada pelo usuário
          page: 1,
        },
      });

      setFilmes(response.data.results); // Atualiza a lista de filmes com os resultados
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      alert("Houve um erro na pesquisa. Tente novamente mais tarde.");
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  }

  return (
    <div>
      {/* Formulário de pesquisa */}
      <form onSubmit={pesquisarFilmes}>
        <input
          type="text"
          placeholder="Pesquisar filmes..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={estilo.inputBusca}
        />
        <button type="submit" className={estilo.botaoBusca}>
          Pesquisar
        </button>
      </form>

      {/* Exibe estado de carregamento */}
      {loading && <p>Carregando...</p>}

      {/* Exibe os filmes encontrados */}
      <div>
        {filmes.length > 0 ? (
          filmes.map((filme) => (
            <div key={filme.id}>
              <h1>{filme.title}</h1>
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${filme.backdrop_path}`}
                alt={filme.title}
              />
              <h2>{filme.overview}</h2>
              <h2>{filme.vote_average}</h2>
              <h2>{filme.release_date}</h2>
            </div>
          ))
        ) : (
          !loading && <p>Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
}
