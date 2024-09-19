import React, { useState } from 'react';

// Lista de cidades para simular a pesquisa
const items = [
  "Lisboa",
  "Porto",
  "Braga",
  "Coimbra",
  "Aveiro",
  "Faro",
  "Leiria",
  "Évora",
  "Funchal",
  "Viseu",
  "Guimarães",
  "Viana do Castelo"
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  // Função chamada quando o usuário digita algo na barra de pesquisa
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtra as cidades com base no termo de pesquisa
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredItems(filtered);
  };

  return (
    <div className="App">
      <h1>Barra de Pesquisa com Autocomplete</h1>
      
      {/* Barra de Pesquisa */}
      <input
        type="text"
        placeholder="Pesquise uma cidade..."
        value={searchTerm}
        onChange={handleChange}
        style={styles.input}
      />

      {/* Lista de sugestões */}
      {searchTerm && filteredItems.length > 0 && (
        <ul style={styles.suggestionsList}>
          {filteredItems.map((item, index) => (
            <li key={index} style={styles.suggestionItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Estilos inline para manter o exemplo simples
const styles = {
  input: {
    padding: "10px",
    width: "300px",
    fontSize: "16px",
    margin: "20px 0 0 0",
  },
  suggestionsList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    border: "1px solid #ccc",
    maxWidth: "300px",
    maxHeight: "180px",
    overflowY: "scroll",
  },
  suggestionItem: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },
  scrollContainer: {
    maxHeight: "120px", // Altura máxima para o restante da lista
    overflowY: "scroll", // Habilita barra de rolagem vertical
    border: "1px solid #ccc",
    maxWidth: "300px",
  },
  suggestionsScroll: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
};

export default App;
